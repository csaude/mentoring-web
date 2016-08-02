mentoring.controller("createSectorController", ["$scope", "$rootScope", "programmaticAreaService", function($scope, $rootScope, programmaticAreaService){

	var programmaticAreaBeanResource = {
		userContext: $rootScope.userContext
	};

	$scope.createSector = function(){

		if($scope.createSectorForm.$invalid)
			return;
		
		programmaticAreaBeanResource.programmaticArea = $scope.sector;

		programmaticAreaService.createProgrammaticArea(programmaticAreaBeanResource).then(function success(response){

			var sector = response.data;
			$scope.message = "O Sector "+sector.name+" foi cadastrado com sucesso!";
			$scope.sector = {};	
		});
	};

	$scope.cleanSector = function(){
		$scope.sector = {};
		$scope.hasErrors = [];
		$scope.message = "";
		$scope.errorMessage = "";
	};

	$scope.cleanSector();

}]);