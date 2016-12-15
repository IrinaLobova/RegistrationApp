
regApp.controller('WishListController', ['$scope', '$rootScope', '$firebaseArray',
	function($scope, $rootScope, $firebaseArray) {

    var wishlistRef = firebase.database().ref().child('wishlist/' + $rootScope.currentUser.uid);

    $scope.wishlist = $firebaseArray(wishlistRef);

    $scope.remove = function(item){
    	$scope.wishlist.$remove(item)
    }


}]);//controller