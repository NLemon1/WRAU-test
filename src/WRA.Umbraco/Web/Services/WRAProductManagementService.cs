using Hangfire;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Models;
using WRA.Umbraco.Repositories;

namespace WRA.Umbraco.Web.Services;
public class WraProductManagementService(
    ILogger<WraProductManagementService> logger,
    ICoreScopeProvider scopeProvider,
    IUmbracoContextFactory umbracoContextFactory,
    IContentService contentService,
    ProductHelper productHelper,
    ProductPageRepository productPageRepository)
{
    [DisableConcurrentExecution(10)]
    public async Task<IContent?> CreateOrUpdate(ProductEvent productEvent)
    {
        try
        {
            using var scope = scopeProvider.CreateCoreScope();

            // get content cache
            var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
            var contentCache = umbracoContextReference.UmbracoContext.Content;
            var home = contentCache?.GetAtRoot().FirstOrDefault();

            var productCollectionPageType = contentCache.GetContentType(CollectionPage.ModelTypeAlias);
            if (productCollectionPageType == null)
            {
                logger.LogError("No collection page type found");
                scope.Complete();
                return null;
            }

            var productCollectionPage = contentCache.GetByContentType(productCollectionPageType)?
                .First(p => p.Value<Guid>(GlobalAliases.ExternalId) == productEvent.ProductTypeId.SafeGuid());

            // collection page doesn't exist and needs to be created
            // maybe exception instead?
            if (productCollectionPage == null)
            {
                logger.LogError("No collection match for {ProductType}", productEvent.ProductType );
                scope.Complete();
                return null;
            }

            // We have our collection page, so now lets see if it contains a record that already exists...
            // if it returns nothing (no page exists matching the ID from WRA), we create one.
            var existingProductPage = productPageRepository.Get(productEvent.Sku);
            if (existingProductPage != null)
            {
                scope.Complete();
                return await Update(productEvent, existingProductPage);
            }

            var newProductPage = contentService.Create(productEvent.Name, productCollectionPage.Id, ProductPage.ModelTypeAlias);

            // set properties on our product
            productHelper.SetProperties(newProductPage, productEvent);

            // save and publish the product! Wow!
            contentService.SaveAndPublish(newProductPage);
            logger.LogInformation("Product created: {Name} - {Sku}", newProductPage.GetValue(GlobalAliases.Sku), newProductPage.Name );
            scope.Complete();
            return newProductPage;

        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error creating product: sku - {Sku}", productEvent.Sku);
            throw;
        }
    }
    [DisableConcurrentExecution(10)]
    public async Task<IContent?> Update(ProductEvent product, ProductPage? existingPage = null)
    {
        try
        {
            using var scope = scopeProvider.CreateCoreScope();
            var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
            var contentCache = umbracoContextReference.UmbracoContext.Content;

            if (contentCache == null)
            {
                scope.Complete();
                return null;
            }
            var productPage = existingPage ?? productPageRepository.Get(product.Sku);

            var productContent = contentService.GetById(productPage.Id);

            // set properties on our product
            if (productContent != null) productHelper.SetProperties(productContent, product);
            contentService.SaveAndPublish(productContent);
            scope.Complete();
            return productContent;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error updating product: sku - {Sku}", product.Sku);
            throw;
        }
    }

}