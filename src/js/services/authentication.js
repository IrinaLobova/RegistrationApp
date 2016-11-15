regApp.factory('Authentication', ['$rootScope', '$firebaseAuth', '$firebaseObject','$location', 
	function($rootScope, $firebaseAuth, $firebaseObject, $location){

		var auth = $firebaseAuth();

        //console.log("AUTH:");
        //console.log(auth);

		auth.$onAuthStateChanged(function(authUser){
			if(authUser) {
                $rootScope.currentUser = authUser;
			} else {
				$rootScope.currentUser = '';
			}
		});

		var authObject = {
			login: function(user){
				auth.$signInWithEmailAndPassword(
                    user.email,
                    user.password
                ).then(function(regUser) {
                        console.log(regUser);
					$rootScope.message = "Welcome to SmartIngridients";
					$location.path('/success');
				}).catch(function(error){
					$rootScope.message = error.message;
					$location.path('/login');
				});
			},//login

			logout: function(){
				return auth.$signOut();
			},//logout

			requireAuth: function(){
				return auth.$requireSignIn();
			},//require Authentication

			register: function(user){
				auth.$createUserWithEmailAndPassword(
                    user.email, user.password
                ).then(function(regUser){
                        regUser.updateProfile({
                          displayName: user.fname + " " + user.lname
                        }).then(function() {
                            authObject.login(user);
                        }, function(error) {
                            $rootScope.message = error.message;
                        });
  
				}).catch(function(error){
					$rootScope.message = error.message;
				});//create user
			}//register
		};

		return authObject;
}]);//factory

