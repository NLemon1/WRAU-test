using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Security;

namespace WRA.Umbraco.Extensions
{
    public static class WraPasswordHashingBuilderExtension
    {
        public static IUmbracoBuilder AddWraPasswordHashing(this IUmbracoBuilder umbracoBuilder)
        {
            umbracoBuilder.Services.AddScoped<IPasswordHasher<MemberIdentityUser>, CustomMemberPasswordHasher<MemberIdentityUser>>();

            return umbracoBuilder;
        }
    }
}
