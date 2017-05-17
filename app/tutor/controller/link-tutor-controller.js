mentoring.controller("linkTutorController", ["$scope", "$rootScope", "tutorService", "resourceUtilsService", "programmaticAreaService", "tutorProgramaticAreaService", function($scope, $rootScope, tutorService, resourceUtilsService, programmaticAreaService, tutorProgramaticAreaService){
		
	var tutorProgrammaticAreaBeanResource = {
		userContext : $rootScope.userContext
	};

	

	$scope.linkTutorProgramaticArea = function(){

		console.log(tutorProgrammaticAreaBeanResource);
		console.log($rootScope.userContext);

		tutorProgrammaticAreaBeanResource.tutorProgramaticArea = $scope.tutorProgramaticArea;
		tutorProgramaticAreaService.linkTutorProgramaticArea(tutorProgrammaticAreaBeanResource).then(function success(response){
		
		});
	};


	$scope.getTutors = function(){

			$scope.tutors = tutorService.getTutors({}).then(function(response){
			$scope.tutors = [];
			$scope.tutors = response.data.tutor;
	});
};

	$scope.getProgrammaticAreas = function(){

		$scope.programmaticAreas = programmaticAreaService.getProgrammaticAreas({}).then(function(response){
			if(response.data){
                $scope.programmaticAreas = [];
                $scope.programmaticAreas = response.data.programmaticArea;
            }
		});
	};

	$scope.getTutors();
	$scope.getProgrammaticAreas();

}]);