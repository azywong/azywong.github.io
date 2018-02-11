var table;
var tableObject;
var data = {};

function preload() {
	table = loadTable('music.csv', 'csv', 'header');
}

function setup() {
	createCanvas(1000, 800);
	tableObject = table.getObject();

	// format data
	for (var key in tableObject) {
		var song = tableObject[key];
		var terms = song.terms;
		if (terms in data) {
			data[terms] += 1;
		} else {
			data[terms] = 1;
		}
	};

	// find range
	var max_value = 0;
	var number_entries = 10;
	for (var genre in data) {
		if (data[genre] > max_value) {
			max_value = data[genre];
		}
	}

	// make scale
	for(var i = 0; i <= max_value + 40; i += 40) {
		stroke('#E5E5E5');
		line(50, 600-i, 78*(number_entries + 1), 600-i);
		textSize(11);
		fill('#E5E5E5');
		textAlign(RIGHT);
		text(i, 45, 600-i);
	}

}

function draw() {

	// draw bars
	var x = 50;
	var count = 0;
	for (var genre in data) {
		var total = data[genre];
		if (count < 10) {
			noStroke();
			fill('#5FA0C6');
			rect(x, 600-(total), 75, total);
			if(mouseX >= x && mouseX <= x+75 && mouseY >= 600-(total) && mouseY <= 600) {
				textSize(11);
				fill('#2E4E60');
				textAlign(CENTER);
				text(total, x, 600-total/2, 75);
			}
			textSize(11);
			fill('#11100E');
			textAlign(CENTER);
			text(genre, x, 615, 75);
			x += 78;
		} else {
			break;
		}
		count++;
	}

	// draw title
	fill('#11100E');
	textAlign(CENTER);
	textSize(32);
	text('various music genres by count of songs', 0, 50, x);

}