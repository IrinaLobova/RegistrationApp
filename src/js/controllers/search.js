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
                                $scope.results.push(result);
                                i++;
                        }
                });
                console.log($scope.results);
			}, function(errors) {
				console.log("The read failed: " + errors.code)
			});
	}
}])