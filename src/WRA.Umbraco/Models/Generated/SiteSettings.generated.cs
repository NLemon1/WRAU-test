//------------------------------------------------------------------------------
// <auto-generated>
//   This code was generated by a tool.
//
//    Umbraco.ModelsBuilder.Embedded v13.4.1+d72fc5c
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
	/// <summary>Site Settings</summary>
	[PublishedModel("siteSettings")]
	public partial class SiteSettings : PublishedContentModel
	{
		// helpers
#pragma warning disable 0109 // new is redundant
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		public new const string ModelTypeAlias = "siteSettings";
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		public new const PublishedItemType ModelItemType = PublishedItemType.Content;
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[return: global::System.Diagnostics.CodeAnalysis.MaybeNull]
		public new static IPublishedContentType GetModelContentType(IPublishedSnapshotAccessor publishedSnapshotAccessor)
			=> PublishedModelUtility.GetModelContentType(publishedSnapshotAccessor, ModelItemType, ModelTypeAlias);
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[return: global::System.Diagnostics.CodeAnalysis.MaybeNull]
		public static IPublishedPropertyType GetModelPropertyType<TValue>(IPublishedSnapshotAccessor publishedSnapshotAccessor, Expression<Func<SiteSettings, TValue>> selector)
			=> PublishedModelUtility.GetModelPropertyType(GetModelContentType(publishedSnapshotAccessor), selector);
#pragma warning restore 0109

		private IPublishedValueFallback _publishedValueFallback;

		// ctor
		public SiteSettings(IPublishedContent content, IPublishedValueFallback publishedValueFallback)
			: base(content, publishedValueFallback)
		{
			_publishedValueFallback = publishedValueFallback;
		}

		// properties

		///<summary>
		/// Body Close Scripts
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("bodyCloseScripts")]
		public virtual string BodyCloseScripts => this.Value<string>(_publishedValueFallback, "bodyCloseScripts");

		///<summary>
		/// Body Open Scripts
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("bodyOpenScripts")]
		public virtual string BodyOpenScripts => this.Value<string>(_publishedValueFallback, "bodyOpenScripts");

		///<summary>
		/// Content
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("dialogContent")]
		public virtual global::Umbraco.Cms.Core.Strings.IHtmlEncodedString DialogContent => this.Value<global::Umbraco.Cms.Core.Strings.IHtmlEncodedString>(_publishedValueFallback, "dialogContent");

		///<summary>
		/// Heading
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("dialogHeading")]
		public virtual string DialogHeading => this.Value<string>(_publishedValueFallback, "dialogHeading");

		///<summary>
		/// Enable Alert Banner
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[ImplementPropertyType("enableMessage")]
		public virtual bool EnableMessage => this.Value<bool>(_publishedValueFallback, "enableMessage");

		///<summary>
		/// Expiration Days
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[ImplementPropertyType("expirationDays")]
		public virtual int ExpirationDays => this.Value<int>(_publishedValueFallback, "expirationDays");

		///<summary>
		/// Facebook
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("facebook")]
		public virtual string Facebook => this.Value<string>(_publishedValueFallback, "facebook");

		///<summary>
		/// Logo
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("footerLogo")]
		public virtual global::Umbraco.Cms.Core.Models.MediaWithCrops FooterLogo => this.Value<global::Umbraco.Cms.Core.Models.MediaWithCrops>(_publishedValueFallback, "footerLogo");

		///<summary>
		/// Logo Mobile Width
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[ImplementPropertyType("footerLogoMobileWidth")]
		public virtual int FooterLogoMobileWidth => this.Value<int>(_publishedValueFallback, "footerLogoMobileWidth");

		///<summary>
		/// Logo Width
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[ImplementPropertyType("footerLogoWidth")]
		public virtual int FooterLogoWidth => this.Value<int>(_publishedValueFallback, "footerLogoWidth");

		///<summary>
		/// Navigation
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("footerNavigation")]
		public virtual global::System.Collections.Generic.IEnumerable<global::Umbraco.Cms.Core.Models.Link> FooterNavigation => this.Value<global::System.Collections.Generic.IEnumerable<global::Umbraco.Cms.Core.Models.Link>>(_publishedValueFallback, "footerNavigation");

		///<summary>
		/// Utility Navigation
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("footerUtilityNavigation")]
		public virtual global::System.Collections.Generic.IEnumerable<global::Umbraco.Cms.Core.Models.Link> FooterUtilityNavigation => this.Value<global::System.Collections.Generic.IEnumerable<global::Umbraco.Cms.Core.Models.Link>>(_publishedValueFallback, "footerUtilityNavigation");

		///<summary>
		/// Header Logo
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("headerLogo")]
		public virtual global::Umbraco.Cms.Core.Models.MediaWithCrops HeaderLogo => this.Value<global::Umbraco.Cms.Core.Models.MediaWithCrops>(_publishedValueFallback, "headerLogo");

		///<summary>
		/// Head Scripts
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("headScripts")]
		public virtual string HeadScripts => this.Value<string>(_publishedValueFallback, "headScripts");

		///<summary>
		/// Address
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("hqAddress")]
		public virtual string HqAddress => this.Value<string>(_publishedValueFallback, "hqAddress");

		///<summary>
		/// City
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("hqCity")]
		public virtual string HqCity => this.Value<string>(_publishedValueFallback, "hqCity");

		///<summary>
		/// Email
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("hqEmail")]
		public virtual string HqEmail => this.Value<string>(_publishedValueFallback, "hqEmail");

		///<summary>
		/// Hours
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("hqHours")]
		public virtual string HqHours => this.Value<string>(_publishedValueFallback, "hqHours");

		///<summary>
		/// Phone
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("hqPhone")]
		public virtual string HqPhone => this.Value<string>(_publishedValueFallback, "hqPhone");

		///<summary>
		/// Phone 2
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("hqPhone2")]
		public virtual string HqPhone2 => this.Value<string>(_publishedValueFallback, "hqPhone2");

		///<summary>
		/// State
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("hqState")]
		public virtual string HqState => this.Value<string>(_publishedValueFallback, "hqState");

		///<summary>
		/// Suite
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("hqSuite")]
		public virtual string HqSuite => this.Value<string>(_publishedValueFallback, "hqSuite");

		///<summary>
		/// Zip
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("hqZip")]
		public virtual string HqZip => this.Value<string>(_publishedValueFallback, "hqZip");

		///<summary>
		/// Instagram
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("instagram")]
		public virtual string Instagram => this.Value<string>(_publishedValueFallback, "instagram");

		///<summary>
		/// Hours
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("lhHours")]
		public virtual string LhHours => this.Value<string>(_publishedValueFallback, "lhHours");

		///<summary>
		/// Notes
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("lhNotes")]
		public virtual string LhNotes => this.Value<string>(_publishedValueFallback, "lhNotes");

		///<summary>
		/// Phone
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("lhPhone")]
		public virtual string LhPhone => this.Value<string>(_publishedValueFallback, "lhPhone");

		///<summary>
		/// Phone 2
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("lhPhone2")]
		public virtual string LhPhone2 => this.Value<string>(_publishedValueFallback, "lhPhone2");

		///<summary>
		/// LinkedIn
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("linkedin")]
		public virtual string Linkedin => this.Value<string>(_publishedValueFallback, "linkedin");

		///<summary>
		/// Logo Width: In pixels
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[ImplementPropertyType("logoWidth")]
		public virtual int LogoWidth => this.Value<int>(_publishedValueFallback, "logoWidth");

		///<summary>
		/// Message: { 100 characters preferred.
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("message")]
		public virtual global::Umbraco.Cms.Core.Strings.IHtmlEncodedString Message => this.Value<global::Umbraco.Cms.Core.Strings.IHtmlEncodedString>(_publishedValueFallback, "message");

		///<summary>
		/// Mobile Logo Width: In pixels
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[ImplementPropertyType("mobileLogoWidth")]
		public virtual int MobileLogoWidth => this.Value<int>(_publishedValueFallback, "mobileLogoWidth");

		///<summary>
		/// Nav Menu 1 Column 1
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu1Column1")]
		public virtual global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel NavMenu1Column1 => this.Value<global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel>(_publishedValueFallback, "navMenu1Column1");

		///<summary>
		/// Nav Menu 1 Column 2
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu1Column2")]
		public virtual global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel NavMenu1Column2 => this.Value<global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel>(_publishedValueFallback, "navMenu1Column2");

		///<summary>
		/// Nav Menu 1 Image
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu1Image")]
		public virtual global::Umbraco.Cms.Core.Models.MediaWithCrops NavMenu1Image => this.Value<global::Umbraco.Cms.Core.Models.MediaWithCrops>(_publishedValueFallback, "navMenu1Image");

		///<summary>
		/// Nav Menu 1 Intro Copy
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu1IntroCopy")]
		public virtual string NavMenu1IntroCopy => this.Value<string>(_publishedValueFallback, "navMenu1IntroCopy");

		///<summary>
		/// Nav Menu 1 Link
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu1Link")]
		public virtual global::Umbraco.Cms.Core.Models.Link NavMenu1Link => this.Value<global::Umbraco.Cms.Core.Models.Link>(_publishedValueFallback, "navMenu1Link");

		///<summary>
		/// Nav Menu 1 Name
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu1Name")]
		public virtual string NavMenu1Name => this.Value<string>(_publishedValueFallback, "navMenu1Name");

		///<summary>
		/// Nav Menu 2 Column 1
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu2Column1")]
		public virtual global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel NavMenu2Column1 => this.Value<global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel>(_publishedValueFallback, "navMenu2Column1");

		///<summary>
		/// Nav Menu 2 Column 2
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu2Column2")]
		public virtual global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel NavMenu2Column2 => this.Value<global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel>(_publishedValueFallback, "navMenu2Column2");

		///<summary>
		/// Nav Menu 2 Image
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu2Image")]
		public virtual global::Umbraco.Cms.Core.Models.MediaWithCrops NavMenu2Image => this.Value<global::Umbraco.Cms.Core.Models.MediaWithCrops>(_publishedValueFallback, "navMenu2Image");

		///<summary>
		/// Nav Menu 2 Intro Copy
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu2IntroCopy")]
		public virtual string NavMenu2IntroCopy => this.Value<string>(_publishedValueFallback, "navMenu2IntroCopy");

		///<summary>
		/// Nav Menu 2 Link
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu2Link")]
		public virtual global::Umbraco.Cms.Core.Models.Link NavMenu2Link => this.Value<global::Umbraco.Cms.Core.Models.Link>(_publishedValueFallback, "navMenu2Link");

		///<summary>
		/// Nav Menu 2 Name
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu2Name")]
		public virtual string NavMenu2Name => this.Value<string>(_publishedValueFallback, "navMenu2Name");

		///<summary>
		/// Nav Menu 3 Column 1
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu3Column1")]
		public virtual global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel NavMenu3Column1 => this.Value<global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel>(_publishedValueFallback, "navMenu3Column1");

		///<summary>
		/// Nav Menu 3 Column 2
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu3Column2")]
		public virtual global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel NavMenu3Column2 => this.Value<global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel>(_publishedValueFallback, "navMenu3Column2");

		///<summary>
		/// Nav Menu 3 Image
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu3Image")]
		public virtual global::Umbraco.Cms.Core.Models.MediaWithCrops NavMenu3Image => this.Value<global::Umbraco.Cms.Core.Models.MediaWithCrops>(_publishedValueFallback, "navMenu3Image");

		///<summary>
		/// Nav Menu 3 Intro Copy
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu3IntroCopy")]
		public virtual string NavMenu3IntroCopy => this.Value<string>(_publishedValueFallback, "navMenu3IntroCopy");

		///<summary>
		/// Nav Menu 3 Link
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu3Link")]
		public virtual global::Umbraco.Cms.Core.Models.Link NavMenu3Link => this.Value<global::Umbraco.Cms.Core.Models.Link>(_publishedValueFallback, "navMenu3Link");

		///<summary>
		/// Nav Menu 3 Name
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu3Name")]
		public virtual string NavMenu3Name => this.Value<string>(_publishedValueFallback, "navMenu3Name");

		///<summary>
		/// Nav Menu 4 Column 1
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu4Column1")]
		public virtual global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel NavMenu4Column1 => this.Value<global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel>(_publishedValueFallback, "navMenu4Column1");

		///<summary>
		/// Nav Menu 4 Column 2
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu4Column2")]
		public virtual global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel NavMenu4Column2 => this.Value<global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel>(_publishedValueFallback, "navMenu4Column2");

		///<summary>
		/// Nav Menu 4 Image
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu4Image")]
		public virtual global::Umbraco.Cms.Core.Models.MediaWithCrops NavMenu4Image => this.Value<global::Umbraco.Cms.Core.Models.MediaWithCrops>(_publishedValueFallback, "navMenu4Image");

		///<summary>
		/// Nav Menu 4 Intro Copy
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu4IntroCopy")]
		public virtual string NavMenu4IntroCopy => this.Value<string>(_publishedValueFallback, "navMenu4IntroCopy");

		///<summary>
		/// Nav Menu 4 Link
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu4Link")]
		public virtual global::Umbraco.Cms.Core.Models.Link NavMenu4Link => this.Value<global::Umbraco.Cms.Core.Models.Link>(_publishedValueFallback, "navMenu4Link");

		///<summary>
		/// Nav Menu 4 Name
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu4Name")]
		public virtual string NavMenu4Name => this.Value<string>(_publishedValueFallback, "navMenu4Name");

		///<summary>
		/// Nav Menu 5 Column 1
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu5Column1")]
		public virtual global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel NavMenu5Column1 => this.Value<global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel>(_publishedValueFallback, "navMenu5Column1");

		///<summary>
		/// Nav Menu 5 Column 2
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu5Column2")]
		public virtual global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel NavMenu5Column2 => this.Value<global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel>(_publishedValueFallback, "navMenu5Column2");

		///<summary>
		/// Nav Menu 5 Image
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu5Image")]
		public virtual global::Umbraco.Cms.Core.Models.MediaWithCrops NavMenu5Image => this.Value<global::Umbraco.Cms.Core.Models.MediaWithCrops>(_publishedValueFallback, "navMenu5Image");

		///<summary>
		/// Nav Menu 5 Intro Copy
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu5IntroCopy")]
		public virtual string NavMenu5IntroCopy => this.Value<string>(_publishedValueFallback, "navMenu5IntroCopy");

		///<summary>
		/// Nav Menu 5 Link
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu5Link")]
		public virtual global::Umbraco.Cms.Core.Models.Link NavMenu5Link => this.Value<global::Umbraco.Cms.Core.Models.Link>(_publishedValueFallback, "navMenu5Link");

		///<summary>
		/// Nav Menu 5 Name
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu5Name")]
		public virtual string NavMenu5Name => this.Value<string>(_publishedValueFallback, "navMenu5Name");

		///<summary>
		/// Nav Menu 6 Column 1
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu6Column1")]
		public virtual global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel NavMenu6Column1 => this.Value<global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel>(_publishedValueFallback, "navMenu6Column1");

		///<summary>
		/// Nav Menu 6 Column 2
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu6Column2")]
		public virtual global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel NavMenu6Column2 => this.Value<global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel>(_publishedValueFallback, "navMenu6Column2");

		///<summary>
		/// Nav Menu 6 Image
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu6Image")]
		public virtual global::Umbraco.Cms.Core.Models.MediaWithCrops NavMenu6Image => this.Value<global::Umbraco.Cms.Core.Models.MediaWithCrops>(_publishedValueFallback, "navMenu6Image");

		///<summary>
		/// Nav Menu 6 Intro Copy
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu6IntroCopy")]
		public virtual string NavMenu6IntroCopy => this.Value<string>(_publishedValueFallback, "navMenu6IntroCopy");

		///<summary>
		/// Nav Menu 6 Link
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu6Link")]
		public virtual global::Umbraco.Cms.Core.Models.Link NavMenu6Link => this.Value<global::Umbraco.Cms.Core.Models.Link>(_publishedValueFallback, "navMenu6Link");

		///<summary>
		/// Nav Menu 6 Name
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("navMenu6Name")]
		public virtual string NavMenu6Name => this.Value<string>(_publishedValueFallback, "navMenu6Name");

		///<summary>
		/// OG Image Fallback
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("oGImageFallback")]
		public virtual global::Umbraco.Cms.Core.Models.MediaWithCrops OGimageFallback => this.Value<global::Umbraco.Cms.Core.Models.MediaWithCrops>(_publishedValueFallback, "oGImageFallback");

		///<summary>
		/// Address
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("paAddress")]
		public virtual string PaAddress => this.Value<string>(_publishedValueFallback, "paAddress");

		///<summary>
		/// City
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("paCity")]
		public virtual string PaCity => this.Value<string>(_publishedValueFallback, "paCity");

		///<summary>
		/// Email
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("paEmail")]
		public virtual string PaEmail => this.Value<string>(_publishedValueFallback, "paEmail");

		///<summary>
		/// Hours
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("paHours")]
		public virtual string PaHours => this.Value<string>(_publishedValueFallback, "paHours");

		///<summary>
		/// Phone
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("paPhone")]
		public virtual string PaPhone => this.Value<string>(_publishedValueFallback, "paPhone");

		///<summary>
		/// Phone 2
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("paPhone2")]
		public virtual string PaPhone2 => this.Value<string>(_publishedValueFallback, "paPhone2");

		///<summary>
		/// State
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("paState")]
		public virtual string PaState => this.Value<string>(_publishedValueFallback, "paState");

		///<summary>
		/// Suite
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("paSuite")]
		public virtual string PaSuite => this.Value<string>(_publishedValueFallback, "paSuite");

		///<summary>
		/// Zip
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("paZip")]
		public virtual string PaZip => this.Value<string>(_publishedValueFallback, "paZip");

		///<summary>
		/// Site Name
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("siteName")]
		public virtual string SiteName => this.Value<string>(_publishedValueFallback, "siteName");

		///<summary>
		/// Timestamp: This will reset the cookie. Set expiration below.
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[ImplementPropertyType("timestamp")]
		public virtual global::System.DateTime Timestamp => this.Value<global::System.DateTime>(_publishedValueFallback, "timestamp");

		///<summary>
		/// Twitter
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("twitter")]
		public virtual string Twitter => this.Value<string>(_publishedValueFallback, "twitter");

		///<summary>
		/// Utility Nav Menu
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("utilityNavMenu")]
		public virtual global::System.Collections.Generic.IEnumerable<global::Umbraco.Cms.Core.Models.Link> UtilityNavMenu => this.Value<global::System.Collections.Generic.IEnumerable<global::Umbraco.Cms.Core.Models.Link>>(_publishedValueFallback, "utilityNavMenu");

		///<summary>
		/// YouTube
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.4.1+d72fc5c")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("youtube")]
		public virtual string Youtube => this.Value<string>(_publishedValueFallback, "youtube");
	}
}
