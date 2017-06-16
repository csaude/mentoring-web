mentoring.controller("updateSectorController", ["$scope", "$rootScope", "programmaticAreaService", function($scope, $rootScope, programmaticAreaService){

var programmaticAreaBeanResource = {
		userContext: $rootScope.userContext
	};
	
	$scope.getProgrammaticAreasBySelectedFilter = function(){

		$scope.programmaticAreas = programmaticAreaService.getProgrammaticAreas($scope.programmaticAreaFilter).then(function(response){
			if(response.data){
                if(!Array.isArray(response.data.programmaticArea)){
                    $scope.programmaticAreas = [];
                    $scope.programmaticAreas.push(response.data.programmaticArea);
                    return;
                }
                
                $scope.programmaticAreas = response.data.programmaticArea;

            }else {
               $scope.programmaticAreas = [];
               $scope.errorMessage = "Nenhuma Area Programatica foi encontrada para o filtro solicitado!"; 
            }

		});
	};

	$scope.onSelectprogrammaticArea = function(programmaticArea){
		$scope.message = "";
		$scope.programmaticArea = programmaticArea;
		$scope.hasErrors = [];
		$scope.isDisabled = false;		
	};

	$scope.editProgrammaticArea = function(){

		if ($scope.editprogrammaticAreaForm.$invalid)
			return;

		$scope.hasErrors = [];

		programmaticAreaBeanResource.programmaticArea = $scope.programmaticArea;
		programmaticAreaService.updateProgrammaticArea(programmaticAreaBeanResource).then(function(response){
			$scope.message = response.data;
			$scope.isDisabled = true;
		});
		
	};

	$scope.cleanProgrammaticArea = function(){
		$scope.programmaticAreaFilter = {};
		$scope.programmaticArea = {};
		$scope.programmaticAreas = [];
		$scope.message = "";
		$scope.errorMessage = "";
		$scope.hasErrors = [];
		$scope.isDisabled = false;
	};


	$scope.cleanProgrammaticArea();
	
}]);