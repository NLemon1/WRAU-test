using Umbraco.Cms.Web.Common.Controllers;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Umbraco.Cms.Core.Web;
using Microsoft.AspNetCore.Mvc;
using WRA.Umbraco.Web.Services;

namespace UmbracoProject.Controller;

public class BasicContentController(
    ILogger<RenderController> logger,
    ICompositeViewEngine compositeViewEngine,
    IUmbracoContextAccessor umbracoContextAccessor)
    : RenderController(logger, compositeViewEngine, umbracoContextAccessor)
{

    public override IActionResult Index()
    {
        // This is to test the waters of a controller rather than injecting into the basic content page.
        // Right now it seems unnecessary to have a controller for this, but if we cahnge our minds, we can build off of this..

        // BasicContentViewModel vm = new(CurrentPage, new NoopPublishedValueFallback());
        // if (!_gatedContentService.MemberCanViewPage(CurrentPage).Result)
        // {

        // }
        return CurrentTemplate(CurrentPage);
    }
}