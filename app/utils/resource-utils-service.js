mentoring.service("resourceUtilsService", ['requestProcessService', function (requestProcessService) {

	this.getProvinces = function(){
		return requestProcessService.get('/mentoring-integ/services/utils/provinces');
	};

	this.getMonths = function(){
		return requestProcessService.get('/mentoring-integ/services/utils/months');
	};

	this.getQuestionTypes = function(){
		return requestProcessService.get('/mentoring-integ/services/utils/questiontypes');
	};

	this.getQuestionCategories = function(){
		return requestProcessService.get('/mentoring-integ/services/utils/questionscategories');
	};

	this.getCarrertypes = function(){
		return requestProcessService.get('/mentoring-integ/services/utils/careertypes');
	};

	this.getFormTypes =  function(){
		return requestProcessService.get('/mentoring-integ/services/utils/formtypes');
	};
	
}]);