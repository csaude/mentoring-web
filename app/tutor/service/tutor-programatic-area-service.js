mentoring.service("tutorProgramaticAreaService", ["$http", function($http){

	this.linkTutorProgramaticArea = function(tutorProgramaticBeanResource){

		return $http.post('/mentoring-integ/services/tutorProgrammaticAreas', tutorProgramaticBeanResource);
	};

}]);