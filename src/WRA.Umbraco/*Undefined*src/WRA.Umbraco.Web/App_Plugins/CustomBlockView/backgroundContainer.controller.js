angular.module("umbraco").controller("backgroundContainerController", function ($scope) {

    const block = $scope.block.data;

    let className = "block-background-container";
    let style = "";

    if (block.yPadding) {
        style += `padding-bottom:${block.yPadding};`;
        style += `padding-top:${block.yPadding};`;
    }

    if (block.color) {
        style += `background-color:#${block.color.value};`;
    }

    if (block.additionalCssClasses) {
        className += ` ${block.AdditionalCssClasses}`;
    }

    $scope.className = className;
    $scope.style = style;

});