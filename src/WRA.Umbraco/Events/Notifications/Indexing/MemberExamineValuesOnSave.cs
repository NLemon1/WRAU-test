using Examine;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Core.Services;
using Microsoft.Extensions.Logging;

namespace WRA.Umbraco.Events;

public class MemberExamineValuesOnSave(
    IExamineManager examineManager,
    IUmbracoContextFactory umbracoContextFactory,
    IMemberService memberService,
    ILogger<TransformExamineValues> transformExamineValuesLogger,
    ILogger<TransformMemberExamineValues> transformMemberValuesLogger,
    ILogger<MemberExamineValuesOnSave> logger
    ) : INotificationHandler<MemberSavedNotification>
{

    public void Handle(MemberSavedNotification notification)
    {
        try
        {
            var transformExamineValues = new TransformExamineValues(examineManager, umbracoContextFactory, transformExamineValuesLogger);
            var transformMemberExamineValues = new TransformMemberExamineValues(examineManager, memberService, transformMemberValuesLogger);
            transformMemberExamineValues.SetMemberCustomFields();
            transformExamineValues.DisposeIfDisposable();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Exception encountered during examine startup. {Message}", ex.Message);
            throw;
        }
    }
}
