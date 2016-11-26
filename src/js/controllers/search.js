regApp.controller('SearchController', ['searchService','$scope', '$firebaseObject','$location', function(searchService, $scope, $firebaseObject, $location) {
	$scope.searchService = searchService;
    $scope.searchService.results = searchService.results;
    //console.log($scope.searchService.results);

    $scope.isFocused = true;
    $scope.doSearch = function(){
        $scope.searchService.search($scope.q);
    };

    //Filters

    $scope.filterBySkin = function(){

    }

    $scope.filterByType = function(){

    }


}]);