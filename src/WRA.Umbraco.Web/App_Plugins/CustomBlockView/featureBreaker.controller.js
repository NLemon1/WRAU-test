angular.module("umbraco").controller("featureBreakerController", function ($scope, mediaResource) {

    //Get/Set Image
    var imageUdi = $scope.block.data.backgroundImage[0].mediaKey;
    mediaResource.getById(imageUdi)
        .then(function (media) {
            //console.log(media);
            $scope.image = media;
        });


    //Block Width
    $scope.width = getSetWidth($scope);


});