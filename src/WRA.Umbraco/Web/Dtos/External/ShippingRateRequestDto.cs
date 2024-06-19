using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Cms.Web.Common.Attributes;

namespace WRA.Umbraco.Web.Dtos.External;
public class ShippingRateRequestDto
{
    public string MemberID { get; set; }
    public string OrderNumber { get; set; }
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
    public string Name { get; set; }
    public string Address1 { get; set; }
    public string Address2 { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string Zip { get; set; }
    public string Country { get; set; }
}
