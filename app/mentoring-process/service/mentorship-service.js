mentoring.service("mentorshipService", ['$filter', 'requestProcessService', function ($filter, requestProcessService){

	this.createMentorship = function (mentorshipBeanResource){

		return requestProcessService.post("/mentoring-integ/services/mentorships", mentorshipBeanResource,
			$filter('translate')('MENTORING_CREATED_WITH_SUCCESS'));
	};

	this.getMentorshipService = function (mentorship) {

		var params = {
						code: mentorship.code,
						tutor: mentorship.tutor,
						tutored: mentorship.tutored				
					};

		return requestProcessService.get('/mentoring-integ/services/mentorships', params);
	};

}]);