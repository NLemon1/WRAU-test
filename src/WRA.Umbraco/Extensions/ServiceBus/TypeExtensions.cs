using System.Reflection;

namespace WRA.Umbraco.Extensions.ServiceBus;

public static class TypeExtensions
{
    public static List<T> GetAllPublicConstantValues<T>(this Type type)
    {
        return type
            .GetFields(BindingFlags.Public | BindingFlags.Static | BindingFlags.FlattenHierarchy)
            .Where(fi => fi.IsLiteral && !fi.IsInitOnly && fi.FieldType == typeof(T))
            .Select(x => x.GetRawConstantValue())
            .Where(x => x is not null)
            .Cast<T>()
            .ToList();
    }

    public static string GetGenericTypeName(this Type type)
    {
        if (!type.IsGenericType)
        {
            return type.Name;
        }

        string typeNameWithoutArity = type.Name[..type.Name.IndexOf('`')];
        string genericArgumentsNames = string.Join(", ", type.GetGenericArguments().Select(arg => arg.Name));
        return $"{typeNameWithoutArity}<{genericArgumentsNames}>";
    }

    public static string GetSanitizedGenericTypeName(this Type type)
    {
        // Directly return the name for non-generic types.
        if (!type.IsGenericType)
        {
            return type.Name;
        }

        // Construct a simplified name for generic types.
        string baseName = type.Name[..type.Name.IndexOf('`')];
        var genericArguments = type.GetGenericArguments();
        string argumentNames = string.Join("_", genericArguments.Select(GetSanitizedGenericTypeName));

        return $"{baseName}_{argumentNames}";
    }

    public static List<string> GetNestedClassesStaticStringValues(this Type type)
    {
        var values = new List<string>();
        foreach (var prop in type.GetNestedTypes().SelectMany(c => c.GetFields(BindingFlags.Public | BindingFlags.Static | BindingFlags.FlattenHierarchy)))
        {
            object? propertyValue = prop.GetValue(null);
            if (propertyValue?.ToString() is string propertyString)
            {
                values.Add(propertyString);
            }
        }

        return values;
    }
}