
regApp.controller('ProductController',
    ['searchService', 'visualization', 'userPersistence', '$rootScope', '$scope', '$firebaseArray', '$location',
	   function(searchService, visualization, userPersistence, $rootScope, $scope, $firebaseArray, $location) {

    function getPid(location) {
        var lastSlashIndex = location.path().lastIndexOf('/')
        return location.path().substring(lastSlashIndex + 1);
    }

    function getWishList(currentUser) {
        var wishlistRef = firebase.database().ref().child('wishlist/' + currentUser.uid);
        return $firebaseArray(wishlistRef);
    }

    //adding to wishlist

    $scope.addProduct = function (currentProduct) {
        $scope.wishlist.$add({
            pid: pid,
            title: currentProduct.fullname,
            img: currentProduct.url
        });
    };

    function displayProduct(pid) {
        searchService.getProduct(pid).then(function(currentProduct){
            currentProduct.ingredientslist = currentProduct.ingredients.all;
            $scope.currentProduct = currentProduct;

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

           var ingredientsDonut = visualization.preprocessShares(currentProduct.ingredients);
           $scope.labels = ingredientsDonut.labels;
           $scope.data = ingredientsDonut.sizes;

           var safetyDonut = visualization.preprocessSafeness(currentProduct.ingredients);

           $scope.labels1 = safetyDonut.labels;
           $scope.data1 = safetyDonut.data;

       });//end of getProduct
    }//end of displayProduct

    if (angular.isDefined($scope.currentUser)) {
        $scope.wishlist = getWishList($scope.currentUser);
    } else {
        $scope.wishlist = {};
    }

    var pid = getPid($location);
    displayProduct(pid);
}]);
