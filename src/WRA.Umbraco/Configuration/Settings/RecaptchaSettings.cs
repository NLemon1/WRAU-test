using System.ComponentModel.DataAnnotations;

namespace WRA.Umbraco.Configuration.Settings;

// goto:RecaptchaSettings
// goto:Recaptchat2Settings
// goto:Recaptcha3Settings

/// <summary>
/// Settings for reCAPTCHA v2 and v3.
/// </summary>
public class RecaptchaSettings : IConfigurationSettings
{
    public RecaptchaSettings()
    {
        ValidateLoggedInUsers = false;
        DefaultVersion = "v3";
        DefaultEndpoint = "https://www.google.com/recaptcha/api/siteverify";
        V2 = new Recaptcha2Settings();
        V3 = new Recaptcha3Settings();
    }

    /// <summary>
    /// The site key for reCAPTCHA.
    /// </summary>
    [Required]
    public string? SiteKey { get; set; }

    /// <summary>
    /// The secret key for reCAPTCHA.
    /// </summary>
    [Required]
    public string? SecretKey { get; set; }

    /// <summary>
    /// Whether to validate reCAPTCHA for logged-in users.
    /// </summary>
    public bool ValidateLoggedInUsers { get; set; }

    /// <summary>
    /// The default version to use if none is provided. Can be "v2" or "v3".
    /// </summary>
    public string DefaultVersion { get; set; }

    /// <summary>
    /// The default endpoint to use if one is not provided by a version specific configuration.
    /// </summary>
    public string DefaultEndpoint { get; set; }

    /// <summary>
    /// The language code for reCAPTCHA localization.
    /// </summary>
    public string? LanguageCode { get; set; }

    /// <summary>
    /// Settings specific to reCAPTCHA v2.
    /// </summary>
    public Recaptcha2Settings V2 { get; set; }

    /// <summary>
    /// Settings specific to reCAPTCHA v3.
    /// </summary>
    public Recaptcha3Settings V3 { get; set; }

}

/// <summary>
/// Settings specific to Recaptcha Version 2.
/// </summary>
public class Recaptcha2Settings
{
    /// <summary>
    /// The theme for reCAPTCHA v2 (light or dark).
    /// </summary>
    public string Theme { get; set; }

    /// <summary>
    /// The size of the reCAPTCHA v2 widget (normal or compact).
    /// </summary>
    public string Size { get; set; }

    /// <summary>
    /// The badge position for reCAPTCHA v2 invisible (bottom right, bottom left, or inline).
    /// </summary>
    public string Badge { get; set; }

    public Recaptcha2Settings()
    {
        Theme = "light";
        Size = "normal";
        Badge = "bottomright";
    }
}

/// <summary>
/// Settings specific to Recaptcha Version 3.
/// </summary>
public class Recaptcha3Settings
{
    /// <summary>
    /// The minimum score required for reCAPTCHA v3 (0.0 to 1.0).
    /// </summary>
    [Range(0.0, 1.0)]
    public double MinimumScore { get; set; }

    /// <summary>
    /// The action name for reCAPTCHA v3.
    /// </summary>
    public string Action { get; set; }

    public Recaptcha3Settings()
    {
        MinimumScore = 0.5;
        Action = "submit";
    }
}
