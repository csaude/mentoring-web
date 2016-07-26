mentoring.service("questionService", ["$http", function ($http){

	this.createQuestion = function (questionBeanResource){
		return $http.post('/mentoring-integ/services/questions', questionBeanResource);
	};

	this.getQuestions = function(question){
		return $http.get('/mentoring-integ/services/questions', {
			params : {
				code : question.code,
				question : question.question,
				questionType : question.questionType
			}
		});
	};

	this.updateQuestion = function(questionBeanResource){
		return $http.put('/mentoring-integ/services/questions', questionBeanResource);
	};

}]);