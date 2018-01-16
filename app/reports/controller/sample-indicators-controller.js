mentoring.controller("sampleIndicatorsController", ["$scope", "$filter", "reportsService", "resourceUtilsService", "districtSevice", "healthFacilityService", function($scope, $filter, reportsService, resourceUtilsService, districtSevice, healthFacilityService){

    $scope.sampleIndicators = [];
    $scope.sampleForms = [];

    $scope.filter = {
        district : {},
        healthFacility : {},
        form : {}
    };

    $scope.districts = [];
    $scope.healthFacilities = [];
    
    $scope.reportHeader = {
        district : $filter('translate')('DISTRICT'),
        healthFacility : $filter('translate')('HEALTH_FACILITY'),
        form : $filter('translate')('FORM'),
        indicator : $filter('translate')('INDICATOR'),
        referredMonth : $filter('translate')('REFERRED_MONTH'),
        value : $filter('translate')('TOTAL')
    };

    $scope.fileName = $filter('translate')('SAMPLE_INDICATORS');

    $scope.findSampleindicatorsBySelectedFilter = function(){
        
        $scope.sampleIndicators = [];

        reportsService.getSampleIndicators($scope.filter)
            .then(function(response){
                $scope.sampleIndicators = response.data.sampleIndicator;
            })
            .catch(function(error){
                console.log(error);
            });
    };

    (function(){
		resourceUtilsService.getProvinces().then(function(response){
			$scope.provinces = response.data.province;
        });

        reportsService.getSampleForms()
            .then(function(response){
                $scope.sampleForms = response.data.form;
            })
            .catch(function(error){
                console.log(error);
            });
	})();

	$scope.onSelectProvince = function(){
        console.log($scope.filter);
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
    
    $scope.clean = function(){
        $scope.sampleIndicators = [];
        $scope.districts = [];
        $scope.healthFacilities = [];

        $scope.filter = {
            district : {},
            healthFacility : {},
            form : {}
        };
    };

}]);