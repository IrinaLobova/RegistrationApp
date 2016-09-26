regApp.controller('SearchController', ['$scope', '$firebaseObject','$location', 'FIREBASE_URL', 
	function($scope, $firebaseObject, $location, FIREBASE_URL) {
	$scope.search = function() {
		var productsRef = new Firebase(FIREBASE_URL + 'products');
		var query = productsRef.orderByChild('brand').startAt($scope.q);

		query.once("value", function(data) {
			console.log('data ' + data.val());
		}, function(errors) {
			console.log("The read failed: " + errors.code)
		});
	}
}])