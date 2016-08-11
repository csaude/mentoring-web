mentoring.controller("formController", ["$scope", "$rootScope", "$state", "questionService", "programmaticAreaService", "formService", function ($scope, $rootScope, $state, questionService, programmaticAreaService, formService){

	$scope.form = {};
	$scope.questions = [];
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

		$scope.addedQuestions.push(question);
	};

	$scope.removeQuestion = function (question){
		_.remove($scope.addedQuestions, function(q){
			return q.code === question.code;
		});
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
		$scope.formBeanResource.questions = $scope.addedQuestions;
		$scope.errorMessage = "";

		formService.createForm($scope.formBeanResource).then(function (response){
			if(response.data && response.data.message){
				$scope.errorMessage = response.data.message;
				return;
			}

			var form = response.data;

			$scope.message = "O formulário "+form.name+" foi criado com sucesso";
			$scope.form = {};
			$scope.addedQuestions = [];
			$scope.isDisabled = true;
		});
	};

	$scope.getFormsBySelectedFilter = function(){

		$scope.forms = formService.getForms($scope.formFilter).then(function(response){
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


	$scope.cleanForm = function (){
		$scope.form = {};
		$scope.message = "";
		$scope.hasErrors =[];
	};


}]);