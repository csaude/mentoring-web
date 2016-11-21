$(function() {
	$('.menu-icon').bind('click', function(event) {
		$('.sidebar, .content, footer').toggleClass('is-toggled');
		event.preventDefault();
	});	
});