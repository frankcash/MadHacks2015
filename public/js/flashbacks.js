var doFlashBacks = function(){
	
	var flash = flashCanvas.getContext('2d');
	
	setInterval(function(){
		flash.clearRect(0,0, flashCanvas.width, flashCanvas.height);
		flash.fillStyle = "#505066";
		if(fadePercent > 0){
			flash.opacity = fadePercent/10.0;
			flash.fillRect(0,0, flashCanvas.width, flashCanvas.height);
			flash.opacity = 1;
			flash.drawImage(captitolLite, display.x, display.y, display.width, display.height);
		}else{
			flash.drawImage(captitolDark, display.x, display.y, display.width, display.height);	
		}
		fadePercent--;	
	}, 5);
}

doFlashBacks();