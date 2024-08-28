using System.Text.RegularExpressions;

namespace WRA.Umbraco.Extensions;

/// <summary>
/// Provides HTML helper extension methods.
/// </summary>
public static class HtmlHelperExtensions
{
    /// <summary>
    /// Formats a string into a URL-friendly slug.
    /// </summary>
    /// <param name="uglyString">The string to format.</param>
    /// <returns>A URL-encoded, lowercase version of the input string, or an empty string if the input is null or empty.</returns>
    public static string FormatSlug(string uglyString)
    {
        if (string.IsNullOrEmpty(uglyString))
        {
            return string.Empty;
        }

        return Uri.EscapeDataString(uglyString.ToLower());
    }

    /// <summary>
    /// Truncates an excerpt to a specified character limit, removing any HTML tags.
    /// </summary>
    /// <param name="excerptContent">The content to truncate.</param>
    /// <param name="charLimit">The character limit for truncation.</param>
    /// <returns>A truncated version of the content with HTML tags removed, followed by ellipsis if truncated, or an empty string if the input is null or empty.</returns>
    public static string TruncateExcerpt(string excerptContent, int charLimit)
    {
        if (string.IsNullOrEmpty(excerptContent))
        {
            return string.Empty;
        }

        string initialString = Regex.Replace(excerptContent, "<.*?>", string.Empty);
        return initialString.Length > charLimit ? $"{initialString[..charLimit]}..." : initialString;
    }
}