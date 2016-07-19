mentoring.directive("messages", function(){
	return {

		require: "form",
		restrict: "EA",
		templateUrl : "directives/views/messages-template.html",

		scope: {

			message: "@",
			errorMessage: "@",
			hasErrors: "="
		}
	};
});