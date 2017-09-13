mentoring.service("tutorService", ['$filter', 'requestProcessService', function($filter, requestProcessService){

	this.createTutor = function (tutor) {
		return requestProcessService.post('/mentoring-integ/services/tutors', tutor,
			$filter('translate')('TUTOR_CREATED_WITH_SUCCESS'));
	};


	this.getTutors = function (tutor) {

		var params =  {
					code: tutor.code,
					name: tutor.name,
					surname: tutor.surname,
					careerType: tutor.careerType,
					phoneNumber: tutor.phoneNumber	
				};

		return requestProcessService.get('/mentoring-integ/services/tutors', params);
	};

	this.updateTutor = function(tutorBeanResource){
		return requestProcessService.put('/mentoring-integ/services/tutors', tutorBeanResource,
			$filter('translate')('TUTOR_EDITED_WITH_SUCCESS'));
	};

}]);