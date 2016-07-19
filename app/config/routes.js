mentoring.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){

    // Default Url
    $urlRouterProvider.otherwise("/home");

    $stateProvider
    
    .state("home", {
    	url: "/home",
    	templateUrl: "home.html"
    })

    .state("createTutor",{
    	url : "/createTutor",
    	templateUrl: "tutor/views/create-tutor.html",
        controller: "tutorController"
    });

}]);