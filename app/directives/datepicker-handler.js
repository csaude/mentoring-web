mentoring.directive("datepicker", function () {
  return {
      
    restrict: "A",
    require: "ngModel",
      
    link: function (scope, elem, attrs, ngModelCtrl) {
        
      var $element = $(elem);
        
      var updateModel = function (dateText) {
          
        scope.$apply(function () {
            ngModelCtrl.$setViewValue(dateText);
        });
          
      };
        
      var options = {          
          changeMonth: true,
          changeYear: true,
          dateFormat: 'dd-mm-yy',
          
          onSelect: function (dateText) {
              updateModel(dateText);
          }
      };
        
        $element.datepicker(options);        
    }      
  };
  
}); 