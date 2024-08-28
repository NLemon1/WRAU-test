angular.module("umbraco").controller("buttonsController", function ($scope) {
    const block = $scope.block.data;

    let className = "block-btns d-flex flex-row align-items-center";
    let style = "";

    if (block.horizontalAlignment[0]) {
        let horizontalAlignment = block.horizontalAlignment[0].toLowerCase();

        if (horizontalAlignment == "left") {
            horizontalAlignment = "start";
        }
        else if (horizontalAlignment == "right") {
            horizontalAlignment = "end";
        }

        className += ` justify-content-${horizontalAlignment}`;
    }

    if (block.additionalCssClasses) {
        className += ` ${block.additionalCssClasses}`;
    }

    if (block.bottomMargin[0]) {
        style += `margin-bottom:${block.bottomMargin[0]};`;
    }

    $scope.className = className;
    $scope.style = style;

});