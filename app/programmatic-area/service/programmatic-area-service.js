mentoring.service("programmaticAreaService", ["$http", function($http){

	this.createProgrammaticArea = function (programmaticAreaBeanResource) {

		return $http.post('/mentoring-integ/services/programmaticareas', programmaticAreaBeanResource);
	};


	this.getProgrammaticAreas = function (programmaticarea) {

		return $http.get('/mentoring-integ/services/programmaticareas',
			{
				params: {
					code: programmaticarea.code,
					name: programmaticarea.name	
				}
			}
		);
	};

	this.updateProgrammaticArea = function(programmaticAreaBeanResource){
		return $http.put('/mentoring-integ/services/programmaticareas', programmaticAreaBeanResource);
	};

}]);