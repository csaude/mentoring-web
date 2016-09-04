mentoring.service("mentorshipService", ["$http", function ($http){

	this.createMentorship = function (mentorshipBeanResource){

		return $http.post("/mentoring-integ/services/mentorships", mentorshipBeanResource);
	};

}]);