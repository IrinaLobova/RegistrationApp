regApp.controller('ProductController', ['searchService','$scope', '$firebaseObject','$location', '$filter', 
	function(searchService, $scope, $firebaseObject, $location, $filter) {
    var lastSlashIndex = $location.path().lastIndexOf('/')
    var searchResultId = $location.path().substring(lastSlashIndex + 1);
    var currentProduct = searchService.results[searchResultId];
    //console.log(currentProduct);

    //product features
    $scope.title = currentProduct.fullname;
    $scope.brand = currentProduct.brand;
    $scope.description = currentProduct.description;
    $scope.category = currentProduct.category;
    $scope.size = currentProduct.size;
    $scope.skintype = currentProduct.skin;
    $scope.type = currentProduct.type;
    $scope.fullsizeImage = currentProduct.fullsize;

    //highlights
    $scope.ingredientslist = currentProduct.ingredientslist;
    var acne = currentProduct.acne.split(",").map(function(str) {
    	return str.trim();
    });

    //console.log("ingredients "+ $scope.ingredientslist);
    $scope.highlightAcne = function() {
    	var allIngredients = $scope.ingredientslist.split(",").map(function(str){
    		return str.trim();
    	});

  		for (var i = 0; i < acne.length; i++) {
  			console.log(acne[i]);
  			//console.log($scope.ingredientslist);
  			for (var j = 0; j < allIngredients.length; j++) {
  				console.log(allIngredients[j]);
  				if (acne[i] === allIngredients[j]){
  					console.log('found');
  					allIngredients[j] =  '<span class="highlight">' + allIngredients[j] + '</span>'
  				}
  			}
		}

		$scope.ingredientslist = allIngredients.join(", ");
    };



}])
