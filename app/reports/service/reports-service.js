mentoring.service("reportsService", ["requestProcessService", function(requestProcessService){

    this.getSampleIndicators = function(filter){

        var params = {
            districtUuid : filter.district.uuid,
            healthFacilityUuid : filter.healthFacility.uuid,
            formUuid : filter.form.uuid,
            startDate : filter.startDate,
            endDate : filter.endDate
        }

        console.log(params);

        return requestProcessService.get("/mentoring-integ/services/indicators/sample-indicators", params);
    };

    this.getSampleForms = function(){
        return requestProcessService.get("/mentoring-integ/services/forms/sample-forms");
    };

}]);