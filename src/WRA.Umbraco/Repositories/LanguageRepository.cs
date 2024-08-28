using WRA.Umbraco.Web.Dtos.External;

namespace WRA.Umbraco.Repositories;

// #todoeric probably store these locally in umbraco sql.
public class LanguageRepository
{
    public IEnumerable<ExternalLanguageDto> GetAllLanguages()
    {
        return new List<ExternalLanguageDto>
        {
            new () { Id = new Guid("526D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Afrikaans",  Name = "Afrikaans", SortSeqn = 1 },
            new () { Id = new Guid("536D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Albanian",  Name = "Albanian", SortSeqn = 2 },
            new () { Id = new Guid("546D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Arabic",  Name = "Arabic", SortSeqn = 3 },
            new () { Id = new Guid("556D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Armenian",  Name = "Armenian", SortSeqn = 4 },
            new () { Id = new Guid("566D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Bosnian",  Name = "Bosnian", SortSeqn = 5 },
            new () { Id = new Guid("576D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Bulgarian",  Name = "Bulgarian", SortSeqn = 6 },
            new () { Id = new Guid("586D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Chinese",  Name = "Chinese", SortSeqn = 7 },
            new () { Id = new Guid("596D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Croatian",  Name = "Croatian", SortSeqn = 8 },
            new () { Id = new Guid("5A6D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Czech/Slovak",  Name = "Czech/Slovak", SortSeqn = 9 },
            new () { Id = new Guid("5B6D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Danish",  Name = "Danish", SortSeqn = 10 },
            new () { Id = new Guid("5C6D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Dutch",  Name = "Dutch", SortSeqn = 11 },
            new () { Id = new Guid("5D6D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "English",  Name = "English", SortSeqn = 12 },
            new () { Id = new Guid("5E6D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Estonian",  Name = "Estonian", SortSeqn = 13 },
            new () { Id = new Guid("5F6D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Farsi",  Name = "Farsi", SortSeqn = 14 },
            new () { Id = new Guid("606D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Filipino",  Name = "Filipino", SortSeqn = 15 },
            new () { Id = new Guid("616D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Finnish",  Name = "Finnish", SortSeqn = 16 },
            new () { Id = new Guid("626D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "French",  Name = "French", SortSeqn = 17 },
            new () { Id = new Guid("636D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Gaelic",  Name = "Gaelic", SortSeqn = 18 },
            new () { Id = new Guid("646D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "German",  Name = "German", SortSeqn = 19 },
            new () { Id = new Guid("656D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Greek",  Name = "Greek", SortSeqn = 20 },
            new () { Id = new Guid("666D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Hebrew",  Name = "Hebrew", SortSeqn = 21 },
            new () { Id = new Guid("676D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Hindi",  Name = "Hindi", SortSeqn = 22 },
            new () { Id = new Guid("686D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Hmong",  Name = "Hmong", SortSeqn = 23 },
            new () { Id = new Guid("696D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Hungarian",  Name = "Hungarian", SortSeqn = 24 },
            new () { Id = new Guid("6A6D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Indonesian",  Name = "Indonesian", SortSeqn = 25 },
            new () { Id = new Guid("6B6D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Italian",  Name = "Italian", SortSeqn = 26 },
            new () { Id = new Guid("6C6D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Japanese",  Name = "Japanese", SortSeqn = 27 },
            new () { Id = new Guid("6D6D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Korean",  Name = "Korean", SortSeqn = 28 },
            new () { Id = new Guid("6E6D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Laos",  Name = "Laos", SortSeqn = 29 },
            new () { Id = new Guid("6F6D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Latvian",  Name = "Latvian", SortSeqn = 30 },
            new () { Id = new Guid("706D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Lithuanian",  Name = "Lithuanian", SortSeqn = 31 },
            new () { Id = new Guid("716D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Malay",  Name = "Malay", SortSeqn = 32 },
            new () { Id = new Guid("726D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Mandarin",  Name = "Mandarin", SortSeqn = 33 },
            new () { Id = new Guid("736D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Montenegrin",  Name = "Montenegrin", SortSeqn = 34 },
            new () { Id = new Guid("746D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Norwegian",  Name = "Norwegian", SortSeqn = 35 },
            new () { Id = new Guid("756D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Other",  Name = "Other", SortSeqn = 36 },
            new () { Id = new Guid("766D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Polish",  Name = "Polish", SortSeqn = 37 },
            new () { Id = new Guid("776D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Portuguese",  Name = "Portuguese", SortSeqn = 38 },
            new () { Id = new Guid("786D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Punjabi",  Name = "Punjabi", SortSeqn = 39 },
            new () { Id = new Guid("796D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Romanian",  Name = "Romanian", SortSeqn = 40 },
            new () { Id = new Guid("7A6D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Russian",  Name = "Russian", SortSeqn = 41 },
            new () { Id = new Guid("7B6D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Serbian",  Name = "Serbian", SortSeqn = 42 },
            new () { Id = new Guid("7C6D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Sign Language",  Name = "Sign Language", SortSeqn = 43 },
            new () { Id = new Guid("7D6D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Slovenian",  Name = "Slovenian", SortSeqn = 44 },
            new () { Id = new Guid("7E6D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Spanish",  Name = "Spanish", SortSeqn = 45 },
            new () { Id = new Guid("7F6D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Swahili",  Name = "Swahili", SortSeqn = 46 },
            new () { Id = new Guid("806D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Swedish",  Name = "Swedish", SortSeqn = 47 },
            new () { Id = new Guid("816D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Tagalog",  Name = "Tagalog", SortSeqn = 48 },
            new () { Id = new Guid("826D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Thai",  Name = "Thai", SortSeqn = 49 },
            new () { Id = new Guid("836D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Turkish",  Name = "Turkish", SortSeqn = 50 },
            new () { Id = new Guid("846D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Ukrainian",  Name = "Ukrainian", SortSeqn = 51 },
            new () { Id = new Guid("856D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Urdu",  Name = "Urdu", SortSeqn = 52 },
            new () { Id = new Guid("866D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Vietnamese",  Name = "Vietnamese", SortSeqn = 53 },
            new () { Id = new Guid("876D36A7-8132-45FB-8AD8-E1DBCFF5CCB2"), Value = "Yugoslavian",  Name = "Yugoslavian", SortSeqn = 54 },
        }.OrderBy(l => l.SortSeqn);
    }
}