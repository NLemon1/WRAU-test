using Umbraco.Cms.Core.Mapping;
using WRA.Umbraco.CustomTables;
using WRA.Umbraco.Repositories;
using WRA.Umbraco.Web.Dtos;

namespace WRA.Umbraco.Mapping;

public class SubscriptionMapping(
    ProductPageRepository productPageRepository,
    MemberRepository memberRepository)
    : IMapDefinition
{
    public void DefineMaps(IUmbracoMapper mapper)
    {
        // Dtos
        mapper.Define<MemberSubscriptionDto, MemberSubscription>((_, _) => new MemberSubscription(), DtoToSubscription);
    }

    private void DtoToSubscription(MemberSubscriptionDto source, MemberSubscription target, MapperContext _)
    {
        target.MemberId = memberRepository.GetByExternalId(source.MemberId).Id;
        target.ProductId = productPageRepository.GetByExternalId(source.ProductId).Id;
        target.BeginDate = source.BeginDate;
        target.PaidThruDate = source.PaidThru;
        target.IsActive = source.Status == "A";
    }



}