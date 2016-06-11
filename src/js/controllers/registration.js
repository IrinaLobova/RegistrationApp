regApp.controller('RegistrationController', 
	['$scope', '$firebaseAuth', 
	function($scope, $firebaseAuth) {

		//var ref = new Firebase(FIREBASE_URL);
		//var ref = firebase.database('https://regapp-9f43d.firebaseio.com/').ref();
		var auth = $firebaseAuth();

		$scope.login = function() {
			$scope.message = "Welcome " + $scope.user.email;
		};//login

		$scope.register = function() {
			auth.createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
			.then(function(regUser){
				$scope.message = "Hi " + $scope.user.fname + ", thanks for registering!";
			}).catch(function(error){
				$scope.message = error.message;
			});//create user
		};//register
}]);//controller