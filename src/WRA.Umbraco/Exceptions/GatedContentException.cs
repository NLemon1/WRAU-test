namespace WRA.Umbraco.Exceptions;

public class GatedContentException : Exception
{
    // Property to hold additional information if needed
    public object? FailedInput { get; private set; }

    // Default constructor
    public GatedContentException()
    {
    }

    // Constructor with message parameter
    public GatedContentException(string message)
    : base(message)
    {
    }

    // Constructor with message and inner exception parameters
    public GatedContentException(string message, Exception inner)
    : base(message, inner)
    {
    }

    // Constructor with message, failed input, and inner exception parameters
    public GatedContentException(string message, object? failedInput, Exception inner)
    : base(message, inner)
    {
        FailedInput = failedInput;
    }
}
