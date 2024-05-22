using Hangfire;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using WRA.Umbraco.Dtos;
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

    [DisableConcurrentExecution(10)]
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
            if (companiesContainerType == null) return null;

            var companiesContainer = contentCache.GetByContentType(companiesContainerType)?.FirstOrDefault();
            var newCompany = contentService.Create(companyDto.name, companiesContainer.Id, Company.ModelTypeAlias);

            SetCompanyProperties(newCompany, companyDto);
            contentService.SaveAndPublish(newCompany);
            scope.Complete();
            return newCompany;
        }
        catch (System.Exception ex)
        {
            logger.LogError(
                ex,
                message: "Error creating company ({Name} - {ExternalId}) -> {Message}",
                companyDto.name, companyDto.ExternalId, ex.Message);
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
            logger.LogError(e,"Error deleting company with externalId {ExternalId}", companyDto.ExternalId);
            throw;
        }
    }

    public OperationResult? Delete(Guid externalId)
    {
        try
        {
            using var scope = coreScopeProvider.CreateCoreScope();
            var existingCompany = GetByExternalId(externalId);
            var contentToDelete = contentService.GetById(existingCompany.Id);
            return contentService.Delete(contentToDelete);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }

    }

    private IContent SetCompanyProperties(IContent company, ExternalCompanyDto companyDto)
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

        return company;

        // public async Task<IMember> GetMember(string email)
        // {
        //     return _searchService.get(email);
        // }
    }
}