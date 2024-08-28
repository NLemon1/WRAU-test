angular.module("umbraco").controller("breadcrumbsController", function (editorState, entityResource, $scope) {

    //console.log(editorState.getCurrent());
    //console.log($scope.block.data);

    var currentPage = editorState.getCurrent();

    entityResource.getAncestors(currentPage.id, 'document')
        .then(function (data) {
            //console.log(data);

            data.pop(); // remove last item in array, which is the current page and we want to handle differently

            $scope.parentPages = data;
            $scope.currentPage = currentPage;
        });

});