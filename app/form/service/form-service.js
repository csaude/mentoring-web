mentoring.service("formService", ['$filter', 'requestProcessService', function ($filter, requestProcessService){

	this.createForm = function (formBeanResource){
		return requestProcessService.post('/mentoring-integ/services/forms', formBeanResource, 
			$filter('translate')('FORM_CREATED_WITH_SUCESS'));
	};

	this.updateForm = function (formBeanResource){
		return requestProcessService.put('/mentoring-integ/services/forms', formBeanResource,
			$filter('translate')('FORM_EDITED_WITH_SUCESS'));
	};

	this.getForms = function (form) {

		var params = {
						code: form.code,
						name: form.name,
						programmaticAreaCode: form.programmaticArea ? form.programmaticArea.code : form.programmaticArea	
					};

		return requestProcessService.get('/mentoring-integ/services/forms', params);
	};

}]);