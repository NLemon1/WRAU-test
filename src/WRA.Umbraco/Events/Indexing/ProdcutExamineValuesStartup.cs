using Examine;
using System.Linq;
using System.Collections.Generic;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Web;
using Umbraco.Extensions;
using WRA.Umbraco.Models;
using System.Text;

namespace WRA.Umbraco.Events
{
    public class ProdcutExamineValuesStartup : INotificationHandler<UmbracoApplicationStartingNotification>
    {
        private readonly IExamineManager _examineManager;
        private readonly IUmbracoContextFactory _umbracoContextFactory;
        public ProdcutExamineValuesStartup(IExamineManager examineManager,
            IUmbracoContextFactory umbracoContextFactory)
        {
            _examineManager = examineManager;
            _umbracoContextFactory = umbracoContextFactory;
        }


        public void Handle(UmbracoApplicationStartingNotification notification)
        {
            var TransformExamineValues = new TransformExamineValues(_examineManager, _umbracoContextFactory);
            TransformExamineValues.SetCategoriesOnProducts();
            TransformExamineValues.DisposeIfDisposable();
        }
    }
}
