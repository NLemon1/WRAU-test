using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WRA.Umbraco.Web.Dtos.External;

namespace WRA.Umbraco.Models;
public partial class MywraEducation
{
    public List<OrderHistoryDto> Orders { get; set; }
}