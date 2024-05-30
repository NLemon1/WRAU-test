using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Mapping;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common.Controllers;
using WRA.Umbraco.Helpers.Constants;
using WRA.Umbraco.Models;
using WRA.Umbraco.Web.Dtos.Member;
using WRA.Umbraco.Web.Dtos.MyWRA;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Web.Controllers.MyWRA;

public class MyWraProfileController(
    ILogger<RenderController> logger,
    ICompositeViewEngine compositeViewEngine,
    IUmbracoContextAccessor umbracoContextAccessor,
    IMemberManager memberManager,
    IPublishedValueFallback publishedValueFallback,
    IUmbracoMapper mapper,
    MemberDonationService memberDonationService,
    MemberMarketingSubscriptionService memberMarketingSubscriptionService,
    MemberCommitteesService memberCommitteesService)
    : RenderController(logger, compositeViewEngine, umbracoContextAccessor)
{

public override IActionResult Index()
    {
        var currentMember = memberManager.GetCurrentMemberAsync().GetAwaiter().GetResult();
        if (currentMember != null)
        {
            var member = memberManager.AsPublishedMember(currentMember);
            MywraProfile viewModel = new(CurrentPage!, publishedValueFallback);
            var roles = memberManager.GetRolesAsync(currentMember).GetAwaiter().GetResult();
            if (roles.Any(r => r.Equals("WRA Member", StringComparison.OrdinalIgnoreCase) || r.Equals("WRA Member - Designated REALTOR", StringComparison.OrdinalIgnoreCase)))
            {
                viewModel.IsMember = true;
                var externalId = member.Value(GlobalConstants.ExternalId)?.ToString() ?? string.Empty;

                viewModel.MemberDonations = memberDonationService.GetMemberDonations(externalId).GetAwaiter().GetResult();
                var preferences = GetMemberMarketingSubscriptions(externalId);
                viewModel.MagazinePreferences = preferences.MagazinePreferences;
                viewModel.EmailPreferences = preferences.EmailPreferences;

                viewModel.MemberCommittees = GetMemberCommittees(externalId);
            }

            // set editable member
            viewModel.EditableMember = mapper.Map<EditMemberDto>(member);
            return CurrentTemplate(viewModel);
        }
        else
        {
            return Redirect("/login");
        }
    }

private MemberMarketingSubscriptionPreferencesDto GetMemberMarketingSubscriptions(string externalId)
    {
        var results = new MemberMarketingSubscriptionPreferencesDto();
        results.MemberID = externalId;
        results.MagazinePreferences = new List<MemberMarketingSubscriptionPreferenceDto>();
        results.EmailPreferences = new List<MemberMarketingSubscriptionPreferenceDto>();
        var marketingSubscriptions = memberMarketingSubscriptionService.GetMemberMarketingSubscriptions(externalId).GetAwaiter().GetResult();
        if (marketingSubscriptions != null && marketingSubscriptions.Any())
        {
            foreach(var subscription in marketingSubscriptions)
            {
                var marketingSubscription = new MemberMarketingSubscriptionPreferenceDto();
                marketingSubscription.IsActive = subscription.IsActive;
                marketingSubscription.SubscriptionID = subscription.ID;
                marketingSubscription.Description = subscription.Description;
                marketingSubscription.PreviousValue = subscription.IsActive;
                marketingSubscription.SubscriptionName = subscription.Name;
                if (subscription.SourceSystem == "Hubspot")
                {
                    results.EmailPreferences.Add(marketingSubscription);
                }
                else
                {
                    results.MagazinePreferences.Add(marketingSubscription);
                }

            }
        }
        return results;

    }

private List<MemberCommitteeDto> GetMemberCommittees(string externalId)
    {
        var results = new List<MemberCommitteeDto>();
        var memberCommittees = memberCommitteesService.GetMemberCommittees(externalId).GetAwaiter().GetResult();
        if (memberCommittees != null && memberCommittees.Any())
        {
            foreach (var committee in memberCommittees)
            {
                foreach (var position in committee.CommitteeTerms)
                {
                    var committeePosition = new MemberCommitteeDto();
                    committeePosition.FromYear = position.CommitteeTerm.Split('-').First();
                    committeePosition.ToYear = position.CommitteeTerm.Split('-').Last();
                    committeePosition.Name = committee.CommitteeName;
                    committeePosition.Title = position.PositionName;
                    results.Add(committeePosition);
                }
            }
        }
        results = results.OrderByDescending(x => x.ToYear).ToList();
        return results;
    }
}

