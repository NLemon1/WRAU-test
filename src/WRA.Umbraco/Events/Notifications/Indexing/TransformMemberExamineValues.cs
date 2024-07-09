using Examine;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Core.Services;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models;
using WRA.Umbraco.Helpers;
using WRA.Umbraco.Helpers.Constants;

namespace WRA.Umbraco.Events;
public class TransformMemberExamineValues(IExamineManager examineManager,
    IMemberService memberService,
    ILogger<TransformMemberExamineValues> logger)
{
    private readonly IExamineManager _examineManager = examineManager ?? throw new ArgumentNullException(nameof(examineManager));
    private readonly IMemberService _memberService = memberService ?? throw new ArgumentNullException(nameof(memberService));
    private readonly ILogger<TransformMemberExamineValues> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    public void SetMemberCustomFields()
    {
        if (_examineManager.TryGetIndex(Constants.UmbracoIndexes.MembersIndexName, out var index))
        {
            try
            {
                ((BaseIndexProvider)index).TransformingIndexValues += (object? sender, IndexingItemEventArgs e) =>
                {
                    var values = e.ValueSet.Values.ToDictionary(x => x.Key, x => (IEnumerable<object>)x.Value);
                    if (e.ValueSet.ItemType.InvariantEquals("Member"))
                    {
                        string? memberId = e.ValueSet.GetValue("id").ToString();

                        if (memberId is not null)
                        {
                            int id = int.Parse(memberId);
                            IMember? member = _memberService.GetById(id);
                            string? externalId = member?.GetValue(GlobalConstants.ExternalId)?.ToString() ?? string.Empty;
                            SetOrUpdateExamineValue(values, GlobalConstants.ExternalId, externalId);
                        }
                    }
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not get the members index.");

                throw;
            }
        }
        else
        {
            _logger.LogError("Could not get the members index.");
        }
    }

    private static void SetOrUpdateExamineValue(Dictionary<string, IEnumerable<object>> values, string key, string value)
    {
        values[key] = [value];
    }
}
