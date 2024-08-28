angular.module("umbraco").controller("imageElementController", function ($scope, mediaResource) {

    const block = $scope.block.data;

    var imageSrc = $scope.block.data.image[0].mediaKey;
    mediaResource.getById(imageSrc)
        .then(function (media) {
            //console.log(media);
            $scope.imageSrc = media;
        });


    let className = "block-image-element";

    if (block.curvedCorner == true) {
        className += " img-curved img-curved--large";
    }

    if (block.yellowDecor == true) {
        className += " img-decor";
    }

    $scope.className = className;

});