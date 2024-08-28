using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;

namespace WRA.Umbraco.Web.ModelBinders;

/// <summary>
/// Provides Newtonsoft model binding on a method by method basis.
/// </summary>
[AttributeUsage(AttributeTargets.Parameter, AllowMultiple = false, Inherited = true)]
public class FromNewtonsoftJsonAttribute : Attribute, IBindingSourceMetadata, IModelNameProvider
{
    public BindingSource BindingSource => BindingSource.Body;

    public string Name { get; set; } = string.Empty;
}

public class FromNewtonsoftJsonModelBinderProvider : IModelBinderProvider
{
    public IModelBinder? GetBinder(ModelBinderProviderContext context)
    {
        ArgumentNullException.ThrowIfNull(context);

        var metadata = context.Metadata;

        if (metadata.IsComplexType && metadata.BindingSource == BindingSource.Body)
        {
            return new BinderTypeModelBinder(typeof(NewtonsoftJsonModelBinder));
        }

        return null;
    }
}
