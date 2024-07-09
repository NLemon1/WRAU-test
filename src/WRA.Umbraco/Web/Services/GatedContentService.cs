using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.Blocks;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;
using WRA.Umbraco.Exceptions;
using WRA.Umbraco.Helpers.Constants;
using WRA.Umbraco.Services.Caching;

namespace WRA.Umbraco.Web.Services;

public class GatedContentService(IMemberManager memberManager, IMemberGroupService memberGroupService, ILogger<GatedContentService> logger, ICacheKeyProvider cacheKeyProvider, AppCaches appCaches)
{
    private const string GatedMemberGroups = GlobalConstants.GatedContent.GatedMemberGroups;
    private const string VisibleToAll = GlobalConstants.GatedContent.VisibleToAll;
    private const string AnonymousUserName = GlobalConstants.GatedContent.AnonymousUserName;
    private const int VisibleToAllSlidingWindow = 240;
    private const int VisibleToMemberSlidingWindow = 30;
    private const int MemberAuthorizedByGroupSlidingWindow = 30;
    private readonly IMemberManager _memberManager = memberManager ?? throw new ArgumentNullException(nameof(memberManager));
    private readonly IMemberGroupService _memberGroupService = memberGroupService ?? throw new ArgumentNullException(nameof(memberGroupService));
    private readonly ICacheKeyProvider _cacheKeyProvider = cacheKeyProvider ?? throw new ArgumentException(nameof(CacheKeyProvider));
    private readonly ILogger<GatedContentService> _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    private readonly AppCaches _appCaches = appCaches ?? throw new ArgumentNullException(nameof(appCaches));
    private static readonly char[] CommaSeparator = [','];

    /// <summary>
    /// Determines whether a member can view a given page, based on the page's visibility settings and the member's group memberships.
    /// Implements caching to optimize performance.
    /// </summary>
    /// <param name="page">The page to check visibility for.</param>
    /// <param name="member">The member whose access is being checked. Can be null if not logged in.</param>
    /// <returns>A task that represents the asynchronous operation. The task result contains a boolean indicating whether the member can view the page.</returns>
    public async Task<bool> MemberCanViewPage(IPublishedContent page, MemberIdentityUser? member)
    {
        // Cache key for storing and retrieving if a page is visible to all.
        string allCanViewPageCacheKey = _cacheKeyProvider.GetCacheKey(page.GetType(), page.Id, VisibleToAll);

        // Cache key for storing and retrieving if a page is visible to the member based on member group.
        string memberCanViewPageCacheKey = _cacheKeyProvider.GetCacheKey(typeof(MemberIdentityUser), member?.Id ?? AnonymousUserName, page.GetType(), page.Id, GatedMemberGroups);

        try
        {
            // Attempt to retrieve the pages visibility to all from the cache.
            bool? allCanViewPageCacheResult = _appCaches.RuntimeCache.GetCacheItem<bool?>(allCanViewPageCacheKey);
            if (allCanViewPageCacheResult == true)
            {
                // Page is visible to all so refresh the cache and return true.
                _appCaches.RuntimeCache.InsertCacheItem(allCanViewPageCacheKey, () => true, TimeSpan.FromMinutes(VisibleToAllSlidingWindow));
                return true;
            }

            // Attempt to retrieve the members view access to this page from the cache.
            bool? memberCanViewPageCacheResult = _appCaches.RuntimeCache.GetCacheItem<bool?>(memberCanViewPageCacheKey);
            if (memberCanViewPageCacheResult.HasValue)
            {
                // We got the value from the cache, could still be true or false. Refresh cache with that value and return it.
                _appCaches.RuntimeCache.InsertCacheItem(memberCanViewPageCacheKey, () => memberCanViewPageCacheResult.Value, TimeSpan.FromMinutes(VisibleToMemberSlidingWindow));
                return memberCanViewPageCacheResult.Value;
            }

            // We missed the cache so now we retrieve the page visibility from the content and cache it.
            bool pageVisibleToAll = page.Value<bool>(VisibleToAll);
            _appCaches.RuntimeCache.InsertCacheItem(memberCanViewPageCacheKey, () => pageVisibleToAll, TimeSpan.FromMinutes(VisibleToAllSlidingWindow));
            if (pageVisibleToAll)
            {
                // If the page is visible to all we can return true now and skip the rest of the checks.
                return true;
            }

            // Attempt to retrieve the specific property that lists the member groups authorized to view the page.
            IPublishedProperty? authorizedMemberGroupsField = page.Properties
                .FirstOrDefault(p => p.Alias.Equals(GatedMemberGroups, StringComparison.OrdinalIgnoreCase));

            // Parse the list of authorized member group IDs from the page's property.
            List<string> authorizedMemberGroupIds = authorizedMemberGroupsField?.GetValue(GatedMemberGroups)?.ToString()
                .Split(CommaSeparator, StringSplitOptions.RemoveEmptyEntries)
                .ToList() ?? [];

            // var authorizedSubscriptions = page.Properties.FirstOrDefault(p => p.Alias.Equals("authorizedSubscriptions", StringComparison.OrdinalIgnoreCase));

            // If there are authorized groups defined and a member is provided, check if the member belongs to any of these groups.
            bool canView = authorizedMemberGroupIds.Count != 0 && member != null && await MemberIsInAuthorizedGroup(authorizedMemberGroupIds, member);

            // Cache the members view access for this page and return it.
            _appCaches.RuntimeCache.InsertCacheItem(memberCanViewPageCacheKey, () => canView, TimeSpan.FromMinutes(VisibleToMemberSlidingWindow));
            return canView;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while checking if a member can view the page. Page ID: {PageId}, Member ID: {MemberId}", page.Id, member?.Id);
            return false;
        }
    }

