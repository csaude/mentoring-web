mentoring.controller('loginController', ['$scope', '$rootScope', '$cookies', '$location', 'authService', function ($scope, $rootScope, $cookies, $location, authService) {

	$scope.username = "";
	$scope.password = "";
	$scope.errorMessage = "";
	
	var userContext = {};

	$scope.login = function(){

		if($scope.loginForm.$invalid){
			$scope.errorMessage = "";
			return;
		}
		
		userContext.username = $scope.username;
		userContext.password = $scope.password;	

		authService.login(userContext).then(function(data){
			// Store the JWT token for later use
			sessionStorage.setItem("jwtToken", data.data.jwtToken);
			delete data.data.jwtToken;
			$cookies.putObject("usercontext", data);
			$location.path('/home');
		})
		.catch(function(error){
			console.log(error);
			$scope.errorMessage = error.message;
			$scope.username = "";
			$scope.password = "";
			userContext = {};
		});
	};

	$scope.logout = function(){
		$cookies.remove('usercontext');
		$location.path('/login');
		$rootScope.visible = false;
	};	
	
}]);