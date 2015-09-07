'use strict';

function getWidth() { return (window.innerWidth > 1300) ? 1300 : window.innerWidth; }

function scaleImages(img) {
	var wOverH = img.width / img.height;

	w   = canvas.width;
	h   = canvas.width / wOverH;
}

function draw() {
	rect = canvas.getBoundingClientRect();

    ctx.drawImage(night, 0, 0, w, h);

	drawClip(mouse.x, mouse.y);
    setTimeout(draw,20);
}

function drawClip(x, y) {
	ctx.drawImage(night, 0, 0, w, h);

	sctx.clearRect(0, 0, scratchCanvas.width, scratchCanvas.height);

	sctx.globalCompositeOperation = 'source-over'; //default

	sctx.drawImage(day, 0, 0, w, h);
	sctx.fillStyle = '#fff'; //color doesn't matter, but we want full opacity
	sctx.globalCompositeOperation = 'destination-in';
	sctx.beginPath();
	sctx.arc(x, y, clipRadius, 0, Math.PI*2, true); 
	sctx.closePath();
	sctx.fill();

	ctx.drawImage(scratchCanvas, 0, 0);
}

function redraw() {
	//scaleImages(imageNight);

	ctx.canvas.width = getWidth();
	ctx.canvas.height = h;
	clipRadius = canvas.width * 0.04;
}

function setupMouse(canvas, onMouseMove, preventDefault) {
    var hook = canvas.addEventListener.bind(canvas);
    hook('mousemove', updateCoordinates);

    function updateCoordinates(e) {
        mouse.x = (e.clientX - rect.left);
        mouse.y = (e.clientY - rect.top);
        onMouseMove(mouse.x, mouse.y);
    }
};
    
function init() {
	if (day.readyState === 4) {

		scaleImages(imageNight);
		draw();
		$('.loader').addClass('done');
	} else {
		setTimeout(init, 100);
	}
}

var canvas        = document.getElementById('forest'),
	ctx           = canvas.getContext('2d'),
	scratchCanvas = document.createElement('canvas'),
	sctx          = scratchCanvas.getContext('2d'),

	day           = document.getElementById('day'),
    night         = document.getElementById('night'),
    
	rect          = null,
	
    imageNight  = new Image(),
    
	w = 0, h = 0,
	clipRadius = 50,
	mouse = { x: -200, y: -200 };


setupMouse(canvas, drawClip, true);
ctx.canvas.width  = getWidth();
ctx.canvas.height = window.innerHeight;
scratchCanvas.width = canvas.width;
scratchCanvas.height = canvas.height;

window.onresize = redraw;

imageNight.src  = 'assets/img/night.png';
