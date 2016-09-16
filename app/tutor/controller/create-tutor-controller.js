mentoring.controller("createTutorController", ["$scope", "$rootScope", "tutorService", "resourceUtilsService", "carrerService", function($scope, $rootScope, tutorService, resourceUtilsService, carrerService){

	var tutorBeanResource = {
		userContext: $rootScope.userContext,
	};
	$scope.carrerType = {name:""};
	$scope.carrer = {};

	$scope.createTutor = function(){

		if($scope.createTutorForm.$invalid)
			return;
		
		tutorBeanResource.tutor = $scope.tutor;

		tutorService.createTutor(tutorBeanResource).then(function success(response){

			var tutor = response.data;
			$scope.message = "O Tutor "+tutor.name+" foi cadastrado com sucesso!";
			$scope.tutor = {};	
		});
	};

	$scope.cleanTutor = function(){
		$scope.tutor = {};
		$scope.hasErrors = [];
		$scope.message = "";
		$scope.errorMessage = "";
	};

	$scope.getCarrertypes = function(){
		resourceUtilsService.getCarrertypes().then(function (response){
			$scope.carrertypes = [];
			$scope.carrertypes = response.data.carrerType;
		});

	};

	$scope.setCarrer =  function(){
		tutorBeanResource =  $scope.tutor.carrer;
	};

	$scope.changeValues = function(){
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

	$scope.cleanTutor();	
	$scope.getCarrertypes();
}]);