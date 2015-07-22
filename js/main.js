$('.start').click(function() {
	$('#landing').fadeOut(800);
	$('#game').addClass('running');

	init();
});