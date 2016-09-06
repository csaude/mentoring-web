mentoring.controller("mentoringProcessController", ["$scope", "$rootScope", "$state", "mentorshipService", "formService", "questionService", "tutorService", "tutoredService", function ($scope, $rootScope, $state, mentorshipService, formService, questionService, tutorService, tutoredService) {

	$scope.hasErrors = [];

	$scope.questionId = 0;
	$scope.questions = [];
	$scope.question = {};

	$scope.form = {};
	$scope.formFilter = {};
	$scope.hasForm = false;

	$scope.tutor = {};
	$scope.tutorFilter ={};
	$scope.tutors = [];
	
	$scope.tutored = {};
	$scope.tutoredFilter = {};
	$scope.tutoreds = [];

	$scope.message = "";
	
	var mentorship = {};
	mentorship.startDate = formatDateTime(new Date());

	function formatDateTime(date){

		var day = date.getDay();
		if(day.toString().length == 1)
			day = "0"+day;

		var month  = date.getMonth() + 1;
		if (month.toString().length == 1)
			month = "0"+month;

		var year = date.getFullYear();

		var hours = date.getHours();
		if (hours.toString().length == 1)
			hours = "0"+hours;

		var minutes = date.getMinutes();
		if (minutes.toString().length ==1)
			minutes = "0"+minutes;

		var seconds = date.getSeconds();
		if (seconds.toString().length == 1)
			seconds = "0"+seconds;

		return day +"-"+ month +"-"+ year +" "+ hours +":"+ minutes+":"+ seconds;
	}

	var mentorshipBeanResource = {
		userContext : $rootScope.userContext
	};

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

		$scope.errorMessage = "";

		if($scope.answerQuestions.$invalid){
			return;
		}

		if(!$scope.tutor.code){
			$scope.errorMessage = "O Tutor deve ser seleccionado!";
			return;
		}

		if(!$scope.tutored.code){
			$scope.errorMessage = "O Tutorando deve ser seleccionado!";	
			return;
		}

		if(!$scope.form.code){
			$scope.errorMessage = "O Formulario a preencher deve ser seleccionado!"
			return;
		}

		mentorship.tutor = $scope.tutor;
		mentorship.tutored = $scope.tutored;
		mentorship.endDate = formatDateTime(new Date());

		mentorshipBeanResource.mentorship = mentorship;
		mentorshipBeanResource.questions = $scope.questions;
		mentorshipBeanResource.form = $scope.form;

		mentorshipService.createMentorship(mentorshipBeanResource).then(function(response){
			$scope.message = "O processo de mentoria com o código "+ response.data.code + " foi cadastrado com sucesso!";
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
		$scope.questionId = 0;

		questionService.getQuestionsByForm(form.code).then(function(response){
			if(response.data){
        
                if(!Array.isArray(response.data.question)){
                    $scope.questions = [];
                    $scope.questions.push(response.data.question);
                    return;
                }

                $scope.questions = response.data.question;
                $scope.question = $scope.questions[$scope.questionId];
            }

            $state.go("mentoringProcess.questions", {questionId : $scope.questionId});
		});
	};

	$scope.onSelectTutor = function(tutor){
		console.log(tutor);
		console.log(mentorship.startDate);
		$scope.tutor = tutor;
	};

	$scope.onSelectTutored = function(tutored){
		$scope.tutored = tutored;
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
            }
		});
	};

	$scope.getTutoredsBySelectedFilter = function(){

		$scope.tutoreds = tutoredService.getTutoreds($scope.tutoredFilter).then(function(response){
			if(response.data){

                if(!Array.isArray(response.data.tutored)){
                    $scope.tutoreds = [];
                    $scope.tutoreds.push(response.data.tutored);
                    return;
                }
                
                $scope.tutoreds = response.data.tutored;
            }

		});
	};

	$scope.clean = function(){
	
	};

}]);