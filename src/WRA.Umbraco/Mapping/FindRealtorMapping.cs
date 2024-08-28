using Umbraco.Cms.Core.Mapping;
using WRA.UmbracoBridgeServices;
using WRA.Umbraco.Helpers.Constants;
using WRA.Umbraco.Models.Custom.ViewModels;
using WRA.Umbraco.Models.Custom.ViewModels.Entity;
using WRA.Umbraco.Web.Dtos.External;
using WRA.Umbraco.Extensions;

namespace WRA.Umbraco.Mapping;
public class FindRealtorMapping : IMapDefinition
{
    public void DefineMaps(IUmbracoMapper mapper)
    {
        mapper.Define<FindRealtorSearchRequest, SearchMembersRequest>((_, _) => new SearchMembersRequest(), FindRealtorSearchRequestToMemberSearchRequest);
        mapper.Define<FindRealtorCompletionRequest, SearchMembersRequest>((_, _) => new SearchMembersRequest(), FindRealtorCompletionRequestToMemberSearchRequest);

        mapper.Define<PaginationResponseOfMemberDto, PaginationResponseOfFindRealtorMemberViewModels>((_, _) => new PaginationResponseOfFindRealtorMemberViewModels(), PagedMemberResponseToPagedFindRealtorResponse);
        mapper.Define<MemberDto, FindRealtorMemberViewModel>((_, _) => new FindRealtorMemberViewModel(), MemberDtoToFindRealtorMemberViewModel);
        mapper.Define<ExternalLanguageDto, LanguageViewModel>((_, _) => new LanguageViewModel(), ExternalLanguageDtoToViewModel);
        mapper.Define<ExternalStateOrProvinceDto, StateOrProvinceViewModel>((_, _) => new StateOrProvinceViewModel(), ExternalStateOrProvinceDtoToViewModel);

    }

    private void FindRealtorCompletionRequestToMemberSearchRequest(FindRealtorCompletionRequest source, SearchMembersRequest target, MapperContext context)
    {
        target.AdvancedSearch = new Search
        {
            Fields = [source.Field],
            Keyword = source.Query,
        };

        target.AdvancedFilter = new Filter()
        {
            Field = source.Field,
            Operator = FilterOperator.STARTSWITH,
            Value = source.Query
        };

        // Map the page number and page size.
        target.PageNumber = 1;
        target.PageSize = 10;

    }

