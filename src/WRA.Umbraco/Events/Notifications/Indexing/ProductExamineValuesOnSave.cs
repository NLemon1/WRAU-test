using Examine;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Web;

namespace WRA.Umbraco.Events;

public class ProductExamineValuesOnSave(
    IExamineManager examineManager,
    IUmbracoContextFactory umbracoContextFactory,
    ILogger<TransformExamineValues> transformExamineValuesLogger,
    ILogger<ProductExamineValuesOnSave> logger
    ) : INotificationHandler<ContentCacheRefresherNotification>
{
    private readonly IExamineManager _examineManager = examineManager ?? throw new ArgumentNullException(nameof(examineManager));
    private readonly IUmbracoContextFactory _umbracoContextFactory = umbracoContextFactory ?? throw new ArgumentNullException(nameof(umbracoContextFactory));
    private readonly ILogger<ProductExamineValuesOnSave> _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    private readonly ILogger<TransformExamineValues> _transformExamineLogger = transformExamineValuesLogger ?? throw new ArgumentNullException(nameof(transformExamineValuesLogger));

    public void Handle(ContentCacheRefresherNotification notification)
    {
        try
        {
            TransformExamineValues transformExamineValues = new(_examineManager, _umbracoContextFactory, _transformExamineLogger);
            transformExamineValues.SetCategoriesOnProducts();
            transformExamineValues.DisposeIfDisposable();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Exception encountered during examine startup. {Message}", ex.Message);
            throw;
        }
    }
}