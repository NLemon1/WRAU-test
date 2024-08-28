using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PublishedCache;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using WRA.Umbraco.Exceptions;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Helpers.Constants;
using WRA.Umbraco.Models;
using WRA.Umbraco.Web.Dtos.External;

namespace WRA.Umbraco.Helpers;

public class DesignationRepository
{
    private readonly IContentService _contentService;
    private readonly ICoreScopeProvider _coreScopeProvider;
    private readonly IUmbracoContextFactory _umbracoContextFactory;
    private readonly ILogger _logger;

    public DesignationRepository(
        IContentService contentService,
        ICoreScopeProvider coreScopeProvider,
        IUmbracoContextFactory umbracoContextFactory,
        ILogger logger)
    {
        _contentService = contentService;
        _coreScopeProvider = coreScopeProvider;
        _umbracoContextFactory = umbracoContextFactory;
        _logger = logger.ForContext<DesignationRepository>();
    }

    public IContent? CreateOrUpdateDesignation(ExternalDesignationDto externalDesignation)
    {
        using var activity = _logger.StartActivity(LogEventLevel.Information, "Umbraco Repository - {Repository}:{Method}", nameof(DesignationRepository), nameof(CreateOrUpdateDesignation));

        if (string.IsNullOrEmpty(externalDesignation.DesignationCode) || string.IsNullOrEmpty(externalDesignation.Name))
        {
            _logger.Warning("Designation code and name are required when creating or updating a designation.");
            activity.Complete(LogEventLevel.Warning);
            return null;
        }

        using var scope = _coreScopeProvider.CreateCoreScope();
        try
        {
            var existingDesignation = GetExistingDesignation(externalDesignation.Id);

            IContent? designation = existingDesignation != null
                ? UpdateDesignation(existingDesignation, externalDesignation)
                : CreateDesignation(externalDesignation);

            if (designation != null)
            {
                scope.Complete();
                activity.Complete();
            }
            else
            {
                _logger.Warning("Failed to create or update designation.");
                activity.Complete(LogEventLevel.Warning);
            }

            return designation;
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "An error occurred while creating or updating a designation.");
            activity.Complete(LogEventLevel.Error, ex);
            throw new UmbracoRepositoryException("An error occurred while creating or updating a designation.", ex);
        }
    }

    public IEnumerable<Designation> GetAllDesignations()
    {
        using var activity = _logger.StartActivity(LogEventLevel.Information, "Umbraco Repository - {Repository}:{Method}", nameof(DesignationRepository), nameof(GetAllDesignations));

        using var scope = _coreScopeProvider.CreateCoreScope();
        try
        {
            var designations = GetDesignationsInternal();

            scope.Complete();
            activity.Complete();

            return designations;
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "An error occurred while retrieving all designations.");
            throw new UmbracoRepositoryException($"An error occurred while retrieving all designations from {nameof(DesignationRepository)}", ex);
        }
    }

    public bool DeleteDesignation(Guid externalId)
    {
        using var activity = _logger.StartActivity(LogEventLevel.Information, "Umbraco Repository - {Repository}:{Method}", nameof(DesignationRepository), nameof(DeleteDesignation));
        using var scope = _coreScopeProvider.CreateCoreScope();
        try
        {
            var existingDesignation = GetExistingDesignationAsIContent(externalId);
            if (existingDesignation == null)
            {
                _logger.Warning("Designation with external ID {ExternalId} not found for deletion.", externalId);
                return false;
            }

            var result = _contentService.Delete(existingDesignation);
            if (result.Success)
            {
                _logger.Information("Deleted designation with external ID: {ExternalId}", externalId);
                scope.Complete();
                activity.Complete();
                return true;
            }
            else
            {
                _logger.Warning("Failed to delete designation with external ID: {ExternalId}. Reason: {Reason}", externalId, result.Result);
                return false;
            }
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "An error occurred while deleting designation with external ID: {ExternalId}", externalId);
            throw new UmbracoRepositoryException($"An error occurred while deleting designation with external ID: {externalId}", ex);
        }
    }

    private IPublishedContent? GetDesignationsContainer()
    {
        var publishedSnapshot = GetPublishedSnapshot();
        if (publishedSnapshot?.Content == null) return null;

        var designationsContentType = publishedSnapshot.Content.GetContentType(Designations.ModelTypeAlias);
        if (designationsContentType == null)
        {
            _logger.Warning("Designations content type not found.");
            return null;
        }

        var designationsContainer = publishedSnapshot.Content
            .GetByContentType(designationsContentType)
            .FirstOrDefault();

        if (designationsContainer == null)
        {
            _logger.Warning("Designations container not found.");
        }

        return designationsContainer;
    }

    private IEnumerable<Designation> GetDesignationsInternal()
    {
        var designationsContainer = GetDesignationsContainer();
        if (designationsContainer == null)
        {
            _logger.Warning("Designations container not found.");
            return Enumerable.Empty<Designation>();
        }

        var designations = designationsContainer.Children<Designation>()?.ToList() ?? [];
        _logger.Debug("Retrieved {Count} designations.", designations.Count);

        return designations;
    }

    private IPublishedSnapshot? GetPublishedSnapshot()
    {
        using var umbracoContextReference = _umbracoContextFactory.EnsureUmbracoContext();
        var publishedSnapshot = umbracoContextReference.UmbracoContext.PublishedSnapshot;

        if (publishedSnapshot == null)
        {
            _logger.Warning("Published snapshot not available.");
        }

        return publishedSnapshot;
    }

    private IContent? GetExistingDesignationAsIContent(Guid externalId)
    {
        var publishedDesignation = GetExistingDesignation(externalId);
        if (publishedDesignation == null) return null;

        return _contentService.GetById(publishedDesignation.Id);
    }

    private IPublishedContent? GetExistingDesignation(Guid externalId)
    {
        var publishedSnapshot = GetPublishedSnapshot();
        if (publishedSnapshot?.Content == null) return null;

        var contentType = publishedSnapshot.Content.GetContentType(Designation.ModelTypeAlias);
        if (contentType == null)
        {
            _logger.Warning("Failed to retrieve content type for {Type}", nameof(Designation));
            return null;
        }

        return publishedSnapshot.Content
            .GetByContentType(contentType)
            .FirstOrDefault(d => d.Value<Guid>(GlobalConstants.ExternalId).Equals(externalId));
    }

    private IContent CreateDesignation(ExternalDesignationDto externalDesignation)
    {
        var designationsContainer = GetDesignationsContainer();
        if (designationsContainer == null)
        {
            throw new UmbracoRepositoryException("Designations container not found when creating a designation.");
        }

        if (string.IsNullOrEmpty(externalDesignation.Name))
        {
            throw new UmbracoRepositoryException("Designation Name is required to sync over a designation.");
        }

        var designation = _contentService.Create(externalDesignation.Name, designationsContainer.Id, Designation.ModelTypeAlias);
        UpdateDesignationProperties(designation, externalDesignation);
        _contentService.SaveAndPublish(designation);

        _logger.Information("Created new designation: {DesignationCode}", externalDesignation.DesignationCode);
        return designation;

    }

    private IContent UpdateDesignation(IPublishedContent existingDesignation, ExternalDesignationDto externalDesignation)
    {
        var designation = _contentService.GetById(existingDesignation.Id);
        if (designation == null)
        {
            throw new UmbracoRepositoryException($"Unable to retrieve content for updating. ID: {existingDesignation.Id}");
        }

        if (string.IsNullOrEmpty(externalDesignation.DesignationCode) || string.IsNullOrEmpty(externalDesignation.Name))
        {
            throw new UmbracoRepositoryException("Designation code and name are required when creating or updating a designation.");
        }

        UpdateDesignationProperties(designation, externalDesignation);
        _contentService.SaveAndPublish(designation);

        _logger.Information("Updated designation: {DesignationCode}", externalDesignation.DesignationCode);
        return designation;
    }

    private void UpdateDesignationProperties(IContent designation, ExternalDesignationDto externalDesignation)
    {
        designation.SetValue(GlobalConstants.ExternalId, externalDesignation.Id);
        designation.SetValue(nameof(Designation.Code).ToCamelCase(), externalDesignation.DesignationCode);
        designation.SetValue(nameof(Designation.Text).ToCamelCase(), externalDesignation.DesignationText);
        designation.SetValue(nameof(Designation.Title).ToCamelCase(), externalDesignation.Name);
        designation.SetValue(nameof(Designation.Description).ToCamelCase(), externalDesignation.Description);
        designation.SetValue(nameof(Designation.LongDescription).ToCamelCase(), externalDesignation.LongDescription);
    }
}