using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common.Controllers;
using Umbraco.Cms.Web.Common.Security;
using WRA.Umbraco.Helpers.Constants;
using WRA.Umbraco.Models;
using WRA.Umbraco.Web.Dtos.External;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Web.Controllers.MyWRA;
public class MyWraProfileController : RenderController
{
    private readonly IMemberManager _memberManager;
    private readonly IPublishedValueFallback _publishedValueFallback;
    private readonly MemberDonationService _memberDonationService;
    public MyWraProfileController(
        ILogger<RenderController> logger,
        ICompositeViewEngine compositeViewEngine,
        IUmbracoContextAccessor umbracoContextAccessor,
        IMemberManager memberManager,
        IPublishedValueFallback publishedValueFallback,
        MemberDonationService memberDonationService)
        : base(logger, compositeViewEngine, umbracoContextAccessor)
    {
        _memberManager = memberManager;
        _publishedValueFallback = publishedValueFallback;
        _memberDonationService = memberDonationService;
    }

    public override IActionResult Index()
    {
        MemberIdentityUser? currentMember = _memberManager.GetCurrentMemberAsync().GetAwaiter().GetResult();
        if (currentMember != null)
        {
            MywraProfile viewModel = new(CurrentPage!, _publishedValueFallback);
            var roles = _memberManager.GetRolesAsync(currentMember).GetAwaiter().GetResult();
            if (roles.Any(r => r.Equals("WRA Member", StringComparison.OrdinalIgnoreCase)))
            {
                viewModel.IsMember = true;
                var member = _memberManager.AsPublishedMember(currentMember);
                var externalID = member.Value(GlobalConstants.ExternalId)?.ToString() ?? string.Empty;
                viewModel.MemberDonations = _memberDonationService.GetMemberDonations(externalID).GetAwaiter().GetResult();
            }

            return CurrentTemplate(viewModel);
        }
        else
        {
            return Redirect("/login");
        }
    }
}