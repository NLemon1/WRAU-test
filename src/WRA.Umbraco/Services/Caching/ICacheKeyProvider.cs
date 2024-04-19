namespace WRA.Umbraco.Services.Caching;
public interface ICacheKeyProvider
{
    /// <summary>
    /// <para>Generates a generic cache key using the type of the content, an identifier, and an optional property alias.</para>
    /// <para>
    /// The key can take two formats:
    ///   PropertyAlias Provided: primaryTypeName_primaryId_propertyAlias_secondaryTypeName_secondaryId.
    ///   PropertyAlias Null or Empty: primaryTypeName_primaryId_secondaryTypeName_secondaryId.
    /// </para>
    /// </summary>
    /// <param name="contentType">The type of the content for which the cache key is being generated.</param>
    /// <param name="id">The identifier of the entity.</param>
    /// <param name="propertyAlias">Optional property alias to further specify the cache key.</param>
    /// <returns>A string representing the cache key.</returns>
    string GetCacheKey(Type contentType, object id, string? propertyAlias = null);

    /// <summary>
    /// <para>Generates a cache key for scenarios involving multiple related objects.</para>
    /// <para>
    /// The key can take two formats:
    ///   PropertyAlias Provided: primaryTypeName_primaryId_propertyAlias_secondaryTypeName_secondaryId.
    ///   PropertyAlias Null or Empty: primaryTypeName_primaryId_secondaryTypeName_secondaryId.
    /// </para>
    /// </summary>
    /// <param name="primaryType">The primary object's type.</param>
    /// <param name="primaryId">The identifier of the primary object.</param>
    /// <param name="secondaryType">The secondary object's type.</param>
    /// <param name="secondaryId">The identifier of the secondary object.</param>
    /// <param name="propertyAlias">Optional property alias to further specify the cache key.</param>
    /// <returns>A string representing the cache key.</returns>
    string GetCacheKey(Type primaryType, object primaryId, Type secondaryType, object secondaryId, string? propertyAlias = null);
}