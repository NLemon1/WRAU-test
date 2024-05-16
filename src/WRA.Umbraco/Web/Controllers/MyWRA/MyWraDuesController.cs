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
using WRA.Umbraco.Web.Dtos.MyWRA;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Web.Controllers.MyWRA;
public class MyWraDuesController : RenderController
{
    private readonly IMemberManager _memberManager;
    private readonly IPublishedValueFallback _publishedValueFallback;
    private readonly MemberDuesService _memberDuesService;
    public MyWraDuesController(
        ILogger<RenderController> logger,
        ICompositeViewEngine compositeViewEngine,
        IUmbracoContextAccessor umbracoContextAccessor,
        IMemberManager memberManager,
        IPublishedValueFallback publishedValueFallback,
        MemberDuesService memberDuesService)
        : base(logger, compositeViewEngine, umbracoContextAccessor)
    {
        _memberManager = memberManager;
        _publishedValueFallback = publishedValueFallback;
        _memberDuesService = memberDuesService;
    }

    public override IActionResult Index()
    {
        MemberDuesDto memberDues = new MemberDuesDto();
        MemberIdentityUser? currentMember = _memberManager.GetCurrentMemberAsync().GetAwaiter().GetResult();
        if (currentMember != null)
        {
            var member = _memberManager.AsPublishedMember(currentMember);
            var externalID = member.Value(GlobalConstants.ExternalId)?.ToString() ?? string.Empty;
            MywraDues viewModel = new(CurrentPage!, _publishedValueFallback);
            
            memberDues = _memberDuesService.GetMemberDues(externalID).GetAwaiter().GetResult();
            viewModel.MemberDues = memberDues;

            return CurrentTemplate(viewModel);
        }
        else
        {
            return Redirect("/login");
        }
    }
}