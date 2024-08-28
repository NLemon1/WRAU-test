using Umbraco.Cms.Core.Mapping;
using Umbraco.Forms.Core;
using Umbraco.Forms.Core.Enums;
using WRA.Umbraco.Exceptions;
using WRA.Umbraco.Forms.Extensions;
using WRA.Umbraco.Forms.Models;
using WRA.UmbracoBridgeServices;

namespace WRA.Umbraco.Forms.WorkflowTypes;

public class SubmitHotlineCallWorkflowType : WorkflowType
{
    private readonly ILogger _logger;
    private readonly IUmbracoBridgeServiceClient _bridgeServiceClient;
    private readonly IUmbracoMapper _umbracoMapper;

    public SubmitHotlineCallWorkflowType(ILogger logger, IUmbracoBridgeServiceClient bridgeServiceClient, IUmbracoMapper umbracoMapper)
    {
        Id = UmbracoFormsCustomConstants.PostFormToJsonWorkflowType;
        Name = "Post Legal Hotline Call";
        Description = "Creates a call on the legal hotline application from the form request.";
        Icon = "icon-operator";
        Group = "Services";
        _logger = logger.ForContext<SubmitHotlineCallWorkflowType>();
        _bridgeServiceClient = bridgeServiceClient;
        _umbracoMapper = umbracoMapper;
    }

    public override List<Exception> ValidateSettings()
    {

        // #erictodo once we can test form submissions see if there is anything we need to validate.
        var errors = new List<Exception>();

        return errors;
    }

    public override async Task<WorkflowExecutionStatus> ExecuteAsync(WorkflowExecutionContext context)
    {
        using var activity = _logger.StartActivity(LogEventLevel.Information, "Executing Workflow Type '{WorkflowTypeName}' with id '{WorkflowTypeId}'", Name, Id);
        try
        {
            var legalHotlineForm = context.MapToFormModel<LegalHotlineFormSubmissionModel>();

            // #todoeric this still needs the mapping logic in umbraco mapper once we firm up the legal hotline form model.
            var createLegalHotlineCallRequest = _umbracoMapper.Map<CreateLegalHotlineCallRequest>(legalHotlineForm);

            await _bridgeServiceClient.LegalHotlineCall_CreateLegalHotlineCallAsync(createLegalHotlineCallRequest);

            activity.Complete();
            return WorkflowExecutionStatus.Completed;

        }
        catch (Exception ex)
        {
            activity.Complete(LogEventLevel.Error, new UmbracoWorkflowTypeExecutionException($"Failed to execute the workflow type. '{Name}' with id {Id}", ex));
            return WorkflowExecutionStatus.Failed;
        }
    }
}