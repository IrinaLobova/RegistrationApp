regApp.factory("userPersistence", [
	"$cookies", function($cookies) {
		var userName = "";

		return {
			setCookieData: function(currentUser) {
				currentUserString = JSON.stringify(currentUser);
				$cookies.put("currentUser", currentUserString);
			},
			getCookieData: function() {
				var currentUserString = $cookies.get("currentUser");
				var currentUser = JSON.parse(currentUserString);
				return currentUser;
			},
			clearCookieData: function() {
				$cookies.remove("currentUser");
			}
		}
	}
]);
