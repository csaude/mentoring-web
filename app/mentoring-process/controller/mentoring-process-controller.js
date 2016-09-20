mentoring.controller("mentoringProcessController", ["$scope", "$rootScope", "$state", "mentorshipService", "formService", "questionService", "tutorService", "tutoredService", "resourceUtilsService", "districtSevice", "healthFacilityService", function ($scope, $rootScope, $state, mentorshipService, formService, questionService, tutorService, tutoredService, resourceUtilsService, districtSevice, healthFacilityService) {

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

	$scope.province = "";
	$scope.provinces = [];

	$scope.district = {};
	$scope.districts = [];

	$scope.healthFacilities = [];

	$scope.message = "";
	$scope.errorMessageDialog = "";
	
	$scope.mentorship = {};
	$scope.mentorship.startDate = formatDateTime(new Date());

	$scope.isDisabled = false;

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
		$scope.questionId--;
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
			$scope.errorMessage = "O Formulario a preencher deve ser seleccionado!";
			return;
		}

		$scope.mentorship.tutor = $scope.tutor;
		$scope.mentorship.tutored = $scope.tutored;
		$scope.mentorship.endDate = formatDateTime(new Date());

		mentorshipBeanResource.mentorship = $scope.mentorship;
		mentorshipBeanResource.questions = $scope.questions;
		mentorshipBeanResource.form = $scope.form;

		mentorshipService.createMentorship(mentorshipBeanResource).then(function(response){
			$scope.message = "O processo de mentoria com o código "+ response.data.code + " foi cadastrado com sucesso!";
			$scope.isDisabled = true;
		});

	};

	$scope.getFormsBySelectedFilter = function(){
		$scope.forms = formService.getForms($scope.formFilter).then(function(response){
			$scope.errorMessageDialog="";
			if(response.data){

                if(!Array.isArray(response.data.form)){
                    $scope.forms = [];
                    $scope.forms.push(response.data.form);
                    return;
                }
              
                $scope.forms = response.data.form;

            }else {
               $scope.forms = [];
               $scope.errorMessageDialog = "Nenhuma Formulario foi encontrada para o filtro solicitado!"; 
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

            $scope.messageDialog = "O formulário "+form.name+" foi seleccionado!";

            $state.go("mentoringProcess.questions", {questionId : $scope.questionId});
		});
	};

	$scope.onOpenFormsDialog = function (){
		$scope.formFilter = {};
		$scope.errorMessageDialog = "";
		$scope.messageDialog = "";
		$scope.forms = [];
	};

	$scope.onSelectTutor = function(tutor){
		$scope.tutor = tutor;
		$scope.messageDialog = "O Tutor "+tutor.name+" "+tutor.surname+ " foi seleccionado!"; 
	};

	$scope.onOpenTutorDialog = function (){
		$scope.messageDialog = "";
		$scope.errorMessageDialog = "";
		$scope.tutors = [];
		$scope.tutorFilter = {};
	};

	$scope.onSelectTutored = function(tutored){
		$scope.tutored = tutored;
		$scope.messageDialog = "O Tutorando "+tutored.name+" "+tutored.surname+ " foi seleccionado!"; 
	};

	$scope.onOpenTutoredDialog = function (){
		$scope.messageDialog = "";
		$scope.errorMessageDialog = "";
		$scope.tutoreds = [];
		$scope.tutoredFilter = {};
	};

	$scope.getTutorsBySelectedFilter = function(){

		$scope.tutors = tutorService.getTutors($scope.tutorFilter).then(function(response){

			$scope.errorMessageDialog = "";

			if(response.data){

                if(!Array.isArray(response.data.tutor)){
                    $scope.tutors = [];
                    $scope.tutors.push(response.data.tutor);
                    return;
                }
                
                $scope.tutors = response.data.tutor;

            }else{

            	$scope.tutors = [];
            	$scope.errorMessageDialog = "Nenhuma Tutor foi encontrada para o filtro solicitado!"; 
            }
		});
	};

	$scope.getTutoredsBySelectedFilter = function(){

		$scope.tutoreds = tutoredService.getTutoreds($scope.tutoredFilter).then(function(response){

			$scope.errorMessageDialog = ""; 

			if(response.data){

                if(!Array.isArray(response.data.tutored)){
                    $scope.tutoreds = [];
                    $scope.tutoreds.push(response.data.tutored);
                    return;
                }
                
                $scope.tutoreds = response.data.tutored;
            }else{

            	$scope.tutoreds = [];
            	$scope.errorMessageDialog = "Nenhuma Tutorando foi encontrada para o filtro solicitado!"; 
            }

		});
	};

	$scope.clean = function(){

		$scope.hasErrors = [];
		$scope.form = {};
		$scope.hasForm = false;
		$scope.province = "";
		$scope.district = {};
		$scope.message = "";
		$scope.mentorship = {};
		$scope.mentorship.startDate = formatDateTime(new Date());
		$scope.isDisabled = false;
		$scope.tutor = {};
		$scope.tutored = {};
		$scope.form = {};
		$scope.formFilter = {};
		$scope.hasForm = false;
		$scope.questions = [];
		$scope.question = {};
		$scope.message = "";
		$scope.errorMessage = "";
		$scope.districts = [];
		$scope.healthFacilities = [];
	};


	$scope.getProvinces = function(){
		resourceUtilsService.getProvinces().then(function(response){
			$scope.provinces = response.data.province;
		});
	};

	$scope.getProvinces();

	$scope.onSelectProvince = function(){
		districtSevice.getDistrictsByProvince($scope.province).then(function(response){
			$scope.districts = [];
			$scope.healthFacilities = [];
			if(response.data){
				$scope.districts = response.data.district;
			}	
		});
	};

	$scope.onSelectDistrict = function(){
		healthFacilityService.getHealthFacilitiesByDistrictId($scope.district.id).then(function(response){
			$scope.healthFacilities = [];
			if(response.data){
				$scope.healthFacilities = response.data.healthFacility;
			}
		});
	};

}]);