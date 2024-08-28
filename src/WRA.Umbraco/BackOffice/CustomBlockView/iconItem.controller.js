angular.module("umbraco").controller("iconItemController", function ($scope) {

    const block = $scope.block.data;

    let className = "";
    let style = "font-size:48px;";

    if (block.contrast)
    {
        switch (block.contrast) {
            case "dark":
                className += " text-dark";
                break;
            case "light":
                className += " text-light";
                break;
        }
    }

    if (block.iconSize) {
        style = `font-size:${block.iconSize}px;`;
    }

    $scope.className = className;
    $scope.style = style;

});