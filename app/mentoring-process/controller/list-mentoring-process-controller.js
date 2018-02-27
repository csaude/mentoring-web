mentoring.controller("listMentoringProcessController", ["$scope", "$rootScope", "$state", "mentorshipService", "formService", "questionService", "tutorService", "tutoredService", "resourceUtilsService", "districtSevice", "healthFacilityService", function ($scope, $rootScope, $state, mentorshipService, formService, questionService, tutorService, tutoredService, resourceUtilsService, districtSevice, healthFacilityService) {

	var tutoredBeanResource = {
		userContext: $rootScope.userContext
	};

	$scope.mentorshipFilter = {};
	$scope.mentorship = {};

	$scope.getTutoredsBySelectedFilter = function(){

		$scope.mentorships = mentorshipService.getMentorshipService($scope.mentorshipFilter).then(function(response){

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
		$scope.errorMessage = "";
	};

	$scope.findAnswersByMentorship = function(mentorship){
		
		$scope.mentorship = mentorship;
		$scope.answers = [];
		
		mentorshipService.getAnswersByMentorshipUuid(mentorship.uuid)
						 .then(function(response){
							$scope.answers = response.data.answerBeanResource;
						 })
						 .catch(function(error){
							 console.log(error);
						 });
	};

}]);