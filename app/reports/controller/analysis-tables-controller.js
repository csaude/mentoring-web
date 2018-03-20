mentoring.controller("analysisTablesController", ["$scope", "$filter", "reportsService", "resourceUtilsService", "districtSevice", function($scope, $filter, reportsService, resourceUtilsService, districtSevice){

    $scope.analysisTables = [];

    $scope.filter = {
        district : {}
    };

    $scope.districts = [];
    
    $scope.reportHeader = {
        form : $filter('translate')('FORM'),
        collectedSamples : $filter('translate')('COLLECTED_SAMPLES'),
        referredSamples : $filter('translate')('REFFERED_SAMPLES'),
        rejectedSamples : $filter('translate')('REJECTED_SAMPLES'),
        receivedResult : $filter('translate')('RECEIVED_SAMPLES'),
        transportation : $filter('translate')('TRANSPORT_%'),
        rejection : $filter('translate')('REJECTION_%'),
        result : $filter('translate')('RESULT_%'),
        totalResult : $filter('translate')('TOTAL_RESULT_%'),
    };

    $scope.fileName = $filter('translate')('ANALYSIS_TABLE');

    $scope.findAnalysisTablesBySelectedFilter = function(){
        
        $scope.analysisTables = [];

        reportsService.getAnalysisTables($scope.filter)
            .then(function(response){
                $scope.analysisTables = response.data.analysisTable;
            })
            .catch(function(error){
                console.log(error);
            });
    };

    (function(){
		resourceUtilsService.getProvinces().then(function(response){
			$scope.provinces = response.data.province;
        }).catch(function(error){
            console.log(error);
        });
	})();

	$scope.onSelectProvince = function(){
		districtSevice.getDistrictsByProvince($scope.filter.province).then(function(response){
			$scope.districts = [];
			if(response.data){
				$scope.districts = response.data.district;
			}	
		});
	};
    
    $scope.clean = function(){
        $scope.analysisTables = [];
        $scope.districts = [];
        $scope.filter = {
            district : {}
        };
    };
    
}]);