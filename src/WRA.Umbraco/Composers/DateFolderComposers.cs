using WRA.Umbraco.Configurations;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Services;
using System.Globalization;
using Microsoft.Extensions.Caching.Memory;

namespace WRA.Umbraco.Composers
{
    public class DateFoldersComposer : IComposer
    {

        public DateFoldersComposer()
        {

        }

        public void Compose(IUmbracoBuilder builder)
        {
            builder.Services.Configure<DateFoldersConfig>(builder.Config.GetSection(nameof(DateFoldersConfig)));

            // builder.AddNotificationHandler<ContentMovedToRecycleBinNotification, DateFoldersContentMovedToRecycleBinNotification>();

            builder.AddNotificationHandler<ContentSavedNotification, DateFoldersContentSavedNotification>();

            // builder.AddNotificationHandler<ContentDeletedNotification, DateFoldersContentDeletedNotification>();
        }
    }

    public abstract class DateFoldersBaseNotificationHandler
    {
        protected readonly ILogger _logger;
        protected readonly IContentService _contentService;
        protected readonly DateFoldersConfig _options;
        protected readonly IMemoryCache _cache;

        // Mapping of month names to their chronological order.
        private readonly Dictionary<string, int> monthSortOrder = Enumerable.Range(1, 12)
         .ToDictionary(CultureInfo.InvariantCulture.DateTimeFormat.GetMonthName, month => month);

        protected DateFoldersBaseNotificationHandler(IOptions<DateFoldersConfig> options, ILogger logger, IContentService contentService, IMemoryCache cache)
        {
            _options = options.Value;
            _logger = logger;
            _contentService = contentService;
            _cache = cache;
        }

        protected DateTime GetItemDate(IContent content, string propertyAlias)
        {
            if (string.IsNullOrEmpty(propertyAlias) || !content.HasProperty(propertyAlias)) return content.CreateDate;

            var propertyValue = content.GetValue<DateTime>(propertyAlias);
            return propertyValue == DateTime.MinValue ? content.CreateDate : propertyValue;
        }

        protected void EnsureDateFolders(IContent content, DateTime date, int rootParentId)
        {
            var yearFolderName = date.ToString("yyyy");
            var monthFolderName = CultureInfo.InvariantCulture.DateTimeFormat.GetMonthName(date.Month);

            var yearFolderId = GetOrCreateFolder(yearFolderName, _options.FolderDocType, rootParentId);
            var monthFolderId = GetOrCreateFolder(monthFolderName, _options.FolderDocType, yearFolderId);

            if (content.ParentId != monthFolderId)
            {
                _contentService.Move(content, monthFolderId);
                _logger.LogInformation($"Moved content {content.Name} to folder {monthFolderName}");
            }
        }


        protected int GetOrCreateFolder(string folderName, string folderDocTypeAlias, int parentId)
        {
            // Cache key based on folder name and parent ID to ensure uniqueness
            var cacheKey = $"folder_{parentId}_{folderName}";
            if (!_cache.TryGetValue(cacheKey, out int folderId))
            {
                // Lookup folder by name and parent ID
                var existingFolders = _contentService.GetPagedChildren(parentId, 0, int.MaxValue, out long _).Where(z => z.ContentType.Alias == folderDocTypeAlias);
                var folder = existingFolders.FirstOrDefault(c => (c.Name ?? string.Empty).Equals(folderName, StringComparison.OrdinalIgnoreCase) && c.ContentType.Alias == folderDocTypeAlias);

                if (folder == null)
                {
                    folder = _contentService.Create(folderName, parentId, folderDocTypeAlias);
                    _contentService.SaveAndPublish(folder);
                    _logger.LogInformation($"Created new folder: {folderName}");
                }

                folderId = folder.Id;
                // Cache the folder ID with a suitable expiration policy
                _cache.Set(cacheKey, folderId, TimeSpan.FromMinutes(30)); // Adjust the expiration as needed
            }

            return folderId;
        }

