mentoring.controller("tutorController", ["$scope", "tutorService", function($scope, tutorService){

	//init context
	var userContext = {
		id: "1",
		username: "steliomo"
	};

	var tutorBeanResource = {
		userContext: userContext
	};

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

	$scope.cleanTutor();

}]);