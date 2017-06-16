mentoring.service("questionService", ["$http", "$q", '$filter', "spinnerService", function ($http, $q, $filter, spinnerService){

	this.createQuestion = function (questionBeanResource){

		return $q(function(resolve, reject){

			spinnerService.show('processSpinner');

			$http.post('/mentoring-integ/services/questions', questionBeanResource)
				.success(function(response){

					var message = response.message;

					if(message){
						
						reject({
							message : message
						});

						return;
					}

					resolve({
						data : $filter('translate')('QUESTION_CREATED_WITH_SUCCESS')
					});
				})
				.error(function(error){
					console.log(error);
				})
				.finally(function(){
					spinnerService.hide('processSpinner');
				});
		});
	};

	this.getQuestions = function(question){
		return $http.get('/mentoring-integ/services/questions', {
			params : {
				code : question.code,
				question : question.question,
				questionType : question.questionType,
				questionCategory : question.questionCategory
			}
		});
	};

	this.updateQuestion = function(questionBeanResource){
		return $http.put('/mentoring-integ/services/questions', questionBeanResource);
	};

	this.getQuestionsByForm =  function(code){
		return $http.get('/mentoring-integ/services/questions/' + code);
	};

}]);