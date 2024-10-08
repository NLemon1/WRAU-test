using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Mapping;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Exceptions;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Helpers.Constants;
using WRA.Umbraco.Repositories;
using WRA.Umbraco.Web.Dtos.External;
using WRA.Umbraco.Web.Dtos.Member;

namespace WRA.Umbraco.Mapping;

public class MemberMapping(
    MemberGroupRepository memberGroupRepository,
    MappingHelper mappingHelper,
    ILogger<MemberMapping> logger) : IMapDefinition
{
    public void DefineMaps(IUmbracoMapper mapper)
    {
        // Dtos
        mapper.Define<MemberEvent, ExternalMemberDto>((_, _) => new ExternalMemberDto(), MemberToDto);
        mapper.Define<IMember, ExternalMemberDto>((_, _) => new ExternalMemberDto(), PublishedContentToMemberDto);
        mapper.Define<Models.Member, ExternalMemberDto>((_, _) => new ExternalMemberDto(), UmbracoMemberToMemberDto);
        mapper.Define<IPublishedContent, EditMemberDto>((_, _) => new EditMemberDto(), UmbracoMemberToEditMemberDto);

        // Events
        mapper.Define<IMember, MemberEvent>((_, _) => new MemberEvent(), PublishedContentToMemberEvent);
        mapper.Define<ExternalMemberDto, MemberEvent>((_, _) => new MemberEvent(), DtoToMember);
    }

    private void UmbracoMemberToEditMemberDto(IPublishedContent source, EditMemberDto target, MapperContext context)
    {
        target.MemberId = source.Id;
        target.FirstName = source.Value<string>(GlobalConstants.Member.FirstName) ?? string.Empty;
        target.LastName = source.Value<string>(GlobalConstants.Member.LastName) ?? string.Empty;
        target.PrimaryCounties = source.Value<string>(GlobalConstants.Member.PrimaryCounties) ?? string.Empty;
        target.PersonalWebSite = source.Value<string>(GlobalConstants.Member.PersonalWebSite) ?? string.Empty;
        target.AreaOfSpecialty = source.Value<string>(GlobalConstants.Member.AreaOfSpecialty) ?? string.Empty;
        target.SecondaryLanguage = source.Value<string>(GlobalConstants.Member.SecondaryLanguage) ?? string.Empty;
        target.Address1 = source.Value<string>(GlobalConstants.Member.AddressLine1) ?? string.Empty;
        target.Address2 = source.Value<string>(GlobalConstants.Member.AddressLine2) ?? string.Empty;
        target.City = source.Value<string>(GlobalConstants.Member.City) ?? string.Empty;
        target.State = source.Value<string>(GlobalConstants.Member.State) ?? string.Empty;
        target.ZipCode = source.Value<string>(GlobalConstants.Member.ZipCode) ?? string.Empty;
        target.WorkPhone = source.Value<string>(GlobalConstants.Member.WorkPhone) ?? string.Empty;
        target.HomePhone = source.Value<string>(GlobalConstants.Member.HomePhone) ?? string.Empty;
        target.CellPhone = source.Value<string>(GlobalConstants.Member.CellPhone) ?? string.Empty;
        target.Email = source.Value<string>(GlobalConstants.Member.Email) ?? string.Empty;

    }

    private void PublishedContentToMemberEvent(IMember source, MemberEvent target, MapperContext context)
    {
        target.UserName = source.Username;
        target.Email = source.Email;
        target.PasswordHash = source.RawPasswordValue ?? string.Empty;
        target.PasswordSalt = source.GetValue<string>("token") ?? string.Empty;
        target.Id = source.GetValue<Guid>(GlobalConstants.ExternalId);
        target.NrdsId = source.GetValue<string>("nrdsId") ?? string.Empty;
        target.CommonId = source.GetValue<int>("commonId");
        target.Prefix = source.GetValue<string>("prefix") ?? string.Empty;
        target.FirstName = source.GetValue<string>("firstName") ?? string.Empty;
        target.LastName = source.GetValue<string>("lastName") ?? string.Empty;
        target.Suffix = source.GetValue<string>("suffix") ?? string.Empty;
        target.FullName = source.GetValue<string>("fullName") ?? string.Empty;
        target.LastFirst = source.GetValue<string>("lastFirst") ?? string.Empty;
        target.Address1 = source.GetValue<string>("address1") ?? string.Empty;
        target.Address2 = source.GetValue<string>("address2") ?? string.Empty;
        target.Address3 = source.GetValue<string>("address3") ?? string.Empty;
        target.City = source.GetValue<string>("city") ?? string.Empty;
        target.StateProvince = source.GetValue<string>("stateProvince") ?? string.Empty;
        target.Zip = source.GetValue<string>("zip") ?? string.Empty;
        target.MarketingEmail = source.GetValue<string>("marketingEmail") ?? string.Empty;
        target.CompanyName = source.GetValue<string>("companyName") ?? string.Empty;
        target.BrokerFullName = source.GetValue<string>("brokerFullName") ?? string.Empty;
        target.BrokerEmail = source.GetValue<string>("brokerEmail") ?? string.Empty;
        target.HomePhone = source.GetValue<string>("homePhone") ?? string.Empty;
        target.WorkPhone = source.GetValue<string>("workPhone") ?? string.Empty;
        target.CellPhone = source.GetValue<string>("cellPhone") ?? string.Empty;
        target.MemberTypeId = source.GetValue<string>("memberTypeId").SafeGuid();
        target.ImageUrl = source.GetValue<string>("imageUrl") ?? string.Empty;
        target.CompanyId = mappingHelper.GetRelatedContent(source, "company")?.Value(GlobalConstants.ExternalId).SafeGuid();
        target.PrimaryLocalBoardId = mappingHelper.GetRelatedContent(source, "primaryLocalBoard")?.Value(GlobalConstants.ExternalId).SafeGuid(); // is this correct?
        target.MemberTypeId = GetMemberGroupKey(source);
        target.iMISId = source.GetValue<string>("iMISId") ?? string.Empty;

    }

    private Guid GetMemberGroupKey(IMember source)
    {
        var memberGroups = memberGroupRepository.GetMemberGroupsByMember(source);
        return memberGroups?.FirstOrDefault()?.Key ?? Guid.Empty;
    }

    private void UmbracoMemberToMemberDto(Models.Member source, ExternalMemberDto target, MapperContext context)
    {
        try
        {
            // Ensure both source and target are not null
            if (source == null) throw new ArgumentNullException(nameof(source), "Source member cannot be null.");
            if (target == null) throw new ArgumentNullException(nameof(target), "Target DTO cannot be null.");

            // Map properties that have changed
            // if (Guid.TryParse(source.ExternalId, out Guid sourceGuid) && !target.Id.Equals(sourceGuid)) target.Id = sourceGuid.SafeGuid();
            if (source.ExternalId is not null && !target.ExternalId.Equals(source.ExternalId)) target.ExternalId = source.ExternalId.SafeGuid();
            if (source.NrdsId is not null && target.NRDSId?.Equals(source.NrdsId) is not true) target.NRDSId = source.NrdsId;

            if (target.UmbracoId?.Equals(source.ExternalId) is not true) target.UmbracoId = source.Id.ToString();

            if (source.MarketingEmail is not null && target.MarketingEmail?.Equals(source.MarketingEmail) is not true) target.MarketingEmail = source.MarketingEmail;
            if (source.BrokerEmail is not null && target.BrokerEmail?.Equals(source.BrokerEmail) is not true) target.BrokerEmail = source.BrokerEmail;

            if (source.BrokerEmail is not null && target.Email?.Equals(source.BrokerEmail) is not true) target.Email = source.BrokerEmail;
            if (source.Prefix is not null && target.Prefix?.Equals(source.Prefix) is not true) target.Prefix = source.Prefix;
            if (source.FirstName is not null && target.FirstName?.Equals(source.FirstName) is not true) target.FirstName = source.FirstName;
            if (source.LastName is not null && target.LastName?.Equals(source.LastName) is not true) target.LastName = target.LastFirst = source.LastName;
            if (source.Suffix is not null && target.Suffix?.Equals(source.Suffix) is not true) target.Suffix = source.Suffix;
            if (source.FullName is not null && target.FullName?.Equals(source.FullName) is not true) target.FullName = source.FullName;
            if (source.Address1 is not null && target.Address1?.Equals(source.Address1) is not true) target.Address1 = source.Address1;
            if (source.Address2 is not null && target.Address2?.Equals(source.Address2) is not true) target.Address2 = source.Address2;
            if (source.Address3 is not null && target.Address3?.Equals(source.Address3) is not true) target.Address3 = source.Address3;
            if (source.City is not null && target.City?.Equals(source.City) is not true) target.City = source.City;
            if (source.StateProvince is not null && target.StateProvince?.Equals(source.StateProvince) is not true) target.StateProvince = source.StateProvince;
            if (source.Zip is not null && target.Zip?.Equals(source.Zip) is not true) target.Zip = source.Zip;
            if (source.CompanyName is not null && target.CompanyName?.Equals(source.CompanyName) is not true) target.CompanyName = source.CompanyName;
            if (source.BrokerFullName is not null && target.BrokerFullName?.Equals(source.BrokerFullName) is not true) target.BrokerFullName = source.BrokerFullName;
            if (source.BrokerEmail is not null && target.BrokerEmail?.Equals(source.BrokerEmail) is not true) target.BrokerEmail = source.BrokerEmail;
            if (source.HomePhone is not null && target.HomePhone?.Equals(source.HomePhone) is not true) target.HomePhone = source.HomePhone;
            if (source.WorkPhone is not null && target.WorkPhone?.Equals(source.WorkPhone) is not true) target.WorkPhone = source.WorkPhone;
            if (source.CellPhone is not null && target.CellPhone?.Equals(source.CellPhone) is not true) target.CellPhone = source.CellPhone;
            if (source.ImageUrl is not null && target.ImageUrl?.Equals(source.ImageUrl) is not true) target.ImageUrl = source.ImageUrl;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error mapping Umbraco member to Member DTO: {Message}", ex.Message);
            throw new ObjectMappingException($"Error mapping Umbraco member to Member DTO: {ex.Message}", ex);
        }
    }

    private static void PublishedContentToMemberDto(IMember source, ExternalMemberDto target, MapperContext context)
    {
        target.ExternalId = source.GetValue<string>(GlobalConstants.ExternalId).SafeGuid();
        target.UmbracoId = source.Id.ToString();
        target.NRDSId = source.GetValue<string>("nrdsId") ?? string.Empty;
        target.CommonId = source.GetValue<int>("commonId");

        target.UserName = source.GetValue<string>("userName") ?? string.Empty;
        target.Prefix = source.GetValue<string>("prefix") ?? string.Empty;
        target.FirstName = source.GetValue<string>("firstName") ?? string.Empty;
        target.LastName = source.GetValue<string>("lastName") ?? string.Empty;
        target.Suffix = source.GetValue<string>("suffix") ?? string.Empty;
        target.FullName = source.GetValue<string>("fullName") ?? string.Empty;
        target.LastFirst = source.GetValue<string>("lastFirst") ?? string.Empty;
        target.Address1 = source.GetValue<string>("address1") ?? string.Empty;
        target.Address2 = source.GetValue<string>("address2") ?? string.Empty;
        target.Address3 = source.GetValue<string>("address3") ?? string.Empty;
        target.City = source.GetValue<string>("city") ?? string.Empty;
        target.StateProvince = source.GetValue<string>("stateProvince") ?? string.Empty;
        target.Zip = source.GetValue<string>("zip") ?? string.Empty;
        target.Email = source.GetValue<string>("email") ?? string.Empty;
        target.MarketingEmail = source.GetValue<string>("marketingEmail") ?? string.Empty;
        target.CompanyName = source.GetValue<string>("companyName") ?? string.Empty;
        target.BrokerFullName = source.GetValue<string>("brokerFullName") ?? string.Empty;
        target.BrokerEmail = source.GetValue<string>("brokerEmail") ?? string.Empty;
        target.HomePhone = source.GetValue<string>("homePhone") ?? string.Empty;
        target.WorkPhone = source.GetValue<string>("workPhone") ?? string.Empty;
        target.CellPhone = source.GetValue<string>("cellPhone") ?? string.Empty;
        target.MemberTypeId = source.GetValue<string>("memberTypeId").SafeGuid();
        target.ImageUrl = source.GetValue<string>("imageUrl") ?? string.Empty;
    }

    private static void DtoToMember(ExternalMemberDto source, MemberEvent target, MapperContext context)
    {
        target.Id = source.ExternalId;
        target.iMISId = source.IMISId;
        target.NrdsId = source.NRDSId;
        target.CommonId = source.CommonId;
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
        target.CompanyName = source.CompanyName ?? string.Empty;
        target.BrokerFullName = source.BrokerFullName;
        target.BrokerEmail = source.BrokerEmail;
        target.HomePhone = source.HomePhone;
        target.WorkPhone = source.WorkPhone;
        target.CellPhone = source.CellPhone;
        target.MemberTypeId = source.MemberTypeId;
        target.ImageUrl = source.ImageUrl;
        target.PasswordHash = source.PasswordHash;
        target.PasswordSalt = source.PasswordSalt;
    }

    private static void MemberToDto(MemberEvent source, ExternalMemberDto target, MapperContext context)
    {
        target.ExternalId = source.Id;
        target.IMISId = source.iMISId;
        target.NRDSId = source.NrdsId;
        target.CommonId = source.CommonId;
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