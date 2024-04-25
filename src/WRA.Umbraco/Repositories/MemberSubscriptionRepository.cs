using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Mapping;
using Umbraco.Cms.Infrastructure.Scoping;
using WRA.Umbraco.CustomTables;
using WRA.Umbraco.Web.Dtos;

namespace WRA.Umbraco.Repositories;

public class MemberSubscriptionRepository(
    IScopeProvider scopeProvider,
    IUmbracoMapper mapper,
    ILogger<MemberSubscriptionRepository> logger)
{
    public IEnumerable<MemberSubscription> Get(int memberId)
    {
        using var scope = scopeProvider.CreateScope();
        var queryResults = scope.Database.Fetch<MemberSubscription>(
            MemberSubscriptionQueries.GetById(memberId));
        scope.Complete();
        return queryResults;
    }

 public IEnumerable<MemberSubscription> getActiveSubscriptions(int memberId)
    {
        using var scope = scopeProvider.CreateScope();
        var queryResults = scope.Database.Fetch<MemberSubscription>(
            MemberSubscriptionQueries.GetActiveSubscriptionsForMember(memberId));
        scope.Complete();
        return queryResults;
    }

    private void Insert(MemberSubscription subscription)
    {
        using var scope = scopeProvider.CreateScope();
        scope.Database.Insert(subscription);
        scope.Complete();
    }

    public void Create(MemberSubscriptionDto subscriptionDto)
    {
        try
        {
            using var scope = scopeProvider.CreateScope();
            var subscription = mapper.Map<MemberSubscription>(subscriptionDto);
            if (subscription != null) Insert(subscription);
        }
        catch (Exception e)
        {
            logger.LogInformation(e, "Error creating subscription for member {MemberId}", subscriptionDto.MemberId);
            throw;
        }
    }
}