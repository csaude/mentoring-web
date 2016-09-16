mentoring.service("resourceUtilsService", ["$http", function ($http) {

	this.getProvinces = function(){
		return $http.get('/mentoring-integ/services/utils/provinces');
	};

	this.getQuestionTypes = function(){
		return $http.get('/mentoring-integ/services/utils/questiontypes');
	};

	this.getQuestionCategories = function(){
		return $http.get('/mentoring-integ/services/utils/questionscategories');
	};
	this.getCarrertypes = function(){
		return $http.get('/mentoring-integ/services/utils/carrertypes');
	};

}]);