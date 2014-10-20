function initialize_game() {
	library.init();
	library.init_bricks();
	library.init_paddle();
	library.init_mouse();
}


$(document).keydown(library.onKeyDown);
$(document).keyup(library.onKeyUp);

$('#restart').click(function(){
	location.reload();
});

$('#start').click(function() {
	initialize_game();
});