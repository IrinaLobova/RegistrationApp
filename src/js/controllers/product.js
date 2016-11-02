regApp.controller('ProductController', ['searchService','$scope', '$firebaseObject','$location', '$filter', 
	function(searchService, $scope, $firebaseObject, $location, $filter) {
    var lastSlashIndex = $location.path().lastIndexOf('/')
    var searchResultId = $location.path().substring(lastSlashIndex + 1);
    var currentProduct = searchService.results[searchResultId];

    /***** product features *****/
    $scope.currentProduct = currentProduct;

    /***** interactive ingredients list (highlights) ******/

    $scope.ingredientslist = currentProduct.ingredientslist;

    $scope.category = {	acne: 'acne',
						age: 'age',
						allergens: 'allergens',
						moisturizing: 'moisturizing',
						natural: 'natural',
						silicones: 'silicones',
						useful: 'useful',
						uv: 'uv'
					  }

	var splitIngredients = function(str) {
		return str.split(",").map(function(str) {
    		return str.trim();
    	});
	}

    //console.log("ingredients "+ $scope.ingredientslist);
    $scope.highlight = function(categoryName) {
    	var category = currentProduct.ingredients[categoryName];
    	category = splitIngredients(category);

    	var allIngredients = splitIngredients(currentProduct.ingredientslist);


  		for (var i = 0; i < category.length; i++) {
  			//console.log($scope.ingredientslist);
  			for (var j = 0; j < allIngredients.length; j++) {
  				//console.log(allIngredients[j]);
  				if (category[i] === allIngredients[j]){
  					//console.log('found');
  					allIngredients[j] =  '<span class="highlight">' + allIngredients[j] + '</span>'
  				}
  			}
		}
		$scope.ingredientslist = allIngredients.join(", ");
    };

    var ingredientsShares = [];
    angular.forEach(currentProduct.ingredients, function(value, key) {
    	if (key !== "all" && value !== "") {
    		var pair = { label: key, size: splitIngredients(value).length }
    		this.push(pair);
    	}
	}, ingredientsShares);
    
    var preprocessShares = function(shares) {
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
    }

    var donutData = preprocessShares(ingredientsShares);

   	$scope.labels = donutData.labels;
  	$scope.data = donutData.sizes;

}])
