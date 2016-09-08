mentoring.controller("createQuestionController", ["$scope", "$rootScope", "questionService", function ($scope, $rootScope, questionService) {

	var questionBeanResource = {
		userContext : $rootScope.userContext
	};

	$scope.createQuestion = function(){

	 $scope.getQuestionsCategory();

		if($scope.createQuestionForm.$invalid)
			return;

		questionBeanResource.question = $scope.question;

		questionService.createQuestion(questionBeanResource).then(function (response){

			var question = response.data;
			$scope.message = "A questão com o código "+question.code+" foi cadastrada com sucesso!";
			$scope.question = {};

		});
          
	};

	$scope.getQuestionsCategory = function(){
		questionService.getQuestionsCategory().then(function (response){
			$scope.categorys = [];
			$scope.categorys = response.data;
			$scope.categorys = response.data.questionCategory;
		});
	};
	
	$scope.getQuestionsType =  function(){
		questionService.getQuestionsType().then(function (response){
			$scope.types = [];
			$scope.types = response.data;
			$scope.types = response.data.questionType;
		});
	};

	$scope.cleanQuestion = function (){
		$scope.getQuestionsType();
		$scope.getQuestionsCategory();
		$scope.question = {};
		$scope.message = "";
		$scope.errorMessages = "";
		$scope.hasErrors = [];
	};

	$scope.cleanQuestion();

	
}]);