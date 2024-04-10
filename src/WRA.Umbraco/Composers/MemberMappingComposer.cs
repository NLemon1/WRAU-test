using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Mapping;
using WRA.Umbraco.Mapping.Member;

public class MemberMappingComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.WithCollectionBuilder<MapDefinitionCollectionBuilder>()
            .Add<MemberMapping>();
    }
}