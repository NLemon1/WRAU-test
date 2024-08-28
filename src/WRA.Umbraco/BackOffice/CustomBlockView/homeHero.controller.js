angular.module("umbraco").controller("homeHeroController", function ($scope, mediaResource) {

    //console.log($scope.block.data)

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

/*    var videoDesktopUdi = $scope.block.data.videoDesktop[0].mediaKey;
    mediaResource.getById(videoDesktopUdi)
        .then(function (media) {
            //console.log(media);
            $scope.videoDesktop = media;
        });

    var videoMobileUdi = $scope.block.data.videoMobile[0].mediaKey;
    mediaResource.getById(videoMobileUdi)
        .then(function (media) {
            //console.log(media);
            $scope.videoMobile = media;
        });

    $scope.isVideo = $scope.block.data.videoMobile[0] && $scope.block.data.videoDesktop[0] ? true : false;*/

    $scope.className = $scope.block.data.overlay === "1" ? "is-style-overlay" : "";

});