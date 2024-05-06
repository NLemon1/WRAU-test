using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Services;
using WRA.Umbraco.CustomTables.Subscriptions;
using WRA.Umbraco.Repositories;
using WRA.Umbraco.Web.Dtos;
using WRA.Umbraco.Web.Dtos.External;
using WRA.Umbraco.Web.Dtos.WraExternal;

namespace WRA.Umbraco.Helpers;

public class SubscriptionHelper(
    IRepository<MemberSubscription> memberSubscriptionRepository,
    IRepository<CompanySubscription> companySubscriptionRepository,
    CompanyRepository companyRepository,
    IContentService contentService,
    ILogger<SubscriptionHelper> logger)
{
    public void CreateOrUpdateMemberSubscription(MemberSubscription memberSubscription)
    {
        try
        {
            bool subscriptionExists = memberSubscriptionRepository
                .GetQueryable().Any(x => x.ExternalId == memberSubscription.ExternalId);

            if (subscriptionExists)
            {
                var existingSub = memberSubscriptionRepository.GetQueryable()
                    .FirstOrDefault(x => x.ExternalId == memberSubscription.ExternalId);
                memberSubscription.Id = existingSub.Id;
                memberSubscriptionRepository.Update(memberSubscription);
                logger.LogInformation("Updated member subscription: {MemberSubscriptionId}", memberSubscription.Id);
            }

            memberSubscriptionRepository.Create(memberSubscription);
            logger.LogInformation("Created member subscription: {MemberSubscriptionId}", memberSubscription.Id);

        }
        catch (Exception e)
        {
            logger.LogError(e, "Error creating member subscription");
            throw;
        }
    }

    public void CreateOrUpdateCompanySubscription(CompanySubscription companySubscription)
    {
        try
        {

            bool subscriptionExists = companySubscriptionRepository
                .GetQueryable().Any(x => x.ExternalId == companySubscription.ExternalId);

            if (subscriptionExists)
            {
                var existingSub = companySubscriptionRepository.GetQueryable()
                    .FirstOrDefault(x => x.ExternalId == companySubscription.ExternalId);

                companySubscription.Id = existingSub.Id;
                companySubscriptionRepository.Update(companySubscription);
                logger.LogInformation("Updated company subscription: {CompanySubscriptionId}", companySubscription.Id);
            }

            companySubscriptionRepository.Create(companySubscription);
            logger.LogInformation("Created company subscription: {CompanySubscriptionId}", companySubscription.Id);
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error creating company subscription");
            throw;
        }
    }

    // public ExternalCompanySubscriptionDto GetCompanySubscription(int companyId)
    // {
    //     var company = contentService.GetById(companyId);
    // }
}
