using Hangfire;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Helpers.Constants;
using WRA.Umbraco.Models;
using WRA.Umbraco.Web.Dtos.External;

namespace WRA.Umbraco.Repositories;

public class CompanyRepository(
    IContentService contentService,
    ILogger<CompanyRepository> logger,
    ICoreScopeProvider coreScopeProvider,
    IUmbracoContextFactory umbracoContextFactory
    )
{
    public IPublishedContent? GetByExternalId(Guid? externalCompanyId)
    {
        try
        {
            using var scope = coreScopeProvider.CreateCoreScope(autoComplete: true);
            if (externalCompanyId == null || externalCompanyId == Guid.Empty)
            {
                return null;
            }

            using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
            var contentCache = umbracoContextReference.UmbracoContext.Content;

            var companyType = contentCache.GetContentType(Company.ModelTypeAlias);
            if (companyType == null) return null;
            var companies = contentCache.GetByContentType(companyType);
            var company = companies.FirstOrDefault(c =>
                c.Value<Guid>(GlobalConstants.ExternalId).Equals(externalCompanyId));

            return company;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error getting company by external id: {Id}", externalCompanyId);
            throw;
        }
    }

    public IPublishedContent? GetByID(Guid? companyKey)
    {
        try
        {
            using var scope = coreScopeProvider.CreateCoreScope(autoComplete: true);
            if (companyKey == null || companyKey == Guid.Empty)
            {
                return null;
            }

            using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
            var contentCache = umbracoContextReference.UmbracoContext.Content;
            var companyContent = contentCache.GetById(companyKey.Value);

            return companyContent;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error getting company by key: {Key}", companyKey);
            throw;
        }
    }

    [AutomaticRetry(Attempts = 0, OnAttemptsExceeded = AttemptsExceededAction.Fail)]
    public IContent? CreateOrUpdate(ExternalCompanyDto companyDto)
    {
        try
        {
            using var scope = coreScopeProvider.CreateCoreScope();

            var externalId = companyDto.ExternalId.SafeGuid();
            var existingCompany = GetByExternalId(externalId);
            if (existingCompany != null)
            {
                // update the company
                var existingCompanyContent = contentService.GetById(existingCompany.Id);
                SetCompanyProperties(existingCompanyContent!, companyDto);
                if (existingCompanyContent == null)
                {
                    scope.Complete();
                    return null;
                }

                contentService.SaveAndPublish(existingCompanyContent);
                scope.Complete();
                return existingCompanyContent;
            }

            if (string.IsNullOrEmpty(companyDto.name) || string.IsNullOrEmpty(companyDto.ExternalId))
            {
                logger.LogError("Company name or externalId is null. Cannot create company.");
                scope.Complete();
                return null;
            }

            using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
            var contentCache = umbracoContextReference.UmbracoContext.Content;
            var companiesContainerType = contentCache.GetContentType(Companies.ModelTypeAlias);
            if (companiesContainerType == null)
            {
                scope.Complete();
                return null;
            }

            var companiesContainer = contentCache.GetByContentType(companiesContainerType)?.FirstOrDefault();
            if (companiesContainer == null)
            {
                scope.Complete();
                return null;
            }

            var newCompany = contentService.Create(companyDto.name, companiesContainer.Id, Company.ModelTypeAlias);

            SetCompanyProperties(newCompany, companyDto);
            contentService.SaveAndPublish(newCompany);
            scope.Complete();
            return newCompany;
        }
        catch (System.Exception ex)
        {
            logger.LogError(ex, message: "Error creating company ({Name} - {ExternalId}) -> {Message}", companyDto.name, companyDto.ExternalId, ex.Message);
            throw;
        }
    }

    public OperationResult? Delete(ExternalCompanyDto companyDto)
    {
        try
        {
            var externalId = companyDto.ExternalId.SafeGuid();
            return Delete(externalId);
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error deleting company with externalId {ExternalId}", companyDto.ExternalId);
            throw;
        }
    }

    public OperationResult? Delete(Guid externalId)
    {
        try
        {
            using var scope = coreScopeProvider.CreateCoreScope();
            if (externalId == Guid.Empty)
            {
                scope.Complete();
                logger.LogInformation("ExternalId is empty. Cannot delete company.");
                return null;
            }

            var existingCompany = GetByExternalId(externalId);
            var contentToDelete = contentService.GetById(existingCompany.Id);
            if (contentToDelete == null)
            {
                scope.Complete();
                return null;
            }

            var deleteResult = contentService.Delete(contentToDelete);
            scope.Complete();
            logger.LogInformation("Deleting company with externalId {ExternalId}", externalId);
            return deleteResult;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error deleting company with externalId {ExternalId}", externalId);
            throw;
        }
    }

    private static void SetCompanyProperties(IContent company, ExternalCompanyDto companyDto)
    {
        company.SetValue(GlobalConstants.ExternalId, companyDto.ExternalId);
        company.SetValue("organizationCode", companyDto.organizationCode);
        company.SetValue("memberTypeId", companyDto.memberTypeId.ToString());
        company.SetValue("companyCategory", companyDto.category);
        company.SetValue("status", companyDto.status);
        company.SetValue("address", companyDto.address);
        company.SetValue("city", companyDto.city);
        company.SetValue("state", companyDto.state);
        company.SetValue("zip", companyDto.zip);
        company.SetValue("email", companyDto.email);
        company.SetValue("websiteUrl", companyDto.websiteUrl);

        // public async Task<IMember> GetMember(string email)
        // {
        //     return _searchService.get(email);
        // }
    }
}