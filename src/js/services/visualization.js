regApp.factory('visualization', ['$firebaseObject', '$location',
	function($firebaseObject, $location) {

	var mkIngredientsShares = function(ingredients) {
		var ingredientsShares = [];
    	angular.forEach(ingredients, function(value, key) {
    		if (key !== "all" && value !== "") {
    			var pair = { label: key, size: splitIngredients(value).length }
    			this.push(pair);
    		}
		}, ingredientsShares);
		return ingredientsShares;
	};

	var splitIngredients = function(str){
		return str.split(",").map(function(str) {
			return str.trim();
		});
	}

	var visualize = {
		preprocessShares: function(ingredients) {
			var shares = mkIngredientsShares(ingredients);
    	//["Anti-Acne", "Anti-Age", "Allergens", "Moisturizers", "Natural", "Silicons", "Useful", "UV protection"];
	    	var labels = shares.map(function(pair) { return pair.label } );
	    	var sizes = shares.map(function(pair) { return pair.size } );

	    	for (var i = 0; i < labels.length; i++){
	    		if (labels[i] === "acne") {
	    			labels[i] = "Anti-" + labels[i];
	    		} else if (labels[i] === "age") {
	    			labels[i] = "Anti-" + labels[i];
	    		} else if (labels[i] === "uv") {
	    			labels[i] = labels[i].charAt(0).toUpperCase() + labels[i].slice(1) + "-protection";
	    		} else {
	    			labels[i] = labels[i].charAt(0).toUpperCase() + labels[i].slice(1);
	    		}
	    	}

	    	return {
	    		labels: labels,
	    		sizes: sizes
	    	}
    	},

        preprocessSafeness: function(ingredients) {
                //console.log(ingredients);
                var allergenesList = splitIngredients(ingredients.allergens);
                var allergenesSize = allergenesList.length;

                var safeIngredients =
                        splitIngredients(ingredients.all).filter(function(x) {
                                return allergenesList.indexOf(x) < 0;
                        });
                var safeIngredientsSize = safeIngredients.length;

                return {
                        labels: ['safe', 'dangerous'],
                        data: [safeIngredientsSize, allergenesSize]
                }
        },

    	splitIngredients: splitIngredients
    };//visualize

	return visualize;
}]);
