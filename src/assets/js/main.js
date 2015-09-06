'use strict';

$('.start').click(function() {
	$('#landing').fadeOut(800);
	$('#game').addClass('running');
    
    // jquery doesnt like audio tag
    var theme = document.getElementById("theme");
    theme.play();
    
	init();
    initAudio();
});

$('.volume').click(function() {
	$(this).toggleClass('muted');
    
    // jquery doesnt like audio tag
    var theme = document.getElementById("theme");
    theme.muted = !theme.muted;
});