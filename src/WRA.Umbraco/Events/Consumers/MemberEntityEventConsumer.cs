using Hangfire;
using MassTransit;
using Microsoft.Extensions.Logging;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Events.Consumers;

public class MemberEntityEventConsumer(ILogger<MemberEntityEventConsumer> logger, WraMemberManagementService memberManagementService)
: IConsumer<EntityEvent<MemberEvent>>
{
    public async Task Consume(ConsumeContext<EntityEvent<MemberEvent>> context)
    {
        var member = context.Message.Entity;
        if (member is not null)
        {
            switch (context.Message.Source)
            {
                case EntityEventSource.UmbracoCloud:
                    logger.LogInformation("Source is UmbracoCloud. Skipping...");
                    await Task.CompletedTask;
                    break;
                default:
                    logger.LogInformation("Updating member: {Member}.", member.iMISId);
                    BackgroundJob.Enqueue<WraMemberManagementService>(x => x.CreateOrUpdate(member));
                    logger.LogInformation("Member update task queued.");
                    await Task.CompletedTask;
                    break;
            }
        }

        await Task.CompletedTask;
    }
}