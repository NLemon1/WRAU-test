using Microsoft.Extensions.Options;
using System.Text.Json;
using WRA.Umbraco.Configuration.Settings;
using WRA.Umbraco.Exceptions;
using WRA.Umbraco.Web.Dtos.External;

namespace WRA.Umbraco.Web.Services;
public interface IRecaptchaService
{
    Task<(bool Success, double? Score)> ValidateRecaptchaAsync(string response);
}

public class RecaptchaService : IRecaptchaService
{
    // This is named HttpClient configured during startup
    // goto:CustomServiceComposer.RegisterAndConfigureRecaptchaApi
    private readonly HttpClient _httpClient;
    private readonly RecaptchaSettings _settings;
    private readonly ILogger _logger;

    public RecaptchaService(HttpClient httpClient, IOptions<RecaptchaSettings> settings, ILogger logger)
    {

        _httpClient = httpClient;
        _settings = settings.Value;
        _logger = logger.ForContext<RecaptchaService>();
    }

    public async Task<(bool Success, double? Score)> ValidateRecaptchaAsync(string response)
    {
        using var activity = _logger.StartActivity(LogEventLevel.Information, "Validating Recaptcha response. {Service}:{Method}", nameof(RecaptchaService), nameof(ValidateRecaptchaAsync));
        try
        {
            if (string.IsNullOrEmpty(_settings.SecretKey))
            {
                var ex = new ApplicationConfigurationException("Failed to retrieve the Recaptcha secret key from site configuration.");
                activity.Complete(LogEventLevel.Fatal, ex);
                throw ex;
            }

            var parameters = new Dictionary<string, string>
            {
                { "secret", _settings.SecretKey },
                { "response", response }
            };

            var content = new FormUrlEncodedContent(parameters);
            var verificationResponse = await _httpClient.PostAsync("siteverify", content);

            if (!verificationResponse.IsSuccessStatusCode)
            {
                return (false, null);
            }

            using var responseStream = await verificationResponse.Content.ReadAsStreamAsync();
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            var verificationResult = await JsonSerializer.DeserializeAsync<RecaptchaVerificationResponse>(responseStream, options);

            return (verificationResult?.Success ?? false, verificationResult?.Score);
        }
        catch (Exception)
        {
            // #todoeric finish this catch clause.
            throw;
        }
    }
}