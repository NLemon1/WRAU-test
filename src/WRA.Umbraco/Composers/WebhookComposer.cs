using Umbraco.Cms.Core.Composing;
using WRA.Umbraco.Webhooks;

public class CustomWebhookComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.WebhookEvents()
            .Clear()
            .Add<WraMemberWebhook>()
            .Add<WraProductWebhook>()
            .AddCms(cmsBuilder =>
            {
                // Add your custom events here
                cmsBuilder
                    .AddDefault()
                    .AddContent()
                    .AddContentType()
                    .AddDataType()
                    .AddDictionary()
                    .AddDomain()
                    .AddFile()
                    .AddHealthCheck()
                    .AddLanguage()
                    .AddMedia()
                    .AddMember()
                    .AddPackage()
                    .AddPublicAccess()
                    .AddRelation()
                    .AddRelationType()
                    .AddUser();

            });
    }
}