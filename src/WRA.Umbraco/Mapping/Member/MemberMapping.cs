using Umbraco.Cms.Core.Mapping;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Extensions;

namespace WRA.Umbraco.Mapping.Member;

public class MemberMapping : IMapDefinition
{
    public void DefineMaps(IUmbracoMapper mapper)
    {
        mapper.Define<Models.Custom.Events.Member, MemberDto>((source, context) => new MemberDto(), MemberToDto);
        mapper.Define<IMember, MemberDto>((source, context) => new MemberDto(), PublishedContentToMemberDto);
        mapper.Define<MemberDto, MemberEvent>((source, context) => new MemberEvent(), DtoToMember);
        mapper.Define<Models.Member, MemberDto>((source, context) => new MemberDto(), UmbracoMemberToMemberDto);
        
    }

    private void UmbracoMemberToMemberDto(Models.Member source, MemberDto target, MapperContext context)
    {
        target.Id = source.ExternalId.SafeGuid();
        target.ExternalId = source.ExternalId;
        target.NRDSId = source.ExternalId;
        target.UmbracoId = source.Id.ToString();
        // target.CommonId = source.CommonId;
        // target.PasswordHash = source.PasswordHash;
        // target.PasswordSalt = source.PasswordSalt;
        target.UserName = source.BrokerEmail;
        target.Email = source.BrokerEmail;
        target.Prefix = source.Prefix;
        target.FirstName = source.FirstName;
        target.LastName = source.LastName;
        target.Suffix = source.Suffix;
        target.FullName = source.FullName;
        target.LastFirst = source.LastName;
        target.Address1 = source.Address1;
        target.Address2 = source.Address2;
        target.Address3 = source.Address3;
        target.City = source.City;
        target.StateProvince = source.StateProvince;
        target.Zip = source.Zip;
        // target.MarketingEmail = source.;
        target.CompanyName = source.CompanyName;
        target.BrokerFullName = source.BrokerFullName;
        target.BrokerEmail = source.BrokerEmail;
        target.HomePhone = source.HomePhone;
        target.WorkPhone = source.WorkPhone;
        target.CellPhone = source.CellPhone;
        // target.MemberTypeId = source.;
        target.ImageUrl = source.ImageUrl;
    }
    private static void PublishedContentToMemberDto(IMember source, MemberDto target, MapperContext context)
    {
        target.Id = source.GetValue("ExternalId").SafeGuid();
        target.ExternalId = source.GetValue<string>("ExternalId").SafeString();
        target.UmbracoId = source.Id.ToString();
        target.EntityName = source.ContentType.Alias;
        target.NRDSId = source.GetValue<string>("nrdsId");
        target.CommonId = source.GetValue<int>("commonId");
        // target.PasswordHash = source.GetValue<string>("passwordHash").SafeString();
        // target.PasswordSalt = source.GetValue<string>("passwordSalt") ?? string.Empty;;
        target.UserName = source.GetValue<string>("userName") ?? string.Empty;;
        target.Prefix = source.GetValue<string>("prefix") ?? string.Empty;;
        target.FirstName = source.GetValue<string>("firstName") ?? string.Empty;;
        target.LastName = source.GetValue<string>("lastName") ?? string.Empty;;
        target.Suffix = source.GetValue<string>("suffix") ?? string.Empty;;
        target.FullName = source.GetValue<string>("fullName") ?? string.Empty;;
        target.LastFirst = source.GetValue<string>("lastFirst") ?? string.Empty;;
        target.Address1 = source.GetValue<string>("address1") ?? string.Empty;;
        target.Address2 = source.GetValue<string>("address2") ?? string.Empty;;
        target.Address3 = source.GetValue<string>("address3") ?? string.Empty;;
        target.City = source.GetValue<string>("city") ?? string.Empty;;
        target.StateProvince = source.GetValue<string>("stateProvince") ?? string.Empty;;
        target.Zip = source.GetValue<string>("zip") ?? string.Empty;;
        target.Email = source.GetValue<string>("email") ?? string.Empty;;
        target.MarketingEmail = source.GetValue<string>("marketingEmail") ?? string.Empty;;
        target.CompanyName = source.GetValue<string>("companyName") ?? string.Empty;;
        target.BrokerFullName = source.GetValue<string>("brokerFullName") ?? string.Empty;;
        target.BrokerEmail = source.GetValue<string>("brokerEmail") ?? string.Empty;;
        target.HomePhone = source.GetValue<string>("homePhone") ?? string.Empty;;
        target.WorkPhone = source.GetValue<string>("workPhone") ?? string.Empty;;
        target.CellPhone = source.GetValue<string>("cellPhone") ?? string.Empty;;
        target.MemberTypeId = source.GetValue<string>("memberTypeId").SafeGuid();
        target.ImageUrl = source.GetValue<string>("imageUrl") ?? string.Empty;
    }
    private static void DtoToMember(MemberDto source, IMemberEvent target, MapperContext context)
    {
        target.iMISId = source.ExternalId;
        target.NrdsId = source.NRDSId;
        target.CommonId = source.CommonId;
        // target.PasswordHash = source.PasswordHash;
        // target.PasswordSalt = source.PasswordSalt;
        target.UserName = source.UserName;
        target.Prefix = source.Prefix;
        target.FirstName = source.FirstName;
        target.LastName = source.LastName;
        target.Suffix = source.Suffix;
        target.FullName = source.FullName;
        target.LastFirst = source.LastFirst;
        target.Address1 = source.Address1;
        target.Address2 = source.Address2;
        target.Address3 = source.Address3;
        target.City = source.City;
        target.StateProvince = source.StateProvince;
        target.Zip = source.Zip;
        target.Email = source.Email;
        target.MarketingEmail = source.MarketingEmail;
        target.CompanyName = source.CompanyName;
        target.BrokerFullName = source.BrokerFullName;
        target.BrokerEmail = source.BrokerEmail;
        target.HomePhone = source.HomePhone;
        target.WorkPhone = source.WorkPhone;
        target.CellPhone = source.CellPhone;
        target.MemberTypeId = source.MemberTypeId;
        target.ImageUrl = source.ImageUrl;
    }
    private static void MemberToDto(IMemberEvent source, MemberDto target, MapperContext context)
    {
        target.Id = Guid.Parse(source.iMISId);
        target.IMISId = source.iMISId;
        target.NRDSId = source.NrdsId;
        target.CommonId = source.CommonId;
        // target.PasswordHash = source.PasswordHash;
        // target.PasswordSalt = source.PasswordSalt;
        target.UserName = source.UserName;
        target.Prefix = source.Prefix;
        target.FirstName = source.FirstName;
        target.LastName = source.LastName;
        target.Suffix = source.Suffix;
        target.FullName = source.FullName;
        target.LastFirst = source.LastFirst;
        target.Address1 = source.Address1;
        target.Address2 = source.Address2;
        target.Address3 = source.Address3;
        target.City = source.City;
        target.StateProvince = source.StateProvince;
        target.Zip = source.Zip;
        target.Email = source.Email;
        target.MarketingEmail = source.MarketingEmail;
        target.CompanyName = source.CompanyName;
        target.BrokerFullName = source.BrokerFullName;
        target.BrokerEmail = source.BrokerEmail;
        target.HomePhone = source.HomePhone;
        target.WorkPhone = source.WorkPhone;
        target.CellPhone = source.CellPhone;
        target.MemberTypeId = source.MemberTypeId;
        target.ImageUrl = source.ImageUrl;
    }
}