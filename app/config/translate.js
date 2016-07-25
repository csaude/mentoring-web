mentoring.factory("translateLoad", ["$q", "$http", function($q, $http){

	return function (options) {
	    var deferred = $q.defer(),
	        translations;

		$http.get('resources/i18n/locale_pt.json').then(function(response){
			translations = response.data;
			deferred.resolve(translations);
		});
	 
	    return deferred.promise;
    };

}]);