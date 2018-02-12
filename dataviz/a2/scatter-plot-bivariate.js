var table;
var tableObject;
var data = {};
var maxHotness;
var minHotness;
var maxTempo;
var minTempo;

function preload() {
	table = loadTable('music.csv', 'csv', 'header');
}

function setup() {
	createCanvas(1000, 800);
	tableObject = table.getObject();

	var count = 1;
	// format data and find ranges
	for (var key in tableObject) {
		var entry = tableObject[key];
		if (entry.terms && entry.terms == "hip hop") {
			var songId = entry["song.id"];
			var hotness = entry["song.hotttnesss"];
			var tempo = entry["tempo"];
			var releaseName = entry["release.name"];
			if (songId && hotness && tempo && releaseName) {
				tempo = parseFloat(tempo);
				hotness = parseFloat(hotness);
				data[songId] = {
					"hotness": hotness,
					"tempo": tempo,
					"name": releaseName
				};
				if (count == 1) {
					maxHotness = hotness;
					minHotness = hotness;
					maxTempo = tempo;
					minTempo = tempo;
				} else {
					if (hotness > maxHotness) {
						maxHotness = hotness;
					}
					if (hotness < minHotness) {
						minHotness = hotness;
					}
					if (tempo > maxTempo) {
						maxTempo = tempo;
					}
					if (tempo < minTempo) {
						minTempo = tempo;
					}
				}
				count++;
			}
		}
	}
}

function draw () {
	clear();
	// draw graph lines
	for (var i = 0; i <= maxHotness - minHotness + 0.1; i += 0.1) {
		stroke('#E5E5E5');
		line(50 + (i*750), 500, 50 + (i*750), 480 - (2*(maxTempo - minTempo)));
		textSize(11);
		fill('#E5E5E5');
		textAlign(CENTER);
		text(i.toFixed(2), 45 + i*750, 510);
	}

	for (var i = 0; i <= maxTempo - minTempo; i+= 20) {
		stroke('#E5E5E5');
		line(50, 500 - i*2, (maxHotness - minHotness + 0.1)*750, 500 - i*2);
		textSize(11);
		fill('#E5E5E5');
		textAlign(RIGHT);
		text(minTempo + i*2, 45, 500 - i*2, 5);
	}

	// axis labels
	fill('#667272');
	textAlign(CENTER);
	text("tempo", 45, 100);

	fill('#667272');
	textAlign(CENTER);
	text("song hotness", 45, 525, (maxHotness - minHotness)*750);

	//draw points

	for (var song in data) {
		var name = data[song].name;
		var hotness = data[song].hotness;
		var tempo = data[song].tempo;
		var x =  50 + ((data[song].hotness - minHotness) * 750);
		var y = 500 - ((data[song].tempo - minTempo) * 2);
		noStroke();
		fill('#5FA0C6');
		ellipse(x, y, 5, 5);
		var d = dist(mouseX, mouseY, x, y);
		if (d <= 5) {
			noStroke();
			fill('#2E4E60');
			ellipse(x, y, 5, 5);
			textSize(11);
			fill('#2E4E60');
			textAlign(CENTER);
			text(name + "\nhotness: " + hotness + "\ntempo: " + tempo, x, y-40);
		}
	}


	// draw title
	fill('#11100E');
	textAlign(CENTER);
	textSize(32);
	text('Song Hotness vs Tempo for all Hip Hop Songs', (50 + (maxHotness - minHotness)*750)/2, 50);
}