mentoring.service("healthFacilityService", ["$http", function ($http) {

	this.getHealthFacilitiesByDistrictId = function(districtId){
		$http.get('/mentoring-integ/services/healthfacilities', 
		{
			params : {
				districtId : districtId
			}
		});
	};

}]);