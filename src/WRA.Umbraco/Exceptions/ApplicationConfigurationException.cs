namespace WRA.Umbraco.Exceptions;
public class ApplicationConfigurationException : Exception
{
    // Property to hold additional information if needed
    public object? FailedInput { get; private set; }

    // Default constructor
    public ApplicationConfigurationException()
    {
    }

    // Constructor with message parameter
    public ApplicationConfigurationException(string message)
    : base(message)
    {
    }

    // Constructor with message and inner exception parameters
    public ApplicationConfigurationException(string message, Exception inner)
    : base(message, inner)
    {
    }

    // Constructor with message, failed input, and inner exception parameters
    public ApplicationConfigurationException(string message, object? failedInput, Exception inner)
    : base(message, inner)
    {
        FailedInput = failedInput;
    }
}
