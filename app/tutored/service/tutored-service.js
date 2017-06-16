mentoring.service("tutoredService", ["$filter",'requestProcessService', function($filter, requestProcessService){

	this.createTutored = function (tutored) {
		return requestProcessService.post('/mentoring-integ/services/tutoreds', tutored,
			$filter('translate')('TUTORED_CREATED_WITH_SUCCESS'));
	};


	this.getTutoreds = function (tutored) {

		var params = {
			code: tutored.code,
			name: tutored.name,
			surname: tutored.surname,
			phoneNumber: tutored.phoneNumber	
		};

		return requestProcessService.get('/mentoring-integ/services/tutoreds', params);
	};

	this.updateTutored = function(tutoredBeanResource){
		return requestProcessService.put('/mentoring-integ/services/tutoreds', tutoredBeanResource, 
			$filter('translate')('TUTORED_EDITED_WITH_SUCCESS'));
	};

}]);