    // Map a basic post search request to the advanced search filtering.
    private void FindRealtorSearchRequestToMemberSearchRequest(FindRealtorSearchRequest source, SearchMembersRequest target, MapperContext context)
    {
        // Create an AdvancedFilter object with each of it's sub filters being an and.
        // This allows for faceted search where each sub-filter can choose it's own AND or OR logic.
        target.AdvancedFilter = new Filter
        {
            Logic = FilterLogic.AND,
            Filters = []
        };

        // Map the member name and city to and filters.
        // Example: First name contains "John" and last name contains "Doe"
        // and City contains "Mad" etc..
        var memberPropertyFilter = new Filter()
        {
            Logic = FilterLogic.AND,
            Filters = []
        };

        // Add filters for each non-null property
        if (!string.IsNullOrEmpty(source.FirstName))
        {
            memberPropertyFilter.Filters.Add(new Filter
            {
                Field = nameof(source.FirstName),
                Operator = FilterOperator.CONTAINS,
                Value = source.FirstName
            });
        }

        if (!string.IsNullOrEmpty(source.LastName))
        {
            memberPropertyFilter.Filters.Add(new Filter
            {
                Field = nameof(source.LastName),
                Operator = FilterOperator.CONTAINS,
                Value = source.LastName
            });
        }

        if (!string.IsNullOrEmpty(source.City))
        {
            memberPropertyFilter.Filters.Add(new Filter
            {
                Field = nameof(source.City),
                Operator = FilterOperator.CONTAINS,
                Value = source.City
            });
        }

        if (!string.IsNullOrEmpty(source.CompanyName))
        {
            memberPropertyFilter.Filters.Add(new Filter
            {
                Field = nameof(source.CompanyName),
                Operator = FilterOperator.CONTAINS,
                Value = source.CompanyName
            });
        }

        if (memberPropertyFilter.Filters.Count != 0)
        {
            target.AdvancedFilter.Filters.Add(memberPropertyFilter);
        }

        // Map the Designations selected to a list of OR filters.
        // Example:  Designation is GRI or CRS or ABR etc..
        if (source.Designations?.Count != 0)
        {
            var designationsFilters = new Filter
            {
                Logic = FilterLogic.OR,
                Filters = []
            };

            foreach (string? df in source.Designations)
            {
                if (!string.IsNullOrEmpty(df))
                {
                    designationsFilters.Filters.Add(new Filter
                    {
                        Field = nameof(MemberDto.FullName),
                        Operator = FilterOperator.CONTAINS,
                        Value = df
                    });
                }
            }

            if (designationsFilters.Filters.Count != 0)
            {
                target.AdvancedFilter.Filters.Add(designationsFilters);
            }
        }

        // Map the languages selected to a list of OR filters.
        // Example:  Language is English or Spanish or Greek.

        if (!string.IsNullOrEmpty(source.Language))
        {
            target.AdvancedFilter.Filters.Add(new Filter
            {
                Field = nameof(MemberDto.SecondaryLanguage),
                Operator = FilterOperator.CONTAINS,
                Value = source.Language
            });
        }

        if (!string.IsNullOrEmpty(source.LocalBoard) && Guid.TryParse(source.LocalBoard, out Guid primaryLocalBoard))
        {
            target.AdvancedFilter.Filters.Add(new Filter
            {
                Field = nameof(MemberDto.PrimaryLocalBoardId),
                Operator = FilterOperator.EQ,
                Value = primaryLocalBoard
            });
        }

        if (source.OrderBy.Count != 0)
        {
            target.OrderBy = source.OrderBy;
        }
        else
        {
            target.OrderBy = ["iMISId"];
        }

        // Map the page number and page size.
        target.PageNumber = source.PageNumber;
        target.PageSize = source.PageSize;
    }

    private void MemberDtoToFindRealtorMemberViewModel(MemberDto source, FindRealtorMemberViewModel target, MapperContext context)
    {
        target.City = source.City;
        target.CompanyId = source.CompanyId;
        target.CompanyName = source.CompanyName;
        target.FirstName = source.FirstName;
        target.FullName = source.FullName;
        target.IMISId = source.IMISId;
        target.LastFirst = source.LastFirst;
        target.LastName = source.LastName;
        target.MemberTypeId = source.MemberTypeId;
        target.MemberTypeCode = source.MemberTypeCode;
        target.Prefix = source.Prefix;
        target.PrimaryLocalBoardId = source.PrimaryLocalBoardId;
        target.PrimaryLocalBoardName = source.PrimaryLocalBoardName;
        target.SecondaryLanguage = source.SecondaryLanguage;
        target.WorkPhone = source.WorkPhone;
    }

    private void PagedMemberResponseToPagedFindRealtorResponse(PaginationResponseOfMemberDto source, PaginationResponseOfFindRealtorMemberViewModels target, MapperContext context)
    {
        target.CurrentPage = source.CurrentPage;
        target.HasNextPage = source.HasNextPage;
        target.HasPreviousPage = source.HasPreviousPage;
        target.PageSize = source.PageSize;
        target.TotalCount = source.TotalCount;
        target.TotalPages = source.TotalPages;
        target.Data = context.Map<List<FindRealtorMemberViewModel>>(source.Data) ?? [];
    }

    private void ExternalStateOrProvinceDtoToViewModel(ExternalStateOrProvinceDto source, StateOrProvinceViewModel target, MapperContext context)
    {
        target.Id = source.Id.SafeString();
        target.Abbreviation = source.Abbreviation;
        target.Name = source.Name;
        target.SortSeqn = source.SortSeqn;
    }

    private void ExternalLanguageDtoToViewModel(ExternalLanguageDto source, LanguageViewModel target, MapperContext context)
    {
        target.Id = source.Id.SafeString();
        target.Value = source.Value;
        target.Name = source.Name;
        target.SortSeqn = source.SortSeqn;
    }
}