using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Mapping;
using WRA.Umbraco.Mapping;

namespace WRA.Umbraco.Composers
{
    public class MappingComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.WithCollectionBuilder<MapDefinitionCollectionBuilder>()
                .Add<MemberMapping>()
                .Add<ProductMapping>()
                .Add<CategoryMapping>();
        }
    }
}