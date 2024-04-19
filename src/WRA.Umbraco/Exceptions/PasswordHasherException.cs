namespace WRA.Umbraco.Exceptions;

public class PasswordHasherException : Exception
{
    // Property to hold additional information if needed
    public object? FailedInput { get; private set; }

    // Default constructor
    public PasswordHasherException()
    {
    }

    // Constructor with message parameter
    public PasswordHasherException(string message)
    : base(message)
    {
    }

    // Constructor with message and inner exception parameters
    public PasswordHasherException(string message, Exception inner)
    : base(message, inner)
    {
    }

    // Constructor with message, failed input, and inner exception parameters
    public PasswordHasherException(string message, object? failedInput, Exception inner)
    : base(message, inner)
    {
        FailedInput = failedInput;
    }
}
