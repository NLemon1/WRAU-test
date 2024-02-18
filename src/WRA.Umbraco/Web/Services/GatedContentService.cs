

using K4os.Compression.LZ4.Internal;
using NUglify.Helpers;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.Blocks;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;

namespace WRA.Umbraco.Services
{
    public class GatedContentService
    {
        private readonly IMemberManager _memberManager;
        private readonly IMemberGroupService _memberGroupService;
        private readonly IUmbracoContextAccessor _umbracoContextAccessor;
        private const string _gatedMemberGroups = "VisibleToMemberGroups";
        private const string _visibleToAll = "VisibleToAll";
        public GatedContentService(
            IMemberManager memberManager,
            IMemberGroupService memberGroupService
            )
        {
            _memberManager = memberManager;
            _memberGroupService = memberGroupService;
        }

        // public IEnumerable<BlockGridItem> ApplyGatedContentRules(IEnumerable<BlockGridItem> blockGridItems, MemberIdentityUser member)
        // {
        //     blockGridItems
        //         .ToList()
        //         .RemoveAll(bgi => MemberCanViewBlock(bgi, member).Result == false);
        //     blockGridItems.ForEach(bgi =>
        //     {

        //     })

        //     return blockGridItems;
        // }
        public async Task<bool> MemberCanViewPage(IPublishedContent page, MemberIdentityUser? member)
        {

            var PageVisibleToAll = page.Value(_gatedMemberGroups) != null && page.Value<bool>(_visibleToAll);
            if (PageVisibleToAll)
            {
                return true;
            }
            var authorizedMemberGroups = page.Value<string[]>(_gatedMemberGroups)?.ToList();
            bool pageHasGatedContent = authorizedMemberGroups?.Any() ?? false;
            if (member != null && pageHasGatedContent)
            {
                return await MemberIsInAuthorizedGroup(authorizedMemberGroups, member);
            }
            return false;

        }
        public async Task<bool> MemberCanViewBlock(BlockGridItem block, MemberIdentityUser? member)
        {
            // "Visible to all" will override everything if makred true.
            bool blockHasVisibilityToggle = block.Content.HasValue(_visibleToAll);
            bool blockHasGatedContent = block.Content.HasValue(_gatedMemberGroups);
            if (blockHasVisibilityToggle && block.Content.Value<bool>(_visibleToAll))
            {
                return true;
            }
            // If "Visible to all" isn't
            if (member != null && blockHasGatedContent)
            {
                var authorizedMemberGroups = block.Content.Value<string[]>(_gatedMemberGroups)?.ToList();
                return await MemberIsInAuthorizedGroup(authorizedMemberGroups, member);
            }
            if (!blockHasVisibilityToggle)
            {
                // no visibility composition added to block, assume it should be shown to all.
                return true;
            }
            return false;
        }

        public async Task<bool> MemberIsInAuthorizedGroup(List<string> authorizedMemberGroups, MemberIdentityUser member)
        {
            // get roles on the member. This will be a list of group names, NOT IDs.
            var memberGroups = await _memberManager.GetRolesAsync(member);
            if (memberGroups?.Any() ?? false)
            {
                // return result If member is in the authorized group...
                foreach (var memberGroupName in memberGroups)
                {
                    // The composition stores groups as ID references, so we need to cast the group names to ID's.
                    IMemberGroup? memberGroup = _memberGroupService.GetByName(memberGroupName);
                    var memberGroupID = memberGroup?.Id.ToString();
                    return authorizedMemberGroups.Contains(memberGroupID);
                }
            }
            return false;
        }
    }
}