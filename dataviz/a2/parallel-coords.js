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
var PLOT_W = 250;
var PLOT_H = 500;
var ACOLUMN = 28; //tempo
var BCOLUMN = 17; //loudness
var CCOLUMN = 23; //hotness
var DCOLUMN = 7; //beats_confidence
var NCOLUMN = 21;

function preload() {
	table = loadTable('data/music.csv', 'csv',);
}

function setup() {
	createCanvas(1200, 800);
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
	var startingX = 50;
	var startingY = 50;
	var hover = false;
	var info = {};

	//draw lines
	for (var i = data.length - 1; i >= 0; i--) {
		startingX1 = 50;
		startingY1 = 50 + PLOT_H;
		startingX2 = 50 + PLOT_W;
		startingY2 = 50 + PLOT_H;
		startingX3 = 50 + PLOT_W*2;
		startingY3 = 50 + PLOT_H;
		var aValue = data[i].a;
		var bValue = data[i].b;
		var cValue = data[i].c;
		var dValue = data[i].d;
		var nValue = data[i].n;
		var aCoord = (aValue - minA)*(PLOT_H/(maxA - minA));
		var bCoord = (bValue - minB)*(PLOT_H/(maxB - minB));
		var cCoord = (cValue - minC)*(PLOT_H/(maxC - minC));
		var dCoord = (dValue - minD)*(PLOT_H/(maxD - minD));
		var m1 = (((startingY1-aCoord)-(startingY1 - bCoord))/((startingX1)-( startingX1 + PLOT_W)));
		var b1 = (startingY1-aCoord) - m1*startingX1;
		var m2 = (((startingY2-bCoord)-(startingY2 - cCoord))/((startingX2)-( startingX2 + PLOT_W)));
		var b2 = (startingY2-bCoord) - m2*startingX2;
		var m3 = (((startingY3-cCoord)-(startingY3 - dCoord))/((startingX3)-( startingX3 + PLOT_W)));
		var b3 = (startingY3-cCoord) - m3*startingX3;
		var d;
		if (mouseX >= startingX1 && mouseX <= startingX1 + PLOT_W) {
			d = Math.abs(mouseY - mouseX*m1 - b1);
		} else if (mouseX >= startingX2 && mouseX <= startingX2 + PLOT_W) {
			d = Math.abs(mouseY - mouseX*m2 - b2);
		} else if  (mouseX >= startingX3 && mouseX <= startingX3 + PLOT_W) {
			d = Math.abs(mouseY - mouseX*m3 - b3);
		}
		stroke(95, 160, 198, 125);
		line(startingX1, startingY1-aCoord, startingX1 + PLOT_W, startingY1 - bCoord);
		line(startingX2, startingY2-bCoord, startingX2 + PLOT_W, startingY2 - cCoord);
		line(startingX3, startingY3-cCoord, startingX3 + PLOT_W, startingY3 - dCoord);

		if (d <= 1 && d >= 0) {
			hover = true;
			info.aValue = aValue;
			info.bValue = bValue;
			info.cValue = cValue;
			info.dValue = dValue;
			info.startingX1 = startingX1;
			info.startingY1 = startingY1;
			info.startingX2 = startingX2;
			info.startingY2 = startingY2;
			info.startingX3 = startingX3;
			info.startingY3 = startingY3;
			info.aCoord = aCoord;
			info.bCoord = bCoord;
			info.cCoord = cCoord;
			info.dCoord = dCoord;
		}
	}

		// draw graph lines for each plot
	for (var i = 0; i < 4; i++) {
		if (i != 0) {
			startingX += PLOT_W;
		}
		var maxY;
		var minY;
		var yColumn;
		var yVal;

		if (i == 0) {
			maxY = maxA;
			minY = minA;
			yColumn = ACOLUMN;
			yVal = "a";
		} else if(i == 1) {
			maxY = maxB;
			minY = minB;
			yColumn = BCOLUMN;
			yVal = "b";
		}  else if(i == 2) {
			maxY = maxC;
			minY = minC;
			yColumn = CCOLUMN;
			yVal = "c";
		} else if(i == 3) {
			maxY = maxD;
			minY = minD;
			yColumn = DCOLUMN;
			yVal = "d";
		}

		// draw vertical lines
		var scale = (maxY - minY)/PLOT_H;
		stroke('#E5E5E5');
		line(startingX, startingY, startingX, startingY + PLOT_H);
		// draw scale
		textSize(11);
		fill('#E5E5E5');
		textAlign(CENTER);
		text((maxY).toFixed(2), startingX, startingY - 10);
		text((minY).toFixed(2), startingX, startingY + PLOT_H + 10);

		// // draw dots
		// for(var k = 0; k < data.length; k++) {
		// 	var xCoord = (data[k][xVal] - minX)*(PLOT_D/(maxX-minX)) + startingX;
		// 	var yCoord = baselineY - (data[k][yVal] - minY)*(PLOT_D/(maxY-minY));
		// 	noStroke();
		// 	fill(95, 160, 198, 125);
		// 	ellipse(xCoord, yCoord, 5, 5);
		// 	var d = dist(mouseX, mouseY, xCoord, yCoord);
		// 	if (d < 5) {
		// 		noStroke();
		// 		fill('#2E4E60');
		// 		ellipse(xCoord, yCoord, 5, 5);
		// 		textSize(11);
		// 		fill('#2E4E60');
		// 		textAlign(CENTER);
		// 		text(data[k].n + "\n" + table.getString(0, xColumn) + ": " + data[k][xVal] + "\n" + table.getString(0, yColumn) + data[k][yVal], xCoord, yCoord - 20, 75);
		// 	}
		// }
		// title
		fill('#E5E5E5');
		textSize(11);
		textAlign(CENTER);
		text(table.getString(0, yColumn), startingX, startingY - 25);
	}

	if (hover) {
		drawSLine(info)
	}

}

function drawSLine (info) {
	stroke('#2E4E60');
	textSize(11);
	fill('#2E4E60');
	textAlign(LEFT);
	text(table.getString(0, ACOLUMN) + ": " + info.aValue + "\n" + table.getString(0, BCOLUMN) + ": " + info.bValue + "\n" + table.getString(0, CCOLUMN) + ": " + info.cValue + "\n" + table.getString(0, DCOLUMN) + ": " + info.dValue + "\n", info.startingX3 + PLOT_W + 10, info.startingY3 - info.dCoord);
	line(info.startingX1, info.startingY1-info.aCoord, info.startingX1 + PLOT_W, info.startingY1 - info.bCoord);
	line(info.startingX2, info.startingY2-info.bCoord, info.startingX2 + PLOT_W, info.startingY2 - info.cCoord);
	line(info.startingX3, info.startingY3-info.cCoord, info.startingX3 + PLOT_W, info.startingY3 - info.dCoord);
}