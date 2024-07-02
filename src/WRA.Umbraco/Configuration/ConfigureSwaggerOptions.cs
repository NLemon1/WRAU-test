using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace WRA.Umbraco.Configurations;

public class ConfigureSwaggerOptions : IConfigureOptions<SwaggerGenOptions>
{
    public void Configure(SwaggerGenOptions options)
    {
        options.SwaggerDoc(
            "content-api",
            new OpenApiInfo
            {
                Title = "Content API",
                Version = "1.0",
            });

        options.SwaggerDoc(
            "product-api",
            new OpenApiInfo
            {
                Title = "Product API",
                Version = "1.0",
            });
        options.SwaggerDoc(
           "member-api",
           new OpenApiInfo
           {
               Title = "Member API",
               Version = "1.0",
           });
        options.SwaggerDoc(
           "Commerce-api",
           new OpenApiInfo
           {
               Title = "Commerce API",
               Version = "1.0",
           });
    }
}