mentoring.service("programmaticAreaService", ['$filter', 'requestProcessService', function($filter, requestProcessService){

	this.createProgrammaticArea = function (programmaticAreaBeanResource) {
		return requestProcessService.post('/mentoring-integ/services/programmaticareas', 
			programmaticAreaBeanResource, $filter('translate')('AREA_CREATED_WITH_SUCCESS'));
	};


	this.getProgrammaticAreas = function (programmaticarea) {

		var params ={
						code: programmaticarea.code,
						name: programmaticarea.name	
					};

		return requestProcessService.get('/mentoring-integ/services/programmaticareas', params);
	};

	this.updateProgrammaticArea = function(programmaticAreaBeanResource){
		return requestProcessService.put('/mentoring-integ/services/programmaticareas', 
			programmaticAreaBeanResource, $filter('translate')('AREA_EDITED_WITH_SUCCESS'));
	};

}]);