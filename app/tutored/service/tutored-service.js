mentoring.service("tutoredService", ["$http", function($http){

	this.createTutored = function (tutored) {

		return $http.post('/mentoring-integ/services/tutoreds', tutored);

	};


	this.getTutoreds = function (tutored) {

		return $http.get('/mentoring-integ/services/tutoreds',
			{
				params: {
					code: tutored.code,
					name: tutored.name,
					surname: tutored.surname,
					phoneNumber: tutored.phoneNumber	
				}
			}
		);
	};

	this.updateTutored = function(tutoredBeanResource){
		return $http.put('/mentoring-integ/services/tutoreds', tutoredBeanResource);
	};

}]);