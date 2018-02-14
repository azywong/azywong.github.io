var table;
var data = {};
var maxX; //hotness
var minX;
var maxY; //tempo
var minY;
var maxZ; //loudness
var minZ;
// index of the column to use
var XCOLUMN = 23;  //hotness
var YCOLUMN = 28;  //tempo
var ZCOLUMN = 17;  //loudness
var NCOLUMN = 21; //name
var FCOLUMN = 29; // filtering by this column
var FILTER = "hip hop";  // filtering by this value in FCOLUMN
var CHARTWIDTH = 750;
var CHARTHEIGHT = 500;

function preload() {
	table = loadTable('data/music.csv', 'csv');
}

function setup() {
	createCanvas(1000, 800);

	// find ranges
	for (var r = 1; r < table.getRowCount(); r++) {
		var xValue = parseFloat(table.getString(r, XCOLUMN));
		var yValue = parseFloat(table.getString(r, YCOLUMN));
		var zValue = parseFloat(table.getString(r, ZCOLUMN));
		var fValue = table.getString(r, FCOLUMN)
		if (fValue == FILTER) {
			if (r == 1) {
				maxX = xValue;
				minX = xValue;
				maxY = yValue;
				minY = yValue;
				maxZ = zValue;
				minZ = zValue;
			} else {
				if (maxX < xValue) {
					maxX = xValue;
				} if (minX > xValue) {
					minX = xValue;
				} if (yValue > maxY) {
					maxY = yValue;
				} if (yValue < minY) {
					minY = yValue;
				} if (zValue > maxZ) {
					maxZ = zValue;
				} if (zValue < minZ) {
					minZ = zValue;
				}
			}
		}
	}
}

function draw () {
	clear();
	// draw graph lines
	for (var i = 0; i <= maxX - minX + 0.1; i += 0.1) {
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
		text(Math.floor(minY) + i, 45, CHARTHEIGHT - i*2, 5);
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
		var nValue = table.getString(r, NCOLUMN);
		var xValue = parseFloat(table.getString(r, XCOLUMN));
		var yValue = parseFloat(table.getString(r, YCOLUMN));
		var zValue = parseFloat(table.getString(r, ZCOLUMN));
		var fValue = table.getString(r, FCOLUMN);
		if (fValue == FILTER) {
			var x =  50 + ((xValue - minX) * CHARTWIDTH);
			var y = CHARTHEIGHT - ((yValue - minY) * 2);
			var size = Math.abs((zValue - minZ)/2) + 3;
			noStroke();
			fill(95, 160, 198, 125);
			ellipse(x, y, size, size);
			var d = dist(mouseX, mouseY, x, y);
			if (d < size) {
				noStroke();
				fill('#2E4E60');
				ellipse(x, y, size, size);
				textSize(11);
				fill('#2E4E60');
				textAlign(CENTER);
				text(name + "\n" + table.getString(0, XCOLUMN) + ": " + xValue + "\n" + table.getString(0, YCOLUMN) +": " + yValue + "\n" + table.getString(0, ZCOLUMN) + ": " + zValue, x, y-50);
			}
		}
	}

	//draw key
	fill('#11100E');
	textAlign(LEFT);
	textSize(11);
	text(table.getString(0, ZCOLUMN), (150 + (maxX - minX)*CHARTWIDTH), 50);

	for (var i = 0; i < 5; i++) {
		var size = Math.abs((i*((maxZ - minZ)/4))/2) + 3;
		var x = 150 + (maxX - minX)*CHARTWIDTH;
		var y = 50 + 25*(i+1);
		noStroke();
		fill(95, 160, 198, 125);
		ellipse(x, y, size, size);
		fill('#2E4E60');
		textAlign(LEFT);
		textSize(11);
		text((minZ + Math.abs(i*(maxZ - minZ)/4)).toFixed(3) , x + 50, y);

	};

	// draw title
	fill('#11100E');
	textAlign(CENTER);
	textSize(32);
	text('Song Hotness vs Tempo for all Hip Hop Songs', (50 + (maxX - minX)*CHARTWIDTH)/2, 50);
}