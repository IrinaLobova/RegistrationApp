regApp.controller('SearchController', ['searchService','$scope', '$firebaseObject','$location', function(searchService, $scope, $firebaseObject, $location) {
	$scope.searchService = searchService;
    $scope.searchService.results = searchService.results;
    //console.log($scope.searchService.results);

    $scope.isFocused = true;
    $scope.doSearch = function(){
        $scope.searchService.search($scope.q);
    };

    //Filters

    $scope.data = {
        skinOptions: [
          { id: 0, name: 'All skin types', value: "" },
          { id: 1, name: 'Dry skin', value: "dry" },
          { id: 2, name: 'Normal skin', value: "normal" },
          { id: 3, name: 'Combination skin', value: "combination" }
        ],
        typeOptions: [
          { id: 0, name: 'All product types', value: "" },
          { id: 1, name: 'Cleanser', value: "cleanser" },
          { id: 2, name: 'Cream', value: "cream" }
        ]
    };

    $scope.selectedSkinOption = $scope.data.skinOptions[0];
    $scope.selectedTypeOption = $scope.data.typeOptions[0];

    $scope.filterBySkin = function(selected) {
        var option = $scope.data.skinOptions[selected.id].value;

        var filtered = [];
        var queryResults = $scope.searchService.getQueryResults;
        if (option == "") {
                filtered = queryResults;
        } else {
                var len = queryResults.length;
                for (var i = 0; i < len; i++) {
                        var current = queryResults[i];
                        if (current.skin.indexOf(option) != -1) filtered.push(current);
                }
        }
        console.log(filtered);
        $scope.searchService.updateResults(filtered);
    }

    $scope.filterByType = function(selected) {
        var option = $scope.data.typeOptions[selected.id].value;

        var filtered = [];
        var queryResults = $scope.searchService.getQueryResults;
        if (option == "") {
                filtered = queryResults;
        } else {
                var len = queryResults.length;
                for (var i = 0; i < len; i++) {
                        var current = queryResults[i];
                        if (current.type.indexOf(option) != -1) filtered.push(current);
                }
        }
        console.log(filtered);
        $scope.searchService.updateResults(filtered);
    }

}]);
