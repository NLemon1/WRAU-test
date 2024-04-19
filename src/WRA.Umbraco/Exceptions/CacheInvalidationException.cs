namespace WRA.Umbraco.Exceptions;

public class CacheInvalidationException : Exception
{
    // Property to hold additional information if needed
    public object? FailedInput { get; private set; }

    // Default constructor
    public CacheInvalidationException()
    {
    }

    // Constructor with message parameter
    public CacheInvalidationException(string message)
    : base(message)
    {
    }

    // Constructor with message and inner exception parameters
    public CacheInvalidationException(string message, Exception inner)
    : base(message, inner)
    {
    }

    // Constructor with message, failed input, and inner exception parameters
    public CacheInvalidationException(string message, object? failedInput, Exception inner)
    : base(message, inner)
    {
        FailedInput = failedInput;
    }
}
