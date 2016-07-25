mentoring.config(['$stateProvider', '$urlRouterProvider', '$translateProvider', function($stateProvider, $urlRouterProvider, $translateProvider){

    //init translate
    $translateProvider.preferredLanguage('pt');
    $translateProvider.useLoader('translateLoad');
    $translateProvider.useSanitizeValueStrategy('escaped');

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
    })
    .state("createSector",{
        url : "/createSector",
        templateUrl: "sector/views/create-sector.html",
        controller: "createSectorController",
        resolve: {init: "init"}
    });


}]);