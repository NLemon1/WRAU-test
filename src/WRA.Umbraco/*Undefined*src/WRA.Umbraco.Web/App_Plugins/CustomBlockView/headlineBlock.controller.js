angular.module("umbraco").controller("headlineBlockController", function ($scope) {

        const block = $scope.block.data;

        let className = "";
        let style = "";
        const headingLevel = block.headingLevel;
        const headingText = block.headlineText;

        if (block.fontSize) {
            switch (block.fontSize !== null) {
                case "72px":
                    className = "display-1";
                    break;
                case "66px":
                    className = "display-2";
                    break;
                case "60px":
                    className = "display-3";
                    break;
                case "48px":
                    className = "h1";
                    break;
                case "40px":
                    className = "h2";
                    break;
                case "32px":
                    className = "h3";
                    break;
                case "28px":
                    className = "h4";
                    break;
                case "24px":
                    className = "h5";
                    break;
                case "22px":
                    className = "h6";
                    break;
            }
        }
 
        if (block.textAlignment) {
            let textAlignment = block.textAlignment.toString().toLowerCase();
 
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

        $scope.headlineHtml = `<${headingLevel} class="${className}" style="${style}">${headingText}</${headingLevel}>`;


});