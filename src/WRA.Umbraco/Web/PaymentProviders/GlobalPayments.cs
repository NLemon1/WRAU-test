using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Core.PaymentProviders;

[PaymentProvider("GlobalPayments", "Global Payments", "GlobalPayments. it is what it is..")]
public class MyPaymentProvider : PaymentProviderBase<GlobalPaymentsSettings>
{
    public MyPaymentProvider(UmbracoCommerceContext umbracoCommerce)
        : base(umbracoCommerce)
    { }

    public override string GetContinueUrl(PaymentProviderContext<GlobalPaymentsSettings> context)
    {
        return context.Settings.ContinueUrl;
    }
    public override string GetCancelUrl(PaymentProviderContext<GlobalPaymentsSettings> context)
    {
        return context.Settings.CancelUrl;
    }

    public override string GetErrorUrl(PaymentProviderContext<GlobalPaymentsSettings> context)
    {
        return context.Settings.ErrorUrl;
    }

    public override Task<CallbackResult> ProcessCallbackAsync(PaymentProviderContext<GlobalPaymentsSettings> context, CancellationToken token)
    {
        throw new NotImplementedException();
    }

    public override Task<PaymentFormResult> GenerateFormAsync(PaymentProviderContext<GlobalPaymentsSettings> context, CancellationToken token)
    {
        return GenerateFormAsync(context, token);
    }
}


public class GlobalPaymentsSettings
{
    [PaymentProviderSetting(Name = "Continue URL",
            Description = "The URL to continue to after this provider has done processing. eg: /continue/",
            SortOrder = 100)]
    public string ContinueUrl { get; set; }

    [PaymentProviderSetting(Name = "Cancel URL",
        Description = "The URL to return to if the payment attempt is canceled. eg: /cancel/",
        SortOrder = 200)]
    public string CancelUrl { get; set; }

    [PaymentProviderSetting(Name = "Error URL",
        Description = "The URL to return to if the payment attempt errors. eg: /error/",
        SortOrder = 300)]
    public string ErrorUrl { get; set; }

    [PaymentProviderSetting(Name = "Test Secret Key",
        Description = "Your test secret key",
        SortOrder = 900)]
    public string TestSecretKey { get; set; }

    [PaymentProviderSetting(Name = "Test Public Key",
        Description = "Your test public key",
        SortOrder = 1000)]
    public string TestPublicKey { get; set; }

    [PaymentProviderSetting(Name = "Live Secret Key",
        Description = "Your live secret key",
        SortOrder = 1200)]
    public string LiveSecretKey { get; set; }

    [PaymentProviderSetting(Name = "Live Public Key",
        Description = "Your live public key",
        SortOrder = 1300)]
    public string LivePublicKey { get; set; }


    [PaymentProviderSetting(Name = "Test Mode",
        Description = "Set whether to process payments in test mode.",
        SortOrder = 10000)]
    public bool TestMode { get; set; }

}
