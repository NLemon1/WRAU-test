angular.module("umbraco").controller("supportSectionController", function ($scope, mediaResource) {

    var imageUdi = $scope.block.data.backgroundImage[0].mediaKey;
    mediaResource.getById(imageUdi)
        .then(function (media) {
            //console.log(media);
            $scope.imageUrl = media.mediaLink;
        });

});