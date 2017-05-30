mentoring.controller("createSectorController", ["$scope", "$rootScope", "$cookies", "programmaticAreaService", function($scope, $rootScope, $cookies, programmaticAreaService){

	var programmaticAreaBeanResource = {
		userContext: $rootScope.userContext
	};

	$scope.createProgrammaticArea = function(){

		if($scope.createProgrammaticAreaForm.$invalid)
			return;
		
		programmaticAreaBeanResource.programmaticArea = $scope.programmaticArea;

		programmaticAreaService.createProgrammaticArea(programmaticAreaBeanResource).then(function success(response){

			var programmaticArea = response.data;
			$scope.message = "A Area Programatica "+programmaticArea.name+" foi cadastrado com sucesso!";
			$scope.programmaticArea = {};	
		});
	};

	$scope.cleanProgrammaticArea= function(){
		$scope.programmaticArea = {};
		$scope.hasErrors = [];
		$scope.message = "";
		$scope.errorMessage = "";
	};

	$scope.cleanProgrammaticArea();

}]);