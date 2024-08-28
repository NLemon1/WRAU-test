namespace WRA.Umbraco.Helpers.Constants;

public static class GlobalConstants
{
    public const string ExternalId = "externalId";

    public static class Order
    {
        public const string NotShippable = "notShippable";
    }

    public static class Product
    {
        public const string Sku = "sku";
    }

    public static class GatedContent
    {
        public const string GatedMemberGroups = "VisibleToMemberGroups";
        public const string VisibleToAll = "VisibleToAll";
        public const string AnonymousUserName = "Anonymous";
    }

    public static class Member
    {
        public const string LocalBoards = "localBoards";
        public const string HashAlias = "token";
        public const string Company = "company";
        public const string FirstName = "firstName";
        public const string LastName = "lastName";
        public const string Email = "email";
        public const string WorkPhone = "workPhone";
        public const string HomePhone = "homePhone";
        public const string CellPhone = "cellPhone";
        public const string AddressLine1 = "address1";
        public const string AddressLine2 = "address2";
        public const string AddressLine3 = "address3";
        public const string City = "city";
        public const string State = "state";
        public const string ZipCode = "zip";
        public const string PersonalWebSite = "personalWebsite";
        public const string SecondaryLanguage = "secondaryLanguage";
        public const string AreaOfSpecialty = "areaOfSpecialty";
        public const string PrimaryCounties = "PrimaryCounties";
    }

    public static class Api
    {
        public const string ApiKeyHeaderFallbackName = "X-API-KEY";
    }
}