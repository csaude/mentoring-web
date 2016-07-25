mentoring.factory('init', ['$rootScope', '$http', function($rootScope) {

	var loadContext  = function(){
		$rootScope.userContext = {
			id: "1",
			username: "steliomo"
		};
	};

	
	return {
		context : loadContext()
	};
	
}]);