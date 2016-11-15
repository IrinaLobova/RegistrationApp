regApp.controller('SearchController', ['searchService','$scope', '$firebaseObject','$location', function(searchService, $scope, $firebaseObject, $location) {
	$scope.searchService = searchService;
    $scope.searchService.results = searchService.results;
    //console.log($scope.searchService.results);


    $scope.doSearch = function () {
        $scope.searchService.search($scope.q);
    };
}]);