namespace WRA.Umbraco.Configuration.Settings;

/// <summary>
/// Settings for controlling automatic creation of Year / Month folders.
/// </summary>
public class DateFolderSettings : IConfigurationSettings
{
    // Item document types that can be sorted into year / month folders.
    public List<string> ItemDocTypes { get; set; } = [];

    // Document types that can serve as a parent folder for the Year folders.
    public List<string> AllowedParentDocTypes { get; set; } = [];

    // The document type to use for the year and month folders themselves.
    required public string FolderDocType { get; set; }

    // The property on the Item Document Types that will be used to get a date. (Creation date used if this isn't found).
    required public string ItemDateProperty { get; set; }
}