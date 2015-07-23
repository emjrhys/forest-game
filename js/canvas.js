function getWidth() { return (window.innerWidth > 1300) ? 1300 : window.innerWidth; }

function scaleImages(img) {
	var wOverH = img.width / img.height;

	imgW   = canvas.width;
	imgH   = canvas.width / wOverH;
}

function draw() {
	rect = canvas.getBoundingClientRect();

	ctx.drawImage(imageNight, 0, 0, imgW, imgH);

	drawClip(mouse.x, mouse.y);
    setTimeout(draw,20);
}

function drawClip(x, y) {
	ctx.drawImage(imageNight, 0, 0, imgW, imgH);

	sctx.clearRect(0, 0, scratchCanvas.width, scratchCanvas.height);

	sctx.globalCompositeOperation = 'source-over'; //default

	sctx.drawImage(day, 0, 0, imgW, imgH);
	sctx.fillStyle = '#fff'; //color doesn't matter, but we want full opacity
	sctx.globalCompositeOperation = 'destination-in';
	sctx.beginPath();
	sctx.arc(x, y, clipRadius, 0, Math.PI*2, true); 
	sctx.closePath();
	sctx.fill();

	ctx.drawImage(scratchCanvas, 0, 0);
}

function redraw() {
	scaleImages(imageNight);

	ctx.canvas.width = getWidth();
	ctx.canvas.height = imgH;
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
		console.log('loaded');

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
	rect          = null,

	imageNight  = new Image(),
	imgW = 0, imgH = 0,
	clipRadius = 50,
	mouse = { x: -200, y: -200 };

setupMouse(canvas, drawClip, true);
ctx.canvas.width  = getWidth();
ctx.canvas.height = window.innerHeight;
scratchCanvas.width = canvas.width;
scratchCanvas.height = canvas.height;

window.onresize = redraw;

imageNight.src  = 'assets/img/night.png';