    /// <summary>
    /// This updated method checks if a member belongs to any of the authorized groups.
    /// </summary>
    /// <param name="authorizedMemberGroups">List of groups that are authorized.</param>
    /// <param name="member">The member whose access is being checked. Can be null if not logged in.</param>
    /// <returns>A task that represents the asynchronous operation. The task result contains a boolean indicating whether the member can view the page.</returns>
    private async Task<bool> MemberIsInAuthorizedGroup(List<string> authorizedMemberGroups, MemberIdentityUser? member)
    {
        // If anonymous users are in the authorized member groups return true early.
        if (member is null && authorizedMemberGroups.Exists(ag => ag.Equals(AnonymousUserName, StringComparison.OrdinalIgnoreCase)))
        {
            return true;
        }

        // Build Cache key and be aware that a member and member Id can still be null.
        string cacheKey = _cacheKeyProvider.GetCacheKey(typeof(MemberIdentityUser), member?.Id ?? AnonymousUserName, string.Join("_", authorizedMemberGroups));

        try
        {
            // Attempt to retrieve the result from the cache first to avoid unnecessary processing
            bool? memberAuthorizedByGroup = _appCaches.RuntimeCache.GetCacheItem<bool?>(cacheKey);
            if (memberAuthorizedByGroup.HasValue)
            {
                _appCaches.RuntimeCache.InsertCacheItem(cacheKey, () => memberAuthorizedByGroup.Value, TimeSpan.FromMinutes(MemberAuthorizedByGroupSlidingWindow));
                return memberAuthorizedByGroup.Value;
            }

            // Not sure exactly how this works for anonymous users so this may need to be adjusted.

            // Retrieve the roles (groups) associated with the member
            IList<string> memberGroups = member is null ? [] : (await _memberManager.GetRolesAsync(member));

            // Check if any of the member's groups match the authorized groups
            bool canView = memberGroups.Any(memberGroupName =>
            {
                IMemberGroup? memberGroup = _memberGroupService.GetByName(memberGroupName);
                return memberGroup != null && authorizedMemberGroups.Contains(memberGroup.Id.ToString());
            });

            // Cache the result for future requests
            _appCaches.RuntimeCache.InsertCacheItem(cacheKey, () => canView, TimeSpan.FromMinutes(MemberAuthorizedByGroupSlidingWindow));

            return canView;
        }
        catch (Exception ex)
        {
            // Log the error with detailed context
            _logger.LogError(ex, "Error occurred while checking group membership for member ID: {MemberId}", member?.Id ?? AnonymousUserName);

            return false;
        }
    }

    /// <summary>
    /// Determines whether a member can view a given block, based on the block's visibility settings and the member's group memberships.
    /// Implements caching to optimize performance.
    /// </summary>
    /// <param name="block">The block to check visibility for.</param>
    /// <param name="member">The member whose access is being checked. Can be null if not logged in.</param>
    /// <returns>A task that represents the asynchronous operation. The task result contains a boolean indicating whether the member can view the block.</returns>
    public async Task<bool> MemberCanViewBlock(BlockGridItem block, MemberIdentityUser? member)
    {
        try
        {
            // if property doesn't exist, then the block is visible to all
            if (!block.Content.HasProperty(VisibleToAll)) return true;

            bool blockVisibleToAll = block.Content.Value<bool>(VisibleToAll);

            // Check if the block is visible to all without needing to check member-specific access.
            if (blockVisibleToAll) return true;

            if (member == null || !block.Content.HasValue(GatedMemberGroups)) return false;
            string cacheKey = _cacheKeyProvider.GetCacheKey(typeof(BlockGridItem), block.ContentUdi, typeof(MemberIdentityUser), member.Id ?? AnonymousUserName, GatedMemberGroups);

            // Attempt to retrieve the block's visibility for the member from the cache.
            bool? memberCanViewBlockCacheResult = _appCaches.RuntimeCache.GetCacheItem<bool?>(cacheKey);
            if (memberCanViewBlockCacheResult.HasValue)
            {
                // Cache hit, refresh the cached value and return the cached result.
                _appCaches.RuntimeCache.InsertCacheItem(cacheKey, () => memberCanViewBlockCacheResult.HasValue, TimeSpan.FromMinutes(VisibleToMemberSlidingWindow));
                return memberCanViewBlockCacheResult.Value;
            }

            // Cache miss; determine access based on authorized member groups.
            List<string> authorizedMemberGroups = [.. block.Content.Value<string>(GatedMemberGroups).Split(CommaSeparator, StringSplitOptions.RemoveEmptyEntries)];

            bool canView = await MemberIsInAuthorizedGroup(authorizedMemberGroups, member);

            // Cache the result of this check for future requests.
            _appCaches.RuntimeCache.InsertCacheItem(cacheKey, () => canView, TimeSpan.FromMinutes(VisibleToMemberSlidingWindow));

            return canView;

            // If there are no specific member groups associated with the block, or the member is null, default to false.
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while checking if a member can view a block. Block Content Udi: {ContentUdi}, Member ID: {MemberId}", block.ContentUdi, member?.Id ?? AnonymousUserName);
            throw new GatedContentException("An error occurred while checking if a member can view a block.", ex);
        }
    }
}