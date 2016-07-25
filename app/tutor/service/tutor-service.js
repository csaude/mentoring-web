mentoring.service("tutorService", ["$http", function($http){

	this.createTutor = function (tutor) {

		return $http.post('/mentoring-integ/services/tutors', tutor);

	};


	this.getTutors = function (tutor) {

		return $http.get('/mentoring-integ/services/tutors',
			{
				params: {
					code: tutor.code,
					name: tutor.name,
					surname: tutor.surname,
					category: tutor.category	
				}
			}
		);
	};

	this.updateTutor = function(tutorBeanResource){
		return $http.put('/mentoring-integ/services/tutors', tutorBeanResource);
	};

}]);