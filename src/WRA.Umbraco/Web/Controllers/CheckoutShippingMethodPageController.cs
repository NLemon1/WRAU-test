using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common.Controllers;
using Umbraco.Cms.Web.Common.Security;
using Umbraco.Commerce.Common;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Helpers.Constants;
using WRA.Umbraco.Models;
using WRA.Umbraco.Repositories;

namespace WRA.Umbraco.Web.Controllers;
public class CheckoutShippingMethodPageController : RenderController
{
    private readonly IUnitOfWorkProvider _unitOfWorkProvider;
    private readonly ProductPageRepository _productRepository;
    private readonly IPublishedValueFallback _publishedValueFallback;

    public CheckoutShippingMethodPageController(
        ILogger<RenderController> logger,
        ICompositeViewEngine compositeViewEngine,
        IUmbracoContextAccessor umbracoContextAccessor,
        IPublishedValueFallback publishedValueFallback,
        IUnitOfWorkProvider unitOfWorkProvider,
        ProductPageRepository productPageRepository)
        : base(logger,
            compositeViewEngine,
            umbracoContextAccessor)
    {
        _unitOfWorkProvider = unitOfWorkProvider;
        _productRepository = productPageRepository;
        _publishedValueFallback = publishedValueFallback;
    }

    public override IActionResult Index()
    {
        var shippingNotRequired = true;
        var order = CurrentPage.GetOrCreateOrder();
        foreach (var orderItem in order.OrderLines)
        {
            var productPage = _productRepository.GetBySku(orderItem.Sku);
            if (productPage.IsShippable)
            {
                shippingNotRequired = false;
                break;
            }
        }

        var vm = new CheckoutShippingMethodPage(CurrentPage, _publishedValueFallback);
        vm.ShippingNotRequired = shippingNotRequired;
        
        return CurrentTemplate(vm);
    }
}
