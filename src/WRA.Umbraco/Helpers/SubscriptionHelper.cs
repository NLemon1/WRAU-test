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
    ILogger<SubscriptionHelper> logger)
{
    public bool CreateOrUpdateMemberSubscription(MemberSubscription memberSubscription)
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
                return true;
            }

            memberSubscriptionRepository.Create(memberSubscription);
            logger.LogInformation("Created member subscription: {MemberSubscriptionId}", memberSubscription.Id);
            return true;

        }
        catch (Exception e)
        {
            logger.LogError(e, "Error creating member subscription");
            throw;
        }
    }

    public OperationResult? DeleteMemberSubscription(Guid Id)
    {
        var existingMemberSubscription = memberSubscriptionRepository
            .GetQueryable()
            .FirstOrDefault(x => x.ExternalId == Id);

        return DeleteMemberSubscription(existingMemberSubscription);
    }

    public OperationResult? DeleteMemberSubscription(MemberSubscription memberSubscription)
    {
        try
        {
             var deleteResult = memberSubscriptionRepository.Delete(memberSubscription);
             if (!deleteResult.Success)
             {
                    logger.LogError("Error deleting member subscription: {MemberSubscriptionId}", memberSubscription.Id);
                    return deleteResult;
             }

             logger.LogInformation("Deleted member subscription: {MemberSubscriptionId}", memberSubscription.Id);
             return deleteResult;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error deleting member subscription");
            throw;
        }
    }

    public bool CreateOrUpdateCompanySubscription(CompanySubscription companySubscription)
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
                return true;
            }

            companySubscriptionRepository.Create(companySubscription);
            logger.LogInformation("Created company subscription: {CompanySubscriptionId}", companySubscription.Id);
            return true;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error creating company subscription");
            throw;
        }
    }

    public OperationResult? DeleteCompanySubscription(Guid Id)
    {
        var existingCompany = companySubscriptionRepository
            .GetQueryable()
            .FirstOrDefault(x => x.ExternalId == Id);

        return DeleteCompanySubscription(existingCompany);
    }

    public OperationResult? DeleteCompanySubscription(CompanySubscription companySubscription)
    {
        try
        {
            var deleteResult = companySubscriptionRepository.Delete(companySubscription);
            if (!deleteResult.Success)
            {
                logger.LogError("Error deleting company subscription: {CompanySubscriptionId}", companySubscription.Id);
                return deleteResult;
            }
            logger.LogInformation("Deleted company subscription: {CompanySubscriptionId}", companySubscription.Id);
            return deleteResult;

        }
        catch (Exception e)
        {
            logger.LogError(e, "Error deleting company subscription");
            throw;
        }
    }

    // public ExternalCompanySubscriptionDto GetCompanySubscription(int companyId)
    // {
    //     var company = contentService.GetById(companyId);
    // }
}
