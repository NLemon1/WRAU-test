using MassTransit;
using Microsoft.Extensions.Logging;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Events.ServiceBusSubscriptions.Consumers;

public class MemberUpdateConsumer(
    ILogger<MemberUpdateConsumer> logger,
    WraMemberManagementService memberManagementService)
    : IConsumer<IEntityEvent<IMemberEvent>>
{
    public async Task Consume(ConsumeContext<IEntityEvent<IMemberEvent>> context)
    {
        var member = context.Message.Entity;
        // context.Headers.TryGetHeader("Source", out var source);
        // switch case??

        // if (counter < 1)
        // {
        //     counter++;
        //     logger.LogInformation("Updating member: {member}.", member.iMISId);
        //     memberManagementService.Create(member);
        // }
        switch (context.Message.Source)
        {
            case EntityEventSource.UmbracoCloud:
                logger.LogInformation("Source is UmbracoCloud. skipping..");
                await Task.CompletedTask;
                break;
            default:
                // var memberDto = umbracoMapper.Map<MemberDto>(source);
                // if (memberDto == null){logger.LogError("Could not map member entity to memberDto");}

                logger.LogInformation("Updating member: {member}.", member.iMISId);
                await memberManagementService.CreateOrUpdate(member);
                await Task.CompletedTask;
                logger.LogInformation("Member updated.");
                break;
        }
    }
}