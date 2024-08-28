using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Web;

namespace WRA.Umbraco.Web.Controllers;

[Route("Error")]
public class ErrorController(IUmbracoContextAccessor umbracoContextAccessor) : Controller
{

    private readonly IUmbracoContextAccessor _umbracoContextAccessor = umbracoContextAccessor;

    [HttpGet]
    public IActionResult Index()
    {
        if (Response.StatusCode == StatusCodes.Status500InternalServerError)
        {
            return RedirectToAction(nameof(InternalServerErrorPage));
        }
        else if (Response.StatusCode == StatusCodes.Status404NotFound)
        {
            return RedirectToAction(nameof(NotFoundPage));
        }
        else if (Response.StatusCode != StatusCodes.Status200OK)
        {
            return RedirectToAction(nameof(UnmappedErrorPage));
        }

        return Redirect(GetHomepageUrl());

    }

    [HttpGet("500")]
    public IActionResult InternalServerErrorPage()
    {
        return View();
    }

    [HttpGet("404")]
    public IActionResult NotFoundPage()
    {
        return View();
    }

    [HttpGet("UnmappedError")]
    public IActionResult UnmappedErrorPage()
    {
        return View();
    }

    private string GetHomepageUrl()
    {
        if (_umbracoContextAccessor.TryGetUmbracoContext(out IUmbracoContext? umbracoContext))
        {
            IPublishedContent? homepage = umbracoContext.Content.GetAtRoot().FirstOrDefault();
            return homepage?.Url() ?? "/";
        }

        return "/";
    }
}