        protected void SortFolders(int parentId, bool isYear)
        {
            try
            {
                var children = _contentService.GetPagedChildren(parentId, 0, int.MaxValue, out long _)
                    .ToList();

                List<IContent> sortedChildren;

                if (isYear)
                {
                    // Sort year folders in descending order
                    sortedChildren = children.OrderByDescending(c => c.Name).ToList();
                }
                else
                {
                    // Sort month folders based on the predefined month order
                    sortedChildren = children
                        .Where(c => monthSortOrder.ContainsKey(c.Name ?? string.Empty))
                        .OrderBy(c => monthSortOrder[c.Name ?? string.Empty])
                        .ToList();
                }

                bool changesMade = false;
                for (int i = 0; i < sortedChildren.Count; i++)
                {
                    if (sortedChildren[i].SortOrder != i)
                    {
                        sortedChildren[i].SortOrder = i;
                        changesMade = true;
                    }
                }

                if (changesMade)
                {
                    _contentService.Save(sortedChildren.Where(c => c.IsDirty()).ToArray());
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error sorting folders under parent ID {parentId}.");
            }
        }

        protected int FindRootParentId(IContent content)
        {
            try
            {
                var cacheKey = $"root_parentId_{content.Id}";
                if (!_cache.TryGetValue(cacheKey, out int rootFolderId))
                {
                    var ancestors = _contentService.GetAncestors(content).ToList();
                    ancestors.Reverse();

                    IContent? rootParent = null;

                    if (_options.AllowedParentDocTypes.Count != 0)
                    {
                        rootParent = ancestors.FirstOrDefault(a => _options.AllowedParentDocTypes.Contains(a.ContentType.Alias));
                    }

                    if (rootParent == null)
                    {
                        rootParent = ancestors.FirstOrDefault(a => !_options.ItemDocTypes.Contains(a.ContentType.Alias) && a.ContentType.Alias != _options.FolderDocType);
                    }

                    if (rootParent == null)
                    {
                        rootParent = rootParent = _contentService.GetById(content.ParentId);
                    }

                    var rfId = rootParent != null ? rootParent.Id : -1;
                    _cache.Set(cacheKey, rfId, TimeSpan.FromMinutes(30));
                    return rfId;
                }

                return rootFolderId;

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to find root parent ID for content ID {content.Id}.");
                return -1;
            }
        }

        protected void CleanUpEmptyFolders(int parentId)
        {
            try
            {
                while (parentId > 0)
                {
                    var parentFolder = _contentService.GetById(parentId);
                    if (parentFolder == null || parentFolder.ContentType.Alias != _options.FolderDocType)
                    {
                        break; // Exit if the parent is not found or not a folder of the correct type
                    }

                    _contentService.GetPagedChildren(parentId, 0, 1, out long totalChildren);
                    if (totalChildren == 0)
                    {
                        // Folder is empty, safe to delete
                        var nextParentId = parentFolder.ParentId;
                        _contentService.Delete(parentFolder);
                        _logger.LogInformation($"Deleted empty folder: {parentFolder.Name}");

                        parentId = nextParentId; // Move to check the next parent in the hierarchy
                    }
                    else
                    {
                        // Folder is not empty, stop the cleanup process
                        break;
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while cleaning up empty folders starting from parent ID {parentId}.");
            }
        }

    }

    public class DateFoldersContentSavedNotification : DateFoldersBaseNotificationHandler, INotificationHandler<ContentSavedNotification>
    {
        public DateFoldersContentSavedNotification(IOptions<DateFoldersConfig> options, ILogger<DateFoldersContentSavedNotification> logger, IContentService contentService, IMemoryCache cache)
            : base(options, logger, contentService, cache)
        {
        }

        public void Handle(ContentSavedNotification notification)
        {
            foreach (var content in notification.SavedEntities)
            {
                try
                {
                    if (!_options.ItemDocTypes.Contains(content.ContentType.Alias)) continue;

                    // Fetch the current version of the content from the database to get the existing parent ID
                    var existingContent = _contentService.GetById(content.Id);
                    var oldParentId = existingContent?.ParentId ?? -1; // Use -1 as a fallback if existing content is not found

                    var date = GetItemDate(content, _options.ItemDateProperty);
                    var rootParentId = FindRootParentId(content);
                    EnsureDateFolders(content, date, rootParentId);

                    // After moving the content, check if the old parent folder is now empty and needs cleanup
                    if (oldParentId > 0 && oldParentId != content.ParentId)
                    {
                        CleanUpEmptyFolders(oldParentId);
                    }
                }
                catch (Exception ex)
                {
                    // Log the error but allow the loop to continue processing other items.
                    _logger.LogError(ex, $"An error occurred while processing ContentSavedNotification for content ID {content.Id}.");
                }
            }
        }
    }

    public class DateFoldersContentMovedToRecycleBinNotification : DateFoldersBaseNotificationHandler, INotificationHandler<ContentMovedToRecycleBinNotification>
    {
        public DateFoldersContentMovedToRecycleBinNotification(IOptions<DateFoldersConfig> options, ILogger<DateFoldersContentMovedToRecycleBinNotification> logger, IContentService contentService, IMemoryCache cache)
            : base(options, logger, contentService, cache)
        {
        }

        public void Handle(ContentMovedToRecycleBinNotification notification)
        {
            foreach (var item in notification.MoveInfoCollection)
            {
                try
                {
                    var content = item.Entity;
                    if (!_options.ItemDocTypes.Contains(content.ContentType.Alias)) continue;

                    // Parse the old parent ID from item.OriginalPath before the content was moved to the recycle bin.
                    var oldParentId = ParseParentIdFromOriginalPath(item.OriginalPath);

                    if (oldParentId > 0)
                    {
                        CleanUpEmptyFolders(oldParentId);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "An error occurred while processing ContentMovedToRecycleBinNotification for content ID {ContentId}.", item.Entity.Id);
                    // Continue processing other items despite the error.
                }
            }
        }

        private int ParseParentIdFromOriginalPath(string originalPath)
        {
            try
            {
                // The original path is a comma-separated string of IDs leading to the item, e.g., "-1,1147,1148"
                // We're interested in the second-to-last ID, as the last one is the ID of the item itself.
                var pathIds = originalPath.Trim().Split(',');
                if (pathIds.Length >= 2) // Ensure there's at least a parent ID and the item's ID
                {
                    if (int.TryParse(pathIds[pathIds.Length - 2], out int parentId))
                    {
                        return parentId;
                    }
                }
                return -1; // Return an invalid ID if parsing fails or path structure is unexpected
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to parse parent ID from original path: {originalPath}");
                return -1; // Fail gracefully by returning an invalid ID
            }
        }
    }

    public class DateFoldersContentDeletedNotification : DateFoldersBaseNotificationHandler, INotificationHandler<ContentDeletedNotification>
    {
        public DateFoldersContentDeletedNotification(IOptions<DateFoldersConfig> options, ILogger<DateFoldersContentDeletedNotification> logger, IContentService contentService, IMemoryCache cache)
            : base(options, logger, contentService, cache)
        {
        }

        public void Handle(ContentDeletedNotification notification)
        {
            foreach (var item in notification.DeletedEntities)
            {
                try
                {
                    // Ensure the item is one of the types we're interested in
                    if (!_options.ItemDocTypes.Contains(item.ContentType.Alias)) continue;


                    // After deletion, initiate cleanup from the parent of the deleted item
                    var parentId = item.ParentId;
                    CleanUpEmptyFolders(parentId);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error cleaning up folders after content deletion.");
                }
            }
        }
    }
}