mentoring.controller("updateSectorController", ["$scope", "$rootScope", "programmaticAreaService", function($scope, $rootScope, programmaticAreaService){

var sectorBeanResource = {
		userContext: $rootScope.userContext
	};
	
	$scope.getSectorsBySelectedFilter = function(){

		$scope.sectors = programmaticAreaService.getSectors($scope.sectorFilter).then(function(response){
			if(response.data){
                if(!Array.isArray(response.data.sector)){
                    $scope.sectors = [];
                    $scope.sectors.push(response.data.sector);
                    return;
                }
                
                $scope.sectors = response.data.sector;

            }else {
               $scope.sectors = [];
               $scope.errorMessage = "Nenhum Sector encontrado para o filtro solicitado!"; 
            }

		});
	};

	$scope.onSelectsector = function(sector){

		console.log($rootScope.userContext);
		$scope.message = "";
		$scope.sector = sector;
		$scope.hasErrors = [];
		$scope.isDisabled = false;		
	};

	$scope.editSector = function(){

		if ($scope.editSectorForm.$invalid)
			return;

		$scope.hasErrors = [];

		sectorBeanResource.sector = $scope.sector;
		programmaticAreaService.updatesector(sectorBeanResource).then(function(response){
			$scope.message = "sector editado com sucesso!";
			$scope.isDisabled = true;
		});
		
	};

	$scope.cleanSector = function(){
		$scope.sectorFilter = {};
		$scope.sector = {};
		$scope.sectors = [];
		$scope.message = "";
		$scope.errorMessage = "";
		$scope.hasErrors = [];
		$scope.isDisabled = false;
	};


	$scope.cleanSector();
	
}]);