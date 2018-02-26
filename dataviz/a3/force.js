var edges = [];
var vertices = {};
var WIDTH = 1000;
var HEIGHT = 1000;
var	AREA = WIDTH * HEIGHT;
var K;
var ITERATIONS = 1;
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

	for (var i = 0; i < ITERATIONS; i++) {
			calculateRepulsion();
			calculateAttraction();
			limitMaxTemp();
			TEMPERATURE -= 1;
			debugger
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
	for (var v in vertices) {
		var x = vertices[v][0];
		var y = vertices[v][1];
		fill(95, 160, 198, 125);
		noStroke();
		ellipse(x, y, SIZE, SIZE);
	}
	for (var e in edges) {
		v1 = edges[e][0];
		v2 = edges[e][1];
		x1 = vertices[v1][0];
		y1 = vertices[v1][1];
		x2 = vertices[v2][0];
		y2 = vertices[v2][1];
		stroke(95, 160, 198, 125);
		line(x1, y1, x2, y2);
	}

}

function assignRandom() {
	for (var v in vertices) {
		vertices[v] = [Math.floor(Math.random() * WIDTH),Math.floor(Math.random() * HEIGHT)];
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
				vdisp = vdisp + (delta/Math.abs(delta))*fRepulsion(Math.abs(delta));
				vertices[v][2] = vdisp;
			}
		}
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
	}
}

function limitMaxTemp() {
	for(var v in vertices) {
		vertices[v][0] = vertices[v][0] + (vertices[v][2]/Math.abs(vertices[v][2])) * min(vertices[v][2], TEMPERATURE);
		vertices[v][1] = vertices[v][1] + (vertices[v][2]/Math.abs(vertices[v][2])) * min(vertices[v][2], TEMPERATURE);
		vertices[v][0] = min(WIDTH/2, max(-WIDTH/2, vertices[v][0]));
		vertices[v][1] = min(HEIGHT/2, max(-HEIGHT/2, vertices[v][1]));
	}
}