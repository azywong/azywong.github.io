var edges = [];
var vertices = {};
var WIDTH = 800;
var HEIGHT = 800;
var	AREA = WIDTH * HEIGHT;
var K;
var ITERATIONS = 5;
var inputDir;
var TEMPERATURE = 25;
var SIZE = 5;

function preload() {
	inputDir = loadStrings('data/facebook/', inputHandler);
}

function setup() {
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

	for (var j = 0; j < ITERATIONS; j++) {
			calculateRepulsion();
			calculateAttraction();
			limitMaxTemp();
			TEMPERATURE -= 1;
	};
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
	clear();
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
			text(v, x, y-15);
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
		var vdisp = 0;
		for(var u in vertices) {
			if (u != v) {
				var delta = dist(vertices[v][0], vertices[v][1], vertices[u][0], vertices[u][1]);
				vdisp = vdisp + (delta/Math.abs(delta)) * fRepulsion(Math.abs(delta));
			}
		}
		vertices[v][2] = vdisp;
		// if (!vertices[v][2] || !(vertices[v][0] && vertices[v][1])) {
		// 	console.log("================================");
		// 	console.log("vertices[v][0] " + vertices[v][0]);
		// 	console.log("vertices[v][1] " + vertices[v][1]);
		// 	console.log("vertices[v][2] " + vertices[v][2]);
		// 	console.log("================================");
		// }
	}
}

function calculateAttraction () {
	for (var i = 0; i < edges.length; i++) {
		var vKey = edges[i][0];
		var uKey = edges[i][1];
		var v = vertices[vKey];
		var u = vertices[uKey];
		var delta = dist(v[0], v[1], u[0], u[1]);
		var vdisp = vertices[vKey][2] - (delta/Math.abs(delta)) * (fAttraction(Math.abs(delta)));
		var udisp = vertices[uKey][2] + (delta/Math.abs(delta)) * (fAttraction(Math.abs(delta)));;
		vertices[vKey][2] = vdisp;
		vertices[uKey][2] = udisp;
		// if (!vertices[vKey][2] || !vertices[uKey][2]) {
		// 	console.log("vertices[vKey][2] or vertices[uKey][2] was NaN");
		// 	console.log("vertices[vKey] " + vertices[vKey]);
		// 	console.log("vertices[uKey] " + vertices[uKey]);
		// 	console.log("delta " + delta);
		// 	console.log("vdisp " + vdisp);
		// 	console.log("udisp " + udisp);
		// 	console.log("vertices[vKey][2] " + vertices[vKey][2]);
		// 	console.log("vertices[uKey][2] " + vertices[uKey][2]);
		// }
	}
}

function limitMaxTemp() {
	for(var v in vertices) {
		var temp0 = vertices[v][0] + (vertices[v][2]/Math.abs(vertices[v][2])) * min(vertices[v][2], TEMPERATURE);
		var temp1 = vertices[v][1] + (vertices[v][2]/Math.abs(vertices[v][2])) * min(vertices[v][2], TEMPERATURE);
		vertices[v][0] = min(WIDTH, vertices[v][0]) ? min(WIDTH, vertices[v][0]) : WIDTH;
		vertices[v][1] = min(HEIGHT, vertices[v][1]) ? min(HEIGHT, vertices[v][1]) : HEIGHT;
		// if (!vertices[v][0] || !vertices[v][1]) {
		// 	console.log("vertices[v][0] or vertices[v][1] was NaN");
		// 	console.log("vertices[v][0] " + vertices[v][0]);
		// 	console.log("vertices[v][1] " + vertices[v][1]);
		// }
	}
}