mentoring.service("programmaticAreaService", ["$http", function($http){

	this.createProgrammaticArea = function (programmaticAreaBeanResource) {

		return $http.post('/mentoring-integ/services/programmaticareas', programmaticAreaBeanResource);
	};


	this.getProgrammaticAreas = function (sector) {

		return $http.get('/mentoring-integ/services/programmaticareas',
			{
				params: {
					code: sector.code,
					name: sector.name	
				}
			}
		);
	};

	this.updateProgrammaticArea = function(programmaticAreaBeanResource){
		return $http.put('/mentoring-integ/services/programmaticareas', programmaticAreaBeanResource);
	};

}]);