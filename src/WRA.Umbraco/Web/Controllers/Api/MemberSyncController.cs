

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
using WRA.Umbraco.Dtos;
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
        MemberManagementService memberManagementService,
        ICoreScopeProvider coreScopeProvider
    )
    {
        _memberManagementService = memberManagementService;
        _coreScopeProvider = coreScopeProvider;
    }


    [HttpPost]
    [Route("Create")]
    public async Task<IActionResult> Create(MemberDto newMemberRequest)
    {

        var result = _memberManagementService.Create(newMemberRequest);
        if (result == null)
        {
            return StatusCode(System.Net.HttpStatusCode.InternalServerError);
        }
        return Ok(result.Id);
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