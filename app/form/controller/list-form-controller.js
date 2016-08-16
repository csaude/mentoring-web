mentoring.controller("listFormController", ["$scope", "formService", "programmaticAreaService", function ($scope, formService, programmaticAreaService) {
	
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
               $scope.errorMessage = "Nenhuma Formulario foi encontrada para o filtro solicitado!"; 
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
		$scope.formFilter = {};
		$scope.errorMessage = "";
		$scope.forms = [];
	};

	$scope.cleanFormFilter();

}]);