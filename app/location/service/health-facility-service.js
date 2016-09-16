mentoring.service("healthFacilityService", ["$http", function ($http) {

	this.getHealthFacilitiesByDistrictId = function(districtId){
		return $http.get('/mentoring-integ/services/healthfacilities/'+districtId);
	};

}]);