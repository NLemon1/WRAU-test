using global::Umbraco.Commerce.Core.Models;
using global::Umbraco.Commerce.Core.Services;
using Microsoft.Extensions.Logging;
using NUglify.JavaScript.Syntax;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Web.Common.Security;
using WRA.Umbraco.Web.Dtos.External;
using WRA.Umbraco.Web.Dtos.MyWRA;

namespace WRA.Umbraco.Web.Services;
public class MemberDuesService
{
    private readonly IOrderService _orderService;
    private readonly WraExternalApiService _externalServiceClient;
    private readonly ILogger<MemberDuesService> _logger;

    private static readonly JsonSerializerOptions SerializationOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };
    public MemberDuesService(IOrderService orderService,
                                     WraExternalApiService externalServiceClient,
                                     ILogger<MemberDuesService> logger)
    {
        _orderService = orderService;
        _externalServiceClient = externalServiceClient;
        _logger = logger;
    }

    public async Task<MemberDuesDto> GetMemberDues(string externalMemberID)
    {
        var memberDues = new MemberDuesDto();
        ExternalMemberDuesPaymentStrategyDto paymentStrategy;
        ExternalMemberDuesInvoiceDto invoice;
        List<ExternalMemberDuesPaymentHistoryDto> payments;
        try
        {
            paymentStrategy = await GetMemberDuesPaymentStrategy(externalMemberID);
            memberDues.PaymentStrategy = paymentStrategy;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to fetch payment strategy.");
        }

        try
        {
            invoice = await GetMemberDuesInvoices(externalMemberID);
            memberDues.Invoice = invoice;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to fetch member invoice.");
        }

        try
        {
            payments = await GetMemberPaymentHistory(externalMemberID);
            memberDues.HistoricalPayments = payments;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to fetch member payment history");
        }

        return memberDues;
    }

    private async Task<ExternalMemberDuesPaymentStrategyDto> GetMemberDuesPaymentStrategy(string memberId)
    {
        try
        {
            var memberDuesPaymentStrategyResponse = await _externalServiceClient.GetMemberDuesPaymentStrategy(memberId);
            if (memberDuesPaymentStrategyResponse.Content == null) return new ExternalMemberDuesPaymentStrategyDto();
            var memberDuesPaymentStrategy =
                JsonSerializer.Deserialize<ExternalMemberDuesPaymentStrategyDto>(
                    memberDuesPaymentStrategyResponse.Content,
                    SerializationOptions);
            return memberDuesPaymentStrategy;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error calling WRAExternalServiceClient.GetMemberDuesPaymentStrategy");
            throw;
        }
    }

    private async Task<ExternalMemberDuesInvoiceDto> GetMemberDuesInvoices(string memberId)
    {
        try
        {
            var memberDuesInvoiceResponse = await _externalServiceClient.GetMemberDuesInvoice(memberId);
            if (memberDuesInvoiceResponse.Content == null) return new ExternalMemberDuesInvoiceDto();
            var memberDuesInvoice =
                JsonSerializer.Deserialize<ExternalMemberDuesInvoiceDto>(
                    memberDuesInvoiceResponse.Content,
                    SerializationOptions);
            return memberDuesInvoice;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error calling WRAExternalServiceClient.GetMemberDuesInvoice");
            throw;
        }
    }

    private async Task<List<ExternalMemberDuesPaymentHistoryDto>> GetMemberPaymentHistory(string memberId)
    {
        try
        {
            var memberPaymentHistoryResponse = await _externalServiceClient.GetMemberPaymentHistory(memberId);
            if (memberPaymentHistoryResponse.Content == null) return new List<ExternalMemberDuesPaymentHistoryDto>();
            var memberPaymentHistory =
                JsonSerializer.Deserialize<List<ExternalMemberDuesPaymentHistoryDto>>(
                    memberPaymentHistoryResponse.Content,
                    SerializationOptions);
            return memberPaymentHistory;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error calling WRAExternalServiceClient.GetMemberPaymentHistory");
            throw;
        }
    }
}