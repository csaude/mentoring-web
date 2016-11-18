mentoring.service("mentorshipService", ["$http", function ($http){

	this.createMentorship = function (mentorshipBeanResource){

		return $http.post("/mentoring-integ/services/mentorships", mentorshipBeanResource);
	};

	this.getMentorshipService = function (mentorship) {

		return $http.get('/mentoring-integ/services/mentorships',
			{
				params: {
					code: mentorship.code,
					tutor: mentorship.tutor,
					tutored: mentorship.tutored				
				}
			}
		);
	};

}]);