var data = {};
var vertices = [];
var WIDTH = 1000;
var HEIGHT = 1000;
var	AREA = WIDTH * HEIGHT;
var K;
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
				if (!vertices.includes(v1)) {
					vertices.push(v1);
				} if (!vertices.includes(v2)) {
					vertices.push(v2);
				}
			}
		};
	}
	vertices.sort(sortNum);
}

function inputHandler(r) {
	var re = new RegExp('(\\d+\.edges)');
	for (var i = inputDir.length - 1; i >= 0; i--) {
		if (inputDir[i].search(re)) {
			var file = inputDir[i].match(re);
			if (file !== null) {
				var result = loadStrings("data/facebook/" + file[0], fileHandler);
				data[file[0]] = result;
			}
		}
	};
}

function fileHandler(r) {

}

function draw () {
	clear();
	var min = vertices[0];
	var max = vertices[vertices.length - 1];
	for (var key in data) {
		for (var i = 0; i < key.length; i++) {
			var v1 = vertices.indexOf(data[key][i][0]);
			var v2 = vertices.indexOf(data[key][i][1]);
			var c1 = Math.floor(map(v1, min, max, 0, WIDTH));
			var c2 = Math.floor(map(v2, min, max, 0, HEIGHT));
			var scale = Math.ceil(map(1, min, max, 0, WIDTH));

			fill(95, 160, 198, 125);
			noStroke();
			rect(c1, c2, scale, scale);
		};

		if(mouseX >= c1 - 1 && mouseX <= c1 + scale + 1 && mouseY >= c2 - 1 && mouseY <= c2 + scale + 1) {
			textSize(11);
			fill('#2E4E60');
			textAlign(CENTER);
			text( data[key][i][0] + ", " + data[key][i][1], c1, c2 + 10);
		}
	}
}

function sortNum(a,b) {
    return a - b;
}