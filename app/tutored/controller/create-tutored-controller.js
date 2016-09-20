mentoring.controller("createTutoredController", ["$scope", "$rootScope", "tutoredService", "resourceUtilsService", "carrerService", function($scope, $rootScope, tutoredService, resourceUtilsService, carrerService){

	var tutorededBeanResource = {
		userContext: $rootScope.userContext
	};
	
	$scope.carrerType = {name:""};

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

	$scope.getCarrertypes = function(){
		resourceUtilsService.getCarrertypes().then(function (response){
			$scope.carrertypes = [];
			$scope.carrertypes = response.data.carrerType;
		});

	};

	$scope.onSelectCarrerType = function(){
			$scope.carres = [];
			carrerService.getCarrerByCarrerType($scope.carrerType.name).then(function (response){
				if(response.data){
                if(!Array.isArray(response.data.carrer)){
                    $scope.carres.push(response.data.carrer);
                    return;
                }
				$scope.carres = response.data.carrer;
			}
		});
	};

	$scope.cleanTutored = function(){
		$scope.tutored = {};
		$scope.hasErrors = [];
		$scope.message = "";
		$scope.errorMessage = "";
	};

	$scope.cleanTutored();
	$scope.getCarrertypes();

}]);