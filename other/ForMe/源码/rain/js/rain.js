$(function(){

	var figure = $(".field");
	var flont = $(".flont");
	var items = 100;

	winRsize();
	$(window).resize(function() {
		winRsize();
	});

	function winRsize() {
		winHeight = $(window).height();
		figure.height(winHeight);
	}

	for (var i=0; i<=items; i++) {
		var move = Math.ceil( Math.random()*50 );
		var wide = Math.ceil( Math.random()*40 );
		var pos = Math.ceil( Math.random()*50 );
		var rotate = Math.ceil( Math.random()*10 );
		figure.append('<div class="translate'+move+'"><div class="rotate'+rotate+'"><div class="rain move'+move+' pos'+pos+'"><span class="item"></span></div></div></div>');
	}
	for (var i=0; i<=100; i++) {
		var glassMove = Math.ceil( Math.random()*50 );
		var scale = Math.ceil( Math.random()*30 );
		var pos = Math.ceil( Math.random()*50 );
		var posTop = Math.ceil( Math.random()*50 );
		flont.append('<div class="glass glassMove'+glassMove+' pos'+pos+' posTop'+posTop+'"><span class="item scale'+scale+'"></span></div>');
	}

});