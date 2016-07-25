mentoring.factory('init', ['$rootScope', function($rootScope) {

	var loadContext  = function(){
		return $rootScope.userContext = {
			id: "1",
			username: "steliomo"
		};
	}

	return loadContext();
	
}]);