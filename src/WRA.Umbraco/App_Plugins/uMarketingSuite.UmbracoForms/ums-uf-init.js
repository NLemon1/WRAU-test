angular.module("uMarketingSuite.UmbracoForms", ["uMarketingSuite"]);
angular.module("umbraco").requires.push("uMarketingSuite.UmbracoForms");

angular.module("uMarketingSuite.UmbracoForms").run([
    "UMS_ADDONS",
    function (addons) {
        // Register UmbracoForms addon
        addons.umbracoForms = true;
    }
]);
