mentoring.service("formService", ["$http", function ($http){

	this.createForm = function (formBeanResource){
		return $http.post('/mentoring-integ/services/forms', formBeanResource);
	};

	this.getForms = function (form) {

		return $http.get('/mentoring-integ/services/forms',
			{
				params: {
					code: form.code,
					name: form.name	
				}
			}
		);
	};

}]);