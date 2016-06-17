var regApp = angular.module('regApp', ['ngRoute', 'firebase'])
	.constant('FIREBASE_URL', 'https://regapp1.firebaseio.com/');

regApp.run(['$rootScope', '$location', function($rootScope, $location){
	$rootScope.$on('$routeChangeError', function(event, next, previous, error){
		if (error == 'AUTH_REQUIRED'){
			$rootScope.message = "Sorry, you must be logged in to access this page.";
			$location.path('/login');
		}//AUTH REQUIRED		
	});//event info	
}]);//run

regApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/login', {
			templateUrl: 'views/login.html',
			controller: 'RegistrationController'
		}).
		when('/register', {
			templateUrl: 'views/register.html',
			controller: 'RegistrationController'
		}).
		when('/success', {
			templateUrl: 'views/success.html',
			controller: 'SuccessController',
			resolve: {
				currentAuth: function(Authentication){
					return Authentication.requireAuth();
				} //current Auth
			} //resolve
		}).
		otherwise({
			redirectTo:'/login'
		});
}]);