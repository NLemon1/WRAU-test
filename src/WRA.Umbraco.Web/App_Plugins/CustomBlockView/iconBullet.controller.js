angular.module("umbraco").controller("iconBulletController", function ($scope) {

    const block = $scope.block.data;

    let className = "";

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


    $scope.className = className;

});