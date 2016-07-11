mentoring.directive("menu", function(){
    
    return {
        
        restrict: "A",
        
        link: function(scope, element, attributes){
            
            $(element).metisMenu();
        } 
    };
    
});