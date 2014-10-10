flashCanvas = document.getElementById("flashBacks");
lightFunkcanvas1 = document.getElementById("lightFunk1");
lightFunkcanvas2 = document.getElementById("lightFunk2");
lightFunkcanvas3 = document.getElementById("lightFunk3");
rainCanvas = document.getElementById('rain');
capitolHeightPercent = 0.70;
height = 0;
width = 0;
wind = 4;
width_offset = 0;
display = {};
window.onresize = function() {
	flashCanvas.height = window.innerHeight;
	flashCanvas.width = window.innerWidth;
	lightFunkcanvas1.height = window.innerHeight;
	lightFunkcanvas1.width = window.innerWidth;
	lightFunkcanvas2.height = window.innerHeight;
	lightFunkcanvas2.width = window.innerWidth;
	lightFunkcanvas3.height = window.innerHeight;
	lightFunkcanvas3.width = window.innerWidth;
	rainCanvas.height = window.innerHeight;
	width_offset = window.innerHeight*wind/5
    rainCanvas.width = window.innerWidth + width_offset;
    $(document).ready(function(){
		$(rainCanvas).css("left", (0 - width_offset) + "px");
		$(rainCanvas).css("width", rainCanvas.width + "px");
	});
	height = window.innerHeight;
	width = window.innerWidth;
	display.height = height*capitolHeightPercent;
	display.width = display.height*captitolDark.width/captitolDark.height;
	display.x = width/2-display.width/2;
	display.y = height-display.height;
}


captitolDark = new Image();
captitolLite = new Image();
captitolDark.onload = function(){
	window.onresize();
}
captitolLite.onload = function(){
	window.onresize();
}
captitolDark.src = "/img/capitol_dim.png";
captitolLite.src = "/img/capitol_bright.png";

fadePercent = 0;