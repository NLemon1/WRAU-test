using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PublishedCache;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Commerce.Common.Logging;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Models;

namespace WRA.Umbraco.Repositories;

public class CompanyRepository(
    IContentService contentService,
    ILogger<CompanyRepository> logger,
    ICoreScopeProvider coreScopeProvider,
    IUmbracoContextFactory umbracoContextFactory
    )
{
    public IPublishedContent? Get(Guid? externalCompanyId)
    {
        if (externalCompanyId == null || externalCompanyId == Guid.Empty)
        {
            return null;
        }

        using var scope = coreScopeProvider.CreateCoreScope();
        using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
        var contentCache = umbracoContextReference.UmbracoContext.Content;
        var siteRoot = contentCache.GetAtRoot();

        var companies = siteRoot.FirstOrDefault(x =>
                x.ContentType.Alias == Companies.ModelTypeAlias)?
            .Children
            .Where(x => x.ContentType.Alias == Company.ModelTypeAlias);

        var company = companies?.FirstOrDefault(x =>
            x.Value<string>(GlobalAliases.ExternalId)!.Equals(externalCompanyId.ToString()));

        scope.Complete();
        return company;
    }

    public IContent Create(CompanyDto companyDto)
    {
        try
        {
            using var scope = coreScopeProvider.CreateCoreScope();

            using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
            var contentCache = umbracoContextReference.UmbracoContext.Content;

            var siteRoot = contentCache?.GetAtRoot().FirstOrDefault();
            var companiesContainer = siteRoot?.Children
                .FirstOrDefault(x => x.ContentType.Alias == Companies.ModelTypeAlias);

            var externalId = Guid.Parse(companyDto.ExternalId);
            var existingCompany = Get(externalId);
            if (existingCompany != null)
            {
                // update the company
                var existingCompanyContent = contentService.GetById(existingCompany.Id);
                SetCompanyProperties(existingCompanyContent!, companyDto);
                contentService.SaveAndPublish(existingCompanyContent);
                scope.Complete();
                return existingCompanyContent;
            }

            logger.Info("Creating company: {name} - {ExternalId}",
                companyDto.name, companyDto.ExternalId);
            if (string.IsNullOrEmpty(companyDto?.name) || string.IsNullOrEmpty(companyDto?.ExternalId))
            {
                logger.Error("Company name or externalId is null. Cannot create company.");
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
            logger.Error("Error creating company ({name} - {ExternalId}) -> {Message}",
                companyDto.name, companyDto.ExternalId, ex.Message);
            throw;
        }
    }

    private IContent SetCompanyProperties(IContent company, CompanyDto companyDto)
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