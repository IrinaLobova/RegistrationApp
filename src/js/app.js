var regApp = angular.module('regApp', ['ngSanitize', 'ngRoute', 'firebase', 'chart.js'])
	.constant('FIREBASE_URL', 'https://regapp-9f43d.firebaseio.com/');

regApp.run(['$rootScope', '$location', function($rootScope, $location){
    //console.log("RegApp RUN" + firebase);

	$rootScope.$on('$routeChangeError', function(event, next, previous, error){
		if (error == 'AUTH_REQUIRED'){
			$rootScope.message = "Sorry, you must be logged in to access this page.";
			$location.path('/login');
		}//AUTH REQUIRED
	});//event info
}]);//run

regApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/home', {
			templateUrl: 'views/home.html'
		}).
		when('/search', {
			templateUrl: 'views/results.html',
			controller: 'SearchController'
		}).
		when('/login', {
			templateUrl: 'views/login.html',
			controller: 'RegistrationController'
		}).
		when('/register', {
			templateUrl: 'views/register.html',
			controller: 'RegistrationController'
		}).
		when('/product/:productId', {
			templateUrl: 'views/product.html',
			controller: 'ProductController'
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
			redirectTo:'/home'
		});
}]);
