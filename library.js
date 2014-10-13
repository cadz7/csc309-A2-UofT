var library = (function() {

		var canvasMinX;
		var canvasMaxX;
		var x = 150;
		var y = 150;
		var dx = 2;
		var dy = 4;
		var WIDTH;
		var HEIGHT;
		var intervalId = 0;
		var paddlex;
		var paddleh;
		var paddlew;
		rightDown = false;
		leftDown = false;

		return {
				init: function() {
					ctx = $('#canvas')[0].getContext("2d");
					WIDTH = $('#canvas').width();
					HEIGHT = $('#canvas').height();
					intervalId = setInterval(library.draw, 10);
				},
				init_paddle: function() {
					paddlex = WIDTH / 3;
					paddleh = 10;
					paddlew = 125;
				},
				init_mouse: function() {
				 	canvasMinX = $("#canvas").offset().left;
				 	canvasMaxX = canvasMinX + WIDTH;
				},
				circle: function(x,y,radius) {
					ctx.beginPath();
					ctx.arc(x, y, radius, 0, Math.PI*2, true);
					ctx.closePath();
					ctx.fill();
				},

				rect: function(x,y,w,h) {
					ctx.beginPath();
					ctx.rect(x,y,w,h);
					ctx.closePath();
					ctx.fill();	
				},

				clear: function() {
					ctx.clearRect(0, 0, WIDTH, HEIGHT);
				},

				 draw: function() {
					library.clear();
					library.circle(x, y, 10);

					/* Move the paddle  */
					if (rightDown && paddlex < 300) paddlex += 5;
					else if (leftDown && paddlex > 0) paddlex -= 5;

					console.log(paddlex)

					library.rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
					if (x + dx > WIDTH || x + dx < 0)
						dx = -dx;
					if(y + dy < 0)
						dy = -dy
					else if (y + dy > HEIGHT )
					{
						if (x > paddlex && x < paddlex + paddlew)
							dy = -dy;
						else {
							clearInterval(intervalId);
							// alert("boo! You lost!")
						}
					}
					x += dx;
					y += dy;
				},

				onKeyDown: function(e) {
					if(e.keyCode == 39)
						{
							rightDown = true;
							console.log('right pressed')
						}
					else if (e.keyCode == 37) 
						{
							leftDown = true;
							console.log('left pressed')
						}
				},

				onKeyUp: function(e) {
					if(e.keyCode == 39) rightDown = false;
					else if (e.keyCode == 37) leftDown = false;
				},

				// Mouse event is not getting picked up?
				onMouseMove: function(e) {
					if(e.pageX > canvasMinX && e.paddlex < canvasMaxX) {
						paddlex = e.pageX - canvasMinX;
					}
				}

		};
}());