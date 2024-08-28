angular.module("umbraco").controller("genericCardController", function ($scope) {

    const block = $scope.block.data;

    let className = "block-generic-section";
    let style = "";

    if (block.yPadding) {
        style += `padding-bottom:${block.yPadding};`;
        style += `padding-top:${block.yPadding};`;
    }

    if (block.xPadding) {
        style += `padding-left:${block.xPadding};`;
        style += `padding-right:${block.xPadding};`;
    }

    if (block.color) {
        style += `background-color:#${block.color.value};`;
    }

    if (block.verticalAlignment) {
        switch (block.verticalAlignment) {
            case "top":
                className += " justify-content-start";
                break;
            case "center":
                className += " justify-content-center";
                break;
            case "bottom":
                className += " justify-content-end";
                break;
        }
    } else {
        className += " justify-content-start";
    }

    if (block.additionalCssClasses) {
        className += ` ${block.AdditionalCssClasses}`;
    }

    $scope.className = className;
    $scope.style = style;

});