var table;
var data = {};
var max_x = 0;
var min_x = 0;
var max_y = 0;
var min_y = 0;
var COLUMN = 34;
var HEIGHT = 500;

function preload() {
	table = loadTable('data/music.csv', 'csv');
}

function setup() {
	createCanvas(1000, 800);

	// format data
	for (var r = 1; r < table.getRowCount(); r++) {
		var cvalue = table.getString(r, COLUMN);
		if (cvalue in data) {
			data[cvalue] += 1;
		} else {
			data[cvalue] = 1;
		}
		max_x = cvalue;
		min_x = cvalue;
	}

	// find min/max
	for (var x in data) {
		var y = data[x];
		if (x > max_x) {
			max_x = x;
		} else if (x < min_x && x > 0) {
			min_x = x;
		}
		if (x > 0 && y > max_y) {
			max_y = y;
		} else if (x > 0 &&y < min_y) {
			min_y = y;
		}
	}
}


function draw() {
	clear();
	// draw graph lines
	for (var i = 0; i <= max_x - min_x + 5; i+=5) {
		stroke('#E5E5E5');
		line(50 + i*10, HEIGHT, 50 + i*10, HEIGHT - (max_y - min_y));
		textSize(11);
		fill('#E5E5E5');
		textAlign(CENTER);
		text(parseInt(min_x) + i, 45 + i*10, HEIGHT + 10);
	}

	for (var i = 0; i <= max_y - min_y; i+= 50) {
		stroke('#E5E5E5');
		line(50, HEIGHT - i, (max_x - min_x + 6)*10, HEIGHT - i);
		textSize(11);
		fill('#E5E5E5');
		textAlign(RIGHT);
		text(parseInt(min_y) + i, 45, HEIGHT - i, 5);
	}

	// axis labels
	fill('#667272');
	textAlign(CENTER);
	text("count", 45, HEIGHT - max_y);

	fill('#667272');
	textAlign(CENTER);
	text(table.getString(0, COLUMN), 45, HEIGHT + 25, (max_x - min_x + 6)*10);

	// draw lines
	var previous_x = min_x;
	var previous_y = min_y;
	for(var x in data) {
		var y = data[x];
		if (x > 0) {
			stroke('#5FA0C6');
			line((x - min_x)*10 + 50, HEIGHT - (y - min_y), (previous_x - min_x)*10 + 50, HEIGHT - (previous_y - min_y));

			if(mouseX >= (x - min_x)*10 + 50 - 5 && mouseX <= (x - min_x)*10 + 50 + 5 && mouseY >= HEIGHT - (y - min_y) - 5 && mouseY <= HEIGHT - (y - min_y) + 5) {
				noStroke();
				fill('#5FA0C6');
				ellipse((x - min_x)*10 + 50, HEIGHT - (y - min_y), 5, 5);
				textSize(11);
				fill('#2E4E60');
				textAlign(CENTER);
				text("year: " + x + ", " + y + " records", (x - min_x)*10 + 50, HEIGHT - 10 - (y - min_y));
			}
			previous_x = x;
			previous_y = y;
		}
	}

	// draw title
	fill('#11100E');
	textAlign(CENTER);
	textSize(32);
	text('Number of Records over Time', ((max_x - min_x + 6)*10)/2, 50);

}