regApp.controller('HomePageController', ['$scope', function($scope) {

  	$scope.labels = ["Useful", "Natural", "Moisturizing", "Anti-age", "Silicons", 
  	"Acne Treatment", "UV proctection"];
  	$scope.data = [5, 3, 2, 1, 1, 1, 1, 0];

  	$scope.labels1 = ["Safe", "Possible allergens"];
  	$scope.data1 = [12, 2];

}]);//controller