// using System.Reflection;
// using Umbraco.Cms.Core.Services;
// using Umbraco.Cms.Core.Web;
// using Umbraco.Cms.Infrastructure.Scoping;
// using WRA.Umbraco.Contracts;
//
// namespace WRA.Umbraco.Events.Consumers;
// public class MemberUpdateService : IMemberUpdateService
// {
//     private readonly IMemberService _memberService;
//     private readonly IUmbracoContextFactory _umbracoContextFactory;
//     private readonly IScopeProvider _scopeProvider;
//
//     public MemberUpdateService(IMemberService memberService, IUmbracoContextFactory umbracoContextFactory, IScopeProvider scopeProvider)
//     {
//         _memberService = memberService;
//         _umbracoContextFactory = umbracoContextFactory;
//         _scopeProvider = scopeProvider;
//     }
//
//     public void UpdateMember(IMemberEvent memberUpdate)
//     {
//         using (var scope = _scopeProvider.CreateCoreScope(autoComplete: true))
//         {
//             if (!string.IsNullOrEmpty(memberUpdate.Email))
//             {
//                 var member = _memberService.GetByEmail(memberUpdate.Email);
//                 if (member == null) return;
//
//                 using (var umbracoContextReference = _umbracoContextFactory.EnsureUmbracoContext())
//                 {
//                     try
//                     {
//                         foreach (PropertyInfo propInfo in typeof(IMemberEvent).GetProperties())
//                         {
//                             string memberPropertyName = ToCamelCase(propInfo.Name);
//                             var memberPropertyType = member.GetType().GetProperty(memberPropertyName)?.PropertyType;
//                             var newPropertyValue = propInfo.GetValue(memberUpdate);
//
//                             if (newPropertyValue != null && !newPropertyValue.Equals(member.GetValue(memberPropertyName)) && memberPropertyType == propInfo.PropertyType)
//                             {
//                                 member.SetValue(memberPropertyName, newPropertyValue);
//                             }
//                         }
//
//                         _memberService.Save(member);
//                     }
//                     catch (Exception ex)
//                     {
//                         throw ex;
//                     }
//                 }
//             }
//         }
//     }
//
//     private string ToCamelCase(string str)
//     {
//         return char.ToLowerInvariant(str[0]) + str.Substring(1);
//     }
// }