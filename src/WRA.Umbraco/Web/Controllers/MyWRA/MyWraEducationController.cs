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
using WRA.Umbraco.Models;
using WRA.Umbraco.Web.Dtos.External;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Web.Controllers.MyWRA;
public class MyWraEducationController : RenderController
{
    private readonly IMemberManager _memberManager;
    private readonly IMemberService _memberService;
    private readonly MemberOrderHistoryService _memberOrderHistoryService;
    private readonly IPublishedValueFallback _publishedValueFallback;
    public MyWraEducationController(
        ILogger<RenderController> logger,
        ICompositeViewEngine compositeViewEngine,
        IUmbracoContextAccessor umbracoContextAccessor,
        IMemberManager memberManager,
        IMemberService memberService,
        IPublishedValueFallback publishedValueFallback,
        MemberOrderHistoryService memberOrderHistoryService)
        : base(logger, compositeViewEngine, umbracoContextAccessor)
    {
        _memberManager = memberManager;
        _memberService = memberService;
        _memberOrderHistoryService = memberOrderHistoryService;
        _publishedValueFallback = publishedValueFallback;
    }

    public override IActionResult Index()
    {
        var orderHistory = new List<OrderHistoryDto>();
        MemberIdentityUser? currentMember = _memberManager.GetCurrentMemberAsync().GetAwaiter().GetResult();
        if (currentMember != null)
        {
            var member = _memberManager.AsPublishedMember(currentMember);
            var externalID = member.Value(GlobalAliases.ExternalId)?.ToString() ?? string.Empty;
            orderHistory = _memberOrderHistoryService.GetMemberOrderHistory(externalID).GetAwaiter().GetResult();
        }
        else
        {
            return Redirect("/login");
        }

        MywraEducation viewModel = new(CurrentPage!, _publishedValueFallback)
        {
            Orders = orderHistory
        };
        return CurrentTemplate(viewModel);
    }
}
