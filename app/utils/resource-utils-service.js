mentoring.service("resourceUtilsService", ["$http", function ($http) {

	this.getProvinces = function(){
		return $http.get('/mentoring-integ/services/utils/provinces');
	};

}]);