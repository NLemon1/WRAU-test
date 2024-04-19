namespace WRA.Umbraco.Exceptions;

public class ObjectMappingException : Exception
{
    // Property to hold additional information if needed
    public object? FailedInput { get; private set; }

    // Default constructor
    public ObjectMappingException()
    {
    }

    // Constructor with message parameter
    public ObjectMappingException(string message)
    : base(message)
    {
    }

    // Constructor with message and inner exception parameters
    public ObjectMappingException(string message, Exception inner)
    : base(message, inner)
    {
    }

    // Constructor with message, failed input, and inner exception parameters
    public ObjectMappingException(string message, object? failedInput, Exception inner)
    : base(message, inner)
    {
        FailedInput = failedInput;
    }
}
