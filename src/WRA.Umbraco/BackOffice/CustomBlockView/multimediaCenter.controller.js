angular.module("umbraco").controller("multimediaCenterController", function ($scope, mediaResource) {

    //console.log($scope.block.data);

    var card1ImageUdi = $scope.block.data.card1Image[0].mediaKey;
    mediaResource.getById(card1ImageUdi)
        .then(function (media) {
            //console.log(media);
            $scope.card1Image = media;
        });

    var card2ImageUdi = $scope.block.data.card2Image[0].mediaKey;
    mediaResource.getById(card2ImageUdi)
        .then(function (media) {
            //console.log(media);
            $scope.card2Image = media;
        });

});