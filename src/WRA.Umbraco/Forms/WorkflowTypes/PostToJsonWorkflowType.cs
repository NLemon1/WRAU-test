using Newtonsoft.Json;
using System.Dynamic;
using System.Net.Http.Headers;
using System.Text;
using Umbraco.Forms.Core;
using Umbraco.Forms.Core.Attributes;
using Umbraco.Forms.Core.Enums;

namespace WRA.Umbraco.Forms.WorkflowTypes;

public class PostToJsonWorkflowType : WorkflowType
{
    private readonly ILogger _logger;

    [Setting("Url", Description = "Enter the url to post to", View = "TextField")]
    public string? Url { get; set; }

    [Setting("Bearer Token", Description = "Optional: enter a bearer token for API access (don't include the word 'Bearer')", View = "TextField")]
    public string? BearerToken { get; set; }

    [Setting("Api Key", Description = "Optional: enter an api key and api key header for API access", View = "TextField")]
    public string? ApiKey { get; set; }

    [Setting("Api Key Header", Description = "Optional: enter an api key header name and api key for API access", View = "TextField")]
    public string? ApiKeyHeader { get; set; } = "X-API-KEY";

    public PostToJsonWorkflowType(ILogger logger)
    {
        Id = UmbracoFormsCustomConstants.PostFormToJsonWorkflowType;
        Name = "Post as JSON to Endpoint";
        Description = "Sends the form to a url";
        Icon = "icon-terminal";
        Group = "Services";
        _logger = logger.ForContext<PostToJsonWorkflowType>();
    }

    public override List<Exception> ValidateSettings()
    {
        var errors = new List<Exception>();
        if (string.IsNullOrEmpty(Url))
        {
            errors.Add(new Exception("'Url' setting has not been set"));
        }

        return errors;
    }

    public override async Task<WorkflowExecutionStatus> ExecuteAsync(WorkflowExecutionContext context)
    {
        using (var httpClient = new HttpClient())
        {
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            if (!string.IsNullOrEmpty(BearerToken))
            {
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", BearerToken);
            }

            var values = new Dictionary<Guid, string>();
            foreach (var field in context.Record.RecordFields)
            {
                values.Add(field.Key, field.Value.ValuesAsString());
            }

            dynamic json = new ExpandoObject();
            json.id = context.Record.UniqueId;
            json.formId = context.Form.Id;
            json.formName = context.Form.Name;
            json.ip = context.Record.IP;
            json.memberKey = context.Record.MemberKey;
            json.time = DateTime.UtcNow;
            json.values = values;

            string payload = JsonConvert.SerializeObject(json);

            try
            {
                var content = new StringContent(payload, Encoding.UTF8, "application/json");
                var response = await httpClient.PostAsync(Url, content);
                response.EnsureSuccessStatusCode();
                return WorkflowExecutionStatus.Completed;
            }
            catch (Exception ex)
            {
                _logger.Error(
                    ex,
                    "There was a problem sending the Record with unique id '{RecordUniqueId}' from the Form '{FormName}' with id '{FormId}' to the URL Endpoint '{Endpoint}' with the method 'POST'",
                    context.Record.UniqueId,
                    context.Form.Name,
                    context.Form.Id,
                    Url);

                return WorkflowExecutionStatus.Failed;
            }
        }
    }
}