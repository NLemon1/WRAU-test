﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common.Controllers;
using WRA.Umbraco.Models;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Web.Controllers
{
    

    public class SearchResultsController : RenderController
    {
        private readonly SearchService _searchService;
        private readonly IPublishedValueFallback _publishedValueFallback;
        public SearchResultsController(
        ILogger<RenderController> logger,
        ICompositeViewEngine compositeViewEngine,
        IUmbracoContextAccessor umbracoContextAccessor,
        IPublishedValueFallback publishedValueFallback,
        SearchService searchService)
        : base(logger,
            compositeViewEngine,
            umbracoContextAccessor)
        {
            _searchService = searchService;
            _publishedValueFallback = publishedValueFallback;
        }

        public override IActionResult Index()
        {
            // Get the queryString from the request
            string queryString = HttpContext.Request.Query["q"];

            // Create the view model and pass it to the view
            SearchResults viewModel = new(CurrentPage!, _publishedValueFallback)
            {
                Results = _searchService.SearchPages(queryString),
                searchTerm = queryString,
                HasSearched = !String.IsNullOrEmpty(queryString)
            };

            return CurrentTemplate(viewModel);
        }
    }
}
