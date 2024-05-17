using Umbraco.Cms.Core.Mapping;
using WRA.Umbraco.CustomTables.Subscriptions;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Repositories;
using WRA.Umbraco.Web.Dtos;
using WRA.Umbraco.Web.Dtos.External;
using WRA.Umbraco.Web.Dtos.WraExternal;

namespace WRA.Umbraco.Mapping;

public class SubscriptionMapping(
    ProductPageRepository productPageRepository,
    MemberRepository memberRepository,
    CompanyRepository companyRepository)
    : IMapDefinition
{
    public void DefineMaps(IUmbracoMapper mapper)
    {
        // Dtos
        mapper.Define<ExternalMemberSubscriptionDto, MemberSubscription>((_, _) => new MemberSubscription(), DtoToMemberSubscription);
        mapper.Define<ExternalCompanySubscriptionDto, CompanySubscription>((_, _) => new CompanySubscription(), DtoToCompanySubscription);
    }

    private void DtoToCompanySubscription(ExternalCompanySubscriptionDto source, CompanySubscription target, MapperContext _)
    {
        target.CompanyId = companyRepository.GetByExternalId(source.CompanyId).Id;
        target.ProductId = productPageRepository.GetBySku(source.ProductSku).Id;
        target.ExternalId = source.Id.SafeGuid();
        target.BeginDate = source.BeginDate;
        target.PaidThruDate = source.PaidThru;
        target.IsActive = source.Status == "A";
    }

    private void DtoToMemberSubscription(ExternalMemberSubscriptionDto source, MemberSubscription target, MapperContext _)
    {
        target.MemberId = memberRepository.GetByExternalId(source.MemberId)?.Id ?? 0;
        target.ProductId = productPageRepository.GetBySku(source.ProductSku)?.Id ?? 0;
        target.ExternalId = source.Id.SafeGuid();
        target.BeginDate = source.BeginDate;
        target.PaidThruDate = source.PaidThru;
        target.IsActive = source.Status == "A";
    }



}