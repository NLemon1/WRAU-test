using System.Collections.Immutable;

namespace WRA.Umbraco.Forms;

// Used for static properties in Umbraco Forms custom fields, properties etc..
public static class UmbracoFormsCustomConstants
{
    // Sequential Ids because why not.
    public static readonly Guid CallbackDateDropdownField = new ("F756E12A-B2F9-40E5-9D74-9EA20AD10CFA");
    public static readonly Guid CallbackDateDropdownDataSource = new ("F856E12A-B2F9-40E5-9D74-9EA20AD10CFA");
    public static readonly Guid PostFormToJsonWorkflowType = new ("F956E12A-B2F9-40E5-9D74-9EA20AD10CFA");
    public static readonly Guid SubmitHotlineCallWorkflowType = new ("FA56E12A-B2F9-40E5-9D74-9EA20AD10CFA");

    // Placeholder for custom fields and sources
    public static readonly Guid CustomField05 = new ("FB56E12A-B2F9-40E5-9D74-9EA20AD10CFA");
    public static readonly Guid CustomField06 = new ("FC56E12A-B2F9-40E5-9D74-9EA20AD10CFA");
    public static readonly Guid CustomField07 = new ("FD56E12A-B2F9-40E5-9D74-9EA20AD10CFA");
    public static readonly Guid CustomField08 = new ("FE56E12A-B2F9-40E5-9D74-9EA20AD10CFA");
    public static readonly Guid CustomField09 = new ("FF56E12A-B2F9-40E5-9D74-9EA20AD10CFA");
    public static readonly Guid CustomField10 = new ("0057E12A-B2F9-40E5-9D74-9EA20AD10CFA");
    public static readonly Guid CustomField11 = new ("0157E12A-B2F9-40E5-9D74-9EA20AD10CFA");
    public static readonly Guid CustomField12 = new ("0257E12A-B2F9-40E5-9D74-9EA20AD10CFA");
    public static readonly Guid CustomField13 = new ("0357E12A-B2F9-40E5-9D74-9EA20AD10CFA");
    public static readonly Guid CustomField14 = new ("0457E12A-B2F9-40E5-9D74-9EA20AD10CFA");
    public static readonly Guid CustomField15 = new ("0557E12A-B2F9-40E5-9D74-9EA20AD10CFA");
    public static readonly Guid CustomField16 = new ("0657E12A-B2F9-40E5-9D74-9EA20AD10CFA");
    public static readonly Guid CustomField17 = new ("0757E12A-B2F9-40E5-9D74-9EA20AD10CFA");
    public static readonly Guid CustomField18 = new ("0857E12A-B2F9-40E5-9D74-9EA20AD10CFA");
    public static readonly Guid CustomField19 = new ("0957E12A-B2F9-40E5-9D74-9EA20AD10CFA");
    public static readonly Guid CustomField20 = new ("0A57E12A-B2F9-40E5-9D74-9EA20AD10CFA");

    public static readonly ImmutableDictionary<string, Guid> FieldNameMap = ImmutableDictionary.CreateRange(
      new[]
      {
                new KeyValuePair<string, Guid>(nameof(CallbackDateDropdownField), CallbackDateDropdownField),
                new KeyValuePair<string, Guid>(nameof(CallbackDateDropdownDataSource), CallbackDateDropdownDataSource),
                new KeyValuePair<string, Guid>(nameof(PostFormToJsonWorkflowType), PostFormToJsonWorkflowType),
                new KeyValuePair<string, Guid>(nameof(SubmitHotlineCallWorkflowType), SubmitHotlineCallWorkflowType),
                new KeyValuePair<string, Guid>(nameof(CustomField05), CustomField05),
                new KeyValuePair<string, Guid>(nameof(CustomField06), CustomField06),
                new KeyValuePair<string, Guid>(nameof(CustomField07), CustomField07),
                new KeyValuePair<string, Guid>(nameof(CustomField08), CustomField08),
                new KeyValuePair<string, Guid>(nameof(CustomField09), CustomField09),
                new KeyValuePair<string, Guid>(nameof(CustomField10), CustomField10),
                new KeyValuePair<string, Guid>(nameof(CustomField11), CustomField11),
                new KeyValuePair<string, Guid>(nameof(CustomField12), CustomField12),
                new KeyValuePair<string, Guid>(nameof(CustomField13), CustomField13),
                new KeyValuePair<string, Guid>(nameof(CustomField14), CustomField14),
                new KeyValuePair<string, Guid>(nameof(CustomField15), CustomField15),
                new KeyValuePair<string, Guid>(nameof(CustomField16), CustomField16),
                new KeyValuePair<string, Guid>(nameof(CustomField17), CustomField17),
                new KeyValuePair<string, Guid>(nameof(CustomField18), CustomField18),
                new KeyValuePair<string, Guid>(nameof(CustomField19), CustomField19),
                new KeyValuePair<string, Guid>(nameof(CustomField20), CustomField20),
      });
}