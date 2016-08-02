mentoring.service("formService", ["$http", function ($http){

	this.createForm = function (formBeanResource){
		return $http.post('/mentoring-integ/services/forms', formBeanResource);
	};

}]);