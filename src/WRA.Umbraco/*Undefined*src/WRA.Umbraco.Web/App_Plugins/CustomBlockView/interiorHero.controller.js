angular.module("umbraco").controller("interiorHeroController", function ($scope, mediaResource) {

    //Get/Set Image
    var imageDesktopUdi = $scope.block.data.imageDesktop[0].mediaKey;
    mediaResource.getById(imageDesktopUdi)
        .then(function (media) {
            //console.log(media);
            $scope.imageDesktop = media;
        });

    var imageMobileUdi = $scope.block.data.imageMobile[0].mediaKey;
    mediaResource.getById(imageMobileUdi)
        .then(function (media) {
            //console.log(media);
            $scope.imageMobile = media;
        });

    $scope.className = $scope.block.data.overlay === "1" ? "is-style-overlay" : "";

});