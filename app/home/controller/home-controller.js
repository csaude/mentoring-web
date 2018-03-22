mentoring.controller('homeController', ['$scope', '$filter', 'mentorshipService', function($scope, $filter, mentorshipService) {

	$scope.submissions = [];

	$scope.removeDuplications = function(list){
		var newList = []; 

		newList = list.filter(function(element, position, list){
			return list.indexOf(element) == position;
		});

		return newList;
	};

	$scope.getElements = function(property, list){

		var newList = [];

		newList =  list.map(function(value){
			return value[property];
		});

		return $scope.removeDuplications(newList);
	};

	var die = "DIE";
	var dieColor = 'rgba(255,99,132,1)';
	var otherColor = 'rgba(54, 162, 235, 1)';
	
	(function(){

		mentorshipService.findSubmitedSessionsPerHealthFacility()
						 .then(function(response){
							 $scope.submissions = response.data.submitedSessions;

							 var districtLabels = $scope.getElements("district", $scope.submissions);
							 var programmaticAreas = $scope.getElements("programmaticArea", $scope.submissions);

							 var datasets = [];
							 
							 programmaticAreas.forEach(function(programmaticArea){

								var submissionsByprogrammaticArea = $scope.submissions.filter(function(submission){
									return submission.programmaticArea === programmaticArea;
								});

								var data = {
									label: programmaticArea,
									data: submissionsByprogrammaticArea.map(function(submission){return submission.totalSubmited;}),
									backgroundColor: programmaticArea === die ? dieColor : otherColor
								};

								datasets.push(data);

							 });

							 var context = document.getElementById("submissionChart");
							 
							 var myChart = new Chart(context, {
								type: 'bar',

								data: {
									labels: districtLabels,
									datasets: datasets
								},
								options: {
									scaleShowVerticalLines: false,
									scales: {
										yAxes: [{
											ticks: {
												beginAtZero:true
											}
										}],
									}
								}
							});
						 })
						 .catch(function(error){
							 console.log(error);
						 });		

	})();

}]);