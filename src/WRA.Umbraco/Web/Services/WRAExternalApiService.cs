using System.Net;
using GlobalPayments.Api.Terminals.PAX;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using RestSharp;
using WRA.Umbraco.Configuration;
using WRA.Umbraco.Web.Dtos.External;

namespace WRA.Umbraco.Web.Services;
public class WraExternalApiService(WraExternalApiSettings settings)
{
    public async Task<RestResponse> GetProductCategories()
    {

        var options = new RestClientOptions(settings.VersionedBaseUrl);
        var client = new RestClient(options);
        var request = new RestRequest("productcategory");
        request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);
        var response = await client.GetAsync(request);

        return response;
    }

    public async Task<RestResponse> GetProductSubCategories()
    {
        var options = new RestClientOptions(settings.VersionedBaseUrl);
        var client = new RestClient(options);
        var request = new RestRequest("productSubcategory");
        request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);

        var response = await client.GetAsync(request);

        return response;
    }

    public async Task<RestResponse> GetProducts()
    {
        var options = new RestClientOptions(settings.VersionedBaseUrl);
        var client = new RestClient(options);
        var request = new RestRequest("product");
        request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);

        var response = await client.GetAsync(request);

        return response;
    }

    public async Task<RestResponse> GetProductTaxonomy()
    {
        var options = new RestClientOptions(settings.VersionedBaseUrl);
        var client = new RestClient(options);
        var request = new RestRequest("producttaxonomy");
        request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);

        var response = await client.GetAsync(request);

        return response;
    }

    public async Task<RestResponse> GetBoards()
    {
        var options = new RestClientOptions(settings.VersionedBaseUrl);
        var client = new RestClient(options);
        var request = new RestRequest("localboard");
        request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);
        var response = await client.GetAsync(request);

        return response;
    }

    public async Task<RestResponse> GetBoardById(Guid Id)
    {
        var options = new RestClientOptions(settings.VersionedBaseUrl);
        var client = new RestClient(options);
        var request = new RestRequest($"localboard/{Id}");
        request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);
        var response = await client.GetAsync(request);

        return response;
    }

    public async Task<RestResponse> GetProductTypes()
    {
        var options = new RestClientOptions(settings.VersionedBaseUrl);
        var client = new RestClient(options);
        var request = new RestRequest("producttype");
        request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);
        var response = await client.GetAsync(request);

        return response;
    }


    public async Task<RestResponse> GetMembers(int amount = 10000)
    {
        var options = new RestClientOptions(settings.VersionedBaseUrl);
        var client = new RestClient(options);
        var request = new RestRequest("member/search").AddBody(new { keyword = string.Empty, pageSize = amount, pageNumber = 1 });
        request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);
        var response = await client.PostAsync(request);

        return response;
    }
    public async Task<RestResponse> GetMemberById(Guid Id)
    {
        var options = new RestClientOptions(settings.VersionedBaseUrl);
        var client = new RestClient(options);
        var request = new RestRequest($"member/{Id}");
        request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);
        var response = await client.GetAsync(request);

        return response;
    }

    public async Task<RestResponse> GetMemberGroups()
    {
        var options = new RestClientOptions(settings.VersionedBaseUrl);
        var client = new RestClient(options);
        var request = new RestRequest("membertype");
        request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);
        var response = await client.GetAsync(request);

        return response;
    }

    public async Task<RestResponse> GetCompanies(int amount = 20000)
    {
        var options = new RestClientOptions(settings.VersionedBaseUrl);
        var client = new RestClient(options);
        var request = new RestRequest("company/search").AddBody(new { keyword = string.Empty, pageSize = amount, pageNumber = 1 });
        request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);
        var response = await client.PostAsync(request);

        return response;
    }
    public async Task<RestResponse> GetCompanyById(Guid Id)
    {
        var options = new RestClientOptions(settings.VersionedBaseUrl);
        var client = new RestClient(options);
        var request = new RestRequest($"company/{Id}");
        request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);
        var response = await client.GetAsync(request);

        return response;
    }

    public async Task<RestResponse> GetMemberSubscriptions()
    {
        var options = new RestClientOptions(settings.VersionedBaseUrl);
        var client = new RestClient(options);
        var request = new RestRequest("membersubscription");
        request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);
        var response = await client.GetAsync(request);

        return response;
    }
    public async Task<RestResponse> GetMemberSubscriptionById(Guid Id)
    {
        var options = new RestClientOptions(settings.VersionedBaseUrl);
        var client = new RestClient(options);
        var request = new RestRequest($"membersubscription/{Id}");
        request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);
        var response = await client.GetAsync(request);

        return response;
    }

    public async Task<RestResponse> GetCompanySubscriptions()
    {
        var options = new RestClientOptions(settings.VersionedBaseUrl);
        var client = new RestClient(options);
        var request = new RestRequest("companysubscription");
        request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);
        var response = await client.GetAsync(request);

        return response;
    }

    public async Task<RestResponse> GetCompanySubscriptionById(Guid Id)
    {
        var options = new RestClientOptions(settings.VersionedBaseUrl);
        var client = new RestClient(options);
        var request = new RestRequest($"companysubscription/{Id}");
        request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);
        var response = await client.GetAsync(request);

        return response;
    }
    public async Task<RestResponse> GetMemberOrderHistory(string id)
    {
        var options = new RestClientOptions(settings.VersionedBaseUrl);
        var client = new RestClient(options);
        var request = new RestRequest("memberorderhistory/" + id);
        request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);
        var response = await client.GetAsync(request);

        return response;
    }

    public async Task<RestResponse> GetMemberDuesPaymentStrategy(string id)
    {
        var options = new RestClientOptions(settings.VersionedBaseUrl);
        var client = new RestClient(options);
        var request = new RestRequest("memberdues/payment-strategy/" + id);
        request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);
        var response = await client.GetAsync(request);

        return response;
    }

    public async Task<RestResponse> GetMemberDuesInvoice(string id)
    {
        var options = new RestClientOptions(settings.VersionedBaseUrl);
        var client = new RestClient(options);
        var request = new RestRequest("memberdues/invoices/" + id);
        request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);
        var response = await client.GetAsync(request);

        return response;
    }

    public async Task<RestResponse> GetMemberDonations(string id)
    {
        var options = new RestClientOptions(settings.VersionedBaseUrl);
        var client = new RestClient(options);
        var request = new RestRequest("memberdonations/" + id);
        request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);
        var response = await client.GetAsync(request);

        return response;
    }

    public async Task<RestResponse> GetMemberCommittees(string id)
    {
        var options = new RestClientOptions(settings.VersionedBaseUrl);
        var client = new RestClient(options);
        var request = new RestRequest("membercommittee/member/" + id);
        request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);
        var response = await client.GetAsync(request);

        return response;
    }

    public async Task<RestResponse> GetMemberPaymentHistory(string id)
    {
        var options = new RestClientOptions(settings.VersionedBaseUrl);
        var client = new RestClient(options);
        var request = new RestRequest("memberdues/history/" + id);
        request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);
        var response = await client.GetAsync(request);

        return response;
    }

    public async Task<RestResponse> GetRequiredCourses(string id)
    {
        var options = new RestClientOptions(settings.VersionedBaseUrl);
        var client = new RestClient(options);
        var request = new RestRequest("memberComponentProgress/" + id);
        request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);
        var response = await client.GetAsync(request);

        return response;
    }
    public async Task<RestResponse> GetMemberCourseCertificates(string id)
    {
        var options = new RestClientOptions(settings.VersionedBaseUrl);
        var client = new RestClient(options);
        var request = new RestRequest("membercoursecertificate/" + id);
        request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);
        var response = await client.GetAsync(request);

        return response;
    }

    public async Task<RestResponse> GetMemberCourseProgress(string id)
    {
        try
        {
            var options = new RestClientOptions(settings.VersionedBaseUrl);
            var client = new RestClient(options);
            var request = new RestRequest("memberCourseProgress/" + id);
            request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);
            var response = await client.GetAsync(request);

            return response;
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<RestResponse> GetMemberMarketingSubscriptions(string id)
    {
        try
        {
            var options = new RestClientOptions(settings.VersionedBaseUrl);
            var client = new RestClient(options);
            var request = new RestRequest("membermarketingsubscription/" + id);
            request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);
            var response = await client.GetAsync(request);

            return response;
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<RestResponse> UpdateMemberMarketingSubscription(string memberMarketingSubscriptionID, bool isActive)
    {
        try
        {
            var options = new RestClientOptions(settings.VersionedBaseUrl);
            var client = new RestClient(options);
            var request = new RestRequest("membermarketingsubscription", Method.Post);
            var json = new { id = memberMarketingSubscriptionID, isActive = isActive };
            request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);
            request.AddBody(JsonConvert.SerializeObject(json));
            var response = await client.PostAsync(request);

            return response;
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<RestResponse> GetShippingRates(ShippingRateRequestDto shippingRequest)
    {
        try
        {
            var options = new RestClientOptions(settings.VersionedBaseUrl);
            var client = new RestClient(options);
            var request = new RestRequest("shipping/ups/rate", Method.Post);
            request.AddHeader(settings.ApiKeyHeader, settings.ApiKey);
            request.AddBody(JsonConvert.SerializeObject(shippingRequest));
            var response = client.Execute(request);
            return response;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
}