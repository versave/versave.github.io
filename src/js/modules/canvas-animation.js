export default class canvasExplosion {
	constructor(canvas, dots) {
		this.canvas	 		= canvas;
		this.ctx	 		= canvas.getContext('2d');
		this.dotColors 		= ['#5b25a1', '#2fc63c', '#21cae0', '#e21b1b', '#c46d0f', '#fcf00f', '#ffffff', '#17d660', '#ffa0f2', '#2e35f4', '#000000', '#37f2f2', '#5176bc', '#e03ec8'];
		this.maxDots 		= dots;
		this.dots 			= [];
		this.bounce 		= true;
		this.maxVelocity    = 6;

		this.init();
	}

	init() {
		this.createDot(this.dotColors[Math.floor(this.randomize(0, this.dotColors.length))]);
		
		window.requestAnimationFrame(this.animateDot.bind(this));
	}

	createDot(color) {
		if(this.dots.length < this.maxDots) {
			let rand = Math.floor(this.randomize(-2, 2));

			if(rand === 0) {
				rand++;
			}

			const dot = {
				x: this.canvas.width / 2,
				y: this.canvas.height / 2,
				size: 1,
				paths: {x: this.randomize(-rand, rand), y: this.randomize(-rand, rand)},
				fill: color,
				velocity: this.randomize(1, this.maxVelocity)
			};

			this
				.dots
					.push(dot);

			this.createDot(this.dotColors[Math.floor(this.randomize(0, this.dotColors.length))]);
		} 
	}

	animateDot() {
		this.drawDot();

		window.requestAnimationFrame(this.animateDot.bind(this));
	}

	drawDot() {
		this
			.ctx
				.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this
			.dots
				.forEach(dot => {
					dot.x += dot.paths.x * dot.velocity;						
					dot.y += dot.paths.y * dot.velocity;

					if(this.bounce) {
						if (dot.x < 0 || dot.x > this.canvas.width) {
							dot.paths.x = -dot.paths.x;
						}  else if(dot.y < 0 || dot.y > this.canvas.height) {
							dot.paths.y = -dot.paths.y;
						}
					}

					this
						.ctx
							.beginPath();
					this
						.ctx
							.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI, false);
					this
						.ctx
							.fillStyle = dot.fill;
					this
						.ctx
							.fill();
				});	
	}

	randomize(min, max) {
		return Math.random() * (max - min) + min;
	}
}

