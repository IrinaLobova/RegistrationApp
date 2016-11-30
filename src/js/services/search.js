regApp.factory('searchService', ['$firebaseObject', '$q', '$firebaseArray', '$location',
	function($firebaseObject, $q, $firebaseArray, $location) {
		var results = [];
        var copyResults = [];

        var productCategories = ['cruelty free']

        function capitalizeFirst(string) {
            console.log(string);
            return string.charAt(0).toUpperCase() + string.slice(1);
        }


        function mkResult(data) {
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
                result.amazon = values.amazon;

                result.id = data.key;
                return result;
        }

        function doCategorySearch(defer) {
			var productsRef = firebase.database().ref().child('products');
			var query = productsRef.orderByChild('crueltyfree');

			query.once("value", function(snapshot) {
                var new_results = [];
                snapshot.forEach(function(data) {
                    if (data.val().crueltyfree === 'yes') {
                        new_results.push(mkResult(data));
                    }
                });
                
                angular.copy(new_results, results);
                angular.copy(new_results, copyResults);
                console.log("resolving results");
                defer.resolve(new_results);
				//console.log(results);
			}, function(errors) {
				console.log("The read failed: " + errors.code)
			});
        }

        function doBrandSearch(string, defer) {
			var productsRef = firebase.database().ref().child('products');
			var query = productsRef.orderByChild('brand');

			query.once("value", function(snapshot) {
                var new_results = [];
                //var id = 0;
                var qCap = capitalizeFirst(string)
                snapshot.forEach(function(data) {
                    if (data.key.startsWith(qCap)) {
                        new_results.push(mkResult(data));
                    }
                });
                

                angular.copy(new_results, results);
                angular.copy(new_results, copyResults);

                console.log("resolving results");
                defer.resolve(new_results);
				//console.log(new_results);
			}, function(errors) {
				console.log("The read failed: " + errors.code)
			});
        }

		function search(qry) {
            var query = qry.toLowerCase();
			var defer = $q.defer();
            if (productCategories.indexOf(query) >= 0) {
                console.log("catefory = " + qry);
                doCategorySearch(defer);
            } else {
                console.log("brand = " + qry);
                doBrandSearch(query, defer);
            }
            return defer.promise;
		}

		function getProduct(pid) {
			var defer = $q.defer();
			var productRef = firebase.database().ref().child('products');
    		//console.log("bar");

    		//var products = $firebaseArray(productRef);

		    var query = productRef.orderByChild('brand');
		   	query.once("value", function(snapshot) {
		   		//console.log('here');
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

        function updateResults(new_results) {
                angular.copy(new_results, results);
        }

		return {
			results: results,
			search: search,
			getProduct: getProduct,
            updateResults: updateResults,
            getQueryResults: copyResults
		};
}]);
