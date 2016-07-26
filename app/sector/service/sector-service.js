mentoring.service("sectorService", ["$http", function($http){

	this.createSector = function (sector) {

		return $http.post('/mentoring-integ/services/sectors', sector);
	};


	this.getSectors = function (sector) {

		return $http.get('/mentoring-integ/services/sectors',
			{
				params: {
					code: sector.code,
					name: sector.name,
					description: sector.description	
				}
			}
		);
	};

	this.updatesector = function(sectorBeanResource){
		return $http.put('/mentoring-integ/services/sectors', sectorBeanResource);
	};

}]);