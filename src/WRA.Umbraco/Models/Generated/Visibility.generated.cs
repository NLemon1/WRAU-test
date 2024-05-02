//------------------------------------------------------------------------------
// <auto-generated>
//   This code was generated by a tool.
//
//    Umbraco.ModelsBuilder.Embedded v13.3.0+a325ba3
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
	// Mixin Content Type with alias "visibility"
	/// <summary>Visibility</summary>
	public partial interface IVisibility : IPublishedContent
	{
		/// <summary>Hide from Search Engines</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.0+a325ba3")]
		bool HideFromSearchEngines { get; }

		/// <summary>Hide from Sitemap</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.0+a325ba3")]
		bool HideFromSitemap { get; }

		/// <summary>Visible To All</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.0+a325ba3")]
		bool VisibleToAll { get; }

		/// <summary>Visible To Member Groups</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.0+a325ba3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		string VisibleToMemberGroups { get; }
	}

	/// <summary>Visibility</summary>
	[PublishedModel("visibility")]
	public partial class Visibility : PublishedContentModel, IVisibility
	{
		// helpers
#pragma warning disable 0109 // new is redundant
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.0+a325ba3")]
		public new const string ModelTypeAlias = "visibility";
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.0+a325ba3")]
		public new const PublishedItemType ModelItemType = PublishedItemType.Content;
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.0+a325ba3")]
		[return: global::System.Diagnostics.CodeAnalysis.MaybeNull]
		public new static IPublishedContentType GetModelContentType(IPublishedSnapshotAccessor publishedSnapshotAccessor)
			=> PublishedModelUtility.GetModelContentType(publishedSnapshotAccessor, ModelItemType, ModelTypeAlias);
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.0+a325ba3")]
		[return: global::System.Diagnostics.CodeAnalysis.MaybeNull]
		public static IPublishedPropertyType GetModelPropertyType<TValue>(IPublishedSnapshotAccessor publishedSnapshotAccessor, Expression<Func<Visibility, TValue>> selector)
			=> PublishedModelUtility.GetModelPropertyType(GetModelContentType(publishedSnapshotAccessor), selector);
#pragma warning restore 0109

		private IPublishedValueFallback _publishedValueFallback;

		// ctor
		public Visibility(IPublishedContent content, IPublishedValueFallback publishedValueFallback)
			: base(content, publishedValueFallback)
		{
			_publishedValueFallback = publishedValueFallback;
		}

		// properties

		///<summary>
		/// Hide from Search Engines
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.0+a325ba3")]
		[ImplementPropertyType("hideFromSearchEngines")]
		public virtual bool HideFromSearchEngines => GetHideFromSearchEngines(this, _publishedValueFallback);

		/// <summary>Static getter for Hide from Search Engines</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.0+a325ba3")]
		public static bool GetHideFromSearchEngines(IVisibility that, IPublishedValueFallback publishedValueFallback) => that.Value<bool>(publishedValueFallback, "hideFromSearchEngines");

		///<summary>
		/// Hide from Sitemap
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.0+a325ba3")]
		[ImplementPropertyType("hideFromSitemap")]
		public virtual bool HideFromSitemap => GetHideFromSitemap(this, _publishedValueFallback);

		/// <summary>Static getter for Hide from Sitemap</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.0+a325ba3")]
		public static bool GetHideFromSitemap(IVisibility that, IPublishedValueFallback publishedValueFallback) => that.Value<bool>(publishedValueFallback, "hideFromSitemap");

		///<summary>
		/// Visible To All
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.0+a325ba3")]
		[ImplementPropertyType("visibleToAll")]
		public virtual bool VisibleToAll => GetVisibleToAll(this, _publishedValueFallback);

		/// <summary>Static getter for Visible To All</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.0+a325ba3")]
		public static bool GetVisibleToAll(IVisibility that, IPublishedValueFallback publishedValueFallback) => that.Value<bool>(publishedValueFallback, "visibleToAll");

		///<summary>
		/// Visible To Member Groups: Member Groups for whom this content is visible
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.0+a325ba3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("visibleToMemberGroups")]
		public virtual string VisibleToMemberGroups => GetVisibleToMemberGroups(this, _publishedValueFallback);

		/// <summary>Static getter for Visible To Member Groups</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.3.0+a325ba3")]
		[return: global::System.Diagnostics.CodeAnalysis.MaybeNull]
		public static string GetVisibleToMemberGroups(IVisibility that, IPublishedValueFallback publishedValueFallback) => that.Value<string>(publishedValueFallback, "visibleToMemberGroups");
	}
}
