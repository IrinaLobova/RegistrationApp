regApp.factory('searchService', ['$firebaseObject','$location', 'FIREBASE_URL', 
	function( $firebaseObject, $location, FIREBASE_URL){
		var results = [];
		function search(q) {
			var productsRef = new Firebase(FIREBASE_URL + 'products');
			var query = productsRef.orderByChild('brand');

			query.once("value", function(snapshot) {
                snapshot.forEach(function(data) {
                        var i = 0;
                        if (data.key().startsWith(q)) {
                                var values = data.val();
                                var result = new Object();
                                result.fullname = values.fullname;
                                result.category = values.cathegory;
                                var new_results = results.push(result);
                                i++;
                        }
                });
                
				angular.copy(new_results, results);
				console.log(results);
			}, function(errors) {
				console.log("The read failed: " + errors.code)
			});
		}
		return {
			results: results,
			search: search
		};
}]);

regApp.controller('SearchController', ['$scope', '$firebaseObject','$location', 'FIREBASE_URL',
function($scope, $firebaseObject, $location, FIREBASE_URL) {
	//$scope.q = '';
	$scope.searchService = searchService;
    $scope.searchService.results = searchService.results;
    console.log($scope.searchService.results);

    $scope.doSearch = function () {
        $scope.searchService.search($scope.q);
    };
}])






/*

regApp.controller('SearchController', ['$scope', '$firebaseObject','$location', 'FIREBASE_URL',
function($scope, $firebaseObject, $location, FIREBASE_URL) {

    $scope.results = [];
	$scope.search = function() {
		var productsRef = new Firebase(FIREBASE_URL + 'products');
		var query = productsRef.orderByChild('brand');

		query.once("value", function(snapshot) {
                snapshot.forEach(function(data) {
                        var i = 0;
                        if (data.key().startsWith($scope.q)) {
                                var values = data.val();
                                var result = new Object();
                                result.fullname = values.fullname;
                                result.category = values.cathegory;
                                $scope.newresults = $scope.results.push(result);
								//angular.copy($scope.newresults, $scope.results)
                                i++;
                        }
                });
                console.log($scope.results);
			}, function(errors) {
				console.log("The read failed: " + errors.code)
			});
	}
}])







