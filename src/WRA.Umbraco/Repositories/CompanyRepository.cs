using Hangfire;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using WRA.Umbraco.Dtos;
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
                c.Value<Guid>(GlobalAliases.ExternalId).Equals(externalCompanyId));

            return company;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error getting company by external id: {Id}", externalCompanyId);
            throw;
        }
    }

    [DisableConcurrentExecution(10)]
    public IContent? CreateOrUpdate(ExternalCompanyDto companyDto)
    {
        try
        {
            using var scope = coreScopeProvider.CreateCoreScope();

            using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
            var contentCache = umbracoContextReference.UmbracoContext.Content;

            var companiesPageType = contentCache.GetContentType(Companies.ModelTypeAlias);
            contentCache.GetByContentType(companiesPageType);
            var siteRoot = contentCache?.GetAtRoot().FirstOrDefault();
            var companiesContainer = siteRoot?.Children
                .FirstOrDefault(x => x.ContentType.Alias == Companies.ModelTypeAlias);

            var externalId = Guid.Parse(companyDto.ExternalId);
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

            logger.LogInformation("Creating company: {name} - {ExternalId}",
                companyDto.name, companyDto.ExternalId);
            if (string.IsNullOrEmpty(companyDto?.name) || string.IsNullOrEmpty(companyDto?.ExternalId))
            {
                logger.LogError("Company name or externalId is null. Cannot create company.");
                scope.Complete();
                return null;
            }

            if (companiesContainer == null)
            {
                logger.LogInformation("Companies container not found. Cannot create company.");
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
            logger.LogError(
                ex,
                message: "Error creating company ({Name} - {ExternalId}) -> {Message}",
                companyDto.name, companyDto.ExternalId, ex.Message);
            throw;
        }
    }

    private IContent SetCompanyProperties(IContent company, ExternalCompanyDto companyDto)
    {
        company.SetValue(GlobalAliases.ExternalId, companyDto.ExternalId);
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