namespace WRA.Umbraco.Configurations
{
    public class DateFoldersConfig
    {
        public List<string> ItemDocTypes { get; set; } = [];

        public List<string> AllowedParentDocTypes { get; set; } = [];

        public required string FolderDocType { get; set; }

        public required string ItemDateProperty { get; set; }
    }
}