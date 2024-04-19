namespace WRA.Umbraco.Exceptions;

public class CacheKeyGenerationException : Exception
{
    // Property to hold additional information if needed
    public object? FailedInput { get; private set; }

    // Default constructor
    public CacheKeyGenerationException()
    {
    }

    // Constructor with message parameter
    public CacheKeyGenerationException(string message)
    : base(message)
    {
    }

    // Constructor with message and inner exception parameters
    public CacheKeyGenerationException(string message, Exception inner)
    : base(message, inner)
    {
    }

    // Constructor with message, failed input, and inner exception parameters
    public CacheKeyGenerationException(string message, object? failedInput, Exception inner)
    : base(message, inner)
    {
        FailedInput = failedInput;
    }
}