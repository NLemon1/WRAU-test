using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common.Controllers;
using WRA.Umbraco.Models;
using WRA.Umbraco.Repositories;

namespace WRA.Umbraco.Web.Controllers.MyWRA;

public class MyWraCompanyController(
    ILogger<RenderController> logger,
    ICompositeViewEngine compositeViewEngine,
    IUmbracoContextAccessor umbracoContextAccessor,
    IMemberManager memberManager,
    IPublishedValueFallback publishedValueFallback,
    CompanyRepository companyRepository,
    MemberRepository memberRepository
    )
    : RenderController(logger, compositeViewEngine, umbracoContextAccessor)
{
    public override IActionResult Index()
    {
        // Get current member and cast it as a Member object
        var currentMember = memberManager.GetCurrentMemberAsync().GetAwaiter().GetResult();
        if (currentMember == null) return Redirect("/login");
        var publishedMember = memberManager.AsPublishedMember(currentMember);
        var member = new Member(publishedMember, publishedValueFallback);

        // Get the company associated with the current member
        var publishedCompany = companyRepository.GetByID(member.Company.Key);

        // Cast company to strongly typed Model
        var company = new Company(publishedCompany, publishedValueFallback);

        // Get all members of the company
        if (publishedCompany == null) return Redirect("/login");
        var members = memberRepository.GetMembersByCompany(publishedCompany);

        var viewModel = new MywraCompany(CurrentPage!, publishedValueFallback)
        {
            MemberCompany = company,
            MembersInCompany = members
        };
        return CurrentTemplate(viewModel);
    }
}