function insertBlocks(){
	width = $(window).width();
	height = $(window).height();

	alert(width + " " +  height);
}

$(document).ready(function(){
	insertBlocks();
	$(window).resize(function(){
		insertBlocks();
	});
});

$(document).on("keypress", function(e){
	
});