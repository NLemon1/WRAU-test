using Lucene.Net.Analysis.Core;
using RestSharp;
using RestSharp.Authenticators;


namespace WRA.Umbraco.Services;
public class WRAExternalApiService
{
    private readonly string _token;


    public WRAExternalApiService()
    {
        _token = "sJWH7cFR6rSVVYMjrxYAIY0ZrhW7SVJYik5qTUb";
    }

    public async Task<RestResponse> GetProductCategories()
    {
        var options = new RestClientOptions("https://app2.wra.org/umbraco/api/v1");
        var client = new RestClient(options);
        var request = new RestRequest("productcategory");
        request.AddHeader("X-API-KEY", _token);
        var response = await client.GetAsync(request);

        return response;
    }
    public async Task<RestResponse> GetProductSubCategories()
    {
        var options = new RestClientOptions("https://app2.wra.org/umbraco/api/v1");
        var client = new RestClient(options);
        var request = new RestRequest("productSubcategory");
        request.AddHeader("X-API-KEY", _token);
        var response = await client.GetAsync(request);

        return response;
    }
    public async Task<RestResponse> GetProducts()
    {
        var options = new RestClientOptions("https://app2.wra.org/umbraco/api/v1");
        var client = new RestClient(options);
        var request = new RestRequest("product");
        request.AddHeader("X-API-KEY", _token);
        var response = await client.GetAsync(request);

        return response;
    }

    public async Task<RestResponse> GetBoards()
    {
        var options = new RestClientOptions("https://app2.wra.org/umbraco/api/v1");
        var client = new RestClient(options);
        var request = new RestRequest("localboard");
        request.AddHeader("X-API-KEY", _token);
        var response = await client.GetAsync(request);

        return response;
    }
    public async Task<RestResponse> GetMembers(int amount = 10000)
    {
        var options = new RestClientOptions("https://app2.wra.org/umbraco/api/v1");
        var client = new RestClient(options);
        var request = new RestRequest("member/search").AddBody(new { keyword = "", pageSize = 50, pageNumber = 1 });
        request.AddHeader("X-API-KEY", _token);
        var response = await client.PostAsync(request);

        return response;
    }
    public async Task<RestResponse> GetCompanies(int amount = 20000)
    {
        var options = new RestClientOptions("https://app2.wra.org/umbraco/api/v1");
        var client = new RestClient(options);
        var request = new RestRequest("company/search").AddBody(new { keyword = "", pageSize = amount, pageNumber = 1 });
        request.AddHeader("X-API-KEY", _token);
        var response = await client.PostAsync(request);

        return response;
    }
}