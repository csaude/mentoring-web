mentoring.controller("mentoringProcessController", ["$scope", "$rootScope", "$state", "mentorshipService", "formService", function ($scope, $rootScope, $state, mentorshipService, formService) {

	$scope.hasErrors = [];
	$scope.questionId = 0;
	$scope.questions = [];
	$scope.form = {};
	$scope.formFilter = {};
	$scope.tutor = {};
	$scope.tutored = {};
	$scope.hasForm = false;
	$scope.tutors = [];

	var mentorship = {};

	var mentorshipBeanResource = {
		userContext : $rootScope.userContext
	};

	$scope.question = $scope.questions[$scope.questionId];

	$scope.next = function (){

		if($scope.answerQuestions.$invalid){
			return;
		}

		$scope.hasErrors = [];
		$scope.questionId++;
		$scope.question = $scope.questions[$scope.questionId];		
		$state.go("mentoringProcess.questions", {questionId : $scope.questionId});
	};

	$scope.previews = function() {
		$scope.questionId	--;
		$scope.question = $scope.questions[$scope.questionId];		
		$state.go("mentoringProcess.questions", {questionId : $scope.questionId});
	};

	$scope.showNextButton = function () {
		if ($scope.questionId === 0 || $scope.questionId !== $scope.questions.length - 1){
			return true;
		}
		return false;
	};

	$scope.showPreviewsButton = function () {
		if ($scope.questionId !== 0){
			return true;
		}
		return false;
	};

	$scope.saveMentoringProcess = function (){

		if($scope.answerQuestions.$invalid){
			return;
		}

		if(!$scope.tutor){
			$scope.errorMessage = " O Tutor deve ser seleccionado!";
			return;
		}

		if(!$scope.tutored){
			$scope.errorMessage = " O Tutorando deve ser seleccionado!";	
			return;
		}

		mentorship.tutor = $scope.tutor;
		mentorship.tutored = $scope.tutored;

		mentorshipBeanResource.mentorship = mentorship;
		mentorshipBeanResource.questions = $scope.questions;
		mentorshipBeanResource.form = $scope.form;

		mentorshipService.createMentorship(mentorshipBeanResource).then(function(response){
			console.log(response);
		});

	};

	$scope.getFormsBySelectedFilter = function(){
		$scope.forms = formService.getForms($scope.formFilter).then(function(response){
			$scope.errorMessage="";
			if(response.data){

                if(!Array.isArray(response.data.form)){
                    $scope.forms = [];
                    $scope.forms.push(response.data.form);
                    return;
                }
              
                $scope.forms = response.data.form;

            }else {
               $scope.forms = [];
               $scope.errorMessage = "Nenhuma Formulario foi encontrada para o filtro solicitado!"; 
            }
		});
	};

	$scope.selectedForm = function(form){
		$scope.form = form;
		$scope.hasForm = true;

		$state.go("mentoringProcess.questions", {questionId : 1});
		
		console.log($scope.form);
		console.log($scope.hasForm);
	};

	$scope.onSelectTutor = function(tutor){
		$scope.tutor = tutor;
	};

}]);