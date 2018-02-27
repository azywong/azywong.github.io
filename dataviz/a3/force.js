var edges = [];
var vertices = {};
// vertices[v][0] = x coord
// vertices[v][1] = y coord
// vertices[v][2] = x disp
// vertices[v][3] = y disp
var WIDTH = 800;
var HEIGHT = 800;
var	AREA = WIDTH * HEIGHT;
var K;
var ITERATIONS = 1;
var inputDir;
var TEMPERATURE = WIDTH/10;
var SIZE = 10;

function preload() {
	inputDir = loadStrings('data/facebook/3980.edges');
}

function setup() {
	fileHandler(inputDir);
	createCanvas(1000, 1000);

	for(var e in edges) {
		if (edges[e]) {
			var v1 = edges[e][0];
			var v2 = edges[e][1];
			if (!vertices[v1]) {
				vertices[v1] = [];
			} if (!vertices[v2]) {
				vertices[v2] = [];
			}
		}
	}

	K = Math.sqrt(AREA/Object.keys(vertices).length);

	assignRandom();
}

function inputHandler(inputDir) {
	var re = new RegExp('(\\d+\.edges)');
	for (var i = inputDir.length - 1; i >= 0; i--) {
		if (inputDir[i].search(re)) {
			var file = inputDir[i].match(re);
			if (file !== null) {
				loadStrings("data/facebook/" + file[0], fileHandler);
			}
		}
	};
}

function fileHandler(r) {
	for (var i = 0; i < r.length; i++) {
		var stringData = r[i].split(" ");
		edges.push([parseInt(stringData[0]), parseInt(stringData[1])]);
	};
}

function draw () {

	for (var j = 0; j < ITERATIONS; j++) {
		clear();
		calculateRepulsion();
		calculateAttraction();
		limitMaxDisp();
		TEMPERATURE = TEMPERATURE/5;
		for (var e in edges) {
			x1 = vertices[edges[e][0]][0];
			y1 = vertices[edges[e][0]][1];
			x2 = vertices[edges[e][1]][0];
			y2 = vertices[edges[e][1]][1];
			stroke('#e5e5e5');
			line(x1, y1, x2, y2);
		}
		for (var v in vertices) {
			var x = vertices[v][0];
			var y = vertices[v][1];
			var d = dist(mouseX, mouseY, x, y);
			if (d < SIZE) {
				for (var e in edges) {
					if (edges[e][0] == v || edges[e][1] == v ) {
						x1 = vertices[edges[e][0]][0];
						y1 = vertices[edges[e][0]][1];
						x2 = vertices[edges[e][1]][0];
						y2 = vertices[edges[e][1]][1];
						stroke(95, 160, 198, 125);
						line(x1, y1, x2, y2);
					}
				}
				noStroke();
				fill('#2E4E60');
				ellipse(x, y, SIZE, SIZE);
				textSize(11);
				fill('#11100E');
				textAlign(CENTER);
				text(v, x, y+15);
			} else {
				fill(95, 160, 198, 125);
				noStroke();
				ellipse(x, y, SIZE, SIZE);
			}
		}
	// for (var e in edges) {
	// 	v1 = edges[e][0];
	// 	v2 = edges[e][1];
	// 	x1 = vertices[v1][0];
	// 	y1 = vertices[v1][1];
	// 	x2 = vertices[v2][0];
	// 	y2 = vertices[v2][1];
	// 	stroke(95, 160, 198, 125);
	// 	line(x1, y1, x2, y2);
	// }
	};

}

function assignRandom() {
	for (var v in vertices) {
		vertices[v] = [Math.floor(Math.random() * WIDTH),Math.floor(Math.random() * HEIGHT)];
		// if (!vertices[v][0] || !vertices[v][1]) {
		// 	console.log("===================================");
		// 	console.log("vertices[v][0] " + vertices[v][0]);
		// 	console.log("vertices[v][1] " + vertices[v][1]);
		// 	console.log("===================================");
		// }
	};
}

function fAttraction(x) {
	return x*x/K;
}

function fRepulsion(x) {
	return K*K/x;
}

function sortNum(a,b) {
    return a - b;
}

function calculateRepulsion() {
	for(var v in vertices) {
		var vdispX = 0;
		var vdispY = 0;
		for(var u in vertices) {
			if (u !== v) {
				var deltaX = vertices[v][0] - vertices[u][0];
				var deltaY = vertices[v][1] - vertices[u][1];
				if (deltaX !== 0) {
					vdispX = vdispX + (deltaX/Math.abs(deltaX)) * fRepulsion(Math.abs(deltaX));
				} if (deltaY !== 0) {
					vdispY = vdispY + (deltaY/Math.abs(deltaY)) * fRepulsion(Math.abs(deltaY));
				}
			}
		}
		vertices[v][2] = vdispX;
		vertices[v][3] = vdispY;
		// if (!vertices[v][2] || !(vertices[v][0] && vertices[v][1])) {
		// 	console.log("================================");
		// 	console.log("vertices[v][0] " + vertices[v][0]);
		// 	console.log("vertices[v][1] " + vertices[v][1]);
		// 	console.log("vertices[v][2] " + vertices[v][2]);
		// 	console.log("vertices[v][3] " + vertices[v][3]);
		// 	console.log("================================");
		// }
	}
}

function calculateAttraction () {
	for (var i = 0; i < edges.length; i++) {
		var v = edges[i][0];
		var u = edges[i][1];
		var deltaX = vertices[v][0] - vertices[u][0]
		var deltaY = vertices[v][1] - vertices[u][1]
		if (deltaX !== 0) {
			vertices[v][2] = vertices[v][2] - ((deltaX/Math.abs(deltaX)) * (fAttraction(Math.abs(deltaX))));
			vertices[u][2]= vertices[u][2] + ((deltaX/Math.abs(deltaX)) * (fAttraction(Math.abs(deltaX))));
		} if (deltaY !== 0) {
			vertices[v][3] = vertices[v][3] - ((deltaY/Math.abs(deltaY)) * (fAttraction(Math.abs(deltaY))));
			vertices[u][3] = vertices[u][3] + ((deltaY/Math.abs(deltaY)) * (fAttraction(Math.abs(deltaY))));
		}
	}
}

function limitMaxDisp() {
	for(var v in vertices) {
		// if disp is not 0
		if (vertices[v][2] !== 0) {
			//algorithm: v.pos := v.pos + (v.disp/|v.disp|) ∗ min(v.disp, t);
			var v0 = vertices[v][0] + ((vertices[v][2]/Math.abs(vertices[v][2])) * min(vertices[v][2], TEMPERATURE));
			var x = min(WIDTH, max(1, v0));
			vertices[v][0] = x;
		} if (vertices[v][3] !== 0) {
			var v1 = vertices[v][1] + (vertices[v][3]/Math.abs(vertices[v][3])) * min(vertices[v][3], TEMPERATURE);
			var y = min(HEIGHT, max(1, v1));
			vertices[v][1] = y;
		}
	}
}