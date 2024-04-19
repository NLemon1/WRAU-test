namespace WRA.Umbraco.Exceptions;

public class MessagePublishException : Exception
{
    // Property to hold additional information if needed
    public object? FailedInput { get; private set; }

    // Default constructor
    public MessagePublishException()
    {
    }

    // Constructor with message parameter
    public MessagePublishException(string message)
    : base(message)
    {
    }

    // Constructor with message and inner exception parameters
    public MessagePublishException(string message, Exception inner)
    : base(message, inner)
    {
    }

    // Constructor with message, failed input, and inner exception parameters
    public MessagePublishException(string message, object? failedInput, Exception inner)
    : base(message, inner)
    {
        FailedInput = failedInput;
    }
}
