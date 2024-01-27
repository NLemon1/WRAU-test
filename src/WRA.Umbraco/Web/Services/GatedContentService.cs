

using NUglify.Helpers;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.Blocks;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;

namespace WRA.Umbraco.Services
{
    public class GatedContentService
    {
        private IMemberManager _memberManager { get; set; }
        private IMemberGroupService _memberGroupService { get; set; }
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
                var userGroups = await _memberManager.GetRolesAsync(member);
                var authorizedMemberGroups = block.Content.Value<string[]>(_gatedMemberGroups)?.ToList();
                if (userGroups.Any() && (authorizedMemberGroups != null && authorizedMemberGroups.Any()))
                {

                    foreach (var userGroup in userGroups)
                    {
                        IMemberGroup? memberGroup = _memberGroupService.GetByName(userGroup);
                        var memberGroupID = memberGroup?.Id.ToString();
                        if (memberGroupID != null && authorizedMemberGroups.Contains(memberGroupID))
                        {
                            return true;
                        }
                    }
                }
            }
            if (!blockHasVisibilityToggle)
            {
                // no visibility composition added to block, assume it should be shown to all.
                return true;
            }
            return false;
        }
    }
}