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
						result.ingredientslist = values.ingredients.all;
						result.acne = values.ingredients.acne;
						result.id = id++;
                        new_results.push(result);
                    }
                });
                
				angular.copy(new_results, results);
				//console.log(new_results);
			}, function(errors) {
				console.log("The read failed: " + errors.code)
			});
		}

		return {
			results: results,
			search: search
		};
}]);