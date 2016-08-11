mentoring.service("programmaticAreaService", ["$http", "config", function($http, config){

	this.createProgrammaticArea = function (programmaticAreaBeanResource) {

		return $http.post(config.baseUrl+'/programmaticareas', programmaticAreaBeanResource);
	};


	this.getProgrammaticAreas = function (programmaticarea) {

		return $http.get(config.baseUrl+'/programmaticareas',
			{
				params: {
					code: programmaticarea.code,
					name: programmaticarea.name	
				}
			}
		);
	};

	this.updateProgrammaticArea = function(programmaticAreaBeanResource){
		return $http.put(config.baseUrl+'/programmaticareas', programmaticAreaBeanResource);
	};

}]);