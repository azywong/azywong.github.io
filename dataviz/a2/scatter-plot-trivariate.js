var table;
var tableObject;
var data = {};
var maxHotness;
var minHotness;
var maxTempo;
var minTempo;
var maxLoudness;
var minLoudness;

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
			var loudness = entry["loudness"];
			if (songId && hotness && tempo && releaseName && loudness) {
				tempo = parseFloat(tempo);
				hotness = parseFloat(hotness);
				loudness = parseFloat(loudness);
				data[songId] = {
					"hotness": hotness,
					"tempo": tempo,
					"name": releaseName,
					"loudness": loudness
				};
				if (count == 1) {
					maxHotness = hotness;
					minHotness = hotness;
					maxTempo = tempo;
					minTempo = tempo;
					maxLoudness = loudness;
					minLoudness = loudness;
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
					if (loudness > maxLoudness) {
						maxLoudness = loudness;
					}
					if (loudness < minLoudness) {
						minLoudness = loudness;
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
		text(minTempo + i, 45, 500 - i*2, 5);
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
		var loudness = data[song].loudness;
		var size = Math.abs((loudness - minLoudness)/2) + 3;
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
			text(name + "\nhotness: " + hotness + "\ntempo: " + tempo + "\nloudness: " + loudness, x, y-50);
		}
	}

	//draw key
	fill('#11100E');
	textAlign(LEFT);
	textSize(11);
	text('Loudness', (150 + (maxHotness - minHotness)*750), 50);

	for (var i = 0; i < 5; i++) {
		var size = Math.abs((i*((maxLoudness - minLoudness)/4))/2) + 3;
		var x = 150 + (maxHotness - minHotness)*750;
		var y = 50 + 25*(i+1);
		noStroke();
		fill(95, 160, 198, 125);
		ellipse(x, y, size, size);
		fill('#2E4E60');
		textAlign(LEFT);
		textSize(11);
		text((minLoudness + Math.abs(i*(maxLoudness - minLoudness)/4)).toFixed(3) , x + 50, y);

	};

	// draw title
	fill('#11100E');
	textAlign(CENTER);
	textSize(32);
	text('Song Hotness vs Tempo for all Hip Hop Songs', (50 + (maxHotness - minHotness)*750)/2, 50);
}