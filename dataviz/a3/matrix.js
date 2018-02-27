var edges  = [];
var vertices = [];
var WIDTH = 800;
var HEIGHT = 800;
var inputDir;

function preload() {
	inputDir = loadStrings('data/facebook/3980.edges', fileHandler);
}

function setup() {
	createCanvas(1000, 1000);

	for(var e in edges) {
		var v1 = edges[e][0];
		var v2 = edges[e][1];
		if (!vertices.includes(v1)) {
			vertices.push(v1);
		} if (!vertices.includes(v2)) {
			vertices.push(v2);
		}
	}

	vertices.sort(sortNum);
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
	var min = vertices[0];
	var max = vertices[vertices.length - 1];
	var scale = Math.floor(map(1, 0, vertices.length - 1, 1, WIDTH, true));

	for (var key in edges) {
		var v1 = vertices.indexOf(edges[key][0]);
		var v2 = vertices.indexOf(edges[key][1]);
		var c1 = 100 + v1*scale;
		var c2 = 100 + v2*scale;
		fill('rgba(95, 160, 198, 0.5)');
		noStroke();
		rect(c1, c2, scale, scale);

		if(mouseX >= c1 - 1 && mouseX <= c1 + scale + 1 && mouseY >= c2 - 1 && mouseY <= c2 + scale + 1) {
			textSize(11);
			fill('#2E4E60');
			textAlign(LEFT);
			text(edges[key][0] + ", " + edges[key][1], c1 + scale + 3, c2 + scale/2);
			fill('#2E4E60');
			noStroke();
			rect(c1, c2, scale, scale);
		}
	}

	for (var i = 0; i < Object.keys(vertices).length; i++) {
		var v = vertices[Object.keys(vertices)[i]];
		var x = 100 + i*scale;
		var y = 100 + i*scale;
		textSize(11);
		fill('#2E4E60');
		textAlign(RIGHT, CENTER);
		text(v, 50, y, 50, scale);
	}

	translate(100 - scale, 100)
	rotate(-HALF_PI);

	for (var i = 0; i < Object.keys(vertices).length; i++) {
		var v = vertices[Object.keys(vertices)[i]];
		translate(0, scale);
		textSize(11);
		fill('#2E4E60');
		textAlign(LEFT, CENTER);
		text(v, 0, 0, 50, scale);
	}
}

function sortNum(a,b) {
    return a - b;
}