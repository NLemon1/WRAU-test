using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Text;
using System.Text.RegularExpressions;



namespace WRA.Umbraco.Web.Helpers
{

    public static class HtmlHelperExtensions
    {

        public static string FormatSlug(string UglyString)
        {
            //string pattern = @"[^\w\.@:-]";
            //string str = Regex.Replace(UglyString, @"[^0-9a-zA-Z:,]+", "-").ToLower();
            string str = UglyString.ToLower();
            return System.Uri.EscapeDataString(str);
        }
        public static string ShortenExcerpt(string ExcerptContent, int CharLimit)
        {
            string initialString = Regex.Replace(ExcerptContent.ToString(), "<.*?>", String.Empty).ToString();
            string finalString = initialString.Length > CharLimit ? initialString.Substring(0, CharLimit) + "..." : initialString;
            return finalString;
        }

    }

}

