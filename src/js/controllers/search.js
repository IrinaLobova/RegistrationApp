regApp.factory('searchService', ['$firebaseObject', '$location',
	function($firebaseObject, $location) {
		var results = [];

		function search(q) {
			var productsRef = firebase.database().ref().child('products');
			var query = productsRef.orderByChild('brand');

			query.once("value", function(snapshot) {
                //$scope.snapshot = snapshot;
                var new_results = [];
                snapshot.forEach(function(data) {
                        var i = 0;
                        if (data.key.startsWith(q)) {
                                var values = data.val();
                                var result = new Object();
                                result.fullname = values.fullname;
                                result.category = values.cathegory;
								result.skin = values.skin;
								result.image = values.image;
                                new_results.push(result);
                                i++;
                        }
                });
                
				angular.copy(new_results, results);
				console.log(new_results);
				//console.log(results);
			}, function(errors) {
				console.log("The read failed: " + errors.code)
			});
		}

		return {
			results: results,
			search: search
		};
}]);

regApp.controller('SearchController', ['searchService','$scope', '$firebaseObject','$location', function(searchService, $scope, $firebaseObject, $location) {
	//$scope.q = '';
	$scope.searchService = searchService;
    $scope.searchService.results = searchService.results;
    console.log($scope.searchService.results);

    $scope.doSearch = function () {
        $scope.searchService.search($scope.q);
    };
    //console.log($scope.q);
}])

