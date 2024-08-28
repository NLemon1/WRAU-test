angular.module("umbraco").controller("overlineController", function ($scope) {

        const block = $scope.block.data;

       // console.log(block);

        let className = "overline";
        let style = "";

        const overlineText = block.overlineText;

        if (block.textAlignment) {
            let textAlignment = block.alignment.toString().toLowerCase();
 
            if (textAlignment == "left") {
                textAlignment = "start";
            }
            else if (textAlignment == "right") {
                textAlignment = "end";
            }
 
            className += ` text-${textAlignment}`;
        }

        if (block.textColor) {
            style += `color:#${block.textColor.value};`;
        }

        if (block.bottomMargin) {
            style += `margin-bottom:${block.bottomMargin};`;
        }

        $scope.overlineHtml = `<div class="${className}" style="${style}">${overlineText}</div>`;


});