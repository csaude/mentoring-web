mentoring.service("carrerService", ["$http", function ($http) {

	this.getCarrerByCarrerType = function(carrerType){
		return $http.get('/mentoring-integ/services/carrers/'+carrerType);
	};

}]);