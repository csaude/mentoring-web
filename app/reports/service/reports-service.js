mentoring.service("reportsService", ["requestProcessService", function(requestProcessService){

    this.getSampleIndicators = function(filter){

        var params = {
            districtUuid : filter.district.uuid,
            healthFacilityUuid : filter.healthFacility.uuid,
            formUuid : filter.form.uuid,
            startDate : filter.startDate,
            endDate : filter.endDate
        };

        return requestProcessService.get("/mentoring-integ/services/indicators/sample-indicators", params);
    };

    this.getSampleForms = function(){
        return requestProcessService.get("/mentoring-integ/services/forms/sample-forms");
    };

    this.getPerformedSessions = function(filter){

        var params = {
            districtUuid : filter.district.uuid,
            healthFacilityUuid : filter.healthFacility.uuid,
            programmaticAreaUuid : filter.programmaticArea.uuid,
            formUuid : filter.form.uuid,
            startDate : filter.startDate,
            endDate : filter.endDate
        };

        return requestProcessService.get("/mentoring-integ/services/mentorships/performed-sessions", params);
    };

    this.getAnalysisTables = function(filter){

        var params = {
            districtUuid : filter.district.uuid,
            startDate : filter.startDate,
            endDate : filter.endDate
        };

        return requestProcessService.get("/mentoring-integ/services/indicators/analysis-tables", params);
    };

}]);