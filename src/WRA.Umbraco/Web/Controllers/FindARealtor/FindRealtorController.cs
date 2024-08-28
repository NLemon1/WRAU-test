using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common.Controllers;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Services;
using WRA.Umbraco.Models.Custom.ViewModels;
using Umbraco.Cms.Core.Mapping;
using WRA.Umbraco.Models;
using WRA.Umbraco.Repositories;
using Umbraco.Cms.Core.Models;
using WRA.Umbraco.Models.Custom.ViewModels.Entity;
using Umbraco.Cms.Core.Cache;
using WRA.Umbraco.Web.Dtos.External;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace WRA.Umbraco.Web.Controllers;

public class FindRealtorController : RenderController
{
    private readonly ILogger _logger;
    private readonly IVariationContextAccessor _variationContextAccessor;
    private readonly BoardRepository _boardRepository;
    private readonly MemberGroupRepository _memberGroupRepository;
    private readonly StateOrProvinceRepository _stateOrProvinceRepository;
    private readonly DesignationRepository _designationRepository;
    private readonly ServiceContext _serviceContext;
    private readonly LanguageRepository _languageRepository;
    private readonly IUmbracoMapper _umbracoMapper;
    private readonly IAppPolicyCache _runtimeCache;

    public FindRealtorController(
        ILogger<FindRealtorController> baseLogger,
        ILogger logger,
        ICompositeViewEngine compositeViewEngine,
        IUmbracoContextAccessor umbracoContextAccessor,
        IVariationContextAccessor variationContextAccessor,
        IUmbracoMapper umbracoMapper,
        AppCaches appCaches,
        MemberGroupRepository memberGroupRepository,
        LanguageRepository languageRepository,
        StateOrProvinceRepository stateOrProvinceRepository,
        DesignationRepository designationRepository,
        BoardRepository boardRepository,
        ServiceContext serviceContext)
    : base(baseLogger, compositeViewEngine, umbracoContextAccessor)
    {
        _logger = logger.ForContext<FindRealtorController>();
        _variationContextAccessor = variationContextAccessor;
        _serviceContext = serviceContext;
        _umbracoMapper = umbracoMapper;
        _runtimeCache = appCaches.RuntimeCache;
        _boardRepository = boardRepository;
        _languageRepository = languageRepository;
        _designationRepository = designationRepository;
        _memberGroupRepository = memberGroupRepository;
        _stateOrProvinceRepository = stateOrProvinceRepository;
    }

    public override IActionResult Index()
    {
        using LoggerActivity? activity = _logger.StartActivity(LogEventLevel.Information, "Umbraco RenderController - {Controller}:{Action}", nameof(FindRealtorController), nameof(Index));
        try
        {
            if (CurrentPage is null)
            {
                return CurrentTemplate(CurrentPage);
            }

            // Define a unique cache key for your view model
            string cacheKey = $"{nameof(FindRealtorViewModel)}_{CurrentPage.Id}";

            // Try to get the view model from the cache otherwise retrieve it from the repositories.
            // Cache view model for all requests not just this one for 5 minutes.
            FindRealtorViewModel? findARealtorViewModel = _runtimeCache.GetCacheItem<FindRealtorViewModel>(
                cacheKey,
                () =>
                {
                    _logger.Information("Cache Miss: Retrieving {Model}", nameof(FindRealtorViewModel));

                    // Retrieve all the backend or external entities that may have properties we don't want to expose.
                    // Using the spread operator to turn all the enumerable collections into lists as we need all the items.
                    List<Board> boards = [.. _boardRepository.GetAllBoards()];
                    List<Designation> designations = [.. _designationRepository.GetAllDesignations()];
                    List<ExternalLanguageDto> languages = [.. _languageRepository.GetAllLanguages()];
                    List<ExternalStateOrProvinceDto> stateOrProvinces = [.. _stateOrProvinceRepository.GetAllStateOrProvinces()];

                    // Map the backend or external entities lists to view model lists.
                    var languageViewModels = _umbracoMapper.Map<List<LanguageViewModel>>(languages) ?? [];
                    var boardViewModels = _umbracoMapper.Map<List<BoardViewModel>>(boards) ?? [];
                    var designationViewModels = _umbracoMapper.Map<List<DesignationViewModel>>(designations) ?? [];
                    var stateOrProvinceViewModels = _umbracoMapper.Map<List<StateOrProvinceViewModel>>(stateOrProvinces) ?? [];

                    // Create and return the page view model from our lists, ensuring that we use the published content wrapped constructor.
                    // This ensure that the FindRealtorViewModel inherits all the properties for IPublishedContent etc.
                    return new FindRealtorViewModel(CurrentPage, new PublishedValueFallback(_serviceContext, _variationContextAccessor))
                    {
                        BoardList = new SelectList(boardViewModels, nameof(BoardViewModel.Id), nameof(BoardViewModel.Name)),
                        DesignationList = new MultiSelectList(designationViewModels, nameof(DesignationViewModel.DesignationCode), nameof(DesignationViewModel.Title)),
                        LanguageList = new SelectList(languageViewModels, nameof(LanguageViewModel.Value), nameof(LanguageViewModel.Name)),
                        StateList = new SelectList(stateOrProvinceViewModels, nameof(StateOrProvinceViewModel.Abbreviation), nameof(StateOrProvinceViewModel.Name)),
                    };
                },
                TimeSpan.FromMinutes(5));

            activity.Complete();
            return CurrentTemplate(findARealtorViewModel);
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "An unexpected error occurred in the {Controller}:{Action} action", nameof(FindRealtorController), nameof(Index));
            activity.Complete(LogEventLevel.Error);
            return StatusCode(500, "An unexpected error occurred while processing your request.");
        }
    }

    public IActionResult FindArealtorPage()
    {
        return Index();
    }
}
