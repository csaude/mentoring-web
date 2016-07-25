mentoring.service("sectorService", ["$http", function($http){

	this.createSector = function (sector) {

		return $http.post('/mentoring-integ/services/sectors', sector);
	};

}]);