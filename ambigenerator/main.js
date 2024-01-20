// Functions (All for symbiotogram):
// X getPossibleGlyphs
// X cartesianProduct
// X countDownstrokes
// X initializeCanvas
// - combineHorizontal

let startGlyphs = [['a1', 'a2i'], ['b2i'], ['c1', 'c2'], ['d2'], ['e2', 'e1'], ['f1i'], ['g2'], ['h2i', 'h2'], ['i1'], ['j1', 'j2'], ['k2'], ['l1'], ['m2', 'm3'], ['n2'], ['o2i', 'o1'], ['p1i'], ['q1', 'q2'], ['r1', 'r2'], ['s1', 's2'], ['t1'], ['u2'], ['v1', 'v2'], ['w2', 'w3'], ['x1', 'x2'], ['y1', 'y2'], ['z1', 'z2']]
let middleGlyphs = [['a2'], ['b2'], ['c1', 'c2'], ['d2i'], ['e2i', 'e1'], ['f1'], ['g2'], ['h2'], ['i1'], ['j1', 'j2'], ['k2'], ['l1'], ['m3'], ['n2'], ['o2i'], ['p1'], ['q1', 'q2'], ['r1', 'r2'], ['s1', 's2'], ['t1'], ['u2'], ['v1', 'v2'], ['w2', 'w3'], ['x1', 'x2'], ['y1', 'y2'], ['z1', 'z2']];
let endGlyphs = [['a1i', 'a2'], ['b2'], ['c1', 'c2'], ['d2i'], ['e2i', 'e1'], ['f1'], ['g2'], ['h1', 'h2'], ['i1'], ['j1', 'j2'], ['k2'], ['l1'], ['m3'], ['n1', 'n2'], ['o2'], ['p1'], ['q1', 'q2'], ['r1', 'r2'], ['s1', 's2'], ['t1'], ['u2'], ['v1', 'v2'], ['w2', 'w3'], ['x1', 'x2'], ['y1', 'y2'], ['z1', 'z2']];
let bannedPairs = [['h2i','y2'],['r1','r2'],['h1','y2'],['v1','v2'],['e1','e2i'],['s1','s2']];

function spawnCanvas(width, height) {
	const canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = width;
	canvas.height = height;
	document.body.appendChild(canvas);
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,width,height);
	console.log("spawned canvas. Width: " + width + ", height: " + height);
	return canvas;
}

async function getGlyphImage(name) {
	//return await fetch(glyph).then(res => res.blob());
	return new Promise((resolve) => {
		const glyph = new Image();
		glyph.src = "/g2/" + name;
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

async function generateAmbigram() {
	let words = document.getElementById("wordInput").value;
	words = words.split(' ');
	let glyphs = [[],[]];
	
	if (words.length != 2) {
		alert("NOOOO");
		return;
	}
	else {
		glyphs = getPossibleGlyphs(words);
	}

	let permutsA = cartesian(glyphs[0]);
	let permutsB = cartesian(glyphs[1]);

	let matchingCombos = [];
	for (const permutA of permutsA) { for (const permutB of permutsB) {
		if (countStrokes(permutA) == countStrokes(permutB)) {
			matchingCombos.push([permutA, permutB]);
		}
	}}
	
	for (const combo of matchingCombos) {
		let width = countStrokes(combo[0])+countStrokes(combo[1]);
		width *= 3000;
		const strokeWidth = 500;
		let ctx = spawnCanvas(width, 3000);

		for (const word of combo) {
			for (const glyph of word) {
				const glyphImage = await getGlyphImage(glyph);
			}
		}
	}
}