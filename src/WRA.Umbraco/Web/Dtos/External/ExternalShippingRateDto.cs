using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WRA.Umbraco.Web.Dtos.External;
public class ExternalShippingRateDto
{
    public string? Carrier { get; set; }
    public string? MethodName { get; set; }
    public decimal? ShippingRate { get; set; }
}
