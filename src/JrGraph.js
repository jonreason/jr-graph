export class JrGraph extends HTMLElement {

	constructor() {
		super();
		let self = this;
	}

	connectedCallback() {
		var self = this;
		var canvas = document.createElement("canvas");
		canvas.width = this.getAttribute("width") || 400;
		canvas.height = this.getAttribute("height") || 400;
		var drawGrid = this.getAttribute("grid") !== null || false;
		canvas.style.border = "4px solid gray";
		canvas.style.borderRadius = "8px";
		this.appendChild(canvas);
		var ctx = canvas.getContext("2d");
		ctx.translate(canvas.width/2, canvas.height/2);
		ctx.scale(1, -1);

		var point = {
			xPixels: 0,
			yPixels: 0,
			x: 0,
			y: 0,
			drag: false
		};
		canvas.addEventListener("mousedown", function(e) {
			point.drag = true;
		});
		canvas.addEventListener("mouseup", function(e) {
			point.drag = false;
		});

		var event = new CustomEvent('update');
		self.point = point;
		console.log(12)
		canvas.addEventListener("mousemove", function(e) {
			console.log(document.documentElement.scrollTop);
			if (point.drag) {
				point.xPixels = (e.clientX+document.documentElement.scrollLeft - canvas.offsetLeft) - canvas.width/2;
				point.yPixels = ((e.clientY+document.documentElement.scrollTop) - canvas.height/2 - canvas.offsetTop)*-1;
				point.x = point.xPixels / (canvas.width/2);
				point.y = point.yPixels / (canvas.height/2);
				self.dispatchEvent(event);
				draw();
			}
		});

		function draw() {
			ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
			ctx.beginPath();

			if (drawGrid) {
				ctx.strokeStyle = "gray";
				for (var i = -canvas.height / 2; i <= canvas.height / 2; i += canvas.height / 10) {
					ctx.moveTo(-canvas.width / 2, i);
					ctx.lineTo(canvas.width / 2, i);
					ctx.stroke();
				}

				for (var i = -canvas.width / 2; i <= canvas.width / 2; i += canvas.width / 10) {

					ctx.moveTo(i, -canvas.height / 2);
					ctx.lineTo(i, canvas.height / 2);
					ctx.stroke();
				}
				ctx.closePath();
			}

			ctx.fillStyle = "red";
			ctx.arc(point.xPixels, point.yPixels, 10, 0, 2 * Math.PI);
			ctx.fill();
			ctx.closePath();
		}
		draw();

	}

}

