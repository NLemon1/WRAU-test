using System.Text.Json.Serialization;

namespace WRA.Umbraco.Web.Dtos.External;

public class RecaptchaVerificationResponse
{
    /// <summary>
    /// Whether this request was a valid reCAPTCHA token for your site.
    /// </summary>
    [JsonPropertyName("success")]
    public bool Success { get; set; }

    /// <summary>
    /// The score for this request (0.0 - 1.0).
    /// </summary>
    [JsonPropertyName("score")]
    public double? Score { get; set; }

    /// <summary>
    /// The action name for this request (important to verify).
    /// </summary>
    [JsonPropertyName("action")]
    public string? Action { get; set; }

    /// <summary>
    /// Timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ).
    /// </summary>
    [JsonPropertyName("challenge_ts")]
    public DateTime ChallengeTs { get; set; }

    /// <summary>
    /// The hostname of the site where the reCAPTCHA was solved.
    /// </summary>
    [JsonPropertyName("hostname")]
    public string? Hostname { get; set; }

    /// <summary>
    /// Optional list of error codes.
    /// </summary>
    [JsonPropertyName("error-codes")]
    public List<string>? ErrorCodes { get; set; }

    /// <summary>
    /// APK package name (for Android).
    /// </summary>
    [JsonPropertyName("apk_package_name")]
    public string? ApkPackageName { get; set; }
}
