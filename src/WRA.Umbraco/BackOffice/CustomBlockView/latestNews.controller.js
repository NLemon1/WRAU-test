angular.module("umbraco").controller("latestNewsController", function ($scope) {
      
    const block = $scope.block.data;

    let className = "";

    if (block.additionalCssClasses) {
        className += block.additionalCssClasses;
    }

    $scope.className = className;

});