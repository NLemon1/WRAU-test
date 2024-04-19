namespace WRA.Umbraco.Exceptions;

public class SubscriptionNameGenerationException : Exception
{
    // Property to hold additional information if needed
    public object? FailedInput { get; private set; }

    // Default constructor
    public SubscriptionNameGenerationException()
    {
    }

    // Constructor with message parameter
    public SubscriptionNameGenerationException(string message)
    : base(message)
    {
    }

    // Constructor with message and inner exception parameters
    public SubscriptionNameGenerationException(string message, Exception inner)
    : base(message, inner)
    {
    }

    // Constructor with message, failed input, and inner exception parameters
    public SubscriptionNameGenerationException(string message, object? failedInput, Exception inner)
    : base(message, inner)
    {
        FailedInput = failedInput;
    }
}
