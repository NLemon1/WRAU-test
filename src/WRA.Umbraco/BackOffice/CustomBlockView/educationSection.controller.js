angular.module("umbraco").controller("educationSectionController", function ($scope, mediaResource) {


    var imageUdi = $scope.block.data.image[0].mediaKey;
    mediaResource.getById(imageUdi)
        .then(function (media) {
            //console.log(media);
            $scope.imageUrl = media.mediaLink;
        });

});