var table;
var data = {};
var number_entries;
var max_value;
var HEIGHT = 500;
var COLUMN = 29;
var WIDTH = 800;

function preload() {
	table = loadTable('data/music.csv', 'csv');
}

function setup() {
	createCanvas(1000, 800);

	for (var r = 1; r < table.getRowCount(); r++) {
		var cvalue = table.getString(r, COLUMN);
		if (cvalue in data) {
			data[cvalue] += 1;
		} else {
			data[cvalue] = 1;
		}
 	}


	// find range
	max_value = 0;
	number_entries= 10;
	for (var category in data) {
		if (data[category] > max_value) {
			max_value = data[category];
		}
	}

}

function draw() {
	clear();
	// make scale
	var scale = max_value/HEIGHT;
	for(var i = 0; i <= HEIGHT; i += 50) {
		stroke('#E5E5E5');
		line(50, i + 50, WIDTH + 50, i + 50);
		textSize(11);
		fill('#E5E5E5');
		textAlign(RIGHT);
		text(Math.floor(max_value - i*scale).toFixed(2), 45, i + 50);
	}

	// draw bars
	var x = 50;
	var bar_width = Math.floor(WIDTH/Object.keys(data).length);
	if (bar_width > 2) {
		bar_width -= 1;
	}
	var count = 0;
	for (var category in data) {
		var total = data[category];
		var y = total/max_value*HEIGHT;
		if (y > 600) {
			print(category + " " + y);
		}
		noStroke();
		fill('#5FA0C6');
		rect(x, HEIGHT + 50 - y, bar_width, y);
		if(mouseX >= x && mouseX <= x+bar_width && mouseY >= HEIGHT + 50 - y && mouseY <= HEIGHT + 50) {
			textSize(11);
			fill('#2E4E60');
			textAlign(CENTER);
			text(category + "\n" + total, x, HEIGHT + 50 - y - 20, bar_width);
		}
		if (bar_width > 10) {
			textSize(11);
			fill('#2E4E60');
			textAlign(CENTER);
			text(category, x, HEIGHT + 50 + 15, bar_width);
		}
		x += bar_width + 1;
		count++;
	}


	// label x-axis
	textSize(15);
	fill('#E5E5E5');
	textAlign(RIGHT);
	text("count", 45, 35);

	// label y-axis
	textSize(15);
	fill('#E5E5E5');
	textAlign(CENTER);
	text(table.getString(0, COLUMN), 50, HEIGHT + 100, WIDTH);

	// draw title
	textSize(32);
	fill('#11100E');
	text('various music genres by count of songs', 0, 25, x);
}