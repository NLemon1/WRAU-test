using System.ComponentModel.DataAnnotations;

namespace WRA.Umbraco.Models.Custom.ViewModels;

public class FindRealtorCompletionRequest
{
    public string? Query { get; set; }

    public string? Field { get; set; }
}
