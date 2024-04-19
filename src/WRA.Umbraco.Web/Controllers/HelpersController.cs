using System.Text.RegularExpressions;

namespace WRA.Umbraco.Web.Helpers;

public static class HtmlHelperExtensions
{
    public static string FormatSlug(string UglyString)
    {
        // string pattern = @"[^\w\.@:-]";
        // string str = Regex.Replace(UglyString, @"[^0-9a-zA-Z:,]+", "-").ToLower();
        string str = UglyString.ToLower();
        return System.Uri.EscapeDataString(str);
    }

    public static string ShortenExcerpt(string ExcerptContent, int CharLimit)
    {
        if (ExcerptContent != null)
        {
            string initialString = Regex.Replace(ExcerptContent, "<.*?>", string.Empty);
            string finalString = initialString.Length > CharLimit ? $"{initialString.AsSpan(0, CharLimit)}..." : initialString;
            return finalString;
        }
        else
        {
            return string.Empty;
        }
    }
}
