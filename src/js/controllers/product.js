
regApp.controller('ProductController', 
    ['searchService', 'visualization', '$scope', '$rootScope', '$firebaseArray', '$location', 
	   function(searchService, visualization, $scope, $rootScope, $firebaseArray, $location) {

    var lastSlashIndex = $location.path().lastIndexOf('/')
    var pid = $location.path().substring(lastSlashIndex + 1);
    
    var currentProduct = searchService.getProduct(pid);
    var preprocessShares = visualization.preprocessShares; 

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


    //console.log("ingredients "+ $scope.ingredientslist);
    $scope.highlight = function(categoryName) {
    	var category = currentProduct.ingredients[categoryName];
    	category = visualization.splitIngredients(category);

    	var allIngredients = visualization.splitIngredients(currentProduct.ingredientslist);


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


    var donutData = preprocessShares(currentProduct.ingredients);

   	$scope.labels = donutData.labels;
  	$scope.data = donutData.sizes;

    //adding to wishlist

    $scope.addProduct = function () {

        console.log($scope.currentProduct);

        var wishlistRef = firebase.database().ref().child('wishlist/' + $scope.currentUser.uid);

        $firebaseArray(wishlistRef).$add({
            pid: $scope.currentProduct.id,
            title: $scope.currentProduct.fullname,
            img: $scope.currentProduct.thumbnail
        });

    };

}]);
