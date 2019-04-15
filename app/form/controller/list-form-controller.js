mentoring.controller("listFormController", ["$scope", "$state","questionService", "$rootScope" ,"formService",
	"programmaticAreaService", 'FormUtilService', "resourceUtilsService", function ($scope, $state, questionService,
	$rootScope, formService, programmaticAreaService, FormUtilService, resourceUtilsService) {
	
	$scope.form = $rootScope.form || {};
	$scope.questions = [];
	$scope.sequences = [];
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
		// getQuestionsByForm();
        getFormQuestionsByForm();
		$state.go("formUpdate.questionsDetails");
	};

	$scope.back = function(){
		$state.go("formUpdate.updateDetails");
	};

	var getQuestionsByForm = function(){
		console.log('form: ', $scope.form);
		questionService.getQuestionsByForm($scope.form.code).then(function(response){
			if(response.data){
				if(!Array.isArray(response.data.question)){
					$scope.questions = [];
					$scope.questions.push(response.data.question);
					return;
				}
					$scope.questions = response.data.question;
			}

			// Add sequence if not defined yet.
			if(angular.isUndefined($scope.questions[0].sequence) || Number.isNaN($scope.questions[0].sequence)){
                $scope.questions = FormUtilService.addQuestionsSequence($scope.questions);
			}

			// Add a field to temporarily hold the new sequence if changed.
			$scope.questions = $scope.questions.map(function(question, $index) {
				question.newSequence = $index + 1;
				return question;
			});
			$scope.sequences = FormUtilService.createSequenceArray($scope.questions.length);
		});
	};

	var getFormQuestionsByForm = function() {
		questionService.getFormQuestionsByFormId($scope.form.id).then(function(response) {
            if(response.data) {
				var formQuestions = response.data.formQuestion;

				if(angular.isDefined(formQuestions) && Array.isArray(formQuestions)) {
					$scope.questions = formQuestions.filter(function(formQuestion) {
						return formQuestion.lifeCycleStatus != "INACTIVE";
					})
					.map(function(formQuestion) {
						return Object.assign({}, formQuestion.question, {
							sequence: Number.parseInt(formQuestion.sequence),
						});
					});
				} else if(angular.isDefined(formQuestions) && !Array.isArray(formQuestions)) {
					// Blindly assume this is one object (terrible inconsistent API, should have returned an array of one item!)
					$scope.questions = formQuestions.lifeCycleStatus != 'INACTIVE' ? [ Object.assign({}, formQuestions.question, {
							sequence: Number.parseInt(formQuestions.sequence)
						})] : [];
				}

                // Add sequence if not defined yet.
				if($scope.questions.length > 0) {
                    if (angular.isUndefined($scope.questions[0].sequence) || Number.isNaN($scope.questions[0].sequence)) {
                        $scope.questions = FormUtilService.addQuestionsSequence($scope.questions);
                    }

                    // Add a field to temporarily hold the new sequence if changed.
                    $scope.questions.forEach(function (question) {
                        question.newSequence = question.sequence;
                    });

                    // Sort questions by sequence
                    $scope.questions = FormUtilService.sortQuestionsBySequence($scope.questions);
                    $scope.sequences = FormUtilService.createSequenceArray($scope.questions.length);
                }
			}
		});
	};

	$scope.onSequenceChange = function(question) {
		FormUtilService.handleSequenceChanges(question, $scope.questions);

		// Dirty trick to make angular think that the array has changed.
        $scope.questions.unshift(Object.assign({}, $scope.questions.shift()));

		$scope.questions = FormUtilService.sortQuestionsBySequence($scope.questions);
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

		// Add sequencing
		question.sequence = question.newSequence = $scope.questions.length + 1;

		$scope.questions.push(question);
		$scope.sequences.push($scope.questions.length);
	};

	$scope.updateForm = function () {
		$scope.formBeanResource.form = $scope.form;
		$scope.formBeanResource.questionSequences = FormUtilService.createQuestionSequencePayload($scope.questions);
		$scope.errorMessage = "";
		console.log($scope.formBeanResource);
		formService.updateForm($scope.formBeanResource).then(function (response){
			if(response.data && response.data.message){
				$scope.errorMessage = response.data.message;
				return;
			}

			$scope.message = response.data;
			$scope.form = {};
			$scope.questions = [];
			$scope.isDisabled = true;
		});
	};


	$scope.removeQuestion = function(question) { 
	  	var index = $scope.questions.indexOf(question);
		$scope.questions.splice(index, 1);

		// Updated sequencing information
		for(var i = index; i < $scope.questions.length; i++) {
			$scope.questions[i].sequence = $scope.questions[i].newSequence = $scope.questions[i].sequence - 1;
		}

        $scope.sequences = FormUtilService.createSequenceArray($scope.questions.length);
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

	$scope.getFormTypes = function(){
		resourceUtilsService.getFormTypes().then(function (response){
			$scope.formTypes = [];
			$scope.formTypes = response.data.formType;
		});
	};

	$scope.getFormTypes();

}]);