mentoring.controller("listQuestionsController", ["$scope", "$rootScope", "questionService", "resourceUtilsService", function ($scope, $rootScope, questionService, resourceUtilsService){

	$scope.questionTypes = [];
	$scope.questionCategories = [];

	$scope.getQuestions = function (){

		questionService.getQuestions($scope.questionFilter).then(function (response){
			if(response.data){
                if(!Array.isArray(response.data.question)){
                    $scope.questions = [];
                    $scope.questions.push(response.data.question);
                    $scope.errorMessage = "";
                    return;
                }

                $scope.questions = response.data.question;
                $scope.errorMessage = "";

            }else {
               $scope.questions = [];
               $scope.errorMessage = "Nenhuma Questão encontrada para o filtro solicitado!"; 
            }
		});
	};

	$scope.cleanQuestionFilter = function (){
		$scope.question = {};
		$scope.questionFilter = {};
		$scope.message = "";
		$scope.errorMessage = "";
		$scope.hasErrors = [];
		$scope.questions = [];
	};

	$scope.cleanQuestionFilter();


	$scope.onSelectQuestion = function (question){
		$scope.isDisabled = false;
		$scope.hasErrors = [];
		$scope.message = "";
		$scope.errorMessage = "";

		$scope.question = question;

		// just to return QuestionTypes an QuestionsCategories
		(function(){

			resourceUtilsService.getQuestionTypes().then(function(response){
				if(response.data){
					$scope.questionTypes = response.data.questionType;
				}
			});

			resourceUtilsService.getQuestionCategories().then(function(response){
				if(response.data){
					$scope.questionCategories = response.data.questionCategory;
				}
			});

		})();
	};


	$scope.editQuestion = function(){
		if($scope.editQuestionForm.$invalid)
			return;


		var questionBeanResource = {};
		questionBeanResource.userContext = $rootScope.userContext;
		questionBeanResource.question = $scope.question;

		questionService.updateQuestion(questionBeanResource).then(function (response){
			var question = response.data;

			$scope.message = "A Questão com o código "+question.code+" foi actulizada com sucesso!";
			$scope.isDisabled = true;

		});


	};

}]);