mentoring.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

    // Default Url
    $urlRouterProvider.otherwise("/home");

    $stateProvider
    
    .state("home", {
    	url: "/home",
    	templateUrl: "home.html",
        resolve: {init: "init"}
    })

    .state("createTutor",{
    	url : "/createTutor",
    	templateUrl: "tutor/views/create-tutor.html",
        controller: "createTutorController",
        resolve: {init: "init"}
    })

    .state("listTutor",{
        url : "/listTutor",
        templateUrl: "tutor/views/list-tutor.html",
        controller: "updateTutorController",
        resolve: {init: "init"}
    });

}]);