angular.module("umbraco").controller("missionStatementController", function ($scope, mediaResource) {

    //console.log($scope.block.data);

    var backgroundImageUdi = $scope.block.data.backgroundImage[0].mediaKey;
    mediaResource.getById(backgroundImageUdi)
        .then(function (media) {
            //console.log(media);
            $scope.backgroundImage = media;
        });

});