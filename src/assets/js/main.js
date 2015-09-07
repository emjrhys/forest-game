'use strict';

// jquery doesnt like audio tag
var theme = document.getElementById("theme");

$('.start').click(function() {
	$('#landing').fadeOut(800);
	$('#game').addClass('running');
    theme.play();

	init();
});

$('.volume').click(function() {
	$(this).toggleClass('muted');
    theme.muted = !theme.muted;
});