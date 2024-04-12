using System.Collections.Generic;
using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Core.Models;
using WRA.Umbraco.Extensions;

namespace WRA.Umbraco.Models;
public partial class CheckoutInformationPage
{
    public IEnumerable<CountryReadOnly> Countries => UmbracoCommerceApi.Instance.GetCountries(this.GetStore().Id);

}
