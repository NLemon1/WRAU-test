using System.Security.Policy;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Core.PaymentProviders;
using GlobalPayments.Api.Services;
using GlobalPayments.Api;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Linq;
using GlobalPayments.Api.PaymentMethods;
using GlobalPayments.Api.Entities;
using Umbraco.Commerce.Core.Models;

[PaymentProvider("GlobalPayments", "Global Payments", "GlobalPayments. it is what it is..")]
public class MyPaymentProvider : PaymentProviderBase<GlobalPaymentsSettings>
{
    // Don't finalize at continue as we will finalize async via webhook
    public override bool FinalizeAtContinueUrl => true;
    public override bool CanCapturePayments => true;
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
    public virtual Task<ApiResult> CapturePaymentAsync(PaymentProviderContext<GlobalPaymentsSettings> context, CancellationToken cancellationToken = default(CancellationToken))
    {
        return Task.FromResult<ApiResult>(null);
    }



    public async override Task<CallbackResult> ProcessCallbackAsync(PaymentProviderContext<GlobalPaymentsSettings> context, CancellationToken token)
    {

        try
        {


            ServicesContainer.ConfigureService(new PorticoConfig
            {
                SecretApiKey = context.Settings.TestSecretKey,
                DeveloperId = "000000",
                VersionNumber = "0000",
                ServiceUrl = "https://cert.api2.heartlandportico.com"
            });
            var content = context.Request.Content;
            string jsonContent = content.ReadAsStringAsync().Result;
            // var paymentToken = jsonContent.Substring(jsonContent.IndexOf("=") + 1);
            var zip = context.Order.Properties["shippingZipCode"]?.ToString();
            var paymentToken = context.Order.Properties["paymentReference"]?.ToString();

            var secretKey = context.Settings.TestSecretKey;
            var card = new CreditCardData
            {
                Token = paymentToken
            };

            var address = new Address
            {
                PostalCode = zip
            };
            decimal? transactionAmount = AmountToMinorUnits(context.Order.TransactionAmount.Value);
            // var x = context.Order.TransactionAmount.Value;

            var authResponse = card.Authorize(transactionAmount)
                .WithCurrency("USD")
                .WithAddress(address)
                .Execute();

            var captureResponse = Transaction.FromId(authResponse.TransactionId)
                .Capture(transactionAmount)
                .Execute();

            // var x = context.Order.PaymentInfo.TotalPrice;
            long authorizedAmount = Convert.ToInt64(captureResponse.BalanceAmount);
            var order = context.Order;
            return CallbackResult.Ok(new TransactionInfo
            {
                TransactionId = captureResponse.TransactionId,
                AmountAuthorized = AmountFromMinorUnits(Convert.ToInt64(transactionAmount)),
                PaymentStatus = PaymentStatus.Captured
            });
        }
        catch (System.Exception)
        {

            throw;
        }
    }


    // protected void FinalizeOrUpdateOrder(Order order)
    // {
    //     _commerceApi.Uow.Execute(uow =>{});
    // }
    public override async Task<PaymentFormResult> GenerateFormAsync(PaymentProviderContext<GlobalPaymentsSettings> context, CancellationToken token)
    {

        var form = new PaymentForm(context.Urls.ContinueUrl, PaymentFormMethod.Post);

        return new PaymentFormResult()
        {
            Form = form
        };

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
