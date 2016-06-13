regApp.factory('Authentication', ['$rootScope', '$firebaseAuth', 'FIREBASE_URL',
	function($rootScope, $firebaseAuth, FIREBASE_URL){

		var ref = new Firebase(FIREBASE_URL);
		var auth = $firebaseAuth(ref);

		return {
			login: function(user){
			    $rootScope.message = "Welcome " + user.email;
			},//login

			register: function(user){
				auth.$createUser({
					email: user.email, 
					password: user.password
				}).then(function(regUser){

					var regRef = new Firebase(FIREBASE_URL + 'users')
					.child(regUser.uid).set({
						date: Firebase.ServerValue.TIMESTAMP,
						regUser: regUser.uid,
						firstname: user.fname,
						lastname: user.lname,
						email: user.email
					});//user info


					$rootScope.message = "Hi " + user.fname + ", thanks for registering!";
				}).catch(function(error){
					$rootScope.message = error.message;
				});//create user
			}//register
		};
}]);//factory

