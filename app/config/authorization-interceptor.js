mentoring.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(function($q, $location, $cookies, $rootScope) {
        return {
            request: function(config) {
                // Simply add the authorization header if present.
                var jwtToken = sessionStorage.getItem('jwtToken');
                if(jwtToken !== null && jwtToken !== undefined && config.url.indexOf('/account-manager-web/services/users') === -1 &&
                    config.url.indexOf('/mentoring-integ/services/') >= 0) {
                    config.headers.Authorization = 'Bearer ' + jwtToken;
                }
                return config;
            },

            responseError: function (rejection) {
                console.log('Rejection: ',rejection);
                if(rejection.data && rejection.data.status === 401) {       // Unauthorized (just logout)
                    console.log('Sending to login page');
                    $cookies.remove('usercontext');
                    sessionStorage.removeItem('jwtToken');
                    $location.path('/login');
                    $rootScope.visible = false;
                }
            }
        };
    });
}]);