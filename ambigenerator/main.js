let startGlyphs = [['a1', 'a2i'], ['b2i'], ['c1', 'c2'], ['d2'], ['e2', 'e1'], ['f1i'], ['g2'], ['h2i', 'h2'], ['i1'], ['j1', 'j2'], ['k2'], ['l1'], ['m2', 'm3'], ['n2'], ['o2i', 'o1'], ['p1i'], ['q1', 'q2'], ['r1', 'r2'], ['s1', 's2'], ['t1'], ['u2'], ['v1', 'v2'], ['w2', 'w3'], ['x1', 'x2'], ['y1', 'y2'], ['z1', 'z2']]
let middleGlyphs = [['a2'], ['b2'], ['c1', 'c2'], ['d2i'], ['e2i', 'e1'], ['f1'], ['g2'], ['h2'], ['i1'], ['j1', 'j2'], ['k2'], ['l1'], ['m3'], ['n2'], ['o2i'], ['p1'], ['q1', 'q2'], ['r1', 'r2'], ['s1', 's2'], ['t1'], ['u2'], ['v1', 'v2'], ['w2', 'w3'], ['x1', 'x2'], ['y1', 'y2'], ['z1', 'z2']];
let endGlyphs = [['a1i', 'a2'], ['b2'], ['c1', 'c2'], ['d2i'], ['e2i', 'e1'], ['f1'], ['g2'], ['h1', 'h2'], ['i1'], ['j1', 'j2'], ['k2'], ['l1'], ['m3'], ['n1', 'n2'], ['o2'], ['p1'], ['q1', 'q2'], ['r1', 'r2'], ['s1', 's2'], ['t1'], ['u2'], ['v1', 'v2'], ['w2', 'w3'], ['x1', 'x2'], ['y1', 'y2'], ['z1', 'z2']];
let bannedPairs = [['h2i','y2'],['r1','r2'],['h1','y2'],['v1','v2'],['e1','e2i'],['s1','s2']];

function clear() {
	const canvases = document.querySelectorAll('canvas');
	for (const canvas of canvases) {
		canvas.remove();
	}
}

function spawnCanvas(width, height) {
	const canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = width;
	canvas.height = height;
	const canvases = document.getElementById("canvases");
	canvases.appendChild(canvas);
	ctx.fillStyle = '#def';
	ctx.fillRect(0,0,width,height);
	return canvas;
}

async function getGlyphImage(name) {
	//return await fetch(glyph).then(res => res.blob());
	return new Promise((resolve) => {
		const glyph = new Image();
		glyph.src = 'g/' + name + '.png';
		glyph.onload = function() { resolve(glyph); };
	});	
}

function letterIndex(letter) {
	return letter.charCodeAt(0) - 'a'.charCodeAt(0);
}

function getPossibleGlyphs(words) {
	var glyphs = [[],[]];
	// for both words:
	for (let wordIndex = 0; wordIndex < 2; wordIndex++) {
		const glyphList = glyphs[wordIndex];
		const word = words[wordIndex];
		//first letter
		glyphList.push(startGlyphs[letterIndex(word[0])]);
		// middle letters
		for (let letterPos = 1; letterPos < word.length - 1; letterPos++) {
			glyphList.push(middleGlyphs[letterIndex(word[letterPos])]);
		}
		// last letter
		glyphList.push(endGlyphs[letterIndex(word[word.length-1])]);
	}
	return glyphs;
}

// Code from https://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript
function cartesian(a) {
	return a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
}

//['a1','l1','v2','a2','r2']
function countStrokes(structure) {
	let strokes = 0;
	for (const glyph of structure) {
		strokes += parseInt(glyph[1]);
	}
	return strokes;
} 

function say(choices) {
	alert(choices[Math.floor(Math.random()*choices.length)]);
}

async function generateAmbigram() {
	clear();

	let words = document.getElementById('wordInput').value;
	words = words.toLowerCase().split(' ');
	
	if (words.length > 2) {
		say([`Obviously I can't make an ambigram of ${words.length} words!!`]);
		return;
	}
	else if (words == '') {
		say(['You have to actually type something for me to generate...']);
		return;
	}
	else if (words.length == 1) {
		words = [words[0], words[0]];
	}

	const glyphs = getPossibleGlyphs(words);

	let permutsA = cartesian(glyphs[0]);
	let permutsB = cartesian(glyphs[1]);

	let matchingCombos = [];
	for (const permutA of permutsA) { for (const permutB of permutsB) {
		if (countStrokes(permutA) == countStrokes(permutB)) {
			matchingCombos.push([permutA, permutB]);
		}
	}}
	
	if (matchingCombos.length == 0) {
		say(['Nope', 'Why?']);
		return;
	}
	for (const combo of matchingCombos) {
		let width = countStrokes(combo[0]);
		const strokeWidth = 50;
		width += 3;
		width *= strokeWidth;
		let canvas = spawnCanvas(width, 300);
		let ctx = canvas.getContext('2d');

		let x = 0;
		for (const glyph of combo[0]) {
			const glyphImage = await getGlyphImage(glyph);
			ctx.drawImage(glyphImage, x, 0);
			x += strokeWidth * countStrokes([glyph]);
		}
		ctx.rotate(Math.PI);
		
		x = 0;
		for (const glyph of combo[1]) {
			const glyphImage = await getGlyphImage(glyph);
			ctx.drawImage(glyphImage, x-canvas.width, -canvas.height);
			x += strokeWidth * countStrokes([glyph]);
		}
	}
}