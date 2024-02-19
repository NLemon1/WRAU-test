using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Web.Common.Views;
using WRA.Umbraco.Services;

public abstract class WRAViewPage<T>(GatedContentService gcs, IMemberManager memberManager) : UmbracoViewPage<T>
{
    readonly GatedContentService _gcs;
    readonly IMemberManager _memberManager;

    public async Task<bool> UserCanViewThisPage()
    {
        var member = await _memberManager.GetCurrentMemberAsync();
        var publishedContent = ViewData.Model as IPublishedContent;
        return await _gcs.MemberCanViewPage(publishedContent, member);
    }

}