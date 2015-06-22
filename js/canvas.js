function getWidth() { return (window.innerWidth > 1300) ? 1300 : window.innerWidth; }

function scaleImages(img) {
	var wOverH = img.width / img.height;

	imgW   = canvas.width;
	imgH   = canvas.width / wOverH;
}

function draw() {
	scaleImages(imageNight);

	ctx.drawImage(imageNight, 0, 0, imgW, imgH);

	drawClip();
}

function drawClip(x, y) {
	ctx.drawImage(imageNight, 0, 0, imgW, imgH);

	ctx.save();

	ctx.beginPath();
	ctx.arc(x-100, y, 70, 0, Math.PI*2, true); 
	ctx.closePath();
	ctx.clip();

	ctx.drawImage(imageDay, 0, 0, imgW, imgH);

	ctx.restore();

	// var temp = document.createElement('canvas'),
 //        tx = temp.getContext('2d');
                            
 //    temp.width = ctx.canvas.width;
 //    temp.height = ctx.canvas.height;
    
 //    tx.translate(-temp.width, 0);
 //    tx.shadowOffsetX = temp.width;    
 //    tx.shadowOffsetY = 0;
 //    tx.shadowColor = '#000';
 //    tx.shadowBlur = 40;
    
 //    tx.arc(x-100, y, 70, 0, Math.PI*2, true);
 //    tx.closePath();
 //    tx.clip();

 //    tx.drawImage(imageDay, 0, 0, imgW, imgH);

 //    ctx.save();
 //    // ctx.globalCompositeOperation = 'destination-out';
 //    ctx.drawImage(temp, 0, 0);
 //    ctx.restore();
}

function redraw() {
	ctx.canvas.width  = getWidth();

	scaleImages(imageNight);
	draw();	
}

function setupMouse(canvas, onMouseMove, preventDefault) {
    var hook = canvas.addEventListener.bind(canvas);
    hook('mousemove', updateCoordinates);
    // hook('scroll', updateRect);

    function updateCoordinates(e) {
        mouse.x = (e.clientX);
        mouse.y = (e.clientY);
        onMouseMove(mouse.x, mouse.y);
    }
};

var canvas      = document.getElementById('forest'),
	ctx         = canvas.getContext('2d'),

	imageNight  = new Image(),
	imageDay    = new Image(),
	imgW = 0, imgH = 0,
	mouse = { x: 0, y: 0 };

setupMouse(canvas, drawClip, true);
ctx.canvas.width  = getWidth();
ctx.canvas.height = window.innerHeight;

window.onresize = redraw;
imageNight.onload = draw;

imageNight.src  = '../img/night.png';
imageDay.src    = '../img/day.png';
