mentoring.controller("listQuestionsController", ["$scope", "questionService", function ($scope, questionService){



	$scope.getQuestions = function (){
		questionService.getQuestions($scope.questionFilter).then(function (response){
			if(response.data){
                if(!Array.isArray(response.data.question)){
                    $scope.questions = [];
                    $scope.questions.push(response.data.question);
                    return;
                }

                $scope.questions = response.data.question;

            }else {
               $scope.question = [];
               $scope.errorMessage = "Nenhuma Questão encontrada para o filtro solicitado!"; 
            }
		});
	};


	$scope.cleanQuestionFiter = function (){
		$scope.question = {};
		$scope.questionFilter = {};
		$scope.message = "";
		$scope.errorMessages = "";
		$scope.hasErrors = [];
		$scope.questions = [];
	};

	$scope.cleanQuestionFiter();

}]);