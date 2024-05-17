using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Persistence.Repositories;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Infrastructure.Persistence.Repositories.Implement;
using WRA.Umbraco.BackOffice;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Events.Publishers;
using WRA.Umbraco.Helpers;
using WRA.Umbraco.Repositories;
using WRA.Umbraco.Services.Caching;
using WRA.Umbraco.Shared.Messaging;
using WRA.Umbraco.Web.Services;
using MemberRepository = WRA.Umbraco.Repositories.MemberRepository;

namespace WRA.Umbraco.Composers;

[ComposeAfter(typeof(DateFolderComposer))]
public class CustomServiceComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        // TODO: Check on the scoping of all these.

        // Register the CacheKeyProvider as a singleton one instance per application lifetime.
        builder.Services.AddSingleton<ICacheKeyProvider, CacheKeyProvider>();

        // Register the GatedContentService as scoped (one instance per request).
        builder.Services.AddScoped<GatedContentService>();

        // Register the WRA external API service as scoped (one instance per request).
        builder.Services.AddScoped<WraExternalApiService>();
        // Register umbraco member helper service as transient (different instance every time it's requested).
        builder.Services.AddScoped<MemberHelper>();
        builder.Services.AddScoped<ProductHelper>();
        builder.Services.AddScoped<CategoryHelper>();
        builder.Services.AddSingleton<MappingHelper>();
        builder.Services.AddScoped<SubscriptionHelper>();

        // Register the WRA external API service as scoped (one instance per request).
        builder.Services.AddScoped<WraMemberManagementService>();
        builder.Services.AddScoped<MemberDuesService>();
        builder.Services.AddScoped<WraProductManagementService>();
        builder.Services.AddScoped<MemberOrderHistoryService>();
        builder.Services.AddScoped<MemberDonationService>();

        // Binds IMember event to APIs member DTO.
        builder.Services.AddScoped<MemberEvent>();

        // Register the search service as transient (different instance every time its requested).
        builder.Services.AddTransient<SearchService>();

        // Register the WRA product service as a transient (different instance every time it's requested).
        builder.Services.AddTransient<WraProductService>();

        // Register data repositories as transient (different instance every time it's requested).
        builder.Services.AddTransient<CompanyRepository>();
        builder.Services.AddTransient<BoardRepository>();
        builder.Services.AddTransient<ProductPageRepository>();
        builder.Services.AddTransient<MemberRepository>();
        builder.Services.AddTransient<CategoryRepository>();
        builder.Services.AddTransient<MemberGroupRepository>();
        builder.Services.AddTransient<TaxonomyRepository>();
        builder.Services.AddTransient<OrderRepository>();
        // builder.Services.AddTransient<MemberSubscriptionRepository>();

        // generic repositories
        builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

        builder.Services.AddTransient<MemberEventPublisher>();
        builder.Services.AddTransient<ProductEventPublisher>();
        builder.Services.AddTransient<OrderEventPublisher>();
        // custom table repositories


        // Register the Member password hasher as a singleton (one instance per application lifetime).
        builder.Services.AddSingleton<IPasswordHasher<MemberIdentityUser>, CustomMemberPasswordHasher<MemberIdentityUser>>();

        // Register the Service bus subscription name generator as a singleton (one instance per application lifetime).
        builder.Services.AddSingleton<ISubscriptionNameGenerator, AzureSubscriptionNameGenerator>();


    }
}