namespace WRA.Umbraco.Exceptions;
public class UmbracoDataSourceException : Exception
{
    // Property to hold additional information if needed
    public object? FailedInput { get; private set; }

    // Default constructor
    public UmbracoDataSourceException()
    {
    }

    // Constructor with message parameter
    public UmbracoDataSourceException(string message)
    : base(message)
    {
    }

    // Constructor with message and inner exception parameters
    public UmbracoDataSourceException(string message, Exception inner)
    : base(message, inner)
    {
    }

    // Constructor with message, failed input, and inner exception parameters
    public UmbracoDataSourceException(string message, object? failedInput, Exception inner)
    : base(message, inner)
    {
        FailedInput = failedInput;
    }
}
