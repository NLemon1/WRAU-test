using Umbraco.Forms.Core.Attributes;
using Umbraco.Forms.Core.Enums;
using Umbraco.Forms.Core;

namespace WRA.Umbraco.Forms.Fields;

// Not needed but leaving as an example for future.
public class CallbackDateDropDownListField : FieldType
{
    public CallbackDateDropDownListField()
    {
        Id = UmbracoFormsCustomConstants.CallbackDateDropdownField;
        Name = "Hotline Selectable Callback Dates Dropdown";
        Description = "(Do not use, just use normal dropdown) Lists available days for scheduling a call back.";
        Icon = "icon-indent";
        Category = "List";
        SortOrder = 80;
        ShowLabel = "True";
        DataType = FieldDataType.String;
        Category = "Pickers";
        FieldTypeViewName = "~/Views/Partials/Forms/Themes/custom/Fieldtypes/FieldType.CallbackDateDropDownList.cshtml";

    }

    #region [ Default Dropdown Properties ]

    // Summary:
    //     Gets or sets a default value for the form field.
    [Setting("Default Value", Description = "Enter a default value.", SupportsPlaceholders = true, DisplayOrder = 10)]
    public virtual string DefaultValue { get; set; } = string.Empty;

    // Summary:
    //     Gets or sets a value indicating whether multiple values can be selected.
    [Setting("Allow multiple selections", Description = "Indicate whether multiple selections from the list are allowed.", View = "checkbox", DisplayOrder = 20)]
    public virtual string AllowMultipleSelections { get; set; } = string.Empty;

    // Summary:
    //     Gets or sets a value indicating whether the field label should be shown. PreValues
    //     are a single element, a boolean indicating whether the default for the the checkbox
    //     is "checked".
    [Setting("Show Label", Description = "Indicate whether the the field's label should be shown when rendering the form.", View = "checkbox", PreValues = "true", DisplayOrder = 30)]
    public virtual string ShowLabel { get; set; }

    public override bool HideLabel => ShowLabel == "False";

    // Summary:
    //     Gets or sets the form field's autocomplete attribute value.
    [Setting("Autocomplete attribute", Description = "Optionally enter a value for the autocomplete attribute.", View = "TextField", DisplayOrder = 40)]
    public virtual string AutocompleteAttribute { get; set; } = string.Empty;

    // Summary:
    //     Gets or sets the selection prompt for the drop-down list.
    [Setting("Prompt for selection", Description = "Optionally provide a prompt for the user's selection.", SupportsPlaceholders = true, View = "TextField", DisplayOrder = 40)]
    public virtual string SelectPrompt { get; set; } = string.Empty;

    public override bool SupportsPreValues => true;

    public override string EditView
    {
        get
        {
            if (string.IsNullOrEmpty(AllowMultipleSelections) || !AllowMultipleSelections.Equals("True", StringComparison.InvariantCultureIgnoreCase))
            {
                return "dropdown-single";
            }

            return "dropdown-multiple";
        }
    }

    #endregion

    public override string GetDesignView()
    {
        // Just using default template for drop down but you can put your own in this same folder.
        return "~/App_Plugins/UmbracoForms/backoffice/Common/FieldTypes/dropdownlist.html";
    }

}