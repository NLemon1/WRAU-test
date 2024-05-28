//------------------------------------------------------------------------------
// <auto-generated>
//   This code was generated by a tool.
//
//    Umbraco.ModelsBuilder.Embedded v13.3.2+696a711
//
//   Changes to this file will be lost if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Linq.Expressions;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PublishedCache;
using Umbraco.Cms.Infrastructure.ModelsBuilder;
using Umbraco.Cms.Core;
using Umbraco.Extensions;

namespace WRA.Umbraco.Models
{
	/// <summary>Product Page</summary>
	[PublishedModel("productPage")]
	public partial class ProductPage : PublishedContentModel, IMeta, IPageSettings, IProductComp, IVisibility
	{
		// helpers
#pragma warning disable 0109 // new is redundant
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		public new const string ModelTypeAlias = "productPage";
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		public new const PublishedItemType ModelItemType = PublishedItemType.Content;
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[return: global::System.Diagnostics.CodeAnalysis.MaybeNull]
		public new static IPublishedContentType GetModelContentType(IPublishedSnapshotAccessor publishedSnapshotAccessor)
			=> PublishedModelUtility.GetModelContentType(publishedSnapshotAccessor, ModelItemType, ModelTypeAlias);
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[return: global::System.Diagnostics.CodeAnalysis.MaybeNull]
		public static IPublishedPropertyType GetModelPropertyType<TValue>(IPublishedSnapshotAccessor publishedSnapshotAccessor, Expression<Func<ProductPage, TValue>> selector)
			=> PublishedModelUtility.GetModelPropertyType(GetModelContentType(publishedSnapshotAccessor), selector);
#pragma warning restore 0109

		private IPublishedValueFallback _publishedValueFallback;

		// ctor
		public ProductPage(IPublishedContent content, IPublishedValueFallback publishedValueFallback)
			: base(content, publishedValueFallback)
		{
			_publishedValueFallback = publishedValueFallback;
		}

		// properties

		///<summary>
		/// Alternate Title: Optional - Used for bundled course cards.
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("alternateTitle")]
		public virtual string AlternateTitle => this.Value<string>(_publishedValueFallback, "alternateTitle");

