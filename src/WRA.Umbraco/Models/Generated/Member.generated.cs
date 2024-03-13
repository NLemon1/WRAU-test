//------------------------------------------------------------------------------
// <auto-generated>
//   This code was generated by a tool.
//
//    Umbraco.ModelsBuilder.Embedded v13.2.0+7dff3a3
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
	/// <summary>Member</summary>
	[PublishedModel("Member")]
	public partial class Member : PublishedContentModel
	{
		// helpers
#pragma warning disable 0109 // new is redundant
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		public new const string ModelTypeAlias = "Member";
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		public new const PublishedItemType ModelItemType = PublishedItemType.Member;
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[return: global::System.Diagnostics.CodeAnalysis.MaybeNull]
		public new static IPublishedContentType GetModelContentType(IPublishedSnapshotAccessor publishedSnapshotAccessor)
			=> PublishedModelUtility.GetModelContentType(publishedSnapshotAccessor, ModelItemType, ModelTypeAlias);
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[return: global::System.Diagnostics.CodeAnalysis.MaybeNull]
		public static IPublishedPropertyType GetModelPropertyType<TValue>(IPublishedSnapshotAccessor publishedSnapshotAccessor, Expression<Func<Member, TValue>> selector)
			=> PublishedModelUtility.GetModelPropertyType(GetModelContentType(publishedSnapshotAccessor), selector);
#pragma warning restore 0109

		private IPublishedValueFallback _publishedValueFallback;

		// ctor
		public Member(IPublishedContent content, IPublishedValueFallback publishedValueFallback)
			: base(content, publishedValueFallback)
		{
			_publishedValueFallback = publishedValueFallback;
		}

		// properties

		///<summary>
		/// Address1
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("address1")]
		public virtual string Address1 => this.Value<string>(_publishedValueFallback, "address1");

		///<summary>
		/// Address2
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("address2")]
		public virtual string Address2 => this.Value<string>(_publishedValueFallback, "address2");

		///<summary>
		/// Address 3
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("address3")]
		public virtual string Address3 => this.Value<string>(_publishedValueFallback, "address3");

		///<summary>
		/// Broker Email
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("brokerEmail")]
		public virtual string BrokerEmail => this.Value<string>(_publishedValueFallback, "brokerEmail");

		///<summary>
		/// Broker Full Name
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("brokerFullName")]
		public virtual string BrokerFullName => this.Value<string>(_publishedValueFallback, "brokerFullName");

		///<summary>
		/// Can Use Hotline
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[ImplementPropertyType("canUseHotline")]
		public virtual bool CanUseHotline => this.Value<bool>(_publishedValueFallback, "canUseHotline");

		///<summary>
		/// Cell Phone
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("cellPhone")]
		public virtual string CellPhone => this.Value<string>(_publishedValueFallback, "cellPhone");

		///<summary>
		/// City
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("city")]
		public virtual string City => this.Value<string>(_publishedValueFallback, "city");

		///<summary>
		/// Company
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("company")]
		public virtual global::Umbraco.Cms.Core.Models.PublishedContent.IPublishedContent Company => this.Value<global::Umbraco.Cms.Core.Models.PublishedContent.IPublishedContent>(_publishedValueFallback, "company");

		///<summary>
		/// Company Id
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("companyId")]
		public virtual string CompanyId => this.Value<string>(_publishedValueFallback, "companyId");

		///<summary>
		/// Company Logo Url
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("companyLogoUrl")]
		public virtual string CompanyLogoUrl => this.Value<string>(_publishedValueFallback, "companyLogoUrl");

		///<summary>
		/// Company Name
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("companyName")]
		public virtual string CompanyName => this.Value<string>(_publishedValueFallback, "companyName");

		///<summary>
		/// ExternalId
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("externalId")]
		public virtual string ExternalId => this.Value<string>(_publishedValueFallback, "externalId");

		///<summary>
		/// Fax
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("fax")]
		public virtual string Fax => this.Value<string>(_publishedValueFallback, "fax");

		///<summary>
		/// First Name
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("firstName")]
		public virtual string FirstName => this.Value<string>(_publishedValueFallback, "firstName");

		///<summary>
		/// Full Name
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("fullName")]
		public virtual string FullName => this.Value<string>(_publishedValueFallback, "fullName");

		///<summary>
		/// Gender
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("gender")]
		public virtual string Gender => this.Value<string>(_publishedValueFallback, "gender");

		///<summary>
		/// Home Phone
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("homePhone")]
		public virtual string HomePhone => this.Value<string>(_publishedValueFallback, "homePhone");

		///<summary>
		/// Image Url
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("imageUrl")]
		public virtual string ImageUrl => this.Value<string>(_publishedValueFallback, "imageUrl");

		///<summary>
		/// JoinDate
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[ImplementPropertyType("joinDate")]
		public virtual global::System.DateTime JoinDate => this.Value<global::System.DateTime>(_publishedValueFallback, "joinDate");

		///<summary>
		/// Last Name
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("lastName")]
		public virtual string LastName => this.Value<string>(_publishedValueFallback, "lastName");

		///<summary>
		/// Mandatory Hotline Letter
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[ImplementPropertyType("mandatoryHotlineLetter")]
		public virtual bool MandatoryHotlineLetter => this.Value<bool>(_publishedValueFallback, "mandatoryHotlineLetter");

		///<summary>
		/// NrdsId
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("nrdsId")]
		public virtual string NrdsId => this.Value<string>(_publishedValueFallback, "nrdsId");

		///<summary>
		/// Paid Thru Date
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[ImplementPropertyType("paidThruDate")]
		public virtual global::System.DateTime PaidThruDate => this.Value<global::System.DateTime>(_publishedValueFallback, "paidThruDate");

		///<summary>
		/// Prefix
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("prefix")]
		public virtual string Prefix => this.Value<string>(_publishedValueFallback, "prefix");

		///<summary>
		/// State Province
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("stateProvince")]
		public virtual string StateProvince => this.Value<string>(_publishedValueFallback, "stateProvince");

		///<summary>
		/// Suffix
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("suffix")]
		public virtual string Suffix => this.Value<string>(_publishedValueFallback, "suffix");

		///<summary>
		/// Comments
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("umbracoMemberComments")]
		public virtual string UmbracoMemberComments => this.Value<string>(_publishedValueFallback, "umbracoMemberComments");

		///<summary>
		/// Work Phone
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("workPhone")]
		public virtual string WorkPhone => this.Value<string>(_publishedValueFallback, "workPhone");

		///<summary>
		/// Zip
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "13.2.0+7dff3a3")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("zip")]
		public virtual string Zip => this.Value<string>(_publishedValueFallback, "zip");
	}
}
