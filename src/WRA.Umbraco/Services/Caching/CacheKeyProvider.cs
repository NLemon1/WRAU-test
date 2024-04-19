using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models.PublishedContent;
using WRA.Umbraco.Exceptions;

namespace WRA.Umbraco.Services.Caching;
public class CacheKeyProvider(ILogger<CacheKeyProvider> logger) : ICacheKeyProvider
{
    private readonly ILogger<CacheKeyProvider> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    /// <summary>
    /// Generates a cache key specifically for page visibility checks.
    /// </summary>
    /// <param name="id">The identifier of the entity.</param>
    /// <param name="propertyAlias">Optional property alias to further specify the cache key.</param>
    /// <returns>A string representing the cache key.</returns>
    public string GetCacheKeyForPageVisibility(object id, string? propertyAlias = null)
    {
        try
        {
            return GetCacheKey(typeof(IPublishedContent), id, propertyAlias);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating cache key for page visibility. ID: {Id}, PropertyAlias: {PropertyAlias}", id, propertyAlias);
            throw new CacheKeyGenerationException($"Error generating cache key for page visibility. ID: {id}, PropertyAlias: {propertyAlias}", propertyAlias ?? "null", ex);
        }
    }

    /// <summary>
    /// <para>Generates a generic cache key using the type of the content, an identifier, and an optional property alias.</para>
    /// <para>
    /// The key can take two formats:
    ///   PropertyAlias Provided: primaryTypeName_primaryId_propertyAlias.
    ///   PropertyAlias Null or Empty: primaryTypeName_primaryId.
    /// </para>
    /// </summary>
    /// <param name="contentType">The type of the content for which the cache key is being generated.</param>
    /// <param name="id">The identifier of the entity.</param>
    /// <param name="propertyAlias">Optional property alias to further specify the cache key.</param>
    /// <returns>A string representing the cache key.</returns>
    public string GetCacheKey(Type contentType, object id, string? propertyAlias = null)
    {
        try
        {
            ArgumentNullException.ThrowIfNull(contentType);
            ArgumentNullException.ThrowIfNull(id);

            return GenerateCacheKey(false, null, contentType.Name, id, propertyAlias);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating cache key. Type: {Type} ID: {Id}, PropertyAlias: {PropertyAlias}", contentType.Name, id, propertyAlias);
            throw new CacheKeyGenerationException($"Error generating cache key.  Type: {contentType.Name} ID: {id}, PropertyAlias: {propertyAlias}", propertyAlias, ex);
        }
    }

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
    public string GetCacheKey(Type primaryType, object primaryId, Type secondaryType, object secondaryId, string? propertyAlias = null)
    {
        try
        {
            ArgumentNullException.ThrowIfNull(primaryType);
            ArgumentNullException.ThrowIfNull(primaryId);
            ArgumentNullException.ThrowIfNull(secondaryType);
            ArgumentNullException.ThrowIfNull(secondaryId);

            return GenerateCacheKey(false, null, primaryType, primaryId, propertyAlias, secondaryType, secondaryId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating cache key. Primary Type: {Type}, Primary Id: {Id}, PropertyAlias: {PropertyAlias}, Secondary Type: {SecondaryType}, Secondary Id: {SecondaryId}", primaryType.Name, primaryId, propertyAlias, secondaryType.Name, secondaryId);
            throw new CacheKeyGenerationException($"Error generating cache key. Primary Type: {primaryType.Name}, Primary Id: {primaryId}, PropertyAlias: {propertyAlias}, Secondary Type: {secondaryType.Name}, Secondary Id: {secondaryId}", propertyAlias, ex);
        }
    }

    /// <summary>
    /// Generates a cache key from an arbitrary list of objects by joining their string representations with underscores.
    /// Optionally replaces null or empty strings with a specified replacement string.
    /// </summary>
    /// <param name="includeNullsOrEmpty"></param>
    /// <param name="replacementForNullOrEmpty">The string to use as a replacement for null or empty parts. If null, such parts are skipped. Must not be null.</param>
    /// <param name="parts">The parts of the cache key.</param>
    /// <returns>A cache key generated from the provided parts.</returns>
    /// <exception cref="ArgumentNullException">Thrown if replacementForNullOrEmpty is null.</exception>
    private string GenerateCacheKey(bool includeNullsOrEmpty = false, string? replacementForNullOrEmpty = null, params object?[] parts)
    {
        try
        {
            if (includeNullsOrEmpty && replacementForNullOrEmpty == null)
            {
                throw new ArgumentNullException(nameof(replacementForNullOrEmpty), "Replacement for null or empty values must not be null when null or empty values are included.");
            }

            // Transform parts to cache key parts considering null/empty values and replacements.
            var cacheKeyParts = parts.Select(part =>
            {
                // Convert part to string once, reusing the result for checks and transformations.
                string? partStr = part?.ToString();

                // If not including nulls or empty strings, return null to filter them out later; otherwise, apply replacement if needed.
                if (includeNullsOrEmpty || !string.IsNullOrEmpty(partStr))
                {
                    if (string.IsNullOrEmpty(partStr))
                    {
                        // If not including nulls or empty strings, return null to filter them out later; otherwise, apply replacement if needed.
                        return replacementForNullOrEmpty;
                    }
                    else
                    {
                        // If not including nulls or empty strings, return null to filter them out later; otherwise, apply replacement if needed.
                        return partStr;
                    }
                }
                else
                {
                    // If not including nulls or empty strings, return null to filter them out later.
                    return null;
                }
            }).Where(partStr => partStr != null); // Filter out nulls if they were excluded based on the includeNullsOrEmpty flag.

            // Joining the parts with underscores to form the final cache key.
            string cacheKey = string.Join("_", cacheKeyParts);

            if (string.IsNullOrEmpty(cacheKey))
            {
                throw new CacheKeyGenerationException("Failed to generate a meaningful cache key.");
            }

            return string.Join("_", cacheKeyParts);
        }
        catch (Exception ex)
        {
            // Generate a string of the cache key parts for logging.
            string partsRepresentation = parts.Select(part => part?.ToString() ?? "null").Aggregate((current, next) => $"{current}, {next}");

            // Log the error with a detailed and meaningful message
            _logger.LogError(ex, "Failed to generate cache key. includeNullsOrEmpty: {IncludeNullsOrEmpty}, replacementForNullOrEmpty: '{ReplacementForNullOrEmpty}', parts: [{Parts}]", includeNullsOrEmpty, replacementForNullOrEmpty ?? "null", partsRepresentation);

            // Rethrow a specific exception for this scenario
            throw new CacheKeyGenerationException($"Failed to generate cache key with parameters includeNullsOrEmpty: {includeNullsOrEmpty}, replacementForNullOrEmpty: {replacementForNullOrEmpty}, parts: {partsRepresentation}.", ex);
        }
    }
}
