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

								 resize: true
								});
						 })
						 .catch(function(error){
							 console.log(error);
						 });		

	})();




}]);