mentoring.controller("createQuestionController", ["$scope", "$rootScope", "questionService", function ($scope, $rootScope, questionService) {

	var questionBeanResource = {
		userContext : $rootScope.userContext
	};

	$scope.createQuestion = function(){

		if($scope.createQuestionForm.$invalid)
			return;

		questionBeanResource.question = $scope.question;

		questionService.createQuestion(questionBeanResource).then(function (response){

			var question = response.data;
			$scope.message = "A questão com o código "+question.code+" foi cadastrada com sucesso!";
			$scope.question = {};

		});

	};

	$scope.cleanQuestion = function (){
		$scope.question = {};
		$scope.message = "";
		$scope.errorMessages = "";
		$scope.hasErrors = [];
	};

	$scope.cleanQuestion();

	
}]);