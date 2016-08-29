mentoring.controller("listFormController", ["$scope", "$state","questionService", "$rootScope" ,"formService", "programmaticAreaService", function ($scope, $state, questionService, $rootScope, formService, programmaticAreaService) {
	
	$scope.form = $rootScope.form || {};
	$scope.questions = [];
	$scope.questionsUpdate = [];
	$scope.questionFilter = {};
	$scope.isDisabled = false;
	$scope.formBeanResource = {
		userContext : $rootScope.userContext 
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
               $scope.errorMessage = "Nenhum Formulario foi encontrada para o filtro solicitado!"; 
            }

		});
	};

	$scope.getProgrammaticAreas = function (){
		programmaticAreaService.getProgrammaticAreas({}).then(function (response){
			if(response.data){
                if(!Array.isArray(response.data.programmaticArea)){
                    $scope.programmaticAreas = [];
                    $scope.programmaticAreas.push(response.data.programmaticArea);
                    return;
                }

                $scope.programmaticAreas = response.data.programmaticArea;
            }
		});
	};

	$scope.nextPage =  function(){
		getQuestionsByForm();
		$state.go("formUpdate.questionsDetails");
	};

	$scope.back = function(){
		$state.go("formUpdate.updateDetails");
	};

	var getQuestionsByForm = function(){
		questionService.getQuestionsByForm($scope.form.code).then(function(response){
			if(response.data){
				if(!Array.isArray(response.data.question)){
					$scope.questions = [];
					$scope.questions.push(response.data.question);
					return;
				}
					$scope.questions = response.data.question;
			}
		});
	};

	$scope.getQuestions = function (){
		questionService.getQuestions($scope.questionFilter).then(function (response){
			if(response.data){
                if(!Array.isArray(response.data.question)){
                    $scope.questionsUpdate = [];
                    $scope.questionsUpdate.push(response.data.question);
                    $scope.addQuestionErrorMessage = "";
                    return;
                }

                $scope.questionsUpdate = response.data.question;
                $scope.addQuestionErrorMessage = "";

            }else {
               $scope.questionUpdate = [];
               $scope.addQuestionErrorMessage = "Nenhuma Questão encontrada para o filtro solicitado!"; 
            }
            
		});
	};

	$scope.onAddQuestion = function (){
		$scope.questionFilter = {};
		$scope.addQuestionErrorMessage = "";
		$scope.addQuestionMessage = "";
		$scope.questionsUpdate = [];
	};


	$scope.addQuestion = function (question){

		$scope.addQuestionErrorMessage = "";

		var foundQuestion = _.find($scope.questions, function (q) {
			return q.code == question.code;
		});

		if (foundQuestion){
			$scope.addQuestionErrorMessage = "A questão com o código "+foundQuestion.code+" já foi adicionada na lista";
			return;
		}

		$scope.questions.push(question);
	};

	$scope.updateForm = function () {
		$scope.formBeanResource.form = $scope.form;
		$scope.formBeanResource.questions = $scope.questions;
		$scope.errorMessage = "";
		console.log($scope.formBeanResource);
		formService.updateForm($scope.formBeanResource).then(function (response){
			if(response.data && response.data.message){
				$scope.errorMessage = response.data.message;
				return;
			}

			var form = response.data;

			$scope.message = "O formulário "+form.name+" foi actualizado com sucesso";
			$scope.form = {};
			$scope.questions = [];
			$scope.isDisabled = true;
		});
	};


	$scope.removeQuestion = function(question) { 
	  var index = $scope.questions.indexOf(question);
		  $scope.questions.splice(index, 1); 
	};


	$scope.getProgrammaticAreas();

	$scope.cleanFormFilter = function (){
		$scope.message = "";
		$scope.formFilter = {};
		$scope.errorMessage = "";
		$scope.forms = [];
	};

	$scope.onSelectForm =  function(form){
		$rootScope.form = form;
		$scope.hasErrors = [];
		$scope.isDisabled = false;
		$state.go("formUpdate.updateDetails");
	};

	$scope.cleanFormFilter();

}]);