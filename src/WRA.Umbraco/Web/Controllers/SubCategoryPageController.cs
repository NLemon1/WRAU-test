using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common.Controllers;
using WRA.Umbraco.Models;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Web.Controllers;

public class SubCategoryPageController(
    ILogger<RenderController> logger,
    ICompositeViewEngine compositeViewEngine,
    IUmbracoContextAccessor umbracoContextAccessor,
    WraProductService wraProductService)
    : RenderController(logger, compositeViewEngine, umbracoContextAccessor)
{
    public override IActionResult Index()
    {
        var page = CurrentPage as SubCategoryPage;
        var subcategoryGuid = page.Key;
        var bundles = wraProductService.GetProductBundlesBySubCategory(subcategoryGuid) ?? [];
        var products = wraProductService.GetProductsBySubCategory(subcategoryGuid) ?? [];

        page.Products = products;
        page.ProductBundles = bundles;

        return CurrentTemplate(CurrentPage);
    }
}