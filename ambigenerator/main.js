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

function initializeCanvas(width, height) {
	const canvas = document.createElement("canvas");
	var canvasContext = canvas.getContext("2d");
	canvas.width = width;
	canvas.height = height;
	document.body.appendChild(canvas);
	canvasContext.fillStyle = "white";
	canvasContext.fillRect(0,0,width,height);
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

const cartesian = (a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

//['a1','l1','v2','a2','r2']
function countStrokes(structure) {
	let strokes = 0;
	structure.forEach(glyph => {
		strokes += parseInt(glyph[1]);
	});
	return strokes;
} 

function generateAmbigram() {
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
	permutsA.forEach(permutA => { permutsB.forEach(permutB => {
		if (countStrokes(permutA) == countStrokes(permutB)) {
			matchingCombos.push([permutA, permutB]);
		}
	});});
	
// Image trickery goes here please ↓
}