using System.Reflection;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Models;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Services.Caching;
using WRA.Umbraco.Web.Dtos.Member;

namespace WRA.Umbraco.Helpers;

public abstract class ContentHelperBase<TTarget, TSource>(
    ICacheKeyProvider cacheKeyProvider,
    AppCaches appCache)
    where TTarget : IContentBase
    where TSource : IEvent<DefaultIdType>
{
    protected void DynamicUpdate(TTarget target, TSource source)
    {
        var key = cacheKeyProvider.GetCacheKey(source.GetType(), source.Id);
        var properties = appCache.RuntimeCache.GetCacheItem(
            key, () =>
                source.GetType().GetProperties(BindingFlags.Public | BindingFlags.Instance));

        foreach (var property in properties)
        {
            string alias = GetPropertyAlias(property.Name);
            if (!target.HasProperty(alias) || !IsSimpleType(property.PropertyType)) continue;
            object? value = property.GetValue(source, null);
            target.SetValue(alias, value);
        }
    }
    protected static string GetPropertyAlias(string propertyName)
    {
        return System.Text.Json.JsonNamingPolicy.CamelCase.ConvertName(propertyName);
    }

    protected static bool IsSimpleType(Type type)
    {
        return type.IsPrimitive || type.IsEnum || type == typeof(string) || type == typeof(DateTime) || type == typeof(DateTime?) || type == typeof(decimal);
    }

    protected static void SetProperty(TTarget member, string propertyName, object value)
    {
        string alias = GetPropertyAlias(propertyName);
        if (member.HasProperty(alias))
        {
            member.SetValue(alias, value);
        }
    }
}