		///<summary>
		/// Block Content: "For adding, tabs, richtext, etc."
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("blockContent")]
		public virtual global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel BlockContent => this.Value<global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel>(_publishedValueFallback, "blockContent");

		///<summary>
		/// Categories
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("categories")]
		public virtual global::System.Collections.Generic.IEnumerable<global::Umbraco.Cms.Core.Models.PublishedContent.IPublishedContent> Categories => this.Value<global::System.Collections.Generic.IEnumerable<global::Umbraco.Cms.Core.Models.PublishedContent.IPublishedContent>>(_publishedValueFallback, "categories");

		///<summary>
		/// Credit Hours: If product is a course/class, add numeric credit hour.
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[ImplementPropertyType("creditHours")]
		public virtual int CreditHours => this.Value<int>(_publishedValueFallback, "creditHours");

		///<summary>
		/// Door Price
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("doorPrice")]
		public virtual global::Umbraco.Commerce.Cms.Models.PricePropertyValue DoorPrice => this.Value<global::Umbraco.Commerce.Cms.Models.PricePropertyValue>(_publishedValueFallback, "doorPrice");

		///<summary>
		/// End Date
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[ImplementPropertyType("endDate")]
		public virtual global::System.DateTime EndDate => this.Value<global::System.DateTime>(_publishedValueFallback, "endDate");

		///<summary>
		/// ExternalId
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("externalId")]
		public virtual string ExternalId => this.Value<string>(_publishedValueFallback, "externalId");

		///<summary>
		/// Images
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("images")]
		public virtual global::System.Collections.Generic.IEnumerable<global::Umbraco.Cms.Core.Models.MediaWithCrops> Images => this.Value<global::System.Collections.Generic.IEnumerable<global::Umbraco.Cms.Core.Models.MediaWithCrops>>(_publishedValueFallback, "images");

		///<summary>
		/// Location
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("location")]
		public virtual string Location => this.Value<string>(_publishedValueFallback, "location");

		///<summary>
		/// Long Description
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("longDescription")]
		public virtual global::Umbraco.Cms.Core.Strings.IHtmlEncodedString LongDescription => this.Value<global::Umbraco.Cms.Core.Strings.IHtmlEncodedString>(_publishedValueFallback, "longDescription");

		///<summary>
		/// Product Id
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("productId")]
		public virtual string ProductId => this.Value<string>(_publishedValueFallback, "productId");

		///<summary>
		/// Product Taxonomy
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("productTaxonomy")]
		public virtual global::Umbraco.Cms.Core.Models.PublishedContent.IPublishedContent ProductTaxonomy => this.Value<global::Umbraco.Cms.Core.Models.PublishedContent.IPublishedContent>(_publishedValueFallback, "productTaxonomy");

		///<summary>
		/// Sales Tax Category Code
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("salesTaxCategoryCode")]
		public virtual string SalesTaxCategoryCode => this.Value<string>(_publishedValueFallback, "salesTaxCategoryCode");

		///<summary>
		/// Short Description
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("shortDescription")]
		public virtual string ShortDescription => this.Value<string>(_publishedValueFallback, "shortDescription");

		///<summary>
		/// Start Date
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[ImplementPropertyType("startDate")]
		public virtual global::System.DateTime StartDate => this.Value<global::System.DateTime>(_publishedValueFallback, "startDate");

		///<summary>
		/// SubCategories
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("subCategories")]
		public virtual global::System.Collections.Generic.IEnumerable<global::Umbraco.Cms.Core.Models.PublishedContent.IPublishedContent> SubCategories => this.Value<global::System.Collections.Generic.IEnumerable<global::Umbraco.Cms.Core.Models.PublishedContent.IPublishedContent>>(_publishedValueFallback, "subCategories");

		///<summary>
		/// Meta Description: Enter meta description if desired.
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("metaDescription")]
		public virtual string MetaDescription => global::WRA.Umbraco.Models.Meta.GetMetaDescription(this, _publishedValueFallback);

		///<summary>
		/// Meta Title: Override inherited meta title.
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("metaTitle")]
		public virtual string MetaTitle => global::WRA.Umbraco.Models.Meta.GetMetaTitle(this, _publishedValueFallback);

		///<summary>
		/// Open Graph Image: Override inherited OG image.
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("openGraphImage")]
		public virtual global::Umbraco.Cms.Core.Models.MediaWithCrops OpenGraphImage => global::WRA.Umbraco.Models.Meta.GetOpenGraphImage(this, _publishedValueFallback);

		///<summary>
		/// Site Footer Widget
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("siteFooterWidget")]
		public virtual global::Umbraco.Cms.Core.Models.PublishedContent.IPublishedContent SiteFooterWidget => global::WRA.Umbraco.Models.PageSettings.GetSiteFooterWidget(this, _publishedValueFallback);

		///<summary>
		/// Member Price
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("memberPrice")]
		public virtual global::Umbraco.Commerce.Cms.Models.PricePropertyValue MemberPrice => global::WRA.Umbraco.Models.ProductComp.GetMemberPrice(this, _publishedValueFallback);

		///<summary>
		/// Price
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("price")]
		public virtual global::Umbraco.Commerce.Cms.Models.PricePropertyValue Price => global::WRA.Umbraco.Models.ProductComp.GetPrice(this, _publishedValueFallback);

		///<summary>
		/// SKU: The unique SKU.
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("sku")]
		public virtual string Sku => global::WRA.Umbraco.Models.ProductComp.GetSku(this, _publishedValueFallback);

		///<summary>
		/// Hide from Search Engines
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[ImplementPropertyType("hideFromSearchEngines")]
		public virtual bool HideFromSearchEngines => global::WRA.Umbraco.Models.Visibility.GetHideFromSearchEngines(this, _publishedValueFallback);

		///<summary>
		/// Hide from Sitemap
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[ImplementPropertyType("hideFromSitemap")]
		public virtual bool HideFromSitemap => global::WRA.Umbraco.Models.Visibility.GetHideFromSitemap(this, _publishedValueFallback);

		///<summary>
		/// Visible To All
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[ImplementPropertyType("visibleToAll")]
		public virtual bool VisibleToAll => global::WRA.Umbraco.Models.Visibility.GetVisibleToAll(this, _publishedValueFallback);

		///<summary>
		/// Visible To Member Groups: Member Groups for whom this content is visible
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("visibleToMemberGroups")]
		public virtual string VisibleToMemberGroups => global::WRA.Umbraco.Models.Visibility.GetVisibleToMemberGroups(this, _publishedValueFallback);
	}
}
