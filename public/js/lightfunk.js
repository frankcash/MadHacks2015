lightTheFunk = function(canvas){
	var ctx = canvas.getContext('2d');

	var lightStart_Y = 0;
	var lightEnd_X = width/2;
	console.log(height*Math.abs(1-capitolHeightPercent));
	var lightEnd_Y = height*Math.abs(1-capitolHeightPercent);

	var granularity_factor_Y = 15;
	var granularity_Y = (lightEnd_Y-lightStart_Y)/granularity_factor_Y;
	var varience_X = 50;
	var varience_Y = granularity_Y/10;

	var lightFunk = function(){
		fadePercent = 3.0

		var lightStart_X = (Math.random()*width);
		
		var rise = lightEnd_Y-lightStart_Y
		var run = lightEnd_X-lightStart_X;
		
		var lightSlope = rise/run;
		
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.strokeStyle = '#eef';
		ctx.shadowBlur = 50; 
		ctx.shadowColor = "rgba(150,100,255,1)";
		ctx.moveTo(lightStart_X, lightStart_Y);

		var lightStep = 0;
		var lightFunkStep = function(){
			var off_x = Math.random()*varience_X;
			var off_y = Math.random()*varience_Y;
			if(lightStep+1 == granularity_factor_Y){
				off_x = 0;
				off_y = 0;
			}
			var x = lightStep*granularity_Y/lightSlope + lightStart_X + off_x;
			var y = lightStep*granularity_Y + off_y;
			
			ctx.lineTo(x, y);
			ctx.stroke();
			if(lightStep < granularity_factor_Y){
				setTimeout(lightFunkStep, 5);
				
			}else{
				setTimeout(function(){
					ctx.clearRect(0,0, width, height);
					
				}, 20);
				
				setTimeout(lightFunk, Math.random()*500+800);
			}

			lightStep++;
		}
		lightFunkStep();
	}
	lightFunk();
};
$(document).ready(function(){
	setTimeout(function(){
		lightTheFunk(lightFunk1);
	},Math.random()*250+100)
	setTimeout(function(){
		lightTheFunk(lightFunk2);
	}, Math.random()*500+100)
	setTimeout(function(){
		lightTheFunk(lightFunk3);
	}, Math.random()*1000+100)
});