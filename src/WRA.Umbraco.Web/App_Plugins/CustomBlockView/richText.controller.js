angular.module("umbraco").controller("richTextController", function ($scope) {
      
    const block = $scope.block.data;

    //console.log(block)

    let style = "";
    let className = "";

    if (block.textColor) {
        style += `color:#${block.textColor.value};`;
    }

    if (block.fontSize) {
        switch (block.fontSize !== null) {
            case "12px":
                className = "fs-xs";
                break;
            case "14px":
                className = "fs-sm";
                break;
            case "16px":
                className = "fs-md";
                break;
            case "18px":
                className = "fs-lg";
                break;
            case "20px":
                className = "fs-xl";
                break;
        }
    }

    if (block.fontWeight) {
        style += `font-weight:${block.fontWeight[0]};`;
    }

    if (block.bottomMargin) {
        style += `margin-bottom:${block.bottomMargin[0]};`;
    }

    $scope.style = style;
    $scope.className = className;


});