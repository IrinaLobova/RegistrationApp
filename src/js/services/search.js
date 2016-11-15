regApp.factory('searchService', ['$firebaseObject', '$location',
	function($firebaseObject, $location) {
		var results = [];

		function search(q) {
			var productsRef = firebase.database().ref().child('products');
			var query = productsRef.orderByChild('brand');

			query.once("value", function(snapshot) {
                var new_results = [];
                var id = 0;
                snapshot.forEach(function(data) {
                    if (data.key.startsWith(q)) {
                        var values = data.val();
                        var result = new Object();
                        result.fullname = values.fullname;
                        result.category = values.category;
						result.skin = values.skin;
						result.thumbnail = values.url;
						result.size = values.size;
						result.brand = values.brand;
						result.description = values.description;
						result.fullsize = values.fullsize;
						result.type = values.type;
						result.ingredientslist = values.ingredients.all;
						result.ingredients = values.ingredients;

						result.id = data.key;
                        new_results.push(result);
                    }
                });
                
				angular.copy(new_results, results);
				//console.log(new_results);
			}, function(errors) {
				console.log("The read failed: " + errors.code)
			});
		}

		function getProduct(pid) {
			var productRef = firebase.database().ref().child('products/' + pid);
    		console.log("bar");
    
		    var query = productRef.orderByChild('brand');
		    /*
		    for (var i = 0; i < $scope.products.length; i++) {
        console.log("item = " + $scope.products[i].$id);
        if (pid === $scope.products[i].$id) {
            $scope.currentProduct = $scope.products[i];
            break;
        }
    }
    */
		    return "baz"; 
		}
		
		return {
			results: results,
			search: search,
			getProduct: getProduct
		};
}]);