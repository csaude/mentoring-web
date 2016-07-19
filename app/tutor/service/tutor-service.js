mentoring.service("tutorService", ["$http", function($http){

	this.createTutor = function (tutor) {

		return $http.post('/mentoring-integ/services/tutors', tutor);

	};

}]);