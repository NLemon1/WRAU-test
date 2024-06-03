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
	/// <summary>mywraProfile</summary>
	[PublishedModel("mywraProfile")]
	public partial class MywraProfile : PublishedContentModel, IMeta, IPageSettings, IVisibility
	{
		// helpers
#pragma warning disable 0109 // new is redundant
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		public new const string ModelTypeAlias = "mywraProfile";
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		public new const PublishedItemType ModelItemType = PublishedItemType.Content;
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[return: global::System.Diagnostics.CodeAnalysis.MaybeNull]
		public new static IPublishedContentType GetModelContentType(IPublishedSnapshotAccessor publishedSnapshotAccessor)
			=> PublishedModelUtility.GetModelContentType(publishedSnapshotAccessor, ModelItemType, ModelTypeAlias);
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[return: global::System.Diagnostics.CodeAnalysis.MaybeNull]
		public static IPublishedPropertyType GetModelPropertyType<TValue>(IPublishedSnapshotAccessor publishedSnapshotAccessor, Expression<Func<MywraProfile, TValue>> selector)
			=> PublishedModelUtility.GetModelPropertyType(GetModelContentType(publishedSnapshotAccessor), selector);
#pragma warning restore 0109

		private IPublishedValueFallback _publishedValueFallback;

		// ctor
		public MywraProfile(IPublishedContent content, IPublishedValueFallback publishedValueFallback)
			: base(content, publishedValueFallback)
		{
			_publishedValueFallback = publishedValueFallback;
		}

		// properties

		///<summary>
		/// Committees Headline
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("committeesHeadline")]
		public virtual string CommitteesHeadline => this.Value<string>(_publishedValueFallback, "committeesHeadline");

		///<summary>
		/// Committees Intro Content
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("committeesIntroContent")]
		public virtual global::Umbraco.Cms.Core.Strings.IHtmlEncodedString CommitteesIntroContent => this.Value<global::Umbraco.Cms.Core.Strings.IHtmlEncodedString>(_publishedValueFallback, "committeesIntroContent");

		///<summary>
		/// Contributions Headline
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("contributionsHeadline")]
		public virtual string ContributionsHeadline => this.Value<string>(_publishedValueFallback, "contributionsHeadline");

		///<summary>
		/// Contributions Intro Content
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("contributionsIntroContent")]
		public virtual global::Umbraco.Cms.Core.Strings.IHtmlEncodedString ContributionsIntroContent => this.Value<global::Umbraco.Cms.Core.Strings.IHtmlEncodedString>(_publishedValueFallback, "contributionsIntroContent");

		///<summary>
		/// DirectGiver Button
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("directGiverButton")]
		public virtual global::Umbraco.Cms.Core.Models.Link DirectGiverButton => this.Value<global::Umbraco.Cms.Core.Models.Link>(_publishedValueFallback, "directGiverButton");

		///<summary>
		/// Email Newsletters Content
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("emailNewslettersContent")]
		public virtual global::Umbraco.Cms.Core.Strings.IHtmlEncodedString EmailNewslettersContent => this.Value<global::Umbraco.Cms.Core.Strings.IHtmlEncodedString>(_publishedValueFallback, "emailNewslettersContent");

		///<summary>
		/// Email Newsletters Headline
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("emailNewslettersHeadline")]
		public virtual string EmailNewslettersHeadline => this.Value<string>(_publishedValueFallback, "emailNewslettersHeadline");

		///<summary>
		/// Inman Button
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("inmanButton")]
		public virtual global::Umbraco.Cms.Core.Models.Link InmanButton => this.Value<global::Umbraco.Cms.Core.Models.Link>(_publishedValueFallback, "inmanButton");

		///<summary>
		/// Inman Content
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("inmanContent")]
		public virtual global::Umbraco.Cms.Core.Strings.IHtmlEncodedString InmanContent => this.Value<global::Umbraco.Cms.Core.Strings.IHtmlEncodedString>(_publishedValueFallback, "inmanContent");

		///<summary>
		/// InmanHeadline
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("inmanHeadline")]
		public virtual string InmanHeadline => this.Value<string>(_publishedValueFallback, "inmanHeadline");

		///<summary>
		/// Password Change Url
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("passwordChangeUrl")]
		public virtual global::Umbraco.Cms.Core.Models.Link PasswordChangeUrl => this.Value<global::Umbraco.Cms.Core.Models.Link>(_publishedValueFallback, "passwordChangeUrl");

		///<summary>
		/// Personal Information Headline
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("personalInformationHeadline")]
		public virtual string PersonalInformationHeadline => this.Value<string>(_publishedValueFallback, "personalInformationHeadline");

		///<summary>
		/// Personal Information Intro Content
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("personalInformationIntroContent")]
		public virtual global::Umbraco.Cms.Core.Strings.IHtmlEncodedString PersonalInformationIntroContent => this.Value<global::Umbraco.Cms.Core.Strings.IHtmlEncodedString>(_publishedValueFallback, "personalInformationIntroContent");

		///<summary>
		/// RPAC Button
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("rPACButton")]
		public virtual global::Umbraco.Cms.Core.Models.Link RPacbutton => this.Value<global::Umbraco.Cms.Core.Models.Link>(_publishedValueFallback, "rPACButton");

		///<summary>
		/// Subscriptions Headline
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("subscriptionsHeadline")]
		public virtual string SubscriptionsHeadline => this.Value<string>(_publishedValueFallback, "subscriptionsHeadline");

		///<summary>
		/// Subscriptions Intro Content
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("subscriptionsIntroContent")]
		public virtual global::Umbraco.Cms.Core.Strings.IHtmlEncodedString SubscriptionsIntroContent => this.Value<global::Umbraco.Cms.Core.Strings.IHtmlEncodedString>(_publishedValueFallback, "subscriptionsIntroContent");

		///<summary>
		/// Username Change Url
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("usernameChangeUrl")]
		public virtual global::Umbraco.Cms.Core.Models.Link UsernameChangeUrl => this.Value<global::Umbraco.Cms.Core.Models.Link>(_publishedValueFallback, "usernameChangeUrl");

		///<summary>
		/// WRE Magazine Content
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("wREMagazineContent")]
		public virtual global::Umbraco.Cms.Core.Strings.IHtmlEncodedString WRemagazineContent => this.Value<global::Umbraco.Cms.Core.Strings.IHtmlEncodedString>(_publishedValueFallback, "wREMagazineContent");

		///<summary>
		/// WRE Magazine Headline
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.2+696a711")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("wREMagazineHeadline")]
		public virtual string WRemagazineHeadline => this.Value<string>(_publishedValueFallback, "wREMagazineHeadline");

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
