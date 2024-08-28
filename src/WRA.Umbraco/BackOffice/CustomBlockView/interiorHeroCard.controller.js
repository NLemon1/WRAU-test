angular.module("umbraco").controller("interiorHeroCardController", function ($scope) {
      
    const block = $scope.block.data;

    let className = "block-interior-hero-card align-items-center text-center py-5";
    let style = "";

    if (block.color) {
        style += `background-color:#${block.color.value};`;
    }

    if (block.additionalCssClasses) {
        className += ` ${block.AdditionalCssClasses}`;
    }

    $scope.className = className;
    $scope.style = style;
});