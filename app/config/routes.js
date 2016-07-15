mentoring.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){

    // Default Url
    $urlRouterProvider.otherwise("/home");

    $stateProvider
    
    .state("home", {
    	url : "/home",
    	templateUrl : "home.html"
    });
    
//    .when("/customers", {
//        templateUrl : "customers/views/list-customers.html",
//        controller : "customerController"
//    })
//    
//    .when("/createCustomer", {
//        templateUrl : "customers/views/create-customer.html",
//        controller : "customerController"
//    })
//    
//    .when("/customers/:tabId", {
//        templateUrl : "customers/views/customer-template.html",
//        controller : "customerController"
//    })
//    
//    .when("/accounts",{
//        templateUrl : "accounts/views/open-account.html",
//        controller : "accountController"
//    })
//    
//    .when("/payments", {
//        templateUrl : "payments/views/make-payment.html",
//        controller : "paymentController"
//    });

}]);