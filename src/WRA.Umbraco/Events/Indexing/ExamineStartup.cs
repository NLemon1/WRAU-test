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
using Umbraco.Cms.Core.Services;

namespace WRA.Umbraco.Events
{
    public class ExamineStartup : INotificationHandler<UmbracoApplicationStartingNotification>
    {
        private readonly IExamineManager _examineManager;
        private readonly IUmbracoContextFactory _umbracoContextFactory;
        private readonly IMemberService _memberService;
        public ExamineStartup(IExamineManager examineManager,
            IUmbracoContextFactory umbracoContextFactory,
            IMemberService memberService)
        {
            _examineManager = examineManager;
            _umbracoContextFactory = umbracoContextFactory;
            _memberService = memberService;
        }


        public void Handle(UmbracoApplicationStartingNotification notification)
        {
            var TransformExamineValues = new TransformExamineValues(_examineManager, _umbracoContextFactory);
            var TransformMemberExamineValues = new TransformMemberExamineValues(_examineManager, _umbracoContextFactory, _memberService);

            TransformExamineValues.SetCategoriesOnProducts();
            TransformMemberExamineValues.SetMemberCustomFields();
            TransformExamineValues.DisposeIfDisposable();
        }
    }
}
