regApp.factory('searchService', ['$firebaseObject', '$q', '$firebaseArray', '$location',
	function($firebaseObject, $q , $firebaseArray, $location) {
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
			var defer = $q.defer();
			var productRef = firebase.database().ref().child('products');
    		console.log("bar");

    		//var products = $firebaseArray(productRef);
    
		    var query = productRef.orderByChild('brand');
		   	query.once("value", function(snapshot) {
		   		console.log('here');
                snapshot.forEach(function(data) {
					//console.log("key is " + data.key);
                    if (data.key === pid) {
						//console.log('key found');
                        defer.resolve(data.val());
                    }
                });

			}, function(errors) {
				console.log("The read failed: " + errors.code)
			});

    		return defer.promise;
		}
		
		return {
			results: results,
			search: search,
			getProduct: getProduct
		};
}]);