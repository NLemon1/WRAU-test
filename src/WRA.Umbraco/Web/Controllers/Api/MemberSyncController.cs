

using System.Web.Http;
using Azure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Web.Website.Models;
using WRA.Umbraco.Services;

namespace WRA.Umbraco.Controllers;

[ApiController]
[MapToApi("member-api")]
public class MemberSyncController : ApiController
{
    private readonly IMemberService _memberService;
    private readonly IMemberManager _memberManager;
    private readonly ICoreScopeProvider _coreScopeProvider;
    private readonly MemberManagementService _memberManagementService;


    public MemberSyncController(
        IMemberService memberService,
        IMemberManager memberManager,
        MemberManagementService memberManagementService,
        ICoreScopeProvider coreScopeProvider
    )
    {
        _memberService = memberService;
        _memberManager = memberManager;
        _memberManagementService = memberManagementService;
        _coreScopeProvider = coreScopeProvider;
    }


    [HttpPost]
    [Route("CreateMember")]
    public async Task<IActionResult> CreateMember(RegisterModel model, string memberGroup)
    {
        var (result, member) = await _memberManagementService.AddMember(model, memberGroup);
        if (result == null || result.Errors.Any())
        {
            return StatusCode(System.Net.HttpStatusCode.BadRequest);
        }
        return Ok(member.Id);
    }

    [HttpPost]
    [Route("CreateMemberGroup")]
    public IActionResult CreateMemberGroup(string RoleName)
    {
        // simple enough I guess...

        try
        {
            _memberService.AddRole(RoleName);
            return Ok();

        }
        catch (Exception ex)
        {

            // do something here
            throw ex;
        }
    }


}