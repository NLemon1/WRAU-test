using System.ComponentModel.DataAnnotations;
using System.Globalization;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Web;
using Umbraco.Commerce.Cms.Helpers;
using Umbraco.Commerce.Cms.Services;
using Umbraco.Commerce.Core.Discounts.Rewards;
using Umbraco.Commerce.Core.Discounts.Rules;
using Umbraco.Commerce.Core.Models;
using Umbraco.Commerce.Core.Services;
using Umbraco.Commerce.Extensions;

[DiscountRuleProvider("TimeBaseLineItemDiscountRule", "Time Based Discount Rule", labelView: "timebaselineitemdiscountrule")]
public class TimeBaseLineItemDiscountRule : OrderLineDiscountRuleProviderBase<TimeBaseLineItemDiscountSettings>
{
    private readonly IProductService _productService;

    private readonly IUmbracoStoreService _storeService;

    private readonly IUmbracoContextFactory _umbracoContextFactory;


    public TimeBaseLineItemDiscountRule(
        IProductService productService,
        IUmbracoStoreService storeService,
        IUmbracoContextFactory umbracoContextFactory)
    {
        _productService = productService;
        _storeService = storeService;
        _umbracoContextFactory = umbracoContextFactory;
    }


    public override DiscountRuleResult ValidateRule(DiscountRuleContext ctx, TimeBaseLineItemDiscountSettings settings)
    {
        List<OrderLineReadOnly> list = ((settings.NodeId != null) ? OrderLinesThatMatchProductOrProductCategory(settings.NodeId, ctx.ApplicableOrderLines) : ctx.ApplicableOrderLines).ToList();
        if (list.Count > 0)
        {
            return Fulfilled(list);
        }

        return Unfulfilled();
    }

    /// <summary>
    /// This code is something I copied from an intetnal class in the Umbraco Commerce source code. 
    /// It mimicks the logic of the internal class that checks if a product matches the order line.
    /// </summary>
    /// <param name="nodeId"></param>
    /// <param name="sourceOrderLines"></param>
    /// <returns></returns>
    internal IEnumerable<OrderLineReadOnly> OrderLinesThatMatchProductOrProductCategory(Udi nodeId, IEnumerable<OrderLineReadOnly> sourceOrderLines)
    {
        List<OrderLineReadOnly> list = new List<OrderLineReadOnly>();
        using UmbracoContextReference umbracoContextReference = _umbracoContextFactory.EnsureUmbracoContext();
        IPublishedContent byId = umbracoContextReference.UmbracoContext.Content.GetById(nodeId);
        if (byId == null)
        {
            return list;
        }

        StoreReadOnly storeReadOnly = _storeService.FindStoreByNodeId(byId.Id);
        if (storeReadOnly == null)
        {
            return list;
        }

        string value = byId.Id.ToString(CultureInfo.InvariantCulture);
        IProductSnapshot product = _productService.GetProduct(storeReadOnly.Id, byId.Key.ToString(), null);
        foreach (OrderLineReadOnly sourceOrderLine in sourceOrderLines)
        {
            if (product.Sku == sourceOrderLine.Sku)
            {
                list.Add(sourceOrderLine);
                continue;
            }

            if (Guid.TryParse(sourceOrderLine.ProductVariantReference, out var result))
            {
                IPublishedContent byId2 = umbracoContextReference.UmbracoContext.Content.GetById(result);
                if (byId2 != null)
                {
                    if (byId2.Path.Split(new char[1] { ',' }, StringSplitOptions.None).Contains(value))
                    {
                        list.Add(sourceOrderLine);
                        continue;
                    }

                    IPublishedContent productSourceNode = byId2.GetProductSourceNode(umbracoContextReference.UmbracoContext.Content);
                    if (productSourceNode != null && productSourceNode.Path.Split(new char[1] { ',' }, StringSplitOptions.None).Contains(value))
                    {
                        list.Add(sourceOrderLine);
                        continue;
                    }
                }
            }

            if (!Guid.TryParse(sourceOrderLine.ProductReference, out var result2))
            {
                continue;
            }

            IPublishedContent byId3 = umbracoContextReference.UmbracoContext.Content.GetById(result2);
            if (byId3 == null)
            {
                continue;
            }

            if (byId3.Path.Split(new char[1] { ',' }, StringSplitOptions.None).Contains(value))
            {
                list.Add(sourceOrderLine);
                continue;
            }

            IPublishedContent productSourceNode2 = byId3.GetProductSourceNode(umbracoContextReference.UmbracoContext.Content);
            if (productSourceNode2 != null && productSourceNode2.Path.Split(new char[1] { ',' }, StringSplitOptions.None).Contains(value))
            {
                list.Add(sourceOrderLine);
            }
        }

        return list;
    }
}



public class TimeBaseLineItemDiscountSettings
{
    [DiscountRuleProviderSetting(Key = "nodeIds",
        Name = "Product Nodes",
        Description = "The products to discount the price of",
        View = "contentpicker",
        Config = "{ startNodeId: -1, multiPicker: true, idType: 'udi' }"),]
    public Udi NodeId { get; set; }

    // [DiscountRuleProviderSetting(Key = "startDate",
    //     Name = "Line Discount Start Date",
    //     Description = "The Start Date for the line discount",
    //     View = "datepicker",
    //     Config = "{ dateFormat: 'yy-mm-dd', offset: true, minDate: 0 }")]
    // public DateTime StartDate { get; set; } = DateTime.Now;

    // [DiscountRuleProviderSetting(Key = "endDate",
    //     Name = "Line Discount End Date",
    //     Description = "The End Date for the line discount",
    //     View = "datepicker")]
    // public DateTime EndDate { get; set; } = DateTime.Now.AddDays(2);



}
