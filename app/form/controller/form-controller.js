mentoring.controller("formController", ["$scope", "$rootScope", "$state", "questionService", "programmaticAreaService",
	"formService", 'FormUtilService', "resourceUtilsService", function ($scope, $rootScope, $state, questionService,
	programmaticAreaService, formService, FormUtilService, resourceUtilsService) {

	$scope.questions = [];
	$scope.sequences = [];
	$scope.questionFilter = {};
	$scope.addedQuestions = [];
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

		var foundQuestion = _.find($scope.addedQuestions, function (q) {
			return q.code == question.code;
		});

		if (foundQuestion){
			$scope.addQuestionErrorMessage = "A questão com o código "+foundQuestion.code+" já foi adicionada na lista";
			return;
		}

		// Add sequencing.
        question.sequence = question.newSequence = $scope.addedQuestions.length + 1;

		$scope.addedQuestions.push(question);
        $scope.sequences.push($scope.addedQuestions.length);
	};

	$scope.removeQuestion = function (question){
		_.remove($scope.addedQuestions, function(q){
			return q.code === question.code;
		});

        // Updated sequencing information
        for(var i = index; i < $scope.addedQuestions.length; i++) {
            $scope.addedQuestions[i].sequence = $scope.addedQuestions[i].newSequence = $scope.addedQuestions[i].sequence - 1;
        }

        $scope.sequences = FormUtilService.createSequenceArray($scope.addedQuestions.length);
	};

	$scope.onSequenceChange = function(question) {
		FormUtilService.handleSequenceChanges(question, $scope.addedQuestions);

		// Dirty trick to make angular think that the array has changed.
		$scope.addedQuestions.unshift(Object.assign({}, $scope.addedQuestions.shift()));

		$scope.addedQuestions = FormUtilService.sortQuestionsBySequence($scope.addedQuestions);
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
        $scope.formBeanResource.questionSequences = FormUtilService.createQuestionSequencePayload($scope.addedQuestions);
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