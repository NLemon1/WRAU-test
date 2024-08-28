angular.module("umbraco").controller("testimonialsSliderController", function ($scope, contentResource) {

    //console.log($scope.block.data);

    // docs: https://github.com/umbraco/Umbraco-CMS/blob/34e80d86e8c0b754f6b7a02e307f53cb32806bbe/src/Umbraco.Web.UI.Client/src/common/resources/content.resource.js#L372
    contentResource.getChildren(1384, { pageSize: 4, pageNumber: 1, orderDirection: 'Descending' })
        .then(function (data) {
            //console.log(data);

            $scope.testimonials = data.items;
        });
});