var table;
var data = [];
var maxA;
var minA;
var maxB;
var minB;
var maxC;
var minC;
var maxD;
var minD;
var PLOT_D = 250; // plot dimensions
// index of the column to use
var ACOLUMN = 28; //tempo
var BCOLUMN = 17; //loudness
var CCOLUMN = 23; //hotness
var DCOLUMN = 7; //beats_confidence
var NCOLUMN = 21; // name for annotation

function preload() {
	table = loadTable('data/music.csv', 'csv',);
}

function setup() {
	createCanvas(1500, 1500);
	// find ranges
	for (var r = 1; r < table.getRowCount(); r++) {
		var aValue = parseFloat(table.getString(r, ACOLUMN));
		var bValue = parseFloat(table.getString(r, BCOLUMN));
		var cValue = parseFloat(table.getString(r, CCOLUMN));
		var dValue = parseFloat(table.getString(r, DCOLUMN));
		var nValue = table.getString(r, NCOLUMN);
		if (r == 1) {
			maxA = aValue;
			minA = aValue;
			maxB = bValue;
			minB = bValue;
			maxC = cValue;
			minC = cValue;
			maxD = dValue;
			minD = dValue;
		} else {
			if (maxA < aValue) {
				maxA = aValue;
			} if (minA > aValue) {
				minA = aValue;
			} if (maxB < bValue) {
				maxB = bValue;
			} if (minB > bValue) {
				minB = bValue;
			} if (maxC < cValue) {
				maxC = cValue;
			} if (minC > cValue) {
				minC = cValue;
			} if (maxD < dValue) {
				maxD = dValue;
			} if (minD > dValue) {
				minD = dValue;
			}
		}
		var song = {
			a: aValue,
			b: bValue,
			c: cValue,
			d: dValue,
			n: nValue
		}
		data.push(song);
	}
}

