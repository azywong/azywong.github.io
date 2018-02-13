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
		var nValue = table.getString(r, NCOLUMN);
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
		var song = {
			x: xValue,
			y: yValue,
			c: cValue,
			n: nValue
		}
		if(cValue in data) {
			data[cValue].push(song);
		} else {
			data[cValue] = [song];
		}
	}
}

function draw() {
	clear();
	var startingX = 50;
	var startingY = 50;
	// draw graph lines for each plot
	for (var i = 0; i < Object.keys(data).length; i++) {
		if (i == 0) {
			//values already set
		} else if (i % 4 == 0) {
			startingY += PLOT_D + 100;
			startingX = 50;
		} else {
			startingX += PLOT_D + 100;
		}

		// draw horizontal lines
		var yScale = (maxY - minY)/PLOT_D;
		var baselineY = startingY + PLOT_D;
		for (var j = 0; j <= PLOT_D + 20 ; j+= 25) {
			stroke('#E5E5E5');
			line(startingX, baselineY - j, startingX + PLOT_D, baselineY - j);
			textSize(11);
			fill('#E5E5E5');
			textAlign(RIGHT);
			text((minY + j*yScale).toFixed(2), startingX - 25, baselineY - j, 25);
		}

		// draw vertical lines
		var xScale = (maxX - minX)/PLOT_D;
		for (var j = 0; j <= PLOT_D + 20; j+= 25) {
			stroke('#E5E5E5');
			line(startingX + j, baselineY, startingX + j, baselineY - PLOT_D);
			textSize(11);
			fill('#E5E5E5');
			textAlign(CENTER);
			if (j % 50 == 0) {
				text((minX + xScale*j).toFixed(1), startingX + j, baselineY + 15, 10);
			}
		}

		// axis labels
		fill('#667272');
		textAlign(CENTER);
		text(table.getString(0, YCOLUMN), startingX, startingY - 10);

		fill('#667272');
		textAlign(CENTER);
		text(table.getString(0, XCOLUMN), startingX, startingY + PLOT_D + 25, PLOT_D);

		// draw dots
		var values = data[Object.keys(data)[i]];
		for(var k = 0; k < values.length; k++) {
			var xCoord = (values[k].x - minX)*(PLOT_D/(maxX-minX)) + startingX;
			var yCoord = baselineY - (values[k].y - minY)*(PLOT_D/(maxY-minY));
			noStroke();
			fill(95, 160, 198, 125);
			ellipse(xCoord, yCoord, 5, 5);
			var d = dist(mouseX, mouseY, xCoord, yCoord);
			if (d < 5) {
				noStroke();
				fill('#2E4E60');
				ellipse(xCoord, yCoord, 5, 5);
				textSize(11);
				fill('#2E4E60');
				textAlign(CENTER);
				text(values[k].n + "\n" + table.getString(0, XCOLUMN) + ": " + values[k].x + "\n" + table.getString(0, YCOLUMN) + values[k].y, xCoord, yCoord - 20, 75);
			}
		}

		// title
		fill('#2e4e60');
		textSize(15);
		textAlign(CENTER);
		text(table.getString(0, CCOLUMN) + ": " + Object.keys(data)[i], startingX, startingY - 5, PLOT_D);
	}
}