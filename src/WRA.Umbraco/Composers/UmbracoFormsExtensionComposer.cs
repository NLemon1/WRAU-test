using Umbraco.Cms.Core.Composing;
using Umbraco.Forms.Core.Providers;
using WRA.Umbraco.Forms.Fields;
using WRA.Umbraco.Forms.SubmitHotlineCall;
using WRA.Umbraco.Forms.WorkflowTypes;

namespace WRA.Umbraco.Composers;

public class UmbracoFormsExtensionsComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        // Register the custom data sources.
        builder.WithCollectionBuilder<FieldPreValueSourceCollectionBuilder>()
            .Add<CallbackDateDataSource>();

        // Register the custom fields.
        builder.WithCollectionBuilder<FieldCollectionBuilder>()
            .Add<CallbackDateDropDownListField>();

        // Register the custom workflow types.
        builder.WithCollectionBuilder<WorkflowCollectionBuilder>()
            .Add<PostToJsonWorkflowType>()
            .Add<SubmitHotlineCallWorkflowType>();
    }
}
