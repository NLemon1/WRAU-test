using Hangfire;
using MassTransit;
using Microsoft.Extensions.Logging;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Events.Consumers;

public class MemberEntityEventConsumer(ILogger<MemberEntityEventConsumer> logger)
: IConsumer<EntityEvent<MemberEvent>>
{
    public async Task Consume(ConsumeContext<EntityEvent<MemberEvent>> context)
    {
        try
        {
            var member = context.Message.Entity;
            switch (context.Message.Action)
            {
                case EntityEventAction.Update:
                    logger.LogInformation("Updating member: {Member}.", member.Id);
                    BackgroundJob.Enqueue<WraMemberManagementService>(x => x.CreateOrUpdate(member));
                    logger.LogInformation("Member update task queued.");
                    await Task.CompletedTask;
                    break;
                case EntityEventAction.Create:
                    logger.LogInformation("Creating member: {Member}.", member.Id);
                    BackgroundJob.Enqueue<WraMemberManagementService>(x => x.CreateOrUpdate(member));
                    logger.LogInformation("Member create task queued.");
                    await Task.CompletedTask;
                    break;
                case EntityEventAction.Delete:
                    logger.LogInformation("Deleting member: {Member}.", member.Id);
                    BackgroundJob.Enqueue<WraMemberManagementService>(x => x.Delete(member));
                    logger.LogInformation("Member delete task queued.");
                    await Task.CompletedTask;
                    break;
                default:
                    logger.LogInformation("Member action not supported: {Action}.", context.Message.Action);
                    break;
            }
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error consuming member event.");
            throw;
        }
    }
}