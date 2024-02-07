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
}