using RestSharp;
using WRA.Umbraco.Configuration;

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

    public async Task<RestResponse> GetBoards()
    {
        var options = new RestClientOptions(settings.VersionedBaseUrl);
        var client = new RestClient(options);
        var request = new RestRequest("localboard");
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
}