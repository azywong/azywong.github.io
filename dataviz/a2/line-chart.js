var table;
var tableObject;
var data = {};
var max_x = 0;
var min_x = 0;
var max_y = 0;
var min_y = 0;

function preload() {
	table = loadTable('music.csv', 'csv', 'header');
}

function setup() {
	createCanvas(1000, 800);
	tableObject = table.getObject();

	// format data
	for (var key in tableObject) {
		var x = tableObject[key].year;
		if (x in data) {
			data[x] += 1;
		} else {
			data[x] = 1;
		}
		max_x = x;
		min_x = x;
	}

	// find min/max
	for (var x in data) {
		var y = data[x];
		if (x > max_x) {
			max_x = x;
		} else if (x < min_x && x > 0) {
			min_x = x;
		}
		if (y > max_y) {
			max_y = y;
		} else if (y < min_y) {
			min_y = y;
		}
	}
}


function draw() {
	clear();
	// draw graph lines
	for (var i = 0; i <= max_x - min_x + 5; i+=5) {
		stroke('#E5E5E5');
		line(50 + i*10, 500, 50 + i*10, 500 - (max_y - min_y));
		textSize(11);
		fill('#E5E5E5');
		textAlign(CENTER);
		text(parseInt(min_x) + i, 45 + i*10, 510);
	}


	for (var i = 0; i <= max_y - min_y; i+= 50) {
		stroke('#E5E5E5');
		line(50, 500 - i, (max_x - min_x + 6)*10, 500 - i);
		textSize(11);
		fill('#E5E5E5');
		textAlign(RIGHT);
		text(parseInt(min_y) + i, 45, 500 - i, 5);
	}

	// axis labels
	fill('#667272');
	textAlign(CENTER);
	text("# records", 45, 45);

	fill('#667272');
	textAlign(CENTER);
	text("time in years", 45, 525, (max_x - min_x + 6)*10);

	// draw lines
	var previous_x = min_x;
	var previous_y = min_y;
	for(var x in data) {
		var y = data[x];
		if (x > 0) {
			stroke('#5FA0C6');
			line((x - min_x)*10 + 50, 500 - (y - min_y), (previous_x - min_x)*10 + 50, 500 - (previous_y - min_y));

			if(mouseX >= (x - min_x)*10 + 50 - 5 && mouseX <= (x - min_x)*10 + 50 + 5 && mouseY >= 500 - (y - min_y) - 5 && mouseY <= 500 - (y - min_y) + 5) {
				noStroke();
				fill('#5FA0C6');
				ellipse((x - min_x)*10 + 50, 500 - (y - min_y), 5, 5);
				textSize(11);
				fill('#2E4E60');
				textAlign(CENTER);
				text("year: " + x + ", " + y + " records", (x - min_x)*10 + 50, 490 - (y - min_y));
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