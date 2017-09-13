mentoring.service("mapTutorService", ['$filter', 'requestProcessService', function($filter, requestProcessService){
    
        this.mapTutorToProgrammaticArea = function (tutorProgrammaticArea) {
            return requestProcessService.post('/mentoring-integ/services/tutor-programmatic-areas', tutorProgrammaticArea,
                $filter('translate')('TUTORED_MAPPED_SUCCESS'));
        };
}]);