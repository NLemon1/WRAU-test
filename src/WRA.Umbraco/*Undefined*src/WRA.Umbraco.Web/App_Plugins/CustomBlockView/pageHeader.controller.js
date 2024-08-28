angular.module("umbraco").controller("pageHeaderController", function (editorState, $scope) {

    //console.log(editorState.getCurrent());
    //console.log($scope.block.data);

    $scope.parentPage = editorState.getCurrent();

});