mentoring.controller("performedSessionsController", ["$scope", "$filter", "reportsService", "resourceUtilsService", 
    "districtSevice", "healthFacilityService", "programmaticAreaService", "formService", "tutorService", "cabinetService",
        function($scope, $filter, reportsService, resourceUtilsService, districtSevice, healthFacilityService, 
            programmaticAreaService, formService, tutorService, cabinetService){
                
    $scope.clean = function(){
        $scope.performedSessions = [];
        $scope.mentoringForms = [];
        $scope.districts = [];
        $scope.healthFacilities = [];
        $scope.errorMessage = "";

        $scope.filter = {
            district : {},
            healthFacility : {},
            form : {},
            programmaticArea : {},
            tutor : {},
            cabinet : {}
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
        $scope.errorMessage = "";

        reportsService.getPerformedSessions($scope.filter)
            .then(function(response){
                $scope.performedSessions = response.data.performedSession;
            })
            .catch(function(error){
                $scope.errorMessage = error.data;
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

        tutorService.getTutors({})
            .then(function(response){
                $scope.tutors = response.data.tutor;
            })
            .catch(function(error){
                console.log(error);
            });

        cabinetService.getCabinets()
            .then(function(response){
                $scope.cabinets = response.data.cabinet;
            })
            .catch(function(error){
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

                if(!Array.isArray(response.data.form)){
                    $scope.forms.push(response.data.form);
                    return;
                }

                $scope.forms = response.data.form;

                $scope.forms = $scope.forms.filter(function(form){
                   return form.formType === "MENTORING" || form.formType === "MENTORING_CUSTOM";
                });
                
            }).catch(function(error){
                console.log(error);
            });
    };

    $scope.getTutorName = function(tutor){
        return tutor.name+' '+tutor.surname;
    };

}]);