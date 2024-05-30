﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Common.Filters;
using Umbraco.Cms.Web.Website.Controllers;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Helpers.Constants;
using WRA.Umbraco.Web.Dtos.Member;
using WRA.Umbraco.Web.Dtos.MyWRA;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Web.Controllers.MyWRA;

public class MemberMarketingSubscriptionEditSurfaceController(
    IUmbracoContextAccessor umbracoContextAccessor,
    IUmbracoDatabaseFactory databaseFactory,
    ServiceContext services,
    AppCaches appCaches,
    IProfilingLogger profilingLogger,
    IPublishedUrlProvider publishedUrlProvider,
    MemberMarketingSubscriptionService memberMarketingSubscriptionService

    ) : SurfaceController(
        umbracoContextAccessor,
        databaseFactory,
        services,
        appCaches,
        profilingLogger,
        publishedUrlProvider
    )
{
    [HttpPost]
    [ValidateAntiForgeryToken]
    [ValidateUmbracoFormRouteString]
    public async Task<IActionResult> HandleMemberMarketingSubscriptionEdit([Bind(Prefix = "emailSubscriptionUpdateModel")] IEnumerable<MemberMarketingSubscriptionPreferenceDto> preferences)
    {
        try
        {
            var paramValue = "tabpanel-subscriptions";
            var queryString = QueryString.Create("#", paramValue);
            if (!ModelState.IsValid)
            {
                return RedirectToCurrentUmbracoPage(queryString);
            }

            foreach(var subscriptionToUpdate in preferences.Where(m => m.IsActive != m.PreviousValue))
            {
                // Update magazine subscription
                memberMarketingSubscriptionService.UpdateMarketingSubscription(subscriptionToUpdate);
            }

            return RedirectToCurrentUmbracoPage(queryString);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}