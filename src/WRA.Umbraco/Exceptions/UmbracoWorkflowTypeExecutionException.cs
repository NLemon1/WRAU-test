namespace WRA.Umbraco.Exceptions;
public class UmbracoWorkflowTypeExecutionException : Exception
{
    // Property to hold additional information if needed
    public object? FailedInput { get; private set; }

    // Default constructor
    public UmbracoWorkflowTypeExecutionException()
    {
    }

    // Constructor with message parameter
    public UmbracoWorkflowTypeExecutionException(string message)
    : base(message)
    {
    }

    // Constructor with message and inner exception parameters
    public UmbracoWorkflowTypeExecutionException(string message, Exception inner)
    : base(message, inner)
    {
    }

    // Constructor with message, failed input, and inner exception parameters
    public UmbracoWorkflowTypeExecutionException(string message, object? failedInput, Exception inner)
    : base(message, inner)
    {
        FailedInput = failedInput;
    }
}
