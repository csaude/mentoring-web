mentoring.service('authService', ['$http', '$q', function ($http, $q){

	this.login = function(userContext){

		return $q(function (resolve, reject){

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
				});
		});
	};	

}]);