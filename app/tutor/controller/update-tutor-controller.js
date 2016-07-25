mentoring.controller("updateTutorController", ["$scope", "tutorService", function($scope, tutorService){

	//init context
	var userContext = {
		id: "1",
		username: "steliomo"
	};

	var tutorBeanResource = {
		userContext: userContext
	};
	
	$scope.getTutorsBySelectedFilter = function(){

		$scope.tutors = tutorService.getTutors($scope.tutorFilter).then(function(response){
			if(response.data){
                if(!Array.isArray(response.data.tutor)){
                    $scope.tutors = [];
                    $scope.tutors.push(response.data.tutor);
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


	$scope.cleanTutor();

}]);