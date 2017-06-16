mentoring.controller("createQuestionController", ["$scope", "$rootScope", "questionService", "resourceUtilsService", function ($scope, $rootScope, questionService, resourceUtilsService) {

	var questionBeanResource = {
		userContext : $rootScope.userContext
	};

	$scope.questionTypes = [];
	$scope.questionCategories = [];

	$scope.createQuestion = function(){

		if($scope.createQuestionForm.$invalid)
			return;

		questionBeanResource.question = $scope.question;

		questionService.createQuestion(questionBeanResource)
			.then(function (response){
				var question = response.data;
				$scope.message = response.data;
				$scope.question = {};
			})
			.catch(function(error){
				$scope.message = error.data;
			});
	};

	$scope.cleanQuestion = function (){
		$scope.question = {};
		$scope.message = "";
		$scope.errorMessages = "";
		$scope.hasErrors = [];
	};

	$scope.cleanQuestion();

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

	
}]);