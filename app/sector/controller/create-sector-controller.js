mentoring.controller("createSectorController", ["$scope", "$rootScope", "$translate", "sectorService", function($scope, $rootScope, $translate, sectorService){

	var sectorBeanResource = {
		userContext: $rootScope.userContext
	};

	$scope.createSector = function(){

		if($scope.createSectorForm.$invalid)
			return;
		
		sectorBeanResource.sector = $scope.sector;


		sectorService.createSector(sectorBeanResource).then(function success(response){

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