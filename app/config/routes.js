mentoring.config(['$stateProvider', '$urlRouterProvider', '$translateProvider', "$locationProvider",     function($stateProvider, $urlRouterProvider, $translateProvider, $locationProvider){

    //init translate
    $translateProvider.preferredLanguage('pt');
    $translateProvider.useLoader('translateLoad');
    $translateProvider.useSanitizeValueStrategy('escaped');

    // Default Url
    $urlRouterProvider.otherwise("/home");

    //html routing style
    //$locationProvider.html5Mode(true);

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
   
    .state("form.questions",{
        url : "/form/questions",
        templateUrl : "form/views/form-questions.html"
    })

    .state("listFormQuestions",{
        url : "/form/questions",
        controller : "listFormController",
        templateUrl : "form/views/list-form-question.html",
        resolve : {init : "init"}
    })

    .state("mentoringProcess", {
        url : "/mentoringProcess",
        templateUrl : "mentoring-process/views/create-mentoring-process.html",
        controller : "mentoringProcessController",
        resolve : {init : "init"}
    })

    .state("mentoringProcess.questions", {
        url : "/mentoringProcess/questions/:questionId",
        templateUrl : "mentoring-process/views/mentoring-process-questions.html",
        resolve : {init : "init"}
        templateUrl : "form/views/list-form-question.html"
    })

    .state("formUpdate",{
        url : "/formUpdate",
        templateUrl : "form/views/update-form-template.html",
        controller : "listFormController",
        resolve: {init: "init"}
    })

    .state("formUpdate.updateDetails",{
        url : "/formUpdate/updateDetails",
        templateUrl : "form/views/update-form-details.html"
    })

    .state("formUpdate.questionsDetails",{
        url : "/form/questionsDetails",
        templateUrl : "form/views/update-form-questions.html"
    });

}]);