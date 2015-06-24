function getWidth() { return (window.innerWidth > 1300) ? 1300 : window.innerWidth; }

function scaleImages(img) {
	var wOverH = img.width / img.height;

	imgW   = canvas.width;
	imgH   = canvas.width / wOverH;
}

function draw() {
	rect = canvas.getBoundingClientRect();
	scaleImages(imageNight);

	ctx.drawImage(imageNight, 0, 0, imgW, imgH);

	drawClip(mouse.x, mouse.y);
    setTimeout(draw,20);
}

function drawClip(x, y) {
	ctx.drawImage(imageNight, 0, 0, imgW, imgH);

	ctx.save();

	ctx.beginPath();
	ctx.arc(x, y, clipRadius, 0, Math.PI*2, true); 
	ctx.closePath();
	ctx.clip();

	ctx.drawImage(day, 0, 0, imgW, imgH);

	ctx.restore();

	// var scratchCanvas = document.createElement('canvas');
	// scratchCanvas.width = canvas.width;
	// scratchCanvas.height = canvas.height;
	// var scratchCtx = scratchCanvas.getContext('2d');

	// scratchCtx.clearRect(0, 0, scratchCanvas.width, scratchCanvas.height);

	// scratchCtx.globalCompositeOperation = 'source-over'; //default

	// scratchCtx.drawImage(imageDay, 0, 0, imgW, imgH);
	// scratchCtx.fillStyle = '#fff'; //color doesn't matter, but we want full opacity
	// scratchCtx.globalCompositeOperation = 'destination-in';
	// scratchCtx.beginPath();
	// scratchCtx.arc(x, y, clipRadius, 0, Math.PI*2, true); 
	// scratchCtx.closePath();
	// scratchCtx.fill();

	// ctx.drawImage(scratchCanvas, 0, 0);
}

function redraw() {
	ctx.canvas.width = getWidth();
	clipRadius = canvas.width * 0.04;

	draw();	
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

var canvas      = document.getElementById('forest'),
	ctx         = canvas.getContext('2d'),
	day           = document.getElementById('day'),
	rect        = null,

	imageNight  = new Image(),
	imageDay    = new Image(),
	imgW = 0, imgH = 0,
	clipRadius = 50,
	mouse = { x: 0, y: 0 };

setupMouse(canvas, drawClip, true);
ctx.canvas.width  = getWidth();
ctx.canvas.height = window.innerHeight;

window.onresize = redraw;
imageNight.onload = draw;

imageNight.src  = 'img/night.png';
imageDay.src    = 'img/day.png';
