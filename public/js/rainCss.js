// number of drops created.
hasStartedRaining = false;

// function to generate a random number range.
function randRange( minNum, maxNum) {
	return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}






flashCSS = $("<style id='flashCSS'>.drop{background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,0)), color-stop(100%,rgba(255,255,255,1)));background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);background: -o-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);background: -ms-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 );}</style>");
window.rainFlash = function(){
	// $("html").append(flashCSS);
	// setTimeout(function(){
	// 	$("#flashCSS").remove();
	// }, 100);
	$("#rainCss").css("opacity", 1);
	setTimeout(function(){
		$("#rainCss").css("opacity", 0.5);
	}, 100);
}

// function to generate drops
window.makeItRain = function(width) {
	if(hasStartedRaining) return;
	hasStartedRaining = true;

	var nbDrop = width/10;
	var rain = $('#rainCss');
	var i = 0;

	//add drop and add more if total is not fulfilled;
	var addRain = function(){
		var dropLeft = randRange(-10,110);

		rain.append('<div class="drop" style="'+
				'left				:'+dropLeft+'vw;'+
				'top				:-10vh;'+
				'-webkit-animation	: fall .63s linear infinite;'+
		'"></div>');
		if(i < nbDrop) i++;
		if(i < nbDrop) setTimeout(addRain, dropLeft%5+5);
	}
	//start filling
	setTimeout(addRain, 5);

	//after some time
	setTimeout(function(){
		//remove some randomly and re-add somewhere else
		setInterval(function(){
			$(".drop").each(function(drop){
				if(Math.random() < 0.1){
					$(this).remove();
					setTimeout(addRain, Math.random()*5+5);
				}
			});
		}, 500);
	}, 1000);
}
// Make it rain