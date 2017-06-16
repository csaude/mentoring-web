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

			$scope.message = response.data;
			$scope.tutored = {};	
		});
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

	$scope.cleanTutored = function(){
		$scope.tutored = {};
		$scope.hasErrors = [];
		$scope.message = "";
		$scope.errorMessage = "";
	};

	$scope.cleanTutored();
	$scope.getCarrertypes();

}]);