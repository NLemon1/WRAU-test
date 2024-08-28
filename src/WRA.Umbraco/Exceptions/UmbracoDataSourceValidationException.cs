namespace WRA.Umbraco.Exceptions;
public class UmbracoDataSourceValidationException : Exception
{
    // Property to hold additional information if needed
    public object? FailedInput { get; private set; }

    // Default constructor
    public UmbracoDataSourceValidationException()
    {
    }

    // Constructor with message parameter
    public UmbracoDataSourceValidationException(string message)
    : base(message)
    {
    }

    // Constructor with message and inner exception parameters
    public UmbracoDataSourceValidationException(string message, Exception inner)
    : base(message, inner)
    {
    }

    // Constructor with message, failed input, and inner exception parameters
    public UmbracoDataSourceValidationException(string message, object? failedInput, Exception inner)
    : base(message, inner)
    {
        FailedInput = failedInput;
    }
}
