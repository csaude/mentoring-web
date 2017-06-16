mentoring.controller("createSectorController", ["$scope", "$rootScope", "programmaticAreaService", function($scope, $rootScope, programmaticAreaService){

	var programmaticAreaBeanResource = {
		userContext: $rootScope.userContext
	};

	$scope.createProgrammaticArea = function(){

		if($scope.createProgrammaticAreaForm.$invalid)
			return;
		
		programmaticAreaBeanResource.programmaticArea = $scope.programmaticArea;

		programmaticAreaService.createProgrammaticArea(programmaticAreaBeanResource).then(function success(response){
			$scope.message = response.data;
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