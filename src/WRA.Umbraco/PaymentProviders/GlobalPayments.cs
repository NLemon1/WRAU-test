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
using Microsoft.Extensions.Logging;


[PaymentProvider("GlobalPayments", "Global Payments", "GlobalPayments. it is what it is..")]
public class GlobalPaymentsPaymentProvider : PaymentProviderBase<GlobalPaymentsSettings>
{
    // Don't finalize at continue as we will finalize async via webhook
    public override bool FinalizeAtContinueUrl => true;
    public override bool CanCapturePayments => true;
    readonly ILogger<GlobalPaymentsPaymentProvider> _logger;
    public GlobalPaymentsPaymentProvider(UmbracoCommerceContext umbracoCommerce, ILogger<GlobalPaymentsPaymentProvider> logger)
    : base(umbracoCommerce)
    { _logger = logger; }

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
            if (context.Settings.TestMode)
            {

                ServicesContainer.ConfigureService(new PorticoConfig
                {
                    SecretApiKey = context.Settings.TestSecretKey,
                    DeveloperId = "000000",
                    VersionNumber = "0000",
                    ServiceUrl = "https://cert.api2.heartlandportico.com"
                });
            }
            else
            {
                ServicesContainer.ConfigureService(new PorticoConfig
                {
                    SecretApiKey = context.Settings.LiveSecretKey,
                    DeveloperId = "000000",
                    VersionNumber = "0000",
                    ServiceUrl = "https://api2.heartlandportico.com"
                });
            }

            var zip = context.Order.Properties["shippingZipCode"]?.ToString();
            // this token comes from the Ifram form found on the payment method page. 
            var paymentToken = context.Order.Properties["paymentReference"]?.ToString();
            var card = new CreditCardData
            {
                Token = paymentToken
            };

            var address = new GlobalPayments.Api.Entities.Address
            {
                PostalCode = zip
            };
            decimal? transactionAmount = AmountToMinorUnits(context.Order.TransactionAmount.Value);


            // Charge. No auth for now, may change later...
            Transaction? charge = card.Charge(transactionAmount)
                .WithCurrency("USD")
                .WithAddress(address)
                .Execute();

            if (charge.ResponseCode == "00" || charge.ResponseCode == "10")
            {
                return CallbackResult.Ok(new TransactionInfo
                {
                    TransactionId = charge.TransactionId,
                    AmountAuthorized = AmountFromMinorUnits(Convert.ToInt64(transactionAmount)), // Ideally this should be the amount the payment processor returns. Unsure how to get that yet.
                    PaymentStatus = PaymentStatus.Captured
                });
            }
            // var captureResponse = Transaction.FromId(charge.TransactionId)
            //     .Capture(transactionAmount)
            //     .Execute();

            // if (authResponse.Status)
            // {

            // }
            // long authorizedAmount = Convert.ToInt64(captureResponse.BalanceAmount);
            return errorResult();

        }
        catch (GatewayException e)
        {
            _logger.LogError(e, "GatewayException in CreditCardPaymentProvider.ProcessCallbackAsync");
            return errorResult();
            // handle error
        }
        catch (UnsupportedTransactionException e)
        {
            _logger.LogError(e, "UnsupportedTransactionException in CreditCardPaymentProvider.ProcessCallbackAsync");
            return errorResult();
            // handle error
        }
        catch (ApiException ex)
        {
            _logger.LogError(ex, "ApiException in CreditCardPaymentProvider.ProcessCallbackAsync");
            return errorResult();
            // handle error

        }
        catch (System.Exception)
        {
            _logger.LogError("System.Exception in CreditCardPaymentProvider.ProcessCallbackAsync");
            return errorResult();
        }
    }

    private CallbackResult errorResult()
    {
        return new CallbackResult
        {
            TransactionInfo = new TransactionInfo
            {
                PaymentStatus = PaymentStatus.Error,
            }
        };
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
