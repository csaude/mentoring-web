mentoring.controller("updateTutorController", ["$scope", "$rootScope", "tutorService", "resourceUtilsService", "carrerService", function($scope, $rootScope, tutorService, resourceUtilsService, carrerService){

	var tutorBeanResource = {
		userContext: $rootScope.userContext
	};
	$scope.carrerType = {name:""};

	$scope.getTutorsBySelectedFilter = function(){

		$scope.tutors = tutorService.getTutors($scope.tutorFilter).then(function(response){
			if(response.data){

                if(!Array.isArray(response.data.tutor)){
                    $scope.tutors = [];
                    $scope.tutors.push(response.data.tutor);
                    console.log($scope.tutors);
                    return;
                }
                
                $scope.tutors = response.data.tutor;
                

            }else {
               $scope.tutors = [];
               $scope.errorMessage = "Nenhum tutor encontrado para o filtro solicitado!"; 
            }

           

		});
	};

	$scope.onSelectTutor = function(tutor){
		$scope.message = "";
		$scope.tutor = tutor;
		$scope.hasErrors = [];
		$scope.isDisabled = false;		
	};

	$scope.editTutor = function(){

		if ($scope.editTutorForm.$invalid)
			return;

		$scope.hasErrors = [];

		tutorBeanResource.tutor = $scope.tutor;
		tutorService.updateTutor(tutorBeanResource).then(function(response){
			$scope.message = "Tutor editado com sucesso!";
			$scope.isDisabled = true;
		});
		
	};

	$scope.cleanTutor = function(){
		$scope.tutorFilter = {};
		$scope.tutor = {};
		$scope.tutors = [];
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
	
	$scope.changeValues = function(){
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


	$scope.cleanTutor();
	$scope.getCarrertypes();

}]);