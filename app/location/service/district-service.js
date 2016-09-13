mentoring.service("districtSevice", ["$http", function ($http) {
	
	this.getDistrictsByProvince = function(province){

		console.log(province);

		return $http.get('/mentoring-integ/services/districts', 
			{
				params : {
					province : province
				}	
			});
	};

}]);