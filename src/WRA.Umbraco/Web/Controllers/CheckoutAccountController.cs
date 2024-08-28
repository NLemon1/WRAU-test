using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common.Controllers;

namespace WRA.Umbraco.Web.Controllers;

public class CheckoutAccountController : RenderController
{
    private readonly IMemberManager _memberManager;
    public CheckoutAccountController(
    ILogger<CheckoutAccountController> logger,
    ICompositeViewEngine compositeViewEngine,
    IUmbracoContextAccessor umbracoContextAccessor,
    IPublishedValueFallback publishedValueFallback,
    IMemberManager memberManager)
    : base(
        logger,
        compositeViewEngine,
        umbracoContextAccessor)
    {
        _memberManager = memberManager;
    }

    public override IActionResult Index()
    {
        MemberIdentityUser? currentMember = _memberManager.GetCurrentMemberAsync().GetAwaiter().GetResult();

        // if user is logged in, direct them to the next step
        if (currentMember != null)
        {
            return Redirect("/checkout/customer-information");
        }

        return CurrentTemplate(CurrentPage);
    }
}
