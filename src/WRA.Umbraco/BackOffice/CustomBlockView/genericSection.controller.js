angular.module("umbraco").controller("genericSectionController", function ($scope) {

    const block = $scope.block.data;

    let className = "block-generic-section container mx-auto";
    let style = "";

    if (block.width) {
        switch (block.width[0]) {
            case "744px":
                className += ` container--sm`;
                break;
            case "936px":
                className += ` container--md`;
                break;
        }
    }

    if (block.yPadding) {
        style += ` padding-bottom: ${block.yPadding};`;
        style += ` padding-top: ${block.yPadding};`;
    }

    if (block.xPadding) {
        style += ` padding-left: ${block.xPadding};`;
        style += ` padding-right: ${block.xPadding};`;
    }

    if (block.color) {
        style += ` background-color: #${block.color.value};`;
    }

    if (block.additionalCssClasses) {
        className += ` ${block.AdditionalCssClasses}`;
    }

    $scope.className = className;
    $scope.style = style;

});