var library = (function() {

		var canvasMinX;
		var canvasMaxX;
		var x = 100;
		var y = 100;
		var dx = 2;
		var dy = 4;
		var canvas_width;
		var canvas_height;
		var intervalId = 0;
		var paddlex; // Position of paddle
		var paddleh; // Paddle height
		var paddlew; // Paddle width
		var rightDown = false;
		var leftDown = false;
		var canvasMinX = 0;
		var canvasMaxX = 0;
		var bricks; // bricks is a 2D array containing all the bricks
		var row_count;
		var col_count;
		var brick_width;
		var brick_height;
		var padding;
		var color_array = ['blue', 'green', 'yellow', 'orange', 'red'];
		var total_score;
		var level_count;
		var level = $('#level')[0];
		var score = $('#score')[0];
		return {
				/*
					Initialize the canvas.
				 */
				init: function() {
					ctx = $('#canvas')[0].getContext("2d");
					canvas_width = $('#canvas').width();
					canvas_height = $('#canvas').height();
					level_count = 1;
					current_score = 0;
					score.innerHTML = 0;
					level.innerHTML = 1;
					intervalId = setInterval(library.draw, 10);
				},
				/*
					Paddle initialization.
				*/
				init_paddle: function() {
					paddlex = canvas_width / 3;
					paddleh = 10;
					paddlew = 125;
				},
				/*
					Initialize the min/max for mouse gestures
					Not working.
				 */
				init_mouse: function() {
				 	canvasMinX = $("#canvas").offset().left;
				 	canvasMaxX = canvasMinX + canvas_width;
				},
				/*
					Initialize the bricks
				 */
				init_bricks: function() {
				  	row_count = 1;
  					col_count = 5;
					brick_width = (canvas_width/col_count) - 1;
					brick_height = 15;
					padding = 1;

					bricks = new Array(row_count);
					for (i=0; i < row_count; i++) {
						bricks[i] = new Array(col_count);
						for (j=0; j < col_count; j++) {
							bricks[i][j] = 1;
						}
					}
					total_score = row_count * col_count;
				},
				/*
					Canvas defnition of the ball
				*/
				circle: function(x,y,radius) {
					ctx.beginPath();
					ctx.arc(x, y, radius, 0, Math.PI*2, true);
					ctx.closePath();
					ctx.fill();
				},
				/*
					Canvas definition of bricks and paddle
				*/
				rect: function(x,y,w,h,row) {
					ctx.beginPath();
					ctx.rect(x,y,w,h);
					ctx.closePath();
					ctx.fillStyle = color_array[4];
					ctx.fill();
				},

				clear: function() {
					ctx.clearRect(0, 0, canvas_width, canvas_height);
				},
				/*
					Main drawing function
				*/
				draw: function() {
					library.clear();
					library.circle(x, y, 10);
					/* modify level */
					level.innerHTML = level_count;
					/* Move the paddle  */
					if (rightDown && paddlex < 300) paddlex += 5;
					else if (leftDown && paddlex > 0) paddlex -= 5;

					library.rect(paddlex, canvas_height-paddleh, paddlew, paddleh);

					//Draw  Bricks

					  for (i=0; i < row_count; i++) {
					    for (j=0; j < col_count; j++) {
					      if (bricks[i][j] == 1) {
					        library.rect((j * (brick_width + padding)) + padding,
					             (i * (brick_height + padding)) + padding,
					             brick_width, brick_height, i);
					      }
					    }
					  }


					  //Check if we hit the brick
					  /*
						x, y, are spatial locations of the ball
						dy = -dy makes the ball go in reverse
					  */
					  rowheight = brick_height + padding;
					  colwidth = brick_width + padding;
					  row = Math.floor(y/rowheight);
					  col = Math.floor(x/colwidth);
					  //if so, reverse the ball and mark the brick as broken
					  if (y < row_count * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
					    current_score += 1;
					    score.innerHTML = current_score;
					    dy = -dy;
					    bricks[row][col] = 0;
					    if (current_score == total_score)
					  	{
								if(level_count == 1) {
									level.innerHTML = "2";
									level_count = 2;
									total_score *= 2;
									for (i=0; i < row_count; i++) {
										for (j=0; j < col_count; j++) {
											bricks[i][j] = 1;
										}
									}
								} else {
									clearInterval(intervalId);
									alert("You Won");
								}
								// initialize_game();
					    }
					  }

					if (x + dx > canvas_width || x + dx < 0)
						dx = -dx;
					if(y + dy < 0)
						dy = -dy
					else if (y + dy > canvas_height )
					{
						if (x > paddlex && x < paddlex + paddlew)
							dy = -dy;
						else {
							clearInterval(intervalId);
							alert("boo! You lost!");
							// initialize_game();
						}
					}
					x += dx;
					y += dy;
				},

				/*
					Left/Right keys to move the paddle
				 */
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
