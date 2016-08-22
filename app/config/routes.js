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

    .state("createTutored",{
        url : "/createTutored",
        templateUrl: "tutored/views/create-tutored.html",
        controller: "createTutoredController",
        resolve: {init: "init"}
    })

    .state("listTutor",{
        url : "/listTutor",
        templateUrl: "tutor/views/list-tutor.html",
        controller: "updateTutorController",
        resolve: {init: "init"}
    })

    .state("listTutored",{
        url : "/listTutored",
        templateUrl: "tutored/views/list-tutored.html",
        controller: "updateTutoredController",
        resolve: {init: "init"}
    })

    .state("createProgrammaticArea",{
        url : "/createProgrammaticArea",
        templateUrl: "programmatic-area/views/create-programatic-area.html",
        controller: "createSectorController",
        resolve: {init: "init"}
    })
    .state("listProgrammaticAreas",{
        url : "/listProgrammaticAreas",
        templateUrl: "programmatic-area/views/list-programatic-area.html",
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

    .state("form.update",{
        url : "/update/form",
        templateUrl : "form/views/update-form.html",
        controller : "listFormController",
        resolve: {init: "init"}
    })
    .state("form.questions",{
        url : "/form/questions",
        templateUrl : "form/views/form-questions.html"
    })

    .state("form.questions1",{
        url : "/form/questions1",
        templateUrl : "form/views/update-form.questions.html",
        controller : "listFormController"
    })
    .state("listFormQuestions",{
        url : "/form/questions",
        controller : "listFormController",
        templateUrl : "form/views/list-form-question.html"
    })
;


}]);