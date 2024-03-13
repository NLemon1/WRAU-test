using Examine;
using System.Linq;
using System.Collections.Generic;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Web;
using Umbraco.Extensions;
using WRA.Umbraco.Models;
using System.Text;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Services;

namespace WRA.Umbraco.Events;
public class TransformMemberExamineValues
{
    private readonly IExamineManager _examineManager;
    private readonly IUmbracoContextFactory _umbracoContextFactory;
    private readonly IMemberService _memberService;

    public TransformMemberExamineValues(IExamineManager examineManager,
        IUmbracoContextFactory umbracoContextFactory,
        IMemberService memberService)
    {
        _examineManager = examineManager;
        _umbracoContextFactory = umbracoContextFactory;
        _memberService = memberService;
    }


    public void SetMemberCustomFields()
    {
        if (_examineManager.TryGetIndex(Constants.UmbracoIndexes.MembersIndexName, out var index))
        {
            try
            {
                ((BaseIndexProvider)index).TransformingIndexValues += (object sender, IndexingItemEventArgs e) =>
                {
                    var values = e.ValueSet.Values.ToDictionary(x => x.Key, x => (IEnumerable<object>)x.Value);
                    if (e.ValueSet.ItemType.InvariantEquals("Member"))
                    {
                        var memberId = e.ValueSet.GetValue("id").ToString();
                        int id = int.Parse(memberId);
                        var memberExternalId = _memberService.GetById(id);
                        var externalId = memberExternalId.GetValue("externalId").ToString();
                        SetOrUpdateExamineValue(values, "ExternalId", externalId);

                        // if (e.ValueSet.Values.ContainsKey("ExternalId"))
                        // {
                        //     SetOrUpdateExamineValue(values, "ExternalId", e.ValueSet.GetValue("ExternalId").ToString());
                        // }
                    }

                };
            }
            catch (System.Exception)
            {

                throw;
            }

        }
    }

    private void SetOrUpdateExamineValue(Dictionary<string, IEnumerable<object>> values, string key, string value)
    {
        if (values.ContainsKey(key))
        {
            values[key] = new[] { value };
        }
        else
        {
            values.Add(key, new[] { value });
        }
    }

    private void SetOrUpdateExamineValue(Dictionary<string, IEnumerable<object>> values, string key, string[] value)
    {
        SetOrUpdateExamineValue(values, key, string.Join(" ", value));
    }



}
