using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PublishedCache;
using Umbraco.Cms.Core.Services;
using Umbraco.Commerce.Common.Logging;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Models;

namespace WRA.Umbraco.Repositories;

public class CompanyRepository(
    IContentService contentService,
    ILogger<CompanyRepository> logger)
{
    public IPublishedContent? GetCompany(Guid? companyId, IPublishedCache? contentCache)
    {
        if (companyId == null || contentCache == null || companyId == Guid.Empty)
        {
            return null;
        }
        // IPublishedContent? siteRoot;
        var siteRoot = contentCache.GetAtRoot();
        var companies = siteRoot?.FirstOrDefault(x => x.ContentType.Alias == Companies.ModelTypeAlias)?
            .Children
            .Where(x => x.ContentType.Alias == Company.ModelTypeAlias);

        var company = companies?.FirstOrDefault(x => 
            x.Value<string>("externalId")!.Equals(companyId.ToString()));

        return company;
    }
    public IContent Create(CompanyDto companyDto, IPublishedCache? contentCache)
    {
        try
        {
            var siteRoot = contentCache?.GetAtRoot().FirstOrDefault();
            var companiesContainer = siteRoot?.Children
                .FirstOrDefault(x => x.ContentType.Alias == Companies.ModelTypeAlias);
            
            var externalId = Guid.Parse(companyDto.ExternalId);
            var existingCompany = GetCompany(externalId, contentCache);
            if (existingCompany != null)
            {
                // update the company
                var existingCompanyContent = contentService.GetById(existingCompany.Id);
                SetCompanyProperties(existingCompanyContent!, companyDto);
                contentService.SaveAndPublish(existingCompanyContent);
                return existingCompanyContent;
                // _contentService.SaveAndPublish(existingCompany);

            }
            logger.Info("Creating company: {name} - {ExternalId}", 
                companyDto.name, companyDto.ExternalId);
            if (string.IsNullOrEmpty(companyDto?.name) || string.IsNullOrEmpty(companyDto?.ExternalId))
            {
                logger.Error("Company name or externalId is null. Cannot create company.");
                return null;
            }

            var newCompany = contentService.Create(companyDto.name, companiesContainer.Id, Company.ModelTypeAlias);

            SetCompanyProperties(newCompany, companyDto);
            contentService.SaveAndPublish(newCompany);
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
        company.SetValue("externalId", companyDto.ExternalId);
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