mentoring.service("cabinetService", ["$http", function ($http) {

	this.getCabinets = function(){
		return $http.get('/mentoring-integ/services/cabinets');
	};

}]);