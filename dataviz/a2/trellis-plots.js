var table;
var tableObject;
var data = {};
var maxX; //tempo
var minX;
var maxY; //loudness
var minY;
var maxC;  //key
var minC;
var PLOT_D = 250;
var arrayC = [];
var XCOLUMN = 28;
var YCOLUMN = 17;
var CCOLUMN = 12;
var NCOLUMN = 21;

function preload() {
	table = loadTable('data/music.csv', 'csv',);
}

function setup() {
	createCanvas(1500, 1500);
	// find ranges
	for (var r = 1; r < table.getRowCount(); r++) {
		var xValue = parseFloat(table.getString(r, XCOLUMN));
		var yValue = parseFloat(table.getString(r, YCOLUMN));
		var cValue = table.getString(r, CCOLUMN);
		if (r == 1) {
			maxX = xValue;
			minX = xValue;
			maxY = yValue;
			minY = yValue;
		} else {
			if (maxX < xValue) {
				maxX = xValue;
			} if (minX > xValue) {
				minX = xValue;
			} if (yValue > maxY) {
				maxY = yValue;
			} if (yValue < minY) {
				minY = yValue;
			}
		}
		if(!arrayC.includes(cValue)) {
			arrayC.push(cValue);
		}
	}
	arrayC.sort();
}

function draw() {
	var startingX = 50;
	var startingY = 50;
	// draw graph lines for each plot
	for (var i = 0; i < arrayC.length; i++) {
		if (i == 0) {
			//values already set
		} else if (i % 4 == 0) {
			startingY += PLOT_D + 50;
			startingX = 50;
		} else {
			startingX += PLOT_D + 50;
		}

		// draw horizontal lines
		var baselineY = startingY + PLOT_D;
		for (var j = 0; j < maxY - minY; j+=5) {
			stroke('#E5E5E5');
			line(startingX, baselineY - j*5, startingX + PLOT_D, baselineY - j*5);
			textSize(11);
			fill('#E5E5E5');
			textAlign(RIGHT);
			text((minY + j).toFixed(2), startingX - 25, baselineY - j*5, 25);
		}

		// draw vertical lines
		for (var j = 0; j < maxX - minX; j+=25) {
			stroke('#E5E5E5');
			line(startingX + j, baselineY, startingX + j, baselineY - PLOT_D);
			textSize(11);
			fill('#E5E5E5');
			textAlign(CENTER);
			text(minX + j, startingX + j, baselineY + 15, 10);
		}

		// title
		fill('#2e4e60');
		textSize(15);
		textAlign(CENTER);
		text(table.getString(0, CCOLUMN) + ": " + arrayC[i], startingX, startingY - 5, PLOT_D);
	}
}