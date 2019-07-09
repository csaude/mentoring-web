mentoring.controller("listFormController", ["$scope", "$state","questionService", "$rootScope" ,"formService",
	"programmaticAreaService", "resourceUtilsService", function ($scope, $state, questionService,
	$rootScope, formService, programmaticAreaService, resourceUtilsService) {
	
	$scope.form = $rootScope.form || {};
	$scope.formQuestions = [];
	$scope.sequences = [];
	$scope.questionsUpdate = [];
	$scope.applicables = ["true", "false"];
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
        getFormQuestionsByForm();
		$state.go("formUpdate.questionsDetails");
	};

	$scope.back = function(){
		$state.go("formUpdate.updateDetails");
	};

	var getFormQuestionsByForm = function() {
		questionService.getFormQuestionsByFormId($scope.form.id).then(function(response) {
            if(response.data) {

				if(!Array.isArray(response.data.formQuestion)){
					$scope.formQuestions = [];
                    $scope.formQuestions.push(response.data.formQuestion);
				}else{
					$scope.formQuestions = response.data.formQuestion;
				}

				var index = 1;
				$scope.sequences = [];

				_.forEach($scope.formQuestions, function(formQuestion){
					formQuestion.newSequence = formQuestion.sequence;
					$scope.sequences.push(index+"");
					index++;
				});

				$scope.formQuestions = _.sortBy($scope.formQuestions, function(fq){ return parseInt(fq.newSequence); });
			}
		});
	};

	$scope.onSequenceChange = function(formQuestion) {
		
		$scope.formQuestions.forEach(function(fq){
			if(formQuestion.newSequence === fq.sequence){
				fq.newSequence = formQuestion.sequence;
				fq.sequence = fq.newSequence;
				formQuestion.sequence = formQuestion.newSequence;
			}

			if(!fq.sequence){
				fq.sequence = fq.newSequence;	
			}
			
		});

		$scope.formQuestions =_.sortBy($scope.formQuestions, function(fq){ return parseInt(fq.newSequence); });
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

		var foundQuestion = _.find($scope.formQuestions, function (fq) {
			return fq.question.code == question.code;
		});

		if (foundQuestion){
			$scope.addQuestionErrorMessage = "A questão com o código "+foundQuestion.question.code+" já foi adicionada na lista";
			return;
		}

		var sequence = $scope.formQuestions.length + 1;

		formQuestion = {
			question : question,
			sequence : sequence,
			newSequence : sequence,
			applicable : "false"
		};

		$scope.formQuestions.push(formQuestion);
		$scope.sequences.push(sequence);
	};

	$scope.updateForm = function () {
		$scope.formBeanResource.form = $scope.form;
		$scope.formBeanResource.formQuestions = $scope.formQuestions;
		$scope.errorMessage = "";
		
		formService.updateForm($scope.formBeanResource).then(function (response){
			if(response.data && response.data.message){
				$scope.errorMessage = response.data.message;
				return;
			}

			$scope.message = response.data;
			$scope.questions = [];
			$scope.isDisabled = true;
		});
	};

	$scope.removeQuestion = function(formQuestion) {
		_.remove($scope.formQuestions, function(fq){
			return fq.question.code === formQuestion.question.code;
		});

		var index = 1;
		$scope.sequences = [];

		_.forEach($scope.formQuestions, function(fq){
			fq.sequence = index;
			fq.newSequence = index;
			$scope.sequences.push(index);
			index++;
		});
	};

	$scope.getProgrammaticAreas();

	$scope.cleanFormFilter = function (){
		$scope.message = "";
		$scope.formFilter = {};
		$scope.errorMessage = "";
		$scope.forms = [];
		$scope.addedQuestions = [];
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