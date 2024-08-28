angular.module("umbraco").controller("imageTextRowController", function ($scope) {

    const block = $scope.block.data;

    let col1Bg = "";
    let col2Bg = "";
    let col1ClassName = "";
    let col2ClassName = "";

    if (block.col1BackgroundColor) {
        col1Bg = `background-color:#${block.col1BackgroundColor.value};`;
        col1ClassName = "py-5 pt-md-8 pb-md-8 pe-5";
    }

    if (block.col2BackgroundColor) {
        col2Bg = `background-color:#${block.col2BackgroundColor.value};`;
        col2ClassName = "py-5 pt-md-8 pb-md-8 pe-5";
    }

    $scope.col1Bg = col1Bg;
    $scope.col2Bg = col2Bg;
    $scope.col1ClassName = col1ClassName;
    $scope.col2ClassName = col2ClassName;

});