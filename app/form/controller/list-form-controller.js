mentoring.controller("listFormController", ["$scope", "$state","questionService", "$rootScope" ,"formService", "programmaticAreaService", function ($scope, $state, questionService,	 $rootScope, formService, programmaticAreaService) {
	
	$scope.form = $rootScope.form || {};

	$scope.getFormsBySelectedFilter = function(){
		$scope.forms = formService.getForms($scope.formFilter).then(function(response){
			$scope.errorMessage="";
			if(response.data){

                if(!Array.isArray(response.data.form)){
                    $scope.forms = [];
                    $scope.forms.push(response.data.form);
                    return;
                }
              
                $scope.forms = response.data.form;

            }else {
               $scope.forms = [];
               $scope.errorMessage = "Nenhum Formulario foi encontrada para o filtro solicitado!"; 
            }

		});
	};

	$scope.getProgrammaticAreas = function (){
		programmaticAreaService.getProgrammaticAreas({}).then(function (response){
			if(response.data){
                if(!Array.isArray(response.data.programmaticArea)){
                    $scope.programmaticAreas = [];
                    $scope.programmaticAreas.push(response.data.programmaticArea);
                    return;
                }

                $scope.programmaticAreas = response.data.programmaticArea;
            }
		});
	};


	$scope.getProgrammaticAreas();

	$scope.cleanFormFilter = function (){
		$scope.message = "";
		$scope.formFilter = {};
		$scope.errorMessage = "";
		$scope.forms = [];
	};

	$scope.onSelectForm =  function(form){
		$rootScope.form = form;
		$scope.hasErrors = [];
		$scope.isDisabled = false;
		$state.go("form.update");
	};

	$scope.nextPage =  function(){
		questionService.getQuestionsByForm($scope.form.code).then(function(response){
		 $scope.questions.push(response.data.question);
		});
		$state.go("form.questions1");
	};

	$scope.removeQuestion =  function(question){
		
	};

	$scope.getQuestionsUpdate =  function(){

	};

	$scope.cleanFormFilter();

}]);