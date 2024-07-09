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
public class MemberDuesService(
    WraExternalApiService externalServiceClient,
    ILogger<MemberDuesService> logger)
{

    private static readonly JsonSerializerOptions SerializationOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

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
            logger.LogError(ex, "Failed to fetch payment strategy.");
        }

        try
        {
            invoice = await GetMemberDuesInvoices(externalMemberID);
            memberDues.Invoice = invoice;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to fetch member invoice.");
        }

        try
        {
            payments = await GetMemberPaymentHistory(externalMemberID);
            memberDues.HistoricalPayments = payments;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to fetch member payment history");
        }

        return memberDues;
    }

    private async Task<ExternalMemberDuesPaymentStrategyDto> GetMemberDuesPaymentStrategy(string memberId)
    {
        try
        {
            var memberDuesPaymentStrategyResponse = await externalServiceClient.GetMemberDuesPaymentStrategy(memberId);
            if (memberDuesPaymentStrategyResponse.Content == null) return new ExternalMemberDuesPaymentStrategyDto();
            var memberDuesPaymentStrategy =
                JsonSerializer.Deserialize<ExternalMemberDuesPaymentStrategyDto>(
                    memberDuesPaymentStrategyResponse.Content,
                    SerializationOptions) ?? new ExternalMemberDuesPaymentStrategyDto();
            return memberDuesPaymentStrategy;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error calling WRAExternalServiceClient.GetMemberDuesPaymentStrategy");
            throw;
        }
    }

    private async Task<ExternalMemberDuesInvoiceDto> GetMemberDuesInvoices(string memberId)
    {
        try
        {
            var memberDuesInvoiceResponse = await externalServiceClient.GetMemberDuesInvoice(memberId);
            if (memberDuesInvoiceResponse.Content == null) return new ExternalMemberDuesInvoiceDto();
            var memberDuesInvoice =
                JsonSerializer.Deserialize<ExternalMemberDuesInvoiceDto>(
                    memberDuesInvoiceResponse.Content,
                    SerializationOptions) ?? new ExternalMemberDuesInvoiceDto();
            return memberDuesInvoice;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error calling WRAExternalServiceClient.GetMemberDuesInvoice");
            throw;
        }
    }

    private async Task<List<ExternalMemberDuesPaymentHistoryDto>> GetMemberPaymentHistory(string memberId)
    {
        try
        {
            var memberPaymentHistoryResponse = await externalServiceClient.GetMemberPaymentHistory(memberId);
            if (memberPaymentHistoryResponse.Content == null) return new List<ExternalMemberDuesPaymentHistoryDto>();
            var memberPaymentHistory =
                JsonSerializer.Deserialize<List<ExternalMemberDuesPaymentHistoryDto>>(
                    memberPaymentHistoryResponse.Content,
                    SerializationOptions) ?? [];
            return memberPaymentHistory;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error calling WRAExternalServiceClient.GetMemberPaymentHistory");
            throw;
        }
    }
}