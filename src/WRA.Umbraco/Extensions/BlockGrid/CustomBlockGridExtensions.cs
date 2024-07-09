using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using Umbraco.Cms.Core.Models.Blocks;

namespace WRA.Umbraco.Web.Extensions
{
    public static class CustomBlockGridExtensions
    {
        private static string DefaultFolderTemplate(string template)
        {
            return "blockgrid/" + template;
        }

        public static async Task<IHtmlContent> GetGatedBlockGridItem(this IHtmlHelper html, IEnumerable<BlockGridItem> items, string template = "items")
        {

            return await html.PartialAsync(DefaultFolderTemplate(template), items);
        }
    }
}