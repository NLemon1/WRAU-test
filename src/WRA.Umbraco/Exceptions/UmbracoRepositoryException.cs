namespace WRA.Umbraco.Exceptions;
public class UmbracoRepositoryException : Exception
{
    // Property to hold additional information if needed
    public object? FailedInput { get; private set; }

    // Default constructor
    public UmbracoRepositoryException()
    {
    }

    // Constructor with message parameter
    public UmbracoRepositoryException(string message)
    : base(message)
    {
    }

    // Constructor with message and inner exception parameters
    public UmbracoRepositoryException(string message, Exception inner)
    : base(message, inner)
    {
    }

    // Constructor with message, failed input, and inner exception parameters
    public UmbracoRepositoryException(string message, object? failedInput, Exception inner)
    : base(message, inner)
    {
        FailedInput = failedInput;
    }
}
