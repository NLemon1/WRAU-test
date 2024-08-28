namespace WRA.Umbraco.Exceptions;

public class SurfaceAttributeFilterException : Exception
{
    // Property to hold additional information if needed
    public object? FailedInput { get; private set; }

    // Default constructor
    public SurfaceAttributeFilterException()
    {
    }

    // Constructor with message parameter
    public SurfaceAttributeFilterException(string message)
    : base(message)
    {
    }

    // Constructor with message and inner exception parameters
    public SurfaceAttributeFilterException(string message, Exception inner)
    : base(message, inner)
    {
    }

    // Constructor with message, failed input, and inner exception parameters
    public SurfaceAttributeFilterException(string message, object? failedInput, Exception inner)
    : base(message, inner)
    {
        FailedInput = failedInput;
    }
}
