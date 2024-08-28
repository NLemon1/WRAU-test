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

        options.SwaggerDoc(
           "bridge-api",
           new OpenApiInfo
           {
               Title = "Umbraco Bridge API",
               Version = "1.0",
           });

        string filePath = Path.Combine(AppContext.BaseDirectory, "WRA.Umbraco.xml");
        options.IncludeXmlComments(filePath);
        options.AddSecurityDefinition("ApiKey", new OpenApiSecurityScheme
        {
            In = ParameterLocation.Header,
            Name = "X-API-KEY", // Header with api key
            Type = SecuritySchemeType.ApiKey,
        });
        options.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "ApiKey" }
                },
                Array.Empty<string>()
            }
        });
    }
}