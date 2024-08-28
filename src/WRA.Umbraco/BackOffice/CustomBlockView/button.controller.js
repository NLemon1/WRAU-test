angular.module("umbraco").controller("buttonController", function ($scope) {

    const block = $scope.block.data;

    let className = "btn";

    //STYLE
    if (block.style)
    {
        switch (block.style[0]) {
            case "solid":
                className += " btn-primary";
                break;
            case "outline":
                className += " btn-secondary";
                break;
            case "link":
                className += " btn-link";
                break;
            case "link arrow":
                className += " btn-link-arrow";
                break;
        }
    }
    else
    {
        className += " btn-primary";
    }

    //CONTRAST
    if (block.contrast) {
        switch (block.contrast) {
            case "dark":
                className += "";
                break;
            case "light":
                className += " btn-light";
                break;
        }
    }

    $scope.className = className;
    $scope.isArrow = block.style[0] == "link arrow" ? true : false;
    $scope.linkUrlName = block.link[0] !== undefined ? block.link[0].name : "";

});