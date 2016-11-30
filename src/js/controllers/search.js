regApp.controller('SearchController', ['searchService', '$rootScope', '$scope', '$firebaseObject','$location', 
    function(searchService, $rootScope, $scope, $firebaseObject, $location) {
	$scope.searchService = searchService;
    //console.log($scope.searchService.results);

    $scope.isFocused = true;
    $scope.searchResults = [];


    $scope.$watch(
            function() { return $scope.searchResults; },
            function(newValue, oldValue) {
                if ( newValue !== oldValue ) {
                    $scope.searchResults = newValue;
                }
            }
    );

    $scope.doSearch = function() {
        var results = $scope.searchService.search($scope.q);
        console.log("returned from search");
        results.then(function(data) {
                console.log(data);
                $scope.searchResults = data;
                $scope.$digest();
        });
    };

    // $scope.doSearch = function (){

    //     var interval = window.setInterval(function() {
    //         var results =  $scope.searchService.search($scope.q);
    //         console.log("returned from search");
    //         if (results) {
    //             console.log(results);
    //             window.clearInterval(interval);
    //             $scope.searchResults = results;
    //             $scope.$digest();
    //         }
    //     }, 1000)
    // };

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
