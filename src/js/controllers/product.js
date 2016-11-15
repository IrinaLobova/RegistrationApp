
regApp.controller('ProductController', 
    ['searchService', 'visualization', '$scope', '$firebaseArray', '$location', 
	   function(searchService, visualization, $scope, $firebaseArray, $location) {

    var lastSlashIndex = $location.path().lastIndexOf('/')
    var pid = $location.path().substring(lastSlashIndex + 1);
    
    var wishlistRef = firebase.database().ref().child('wishlist/' + $scope.currentUser.uid);
    $scope.wishlist = $firebaseArray(wishlistRef);
        
    //adding to wishlist

    $scope.addProduct = function (currentProduct) {

        $scope.wishlist.$add({
            pid: pid,
            title: currentProduct.fullname,
            img: currentProduct.url
        });
    }; 

    searchService.getProduct(pid).then(function(currentProduct){
        currentProduct.ingredientslist = currentProduct.ingredients.all;
        $scope.currentProduct = currentProduct;
        var preprocessShares = visualization.preprocessShares; 

        $scope.ingredientslist = currentProduct.ingredientslist;

        $scope.category = { acne: 'acne',
                            age: 'age',
                            allergens: 'allergens',
                            moisturizing: 'moisturizing',
                            natural: 'natural',
                            silicones: 'silicones',
                            useful: 'useful',
                            uv: 'uv'
                        };

        //highlighting ingredients (interactive ingredients list)
        $scope.highlight = function(categoryName) {
            var category = currentProduct.ingredients[categoryName];
            category = visualization.splitIngredients(category);

            var allIngredients = visualization.splitIngredients(currentProduct.ingredientslist);


            for (var i = 0; i < category.length; i++) {
                for (var j = 0; j < allIngredients.length; j++) {
                    if (category[i] === allIngredients[j]){
                        allIngredients[j] =  '<span class="highlight">' + allIngredients[j] + '</span>'
                    }
                }
            }
            $scope.ingredientslist = allIngredients.join(", ");
        };


        var donutData = preprocessShares(currentProduct.ingredients);

        $scope.labels = donutData.labels;
        $scope.data = donutData.sizes;
    });//end of getProduct
}]);
