mentoring.controller("tutorController", ["$scope", "tutorService", function($scope, tutorService){
	
	$scope.tutor = {};

	$scope.createTutor = function(tutorForm){

		if(!tutorForm.$valid){
			return;
		}

		tutorService.createTutor($scope.tutor).then( function success(response){
			console.log(response);
			cleanTutor();
		});
	};

	$scope.cleanTutor = function(){
		$scope.tutor = {};
		$scope.hasErrors = [];
	};

}]);