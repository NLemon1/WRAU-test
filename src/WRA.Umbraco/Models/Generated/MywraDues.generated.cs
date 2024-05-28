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
	/// <summary>mywraDues</summary>
	[PublishedModel("mywraDues")]
	public partial class MywraDues : PublishedContentModel, IMeta, IPageSettings, IVisibility
	{
		// helpers
#pragma warning disable 0109 // new is redundant
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		public new const string ModelTypeAlias = "mywraDues";
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		public new const PublishedItemType ModelItemType = PublishedItemType.Content;
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[return: global::System.Diagnostics.CodeAnalysis.MaybeNull]
		public new static IPublishedContentType GetModelContentType(IPublishedSnapshotAccessor publishedSnapshotAccessor)
			=> PublishedModelUtility.GetModelContentType(publishedSnapshotAccessor, ModelItemType, ModelTypeAlias);
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[return: global::System.Diagnostics.CodeAnalysis.MaybeNull]
		public static IPublishedPropertyType GetModelPropertyType<TValue>(IPublishedSnapshotAccessor publishedSnapshotAccessor, Expression<Func<MywraDues, TValue>> selector)
			=> PublishedModelUtility.GetModelPropertyType(GetModelContentType(publishedSnapshotAccessor), selector);
#pragma warning restore 0109

		private IPublishedValueFallback _publishedValueFallback;

		// ctor
		public MywraDues(IPublishedContent content, IPublishedValueFallback publishedValueFallback)
			: base(content, publishedValueFallback)
		{
			_publishedValueFallback = publishedValueFallback;
		}

		// properties

		///<summary>
		/// Dues History Headline
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("duesHistoryHeadline")]
		public virtual string DuesHistoryHeadline => this.Value<string>(_publishedValueFallback, "duesHistoryHeadline");

		///<summary>
		/// Dues History Intro Content
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("duesHistoryIntroContent")]
		public virtual global::Umbraco.Cms.Core.Strings.IHtmlEncodedString DuesHistoryIntroContent => this.Value<global::Umbraco.Cms.Core.Strings.IHtmlEncodedString>(_publishedValueFallback, "duesHistoryIntroContent");

		///<summary>
		/// Headline
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("headline")]
		public virtual string Headline => this.Value<string>(_publishedValueFallback, "headline");

		///<summary>
		/// Intro Content
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("introContent")]
		public virtual global::Umbraco.Cms.Core.Strings.IHtmlEncodedString IntroContent => this.Value<global::Umbraco.Cms.Core.Strings.IHtmlEncodedString>(_publishedValueFallback, "introContent");

		///<summary>
		/// Pay Dues Headline
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("payDuesHeadline")]
		public virtual string PayDuesHeadline => this.Value<string>(_publishedValueFallback, "payDuesHeadline");

		///<summary>
		/// Pay Dues Intro Content
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("payDuesIntroContent")]
		public virtual global::Umbraco.Cms.Core.Strings.IHtmlEncodedString PayDuesIntroContent => this.Value<global::Umbraco.Cms.Core.Strings.IHtmlEncodedString>(_publishedValueFallback, "payDuesIntroContent");

		///<summary>
		/// Payment Group 1 Button
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("paymentGroup1Button")]
		public virtual global::Umbraco.Cms.Core.Models.Link PaymentGroup1Button => this.Value<global::Umbraco.Cms.Core.Models.Link>(_publishedValueFallback, "paymentGroup1Button");

		///<summary>
		/// Payment Group 1 Content
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("paymentGroup1Content")]
		public virtual global::Umbraco.Cms.Core.Strings.IHtmlEncodedString PaymentGroup1Content => this.Value<global::Umbraco.Cms.Core.Strings.IHtmlEncodedString>(_publishedValueFallback, "paymentGroup1Content");

		///<summary>
		/// Payment Group 1 Footer Text
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("paymentGroup1FooterText")]
		public virtual string PaymentGroup1FooterText => this.Value<string>(_publishedValueFallback, "paymentGroup1FooterText");

		///<summary>
		/// Payment Group 2 Button
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("paymentGroup2Button")]
		public virtual global::Umbraco.Cms.Core.Models.Link PaymentGroup2Button => this.Value<global::Umbraco.Cms.Core.Models.Link>(_publishedValueFallback, "paymentGroup2Button");

		///<summary>
		/// Payment Group 2 Content
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("paymentGroup2Content")]
		public virtual global::Umbraco.Cms.Core.Strings.IHtmlEncodedString PaymentGroup2Content => this.Value<global::Umbraco.Cms.Core.Strings.IHtmlEncodedString>(_publishedValueFallback, "paymentGroup2Content");

		///<summary>
		/// Payment Group 2 Footer Text
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("paymentGroup2FooterText")]
		public virtual string PaymentGroup2FooterText => this.Value<string>(_publishedValueFallback, "paymentGroup2FooterText");

		///<summary>
		/// Payment Group 3 Button
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("paymentGroup3Button")]
		public virtual global::Umbraco.Cms.Core.Models.Link PaymentGroup3Button => this.Value<global::Umbraco.Cms.Core.Models.Link>(_publishedValueFallback, "paymentGroup3Button");

		///<summary>
		/// Payment Group 3 Content
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("paymentGroup3Content")]
		public virtual global::Umbraco.Cms.Core.Strings.IHtmlEncodedString PaymentGroup3Content => this.Value<global::Umbraco.Cms.Core.Strings.IHtmlEncodedString>(_publishedValueFallback, "paymentGroup3Content");

		///<summary>
		/// Payment Group 3 Footer Text
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("paymentGroup3FooterText")]
		public virtual string PaymentGroup3FooterText => this.Value<string>(_publishedValueFallback, "paymentGroup3FooterText");

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
