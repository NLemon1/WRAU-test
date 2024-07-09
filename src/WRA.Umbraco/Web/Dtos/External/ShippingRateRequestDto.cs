using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Cms.Web.Common.Attributes;

namespace WRA.Umbraco.Web.Dtos.External;
public class ShippingRateRequestDto
{
    public string MemberID { get; set; } = string.Empty;
    public string OrderNumber { get; set; } = string.Empty;
    public PhysicalAddressDto ToAddress { get; set; }
    public PhysicalAddressDto FromAddress { get; set; }
    public decimal Weight { get; set; }

    public ShippingRateRequestDto()
    {
        ToAddress = new PhysicalAddressDto();
        FromAddress = new PhysicalAddressDto();
    }
}

public class PhysicalAddressDto
{
    public string Name { get; set; } = string.Empty;
    public string Address1 { get; set; } = string.Empty;
    public string Address2 { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string Zip { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
}
