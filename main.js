function initialize_game() {
	library.init();
	library.init_bricks();
	library.init_paddle();
	library.init_mouse();
}

initialize_game();

$(document).keydown(library.onKeyDown);
$(document).keyup(library.onKeyUp);
// Mouse events not working?
$(document).mousemove(library.OnMouseMove);