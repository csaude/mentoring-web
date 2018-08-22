mentoring.controller("formController", ["$scope", "$rootScope", "$state", "questionService", "programmaticAreaService",
	"formService", "resourceUtilsService", function ($scope, $rootScope, $state, questionService,
	programmaticAreaService, formService, resourceUtilsService) {

	$scope.questions = [];
	$scope.sequences = [];
	$scope.questionFilter = {};
	$scope.addedFormQuestions = [];
	$scope.applicables = [true, false];
	$scope.isDisabled = false;
	$scope.formBeanResource = {
		userContext : $rootScope.userContext 
	};

	$scope.nextDetails = function (){

		if($scope.createFormFrom.$invalid)
			return;

		$scope.hasErrors = [];
		$scope.message = "";
		$scope.isDisabled = false;
		$state.go("form.questions");
	};

	$scope.back = function (){
		$state.go("form.details");
	};

	$scope.addQuestion = function (question){

		$scope.addQuestionErrorMessage = "";

		var foundQuestion = _.find($scope.addedFormQuestions, function (fq) {
			return fq.question.code == question.code;
		});

		if (foundQuestion){
			$scope.addQuestionErrorMessage = "A questão com o código "+foundQuestion.question.code+" já foi adicionada na lista";
			return;
		}

		var sequence = $scope.addedFormQuestions.length + 1;

		formQuestion = {
			question : question,
			sequence : sequence,
			newSequence : sequence,
			applicable : false
		};

		$scope.addedFormQuestions.push(formQuestion);
		$scope.sequences.push(sequence);
	};

	$scope.removeQuestion = function (formQuestion){
		_.remove($scope.addedFormQuestions, function(fq){
			return fq.question.code === formQuestion.question.code;
		});

		var index = 1;
		$scope.sequences = [];

		_.forEach($scope.addedFormQuestions, function(fq){
			fq.sequence = index;
			fq.newSequence = index;
			$scope.sequences.push(index);
			index++;
		});
	};

	$scope.onSequenceChange = function(formQuestion) {

		$scope.addedFormQuestions.forEach(function(fq){
			if(formQuestion.newSequence === fq.sequence){
				fq.newSequence = formQuestion.sequence;
				fq.sequence = fq.newSequence;
				formQuestion.sequence = formQuestion.newSequence;
			}
		});

		$scope.addedFormQuestions =_.sortBy($scope.addedFormQuestions, function(fq){ return parseInt(fq.newSequence) });
	};

	$scope.getQuestions = function (){
		questionService.getQuestions($scope.questionFilter).then(function (response){
			if(response.data){
                if(!Array.isArray(response.data.question)){
                    $scope.questions = [];
                    $scope.questions.push(response.data.question);
                    $scope.addQuestionErrorMessage = "";
                    return;
                }

                $scope.questions = response.data.question;
                $scope.addQuestionErrorMessage = "";

            }else {
               $scope.questions = [];
               $scope.addQuestionErrorMessage = "Nenhuma Questão encontrada para o filtro solicitado!"; 
            }
		});
	};

	$scope.onAddQuestion = function (){
		$scope.questionFilter = {};
		$scope.addQuestionErrorMessage = "";
		$scope.addQuestionMessage = "";
		$scope.questions = [];
	};

	$scope.programmaticAreas = [];

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

	$scope.getProgrammaticAreas();

	$scope.createForm = function () {

		$scope.formBeanResource.form = $scope.form;
        $scope.formBeanResource.formQuestions = $scope.addedFormQuestions;
		$scope.errorMessage = "";

		formService.createForm($scope.formBeanResource).then(function (response){
			if(response.data && response.data.message){
				$scope.errorMessage = response.data.message;
				return;
			}

			$scope.message = response.data;
			$scope.isDisabled = true;
		});
	};

	$scope.cleanForm = function (){
		$scope.form = {};
		$scope.message = "";
		$scope.hasErrors =[];
		$scope.form = {};
		$scope.addedQuestions = [];
	};

	$scope.cleanForm();

	$scope.getFormTypes = function(){
		resourceUtilsService.getFormTypes().then(function (response){
			$scope.formTypes = [];
			$scope.formTypes = response.data.formType;
		});
	};

	$scope.getFormTypes();

}]);