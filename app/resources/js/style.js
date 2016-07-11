$(function() {
	$('.menu-icon').bind('click', function(event) {
		$('.sidebar, .content').toggleClass('is-toggled');
		event.preventDefault();
	});	
});