using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WRA.Umbraco.Models.Custom.ViewModels;
public class FindRealtorSearchRequest
{
    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? City { get; set; }

    public string? CompanyName { get; set; }

    public string? State { get; set; } = null;

    public string? Language { get; set; } = null;

    public string? LocalBoard { get; set; } = null;

    public List<string>? Designations { get; set; } = [];

    public int PageNumber { get; set; } = 1;

    public int PageSize { get; set; } = 10;

    public List<string>? OrderBy { get; set; } = [];
}
