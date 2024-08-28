angular.module("umbraco").controller("spacerController", function ($scope) {
    
    const block = $scope.block.data;

    let style = "";

    if (block.heightSmall) {
        style += `height: ${block.heightSmall};`;
    }

    if (block.heightMedium) {
        style += `height: ${block.heightMedium};`;
    }

    if (block.heightLarge) {
        style += `height: ${block.heightLarge};`;
    }

    if (block.heightExtraLarge) {
        style += `height: ${block.heightExtraLarge};`;
    }

    $scope.style = style;

});