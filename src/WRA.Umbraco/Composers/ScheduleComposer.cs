// using Hangfire;
// using Hangfire.Console;
// using Hangfire.Server;
// using Microsoft.Extensions.DependencyInjection;
// using Umbraco.Cms.Core;
// using Umbraco.Cms.Core.Composing;
// using Umbraco.Cms.Core.Services;
// using Umbraco.Cms.Core.Sync;
// using Umbraco.Cms.Core.Web;
// using Umbraco.Cms.Infrastructure.Sync;
// using Cultiv.Hangfire;
//
// namespace WRA.Umbraco.Composers;
//
// [ComposeAfter(typeof(HangfireComposer))]
// public class Scheduler : IComposer
// {
//     public void Compose(IUmbracoBuilder builder)
//     {
//         builder.Services.AddScoped<IJobs, Jobs>();
//         RecurringJob.AddOrUpdate<IJobs>("test-content-modification", x => x.ManipulateContent(null), Cron.Hourly);
//     }
// }
//
// public interface IJobs
// {
//     void ManipulateContent(PerformContext? context);
// }
//
// public class Jobs : IJobs
// {
//     private readonly IServiceProvider _serviceProvider;
//     private readonly IUmbracoContextFactory _umbracoContextFactory;
//     private readonly IServerMessenger _serverMessenger;
//     private readonly IContentService _contentService;
//
//     public Jobs(
//         IServiceProvider serviceProvider,
//         IUmbracoContextFactory umbracoContextFactory,
//         IServerMessenger serverMessenger,
//         IContentService contentService)
//     {
//         _serviceProvider = serviceProvider;
//         _umbracoContextFactory = umbracoContextFactory;
//         _serverMessenger = serverMessenger;
//         _contentService = contentService;
//     }
//
//
// }
