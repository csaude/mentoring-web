mentoring.controller("listMentoringProcessController", ["$scope", "$rootScope", "$state", "mentorshipService", "formService", "questionService", "tutorService", "tutoredService", "resourceUtilsService", "districtSevice", "healthFacilityService", function ($scope, $rootScope, $state, mentorshipService, formService, questionService, tutorService, tutoredService, resourceUtilsService, districtSevice, healthFacilityService) {

	var tutoredBeanResource = {
		userContext: $rootScope.userContext
	};
	
	$scope.carrerType = {name:""};

	$scope.getTutoredsBySelectedFilter = function(){

		$scope.mentorships = mentorshipService.getMentorshipService({}).then(function(response){
			
			if(response.data){
                if(!Array.isArray(response.data.mentorship)){
                    $scope.mentorships = [];
                    $scope.mentorships.push(response.data.mentorship);
                    return;
                }
                
                $scope.mentorships = response.data.mentorship;

            }else {
               $scope.mentorships = [];
               $scope.errorMessage = "Nenhum Processo encontrado para o filtro solicitado!"; 
            }

		});
	};

	$scope.cleanMentorship = function(){
		$scope.mentorshipFilter = {};
		$scope.mentorships = [];
		$scope.message = "";
		$scope.errorMessage = "";
		$scope.hasErrors = [];
		$scope.isDisabled = false;
	};



}]);