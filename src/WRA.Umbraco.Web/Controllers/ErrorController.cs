using Microsoft.AspNetCore.Mvc;

namespace WRA.Umbraco.Web.Controllers;

public class ErrorController : Controller
{
    [Route("Error")]
    public IActionResult Index()
    {
        if (Response.StatusCode == StatusCodes.Status500InternalServerError)
        {
            return Redirect("/500");
        }
        else if (Response.StatusCode != StatusCodes.Status200OK)
        {
            return Redirect("/");
        }

        return Redirect("/");
    }
}