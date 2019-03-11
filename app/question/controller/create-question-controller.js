mentoring.controller("createQuestionController", ["$scope", "$rootScope", "questionService", "resourceUtilsService", function ($scope, $rootScope, questionService, resourceUtilsService) {

	var questionBeanResource = {
		userContext : $rootScope.userContext
	};

	$scope.questionTypes = [];
	$scope.questionsCategories = [];
	$scope.isEnabled = true;

	$scope.createQuestion = function(){

		if($scope.createQuestionForm.$invalid)
			return;

		questionBeanResource.question = $scope.question;

		questionService.createQuestion(questionBeanResource)
			.then(function (response){
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

	var getQuestionsCategories = function(){
		questionService.getQuestionsCategories().then(function(response){
			if(response.data){
				$scope.questionsCategories = response.data.questionsCategory;
			}
		});
	};

   	// just to return QuestionTypes an QuestionsCategories
	(function(){

		resourceUtilsService.getQuestionTypes().then(function(response){
			if(response.data){
				$scope.questionTypes = response.data.questionType;
			}
		});

		getQuestionsCategories();

	})();

	$scope.addQuestionCategory = function(){
		if($scope.addQuestionCategoryForm.$invalid)
			return;
		
		var questionCategoryBeanResource = {
			userContext : questionBeanResource.userContext,
			questionsCategory : $scope.questionsCategory
		};

		questionService.createQuestionsCategory(questionCategoryBeanResource)
			.then(function (response){
				$scope.message = response.data;
				$scope.questionsCategory = {};
			})
			.catch(function(error){
				$scope.message = error.data;
			});
	};

	$scope.cleanQuestionsCategory = function(){
		$scope.questionsCategory = {};
		$scope.hasErrors = [];
	};

	$scope.onAddQuestionCategory = function(){
		$scope.isEnabled = false;
		$scope.hasErrors = [];
	};

	$scope.onCloseAddition = function(){
		$scope.isEnabled = true;
		$scope.hasErrors = [];
		$scope.message = "";
		$scope.errorMessages = "";
		getQuestionsCategories();
	};

}]);