using Umbraco.Cms.Web.Common.Controllers;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Umbraco.Cms.Core.Web;
using Microsoft.AspNetCore.Mvc;
using WRA.Umbraco.Models.ViewModels;
using WRA.Umbraco.Services;
using Umbraco.Cms.Core.Models.PublishedContent;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WRA.Umbraco.Models;
using NPoco.Expressions;
using Umbraco.Cms.Core.Services;

namespace UmbracoProject.Controller;

public class SubCategoryPageController : RenderController
{
    private readonly WraProductService _wraProductService;
    private readonly ServiceContext _serviceContext;
    private readonly IVariationContextAccessor _variationContextAccessor;
    public SubCategoryPageController(
        ILogger<RenderController> logger,
        ICompositeViewEngine compositeViewEngine,
        IUmbracoContextAccessor umbracoContextAccessor,
        WraProductService wraProductService,
        ServiceContext serviceContext,
        IVariationContextAccessor variationContextAccessor
    ) : base(logger, compositeViewEngine, umbracoContextAccessor)
    {
        _wraProductService = wraProductService;
        _serviceContext = serviceContext;
        _variationContextAccessor = variationContextAccessor;
    }
    public override IActionResult Index()
    {
        SubCategoryPage? page = CurrentPage as SubCategoryPage;
        Guid subcategoryGuid = page.Key;
        var bundles = _wraProductService.GetProductBundlesBySubCategory(subcategoryGuid) ?? [];
        var products = _wraProductService.GetProductsBySubCategory(subcategoryGuid) ?? [];

        page.Products = products;
        page.ProductBundles = bundles;

        return CurrentTemplate(CurrentPage);
    }

}