mentoring.service("requestProcessService", ["$http", '$q', '$filter', "spinnerService", function ($http, $q, $filter, spinnerService){

	this.get = function(url){

		return $q(function(resolve, reject){

			spinnerService.show('processSpinner');

			$http.get(url)
				
				.success(function(response){
					var message = response.message;

					if(message){
						reject({data : message});
						return;
					}

					resolve({data : response});
				})

				.error(function(error){
			
					console.log(error);

					reject({
						data: $filter('translate')('CONNECTION_PROBLEMS')
					});
				})

				.finally(function(){
					spinnerService.hide('processSpinner');
				});
		});
	};

	this.get = function(url, params){

		return $q(function(resolve, reject){

			spinnerService.show('processSpinner');

			$http.get(url, {params : params})
				
				.success(function(response){
					var message = response.message;

					if(message){
						reject({data : message});
						return;
					}

					resolve({data : response});
				})

				.error(function(error){
			
					console.log(error);

					reject({
						data: $filter('translate')('CONNECTION_PROBLEMS')
					});
				})

				.finally(function(){
					spinnerService.hide('processSpinner');
				});
		});
	};

	this.post = function(url, value, successMessage){

		return $q(function(resolve, reject){

			spinnerService.show('processSpinner');

			$http.post(url, value)

				.success(function(response){
					var message = response.message;

					if(message){
						reject({data : message});
						return;
					}

					resolve({data : successMessage});
				})

				.error(function(error){
			
					console.log(error);

					reject({
						data: $filter('translate')('CONNECTION_PROBLEMS')
					});
				})

				.finally(function(){
					spinnerService.hide('processSpinner');
				});
		});
	};

	this.put = function(url, value, successMessage){

		return $q(function(resolve, reject){

			spinnerService.show('processSpinner');

			$http.put(url, value)

				.success(function(response){
					var message = response.message;

					if(message){
						reject({data : message});
						return;
					}

					resolve({data : successMessage});
				})

				.error(function(error){
			
					console.log(error);

					reject({
						data: $filter('translate')('CONNECTION_PROBLEMS')
					});
				})

				.finally(function(){
					spinnerService.hide('processSpinner');
				});
		});

	};

}]);
