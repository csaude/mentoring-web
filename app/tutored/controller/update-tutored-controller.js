mentoring.controller("updateTutoredController", ["$scope", "$rootScope", "tutoredService", "resourceUtilsService", "carrerService", function($scope, $rootScope, tutoredService, resourceUtilsService, carrerService){

	var tutoredBeanResource = {
		userContext: $rootScope.userContext
	};
	
	$scope.carrerType = {name:""};

	$scope.getTutoredsBySelectedFilter = function(){

		$scope.tutoreds = tutoredService.getTutoreds($scope.tutoredFilter).then(function(response){
			if(response.data){
                if(!Array.isArray(response.data.tutored)){
                    $scope.tutoreds = [];
                    $scope.tutoreds.push(response.data.tutored);
                    return;
                }
                
                $scope.tutoreds = response.data.tutored;

            }else {
               $scope.tutoreds = [];
               $scope.errorMessage = "Nenhum Tutorando encontrado para o filtro solicitado!"; 
            }

		});
	};

	$scope.onSelectTutored = function(tutored){
		$scope.message = "";
		$scope.tutored = tutored;
		$scope.hasErrors = [];
		$scope.isDisabled = false;		
	};

	$scope.editTutored = function(){

		if ($scope.editTutoredForm.$invalid)
			return;

		$scope.hasErrors = [];

		tutoredBeanResource.tutored = $scope.tutored;
		tutoredService.updateTutored(tutoredBeanResource).then(function(response){
			$scope.message = "Tutorando editado com sucesso!";
			$scope.isDisabled = true;
		});
		
	};

	$scope.cleanTutored = function(){
		$scope.tutoredFilter = {};
		$scope.tutored = {};
		$scope.tutoreds = [];
		$scope.message = "";
		$scope.errorMessage = "";
		$scope.hasErrors = [];
		$scope.isDisabled = false;
	};

	$scope.getCarrertypes = function(){
		resourceUtilsService.getCarrertypes().then(function (response){
			$scope.carrertypes = [];
			$scope.carrertypes = response.data.careerType;
		});

	};

	$scope.onSelectCarrerType = function(){
			$scope.carres = [];
			carrerService.getCarrerByCarrerType($scope.carrerType.name).then(function (response){
				if(response.data){
                if(!Array.isArray(response.data.career)){
                    $scope.carres.push(response.data.career);
                    return;
                }
				$scope.carres = response.data.career;
			}
		});
	};

	$scope.cleanTutored();
	$scope.getCarrertypes();

}]);