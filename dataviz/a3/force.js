var edges = [];
var vertices = {};
var WIDTH = 1000;
var HEIGHT = 1000;
var	AREA = WIDTH * HEIGHT;
var K;
var ITERATIONS = 25;
var inputDir;

function preload() {
	inputDir = loadStrings('data/facebook/', inputHandler);
}

function setup() {
	createCanvas(1000, 1000);
	for(var key in data) {
		for (var i = 0; i < data[key].length; i++) {
			var stringData = data[key][i].split(" ");
			data[key][i] = [parseInt(stringData[0]), parseInt(stringData[1])];
			if (data[key][i]) {
				var v1 = data[key][i][0];
				var v2 = data[key][i][1];
				if (!vertices[v1]) {
					vertices[v1] = [];
				} if (!vertices[v2]) {
					vertices[v2] = [];
				}
			}
		};
	}
	K = Math.sqrt(AREA/Object.keys(vertices).length);
	assignRandom();
	for (var i = 0; i < ITERATIONS; i++) {
		calculateRepulsion();
		calculateAttraction();
	};
}

function inputHandler(r) {
	var re = new RegExp('(\\d+\.edges)');
	for (var i = inputDir.length - 1; i >= 0; i--) {
		if (inputDir[i].search(re)) {
			var file = inputDir[i].match(re);
			if (file !== null) {
				var result = loadStrings("data/facebook/" + file[0], fileHandler);
				edges.concat(result);
			}
		}
	};
}

function fileHandler(r) {

}

function draw () {

}

function assignRandom() {
	for (var v in vertices) {
		vertices[v] = [Math.floor(Math.random() * WIDTH),Math.floor(Math.random() * HEIGHT)];
	};
}

function fAttraction(x) {
	return x*x/k;
}

function fRepulsion(x) {
	return k*k/x;
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
			}
		}
	}
}

function calculateAttraction () {
	for (var i = 0; i < edges.length; i++) {
		var v = edges[i][0];
		var u = edges[i][1];
		var delta = v - u;
		var vdisp =
		var udisp =
	};
}