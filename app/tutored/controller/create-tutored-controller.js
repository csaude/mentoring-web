mentoring.controller("createTutoredController", ["$scope", "$rootScope", "tutoredService", function($scope, $rootScope, tutoredService){

	var tutorededBeanResource = {
		userContext: $rootScope.userContext
	};

	$scope.createTutored = function(){

		if($scope.createTutoredForm.$invalid)
			return;
		
		tutorededBeanResource.tutored = $scope.tutored;

		tutoredService.createTutored(tutorededBeanResource).then(function success(response){

			var tutored = response.data;
			$scope.message = "O Tutorando "+tutored.name+" foi cadastrado com sucesso!";
			$scope.tutored = {};	
		});
	};

	$scope.cleanTutored = function(){
		$scope.tutored = {};
		$scope.hasErrors = [];
		$scope.message = "";
		$scope.errorMessage = "";
	};

	$scope.cleanTutored();

}]);