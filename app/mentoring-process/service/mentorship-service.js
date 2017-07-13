mentoring.service("mentorshipService", ['$filter', 'requestProcessService', function ($filter, requestProcessService){

	this.createMentorship = function (mentorshipBeanResource){

		return requestProcessService.post("/mentoring-integ/services/mentorships", mentorshipBeanResource,
			$filter('translate')('MENTORING_CREATED_WITH_SUCCESS'));
	};

	this.getMentorshipService = function (mentorship) {

		var params = {
						code: mentorship.code,
						tutor: mentorship.tutor,
						tutored: mentorship.tutored	,
						form: mentorship.form,
						healthFacility: mentorship.healthFacility					
					};

		return requestProcessService.get('/mentoring-integ/services/mentorships', params);
	};

	this.getAnswersByMentorshipUuid = function(mentorshipUuid){
		return requestProcessService.get('/mentoring-integ/services/answers/'+ mentorshipUuid);
	};

	this.findSubmitedSessionsPerHealthFacility = function(){
		return requestProcessService.get('/mentoring-integ/services/mentorships/sessions');
	};

}]);