function draw() {
	clear();
	var selected = false;
	var selectedElement = null;
	var startingX = 50;
	var startingY = 50;
	// draw graph lines for each plot
	for (var i = 0; i < 16; i++) {
		if (i == 0) {
			//values already set
		} else if (i % 4 == 0) {
			startingY += PLOT_D;
			startingX = 50;
		} else {
			startingX += PLOT_D;
		}
		var maxX;
		var minX;
		var maxY;
		var minY;
		var xColumn;
		var yColumn;
		var xVal;
		var yVal;

		if (i == 0) {
			maxX = maxA;
			minX = minA;
			maxY = maxA;
			minY = minA;
			xColumn = ACOLUMN;
			yColumn = ACOLUMN;
			xVal = "a";
			yVal = "a";
		} else if(i == 1) {
			maxX = maxB;
			minX = minB;
			maxY = maxA;
			minY = minA;
			xVal = "b";
			yVal = "a";
			xColumn = BCOLUMN;
			yColumn = ACOLUMN;
		}  else if(i == 2) {
			maxX = maxC;
			minX = minC;
			maxY = maxA;
			minY = minA;
			Column = CCOLUMN;
			yColumn = ACOLUMN;
			xVal = "c";
			yVal = "a";
		} else if(i == 3) {
			maxX = maxD;
			minX = minD;
			maxY = maxA;
			minY = minA;
			xColumn = DCOLUMN;
			yColumn = ACOLUMN;
			xVal = "d";
			yVal = "a";
		} else if(i == 4) {
			maxX = maxA;
			minX = minA;
			maxY = maxB;
			minY = minB;
			xColumn = ACOLUMN;
			yColumn = BCOLUMN;
			xVal = "a";
			yVal = "b";
		} else if(i == 5) {
			maxX = maxB;
			minX = minB;
			maxY = maxB;
			minY = minB;
			xColumn = BCOLUMN;
			yColumn = BCOLUMN;
			xVal = "b";
			yVal = "b";
		} else if(i == 6) {
			maxX = maxC;
			minX = minC;
			maxY = maxB;
			minY = minB;
			xColumn = CCOLUMN;
			yColumn = BCOLUMN;
			xVal = "c";
			yVal = "b";
		} else if(i == 7) {
			maxX = maxD;
			minX = minD;
			maxY = maxB;
			minY = minB;
			xColumn = DCOLUMN;
			yColumn = BCOLUMN;
			xVal = "d";
			yVal = "b";
		} else if(i == 8) {
			maxX = maxA;
			minX = minA;
			maxY = maxC;
			minY = minC;
			xColumn = ACOLUMN;
			yColumn = CCOLUMN;
			xVal = "a";
			yVal = "c";
		} else if(i == 9) {
			maxX = maxB;
			minX = minB;
			maxY = maxC;
			minY = minC;
			xColumn = BCOLUMN;
			yColumn = CCOLUMN;
			xVal = "b";
			yVal = "c";
		} else if(i == 10) {
			maxX = maxC;
			minX = minC;
			maxY = maxC;
			minY = minC;
			xColumn = CCOLUMN;
			yColumn = CCOLUMN;
			xVal = "c";
			yVal = "c";
		} else if(i == 11) {
			maxX = maxD;
			minX = minD;
			maxY = maxC;
			minY = minC;
			xColumn = DCOLUMN;
			yColumn = CCOLUMN;
			xVal = "d";
			yVal = "c";
		} else if(i == 12) {
			maxX = maxA;
			minX = minA;
			maxY = maxD;
			minY = minD;
			xColumn = ACOLUMN;
			yColumn = DCOLUMN;
			xVal = "a";
			yVal = "d";
		} else if(i == 13) {
			maxX = maxB;
			minX = minB;
			maxY = maxD;
			minY = minD;
			xColumn = BCOLUMN;
			yColumn = DCOLUMN;
			xVal = "b";
			yVal = "d";
		} else if(i == 14) {
			maxX = maxC;
			minX = minC;
			maxY = maxD;
			minY = minD;
			xColumn = CCOLUMN;
			yColumn = DCOLUMN;
			xVal = "c";
			yVal = "d";
		} else if(i == 15) {
			maxX = maxD;
			minX = minD;
			maxY = maxD;
			minY = minD;
			xColumn = DCOLUMN;
			yColumn = DCOLUMN;
			xVal = "d";
			yVal = "d";
		}

		// draw horizontal lines
		var yScale = (maxY - minY)/PLOT_D;
		var baselineY = startingY + PLOT_D;
		for (var j = 0; j <= PLOT_D + 20 ; j+= 25) {
			if(j == 0 || j == PLOT_D) {
				stroke('#667272');
			} else {
				stroke('#E5E5E5');
			}
			line(startingX, baselineY - j, startingX + PLOT_D, baselineY - j);
			if (i % 4 == 0){
				textSize(11);
				fill('#E5E5E5');
				textAlign(RIGHT);
				text((minY + j*yScale).toFixed(2), startingX - 25, baselineY - j, 25);
			}
		}

		// draw vertical lines
		var xScale = (maxX - minX)/PLOT_D;
		for (var j = 0; j <= PLOT_D + 20; j+= 25) {
			if(j == 0 || j == PLOT_D) {
				stroke('#667272');
			} else {
				stroke('#E5E5E5');
			}
			line(startingX + j, baselineY, startingX + j, baselineY - PLOT_D);
			if (i > 11) {
				textSize(11);
				fill('#E5E5E5');
				textAlign(CENTER);
				if (j % 50 == 0) {
					text((minX + xScale*j).toFixed(1), startingX + j, baselineY + 15, 10);
				}
			}
		}

		// draw dots
		for(var k = 0; k < data.length; k++) {
			var xCoord = (data[k][xVal] - minX)*(PLOT_D/(maxX-minX)) + startingX;
			var yCoord = baselineY - (data[k][yVal] - minY)*(PLOT_D/(maxY-minY));
			noStroke();
			fill(95, 160, 198, 125);
			ellipse(xCoord, yCoord, 5, 5);
			var d = dist(mouseX, mouseY, xCoord, yCoord);
			if (d < 5) {
				selected = true;
				selectedElement = {
					k: k,
					xCoord: xCoord,
					yCoord: yCoord,
					xVal: xVal,
					yVal: yVal,
					xColumn: xColumn,
					yColumn: yColumn
				};
			}
		}

		if ( i < 4) {
			// title
			fill('#2e4e60');
			textSize(15);
			textAlign(CENTER);
			text(table.getString(0, xColumn), startingX, startingY - 5, PLOT_D);
		}
	}
	if (selected) {
		drawSelected(selectedElement);
	};
}

function drawSelected(selectedElement) {
	noStroke();
	fill('#2E4E60');
	ellipse(selectedElement.xCoord, selectedElement.yCoord, 5, 5);
	textSize(11);
	fill('#2E4E60');
	textAlign(CENTER);
	text(data[selectedElement.k].n + "\n" + table.getString(0, selectedElement.xColumn) + ": " + data[selectedElement.k][selectedElement.xVal] + "\n" + table.getString(0, selectedElement.yColumn) + data[selectedElement.k][selectedElement.yVal], selectedElement.xCoord, selectedElement.yCoord - 20, 75);

}