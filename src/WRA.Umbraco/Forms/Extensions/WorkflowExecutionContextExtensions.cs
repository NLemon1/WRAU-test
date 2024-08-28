using Umbraco.Forms.Core;

namespace WRA.Umbraco.Forms.Extensions;
public static class WorkflowExecutionContextExtensions
{
    public static T MapToFormModel<T>(this WorkflowExecutionContext context)
    where T : new()
    {
        var model = new T();
        var properties = typeof(T).GetProperties();

        foreach (var property in properties)
        {
            var matchingField = context.Record.RecordFields.Values
                .FirstOrDefault(f => f.Alias.Equals(property.Name, StringComparison.OrdinalIgnoreCase));

            if (matchingField != null)
            {
                string value = matchingField.ValuesAsString();
                if (!string.IsNullOrEmpty(value))
                {
                    try
                    {
                        object? convertedValue = Convert.ChangeType(value, property.PropertyType);
                        property.SetValue(model, convertedValue);
                    }
                    catch (InvalidCastException ex)
                    {
                        Log.Error(ex, "{Location} - Failed to convert value '{Value}' to type '{Type}'", nameof(WorkflowExecutionContextExtensions), value, property.PropertyType);
                    }
                }
            }
        }

        return model;
    }
}
