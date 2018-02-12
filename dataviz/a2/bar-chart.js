var table;
var tableObject;
var data = {};
var number_entries;
var max_value;
var HEIGHT = 600;
var COLUMN = 29;

function preload() {
	table = loadTable('data/music.csv', 'csv');
}

function setup() {
	createCanvas(1000, 800);
	tableObject = table.getObject();

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

	// make scale
	for(var i = 0; i <= max_value + 40; i += 40) {
		stroke('#E5E5E5');
		line(50, HEIGHT-i, 78*(number_entries + 1), HEIGHT-i);
		textSize(11);
		fill('#E5E5E5');
		textAlign(RIGHT);
		text(i, 45, HEIGHT-i);
	}

	// draw bars
	var x = 50;
	var count = 0;
	for (var category in data) {
		var total = data[category];
		if (count < 10) {
			noStroke();
			fill('#5FA0C6');
			rect(x, HEIGHT-(total), 75, total);
			if(mouseX >= x && mouseX <= x+75 && mouseY >= HEIGHT-(total) && mouseY <= HEIGHT) {
				textSize(11);
				fill('#2E4E60');
				textAlign(CENTER);
				text(total, x, HEIGHT-total/2, 75);
			}
			textSize(11);
			fill('#2E4E60');
			textAlign(CENTER);
			text(category, x, HEIGHT + 15, 75);
			x += 78;
		} else {
			break;
		}
		count++;
	}


	// label x-axis
	textSize(15);
	fill('#E5E5E5');
	textAlign(RIGHT);
	text("count", 45, HEIGHT - max_value - 40);

	// label y-axis
	textSize(15);
	fill('#E5E5E5');
	textAlign(CENTER);
	text(table.getString(0, COLUMN), 50, HEIGHT + 50, 78*(number_entries + 1));

	// draw title
	textSize(32);
	fill('#11100E');
	text('various music genres by count of songs', 0, 50, x);
}