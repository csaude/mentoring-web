mentoring.controller('homeController', ['$scope', '$filter', 'mentorshipService', function($scope, $filter, mentorshipService) {

	$scope.submissions = [];

	(function(){

		mentorshipService.findSubmitedSessionsPerHealthFacility()
						 .then(function(response){
							 
							 $scope.submissions = response.data.submitedSessions;
							 
							 Morris.Bar({
								 element: 'morris-bar-chart',

								 data: $scope.submissions,

								 xkey: 'healthFacility',

								 ykeys: ['totalSubmited'],

								 labels:[$filter('translate')('NUMBER_OF_SUBMISSIONS')],

								 hideHover: 'auto',
								 
								 barRatio: 0.4,
								 
								 xLabelAngle: 45,

								 gridTextWeight: 'bold',

								 resize: true
								});

								$("svg").css("min-height", "380");
						 })
						 .catch(function(error){
							 console.log(error);
						 });		

	})();




}]);