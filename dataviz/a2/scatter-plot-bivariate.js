var table;
var maxX;
var minX;
var maxY;
var minY;

var XCOLUMN = 23; //hotness
var YCOLUMN = 28; //tempo
var NCOLUMN = 21; //name
var CHARTHEIGHT = 600;
var CHARTWIDTH = 750;

function preload() {
	table = loadTable('data/music.csv', 'csv');
}

function setup() {
	createCanvas(1000, 800);

	// format data and find ranges
	for (var r = 1; r < table.getRowCount(); r++) {
		var xValue = parseFloat(table.getString(r, XCOLUMN));
		var yValue = parseFloat(table.getString(r, YCOLUMN));
		if (r == 1) {
			maxX = xValue;
			minX = xValue;
			maxY = yValue;
			minY = yValue;
		} else {
			if (xValue > maxX) {
				maxX = xValue;
			} if (xValue < minX) {
				minX = xValue;
			} if (yValue > maxY) {
				maxY = yValue;
			} if (yValue < minY) {
				minY = yValue;
			}
		}
	}
}

function draw () {
	clear();
	// draw graph lines
	for (var i = 0; i <= maxX - minX; i += 0.1) {
		stroke('#E5E5E5');
		line(50 + (i*CHARTWIDTH), CHARTHEIGHT, 50 + (i*CHARTWIDTH), CHARTHEIGHT - 20 - (2*(maxY - minY)));
		textSize(11);
		fill('#E5E5E5');
		textAlign(CENTER);
		text(i.toFixed(2), 45 + i*CHARTWIDTH, CHARTHEIGHT + 10);
	}

	for (var i = 0; i <= maxY - minY; i+= 20) {
		stroke('#E5E5E5');
		line(50, CHARTHEIGHT - i*2, (maxX - minX + 0.1)*CHARTWIDTH, CHARTHEIGHT - i*2);
		textSize(11);
		fill('#E5E5E5');
		textAlign(RIGHT);
		text(minY + i, 45, CHARTHEIGHT - i*2, 5);
	}

	// axis labels
	fill('#667272');
	textAlign(CENTER);
	text(table.getString(0, YCOLUMN), 45, 100);

	fill('#667272');
	textAlign(CENTER);
	text(table.getString(0, XCOLUMN), 45, CHARTHEIGHT + 25, (maxX - minX)*CHARTWIDTH);

	//draw points

	for (var r = 1; r < table.getRowCount(); r++) {
		var xValue = table.getString(r, XCOLUMN);
		var yValue = table.getString(r, YCOLUMN);
		var nValue = table.getString(r, NCOLUMN);
		var x =  50 + ((xValue - minX) * CHARTWIDTH);
		var y = CHARTHEIGHT - ((yValue - minY) * 2);
		noStroke();
		fill(95, 160, 198, 125);
		ellipse(x, y, 5, 5);
		var d = dist(mouseX, mouseY, x, y);
		if (d <= 5) {
			noStroke();
			fill('#2E4E60');
			ellipse(x, y, 5, 5);
			textSize(11);
			fill('#2E4E60');
			textAlign(CENTER);
			text(nValue + "\n" + table.getString(0,XCOLUMN) + ": " + xValue + "\n" + table.getString(0, YCOLUMN) +": " + yValue, x, y-40);
		}
	}


	// draw title
	fill('#11100E');
	textAlign(CENTER);
	textSize(32);
	text('Song Hotness vs Tempo', (50 + (maxX - minX)*CHARTWIDTH)/2, 50);
}