mentoring.service("districtSevice", ["$http", function ($http) {
	
	this.getDistrictsByProvince = function(province){

		return $http.get('/mentoring-integ/services/districts', 
			{
				params : {
					province : province
				}	
			});
	};

}]);