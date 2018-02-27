mentoring.controller('mapTutorController', ['$scope', '$filter', '$state', '$rootScope', 'tutorService', 'resourceUtilsService', 'programmaticAreaService', 'mapTutorService',
                                            function($scope, $filter, $state, $rootScope,  tutorService, resourceUtilsService, programmaticAreaService, mapTutorService){
    
    $scope.careerTypes = [];
    $scope.tutorFilter = {};
    $scope.tutors = [];
    $scope.errorMessage = "";
    $scope.message = "";
    $scope.programmaticAreas = [];
    $scope.disabled = false;
    $scope.tutorProgramaticArea = {};

    (function(){
        resourceUtilsService.getCarrertypes()
            .then(function(response){
                $scope.careerTypes = response.data.careerType;
            })

            .catch(function(error){
                console.log(error);
            });
    })();

    $scope.getTutorsBySelectedFilter = function(){
        
        $scope.tutors = [];
        $scope.errorMessage = "";

        tutorService.getTutors($scope.tutorFilter)
            .then(function(response){
               $scope.tutors = response.data.tutor;
            })

            .catch(function(error){
                $scope.errorMessage = error.data;
                console.log(error);
            });
    };

    $scope.cleanMap = function(){
        $scope.tutorFilter = {};
        $scope.tutors = [];
        $scope.errorMessage = "";
        $scope.tutorProgramaticArea = {};
        $scope.message = "";
    };

    $scope.onSelectTutor = function(tutor){
        $scope.tutorProgramaticArea.tutor = tutor;
    };

    $scope.next = function(){

        $scope.errorMessage = "";
        $scope.disabled = false;
        $scope.message = "";
        
        if(!$scope.tutorProgramaticArea.tutor){
            $scope.errorMessage = $filter('translate')('TUTOR_MUST_BE_SELECTED');
            return;
        }

        programmaticAreaService.getProgrammaticAreas({})
            .then(function(response){
                $scope.programmaticAreas = response.data.programmaticArea;
                $state.go("mapTutorToProgrammaticArea.mapTutor");
            })
            .catch(function(error){
                console.log(error);
            });
    };

    $scope.onSelectProgrammaticArea = function(programmaticArea){
        $scope.errorMessage = "";
        $scope.tutorProgramaticArea.programmaticArea = programmaticArea;
    };

    $scope.save = function(){

        $scope.errorMessage = "";
        $scope.message = "";

        if(!$scope.tutorProgramaticArea.programmaticArea){
            $scope.errorMessage = $filter('translate')('PROGRAMMATIC_AREA_MUST_BE_SELECTED');
            return;
        }

        var tutorProgrammaticAreaBeanResource = {
            userContext : $rootScope.userContext,
            tutorProgramaticArea : $scope.tutorProgramaticArea
        };

        mapTutorService.mapTutorToProgrammaticArea(tutorProgrammaticAreaBeanResource)
                .then(function(response){
                    $scope.disabled = true;
                    $scope.message = response.data;
                })

                .catch(function(error){
                    $scope.errorMessage = error.data;
                });
    };

    $scope.back = function(){
        $scope.errorMessage = "";
        $state.go("mapTutorToProgrammaticArea.selectTutor");
    };

}]);