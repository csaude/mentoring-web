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
    })
    .state("listSector",{
        url : "/listSector",
        templateUrl: "sector/views/list-sector.html",
        controller: "updateSectorController",
        resolve: {init: "init"}
   })

    .state("createQuestion", {
        url : "/createQuestion",
        templateUrl : "question/views/create-question.html",
        controller : "createQuestionController",
        resolve : { init : "init"}
    })

    .state("listQuestions", {
        url : "/listQuestions",
        templateUrl : "question/views/list-questions.html",
        controller : "listQuestionsController",
        resolve : {init : "init"}
    })

    .state("form",{
        url : "/form",
        templateUrl : "form/views/form-template.html",
        controller : "formController",
        resolve : {init : "init"}
    })

    .state("form.details",{
        url : "/form/details",
        templateUrl : "form/views/form-details.html"
    })

    .state("form.questions",{
        url : "/form/questions",
        templateUrl : "form/views/form-questions.html"
    });

}]);