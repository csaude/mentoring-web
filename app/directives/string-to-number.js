mentoring.directive('stringToNumber', function() {
    return {
        
      restric: 'A',  
      require: 'ngModel',

      link: function(scope, element, attrs, ngModel) {
        
        ngModel.$parsers.push(function(value) {
          return '' + value;
        });

        ngModel.$formatters.push(function(value) {
          return parseFloat(value);
        });

      }
    };
});