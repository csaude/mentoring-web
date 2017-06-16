mentoring.service('authService', ['$http', '$q', 'spinnerService', function ($http, $q, spinnerService){

	this.login = function(userContext){

		return $q(function (resolve, reject){

			spinnerService.show('processSpinner');

			$http.post('/account-manager-web/services/users', userContext)
				
				.success(function(response){

					var message = response.message;

					if(message){
						
						reject({
							message : message
						});

						return;
					}

					resolve({
						data : response
					});
				})

				.error(function(error){
					console.log(error);
				})

				.finally(function() {
					spinnerService.hide('processSpinner');
				});
		});
	};	

}]);