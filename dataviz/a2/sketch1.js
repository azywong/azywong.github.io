
var x = 0;
function preload() {
	// used to preload files/etc.
	// asynch
	// set up will wait until load files is done.
}
function setup() {
	createCanvas(1000, 1000);
}

function draw() {
	noStroke();
	fill(255,165,0,125);
	ellipse(56, 46, 55, 55);
	noStroke();
	fill(130,130,130,125);
	ellipse(x, 46, 55, 55);
	x = x + 5;
	if (x > 1000) {
		x = 1;
	}

}