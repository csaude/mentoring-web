mentoring.controller("formController", ["$scope", "$state", "questionService", function ($scope, $state, questionService){

	$scope.form = {
		questions : []
	};

	$scope.questions = [];
	$scope.questionFilter = {};

	$scope.nextDetails = function (){

		if($scope.createForm.$invalid)
			return;

		$scope.hasErrors = [];
		$state.go("form.questions");
	};

	$scope.back = function (){
		$state.go("form.details");
	};

	$scope.addQuestion = function (question){

		$scope.addQuestionErrorMessage = "";

		var foundQuestion = _.find($scope.form.questions, function (q) {
			return q.code == question.code;
		});

		if (foundQuestion){
			$scope.addQuestionErrorMessage = "A questão com o código "+foundQuestion.code+" já foi adicionada na lista";
			return;
		}

		$scope.form.questions.push(question);
	};

	$scope.removeQuestion = function (question){
		_.remove($scope.form.questions, function(q){
			return q.code === question.code;
		});
	};

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

	$scope.onAddQuestion = function (){
		$scope.questionFilter = {};
		$scope.addQuestionErrorMessage = "";
		$scope.addQuestionMessage = "";
		$scope.questions = [];
	};

}]);