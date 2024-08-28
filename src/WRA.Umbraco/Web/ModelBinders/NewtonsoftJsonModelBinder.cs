using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;

namespace WRA.Umbraco.Web.ModelBinders;

public class NewtonsoftJsonModelBinder : IModelBinder
{
    public async Task BindModelAsync(ModelBindingContext bindingContext)
    {
        if (bindingContext == null)
        {
            throw new ArgumentNullException(nameof(bindingContext));
        }

        var request = bindingContext.HttpContext.Request;

        if (request.ContentType != null && request.ContentType.StartsWith("application/json", StringComparison.OrdinalIgnoreCase))
        {
            using (var reader = new StreamReader(request.Body))
            {
                var body = await reader.ReadToEndAsync();
                if (string.IsNullOrEmpty(body))
                {
                    bindingContext.Result = ModelBindingResult.Success(null);
                    return;
                }

                try
                {
                    var result = JsonConvert.DeserializeObject(body, bindingContext.ModelType);
                    bindingContext.Result = ModelBindingResult.Success(result);
                }
                catch (JsonException ex)
                {
                    bindingContext.ModelState.TryAddModelError(bindingContext.ModelName, ex.Message);
                    bindingContext.Result = ModelBindingResult.Failed();
                }
            }
        }
        else
        {
            bindingContext.Result = ModelBindingResult.Failed();
        }
    }
}