mentoring.controller("performedSessionsController", ["$scope", "$filter", "reportsService", "resourceUtilsService", 
    "districtSevice", "healthFacilityService", "programmaticAreaService", "formService", 
        function($scope, $filter, reportsService, resourceUtilsService, districtSevice, healthFacilityService, 
            programmaticAreaService, formService){

    $scope.clean = function(){
        $scope.performedSessions = [];
        $scope.mentoringForms = [];
        $scope.districts = [];
        $scope.healthFacilities = [];

        $scope.filter = {
            district : {},
            healthFacility : {},
            form : {},
            programmaticArea : {}
        };
    };
    
    $scope.clean();

    $scope.reportHeader = {
        district : $filter('translate')('DISTRICT'),
        healthFacility : $filter('translate')('HEALTH_FACILITY'),
        formName : $filter('translate')('FORM'),
        totalPerformed : $filter('translate')('TOTAL'),
    };

    $scope.fileName = $filter('translate')('PERFORMED_SESSIONS');

    $scope.findPerformedSessionsBySelectedFilter = function(){
        
        $scope.performedSessions = [];

        reportsService.getPerformedSessions($scope.filter)
            .then(function(response){
                $scope.performedSessions = response.data.performedSession;
            })
            .catch(function(error){
                console.log(error);
            });
    };

    (function(){
        resourceUtilsService.getProvinces()
            .then(function(response){
			    $scope.provinces = response.data.province;
            }).catch(function(error){
                console.log(error);
            });
        
        programmaticAreaService.getProgrammaticAreas()
            .then(function(response){
               $scope.programmaticAreas = response.data.programmaticArea;
            }).catch(function(error){
                console.log(error);
            });
	})();

	$scope.onSelectProvince = function(){
		districtSevice.getDistrictsByProvince($scope.filter.province).then(function(response){
			$scope.districts = [];
			$scope.healthFacilities = [];
			if(response.data){
				$scope.districts = response.data.district;
			}	
		});
	};

	$scope.onSelectDistrict = function(){
		healthFacilityService.getHealthFacilitiesByDistrictId($scope.filter.district.id).then(function(response){
			$scope.healthFacilities = [];
			if(response.data){
				$scope.healthFacilities = response.data.healthFacility;
			}
		});
    };

    $scope.onSelectProgrammaticArea = function(){
        
        $scope.forms = [];
        
        formService.getForms({ programmaticArea : $scope.filter.programmaticArea })
            .then(function(response){
                $scope.forms = response.data.form;
                $scope.forms = $scope.forms.filter(function(form){
                   return form.formType === "MENTORING";
                });
            }).catch(function(error){
                console.log(error);
            });
    };

}]);