mentoring.factory('init', ['$rootScope', '$location', '$cookies', function($rootScope, $location, $cookies) {

	var loadContext  = function(){

		// var userContext = $cookies.getObject("usercontext");

		// if (!usercontext) {
		// 	return;
		// };

		// $rootScope.userContext = userContext.data;
	};
	
	return {
		context : loadContext()
	};
	
}]);