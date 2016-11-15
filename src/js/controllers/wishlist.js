
regApp.controller('WishListController', ['$scope', '$rootScope', '$firebaseArray',
	function($scope, $rootScope, $firebaseArray) {

	//console.log($rootScope.currentUser.uid);

    var wishlistRef = firebase.database().ref().child('wishlist/' + $rootScope.currentUser.uid);

    $scope.wishlist = $firebaseArray(wishlistRef);
    console.log($scope.wishlist);


}]);//controller