mentoring.directive('form', function () {
    return {
        require: 'form',
        restrict: 'E',
        
        link: function( scope , element , attributes ){
            var $element = $(element);
            
            $element.on('submit', function() {
                var form = scope[ attributes.name ];

                scope.hasErrors = [];
                
                angular.forEach( form , function ( formElement , fieldName) {
                    if ( fieldName[0] === '$' ) return;
                    
                    if(formElement.$invalid)
                        scope.hasErrors.push({field: "O campo "+fieldName+" deve ser preenchido!"});
                },this);
                
                scope.$apply();
            });
        }
    };
});