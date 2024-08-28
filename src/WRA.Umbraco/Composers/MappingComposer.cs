using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Mapping;
using WRA.Umbraco.Mapping;

namespace WRA.Umbraco.Composers
{
    [ComposeAfter(typeof(CustomServiceComposer))]
    public class MappingComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.WithCollectionBuilder<MapDefinitionCollectionBuilder>()
                .Add<MemberMapping>()
                .Add<ProductMapping>()
                .Add<DesignationMapping>()
                .Add<MemberGroupMapping>()
                .Add<FindRealtorMapping>()
                .Add<CategoryMapping>()
                .Add<SubscriptionMapping>()
                .Add<OrderMapping>()
                .Add<CourseMapping>()
                .Add<BoardMapping>();
        }
    }
}