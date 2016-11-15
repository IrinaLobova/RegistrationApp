
regApp.controller('WishListController', ['$scope', '$rootScope', '$firebaseArray',
	function($scope, $rootScope, $firebaseArray) {

    var wishlistRef = firebase.database().ref().child('wishlist/' + $rootScope.currentUser.uid);

    $scope.wishlist = $firebaseArray(wishlistRef);
    console.log('wishlist: ' + $scope.wishlist);


}]);//controller