regApp.factory('Authentication', ['$rootScope', '$firebaseAuth', '$firebaseObject','$location', function($rootScope, $firebaseAuth, $firebaseObject, $location){

		//var rootRef = firebase.database().ref();

		//var ref = new Firebase(FIREBASE_URL);
		//var auth = $firebaseAuth(ref);
		var auth = $firebaseAuth();

        console.log("AUTH:");
        console.log(auth);

		auth.$onAuthStateChanged(function(authUser){

			//console.log($rootScope);
			if(authUser) {
                    /*
				var userRef = firebase.database().ref('users/' + authUser.uid);
				var userObj = $firebaseObject(userRef);
				$rootScope.currentUser = userObj;
                */
                $rootScope.currentUser = authUser;
			} else {
				$rootScope.currentUser = '';
				//$location.path('/login');
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
                        /*
                    var regRef = firebase.database().ref('users/')
					.child(regUser.uid).set({
						date: Firebase.ServerValue.TIMESTAMP,
						regUser: regUser.uid,
						firstname: user.fname,
						lastname: user.lname,
						email: user.email
					});//user info
                    */

				}).catch(function(error){
					$rootScope.message = error.message;
				});//create user
			}//register
		};

		return authObject;
}]);//factory

