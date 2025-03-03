// No what are you doing here? This whole script is a mess I don't know JS leave me alone go away >:(
// !!!

// start, middle, end, strokewidth, height
let glyphs_lookup = {
	"old": [
		[['a1', 'a2i'], ['b2i'], ['c2', 'c1'], ['d2i'], ['e2', 'e1'], ['f1i'], ['g2'], ['h2i', 'h2'], ['i1'], ['j1', 'j2'], ['k2'], ['l1'], ['m2', 'm3'], ['n2'], ['o1', 'o2i'], ['p1i'], ['q1', 'q2'], ['r2', 'r1'], ['s2', 's1'], ['t1'], ['u2'], ['v1', 'v2'], ['w2', 'w3'], ['x2'], ['y1', 'y2'], ['z1', 'z2']],
		[['a2'], ['h2'], ['c2', 'c1'], ['d2'], ['e2i', 'e1'], ['f1'], ['g2'], ['h2'], ['i1'], ['j1', 'j2'], ['k2'], ['l1'], ['m3'], ['n2'], ['o2i'], ['p1'], ['q2'], ['r1', 'r2'], ['s1', 's2'], ['t1'], ['u2'], ['v1', 'v2'], ['w2', 'w3'], ['x2'], ['y1', 'y2'], ['z1', 'z2']],
		[['a2', 'a1i'], ['h2'], ['c2', 'c1'], ['d2'], ['e2i', 'e1'], ['f1'], ['g2'], ['h2', 'h1'], ['i1'], ['j1', 'j2'], ['k2'], ['l1'], ['m3'], ['n2', 'n1'], ['o2'], ['p1'], ['q2'], ['r1', 'r2'], ['s1', 's2'], ['t1'], ['u2'], ['v1', 'v2'], ['w2', 'w3'], ['x2'], ['y1', 'y2'], ['z1', 'z2']],
		100, 600
	],
	"new":[
		[['a1', 'a2i'], ['r2i'], ['c2i', 'c1'], ['d2i'], ['e2i', 'e1'], ['f1i'], ['g2i'], ['h2i', 'h2'], ['i1'], ['j1', 'j2'], ['k2i'], ['l1'], ['m2i', 'm3'], ['n2i'], ['o2'], ['p1i'], ['q2'], ['r2i', 'r1'], ['s2i', 's1'], ['t1i'], ['u2'], ['v1i', 'v2'], ['w2', 'w3'], ['x2'], ['y1i'], ['z1', 'z2']],
		[['a2'], ['h2'], ['c2', 'c1'], ['d2'], ['e2', 'e1'], ['f1'], ['g2'], ['h2'], ['i1'], ['j1', 'j2'], ['k2'], ['l1'], ['m3', 'm2'], ['n2'], ['o2'], ['p1'], ['q2'], ['r1', 'r2'], ['s1', 's2'], ['t1'], ['u2'], ['v1', 'v2'], ['w2', 'w3'], ['x2'], ['y1'], ['z1', 'z2']],
		[['a2', 'a1i'], ['h2'], ['c2', 'c1'], ['d2'], ['e2', 'e1'], ['f1'], ['g2'], ['h2'], ['i1'], ['j1', 'j2'], ['k2'], ['l1'], ['m3', 'm2'], ['n2'], ['o2'], ['p1'], ['q2'], ['r1', 'r2'], ['s1', 's2'], ['t1'], ['u2'], ['v1', 'v2'], ['w2', 'w3'], ['x2'], ['y1'], ['z1', 'z2']],
		100, 600
	],
	"pixel": [
		[['a1', 'a2i'], ['r2i'], ['c2i', 'c1'], ['d2i'], ['e2i', 'e1'], ['f1i'], ['g2i'], ['h2i'], ['i1'], ['j1', 'j2i'], ['k2i'], ['l1'], ['m2', 'm3'], ['n2i'], ['o2'], ['p1i'], ['q2'], ['r2i', 'r1'], ['s2i', 's1'], ['t1i'], ['u2'], ['v1i', 'v2i'], ['w2', 'w3'], ['x2'], ['y1i'], ['z1', 'z2']],
		[['a2'], ['h2'], ['c2', 'c1'], ['d2'], ['e2', 'e1'], ['f1'], ['g2'], ['h2'], ['i1'], ['j1', 'j2'], ['k2'], ['l1'], ['m3', 'm2'], ['n2'], ['o2'], ['p1'], ['q2'], ['r1', 'r2'], ['s1', 's2'], ['t1'], ['u2'], ['v1', 'v2'], ['w2', 'w3'], ['x2'], ['y1'], ['z1', 'z2']],
		[['a2'], ['h2'], ['c2', 'c1'], ['d2'], ['e2', 'e1'], ['f1'], ['g2'], ['h2'], ['i1'], ['j1', 'j2'], ['k2'], ['l1'], ['m3', 'm2'], ['n2'], ['o2'], ['p1'], ['q2'], ['r1', 'r2'], ['s1', 's2'], ['t1'], ['u2'], ['v1', 'v2'], ['w2', 'w3'], ['x2'], ['y1'], ['z1', 'z2']],
		6, 36
	],
}

function clear() {
	const canvases = document.querySelectorAll('canvas');
	for (const canvas of canvases) {
		canvas.remove();
	}
}

function spin(canvas) {
	if (canvas.style.transform == 'rotate(180deg)') {
		canvas.style.transform = 'rotate(0deg)'; 
	} else {
		canvas.style.transform = 'rotate(180deg)'; 
	}
}

function spawnCanvas(width, height) {
	const container = document.createElement('div');
	container.className = 'ambigram_container';

	const canvas = document.createElement('canvas');
	container.appendChild(canvas)
	canvas.width = width;
	canvas.height = height;

	const ambigramsBox = document.getElementById('ambigrams');
	ambigramsBox.appendChild(container)

	const colorValues = 'cdef'
	let color = '#';
	for (let i=0; i<3; i++) {
		color += colorValues[Math.floor(Math.random()*4)];
	}

	let ctx = canvas.getContext('2d');
	ctx.fillStyle = color;
	ctx.fillRect(0,0,width,height);

	canvas.addEventListener('click', spin.bind(null, canvas));

	return canvas;
}

async function getGlyphImage(name, style) {
	return new Promise((resolve) => {
		const glyph = new Image();

		let folder = 'glyph images/' + style + '/';

		glyph.src = folder + name + '.png';
		glyph.onload = function() { resolve(glyph); };
	});	
}

function letterIndex(letter) {
	return letter.charCodeAt(0) - 'a'.charCodeAt(0);
}

function getPossibleGlyphs(words, style) {
	let glyphs = [[],[]];

	let starters = glyphs_lookup[style][0]
	let middlers = glyphs_lookup[style][1]
	let enders = glyphs_lookup[style][2]

	// for both words:
	for (let wordIndex = 0; wordIndex < 2; wordIndex++) {
		const glyphList = glyphs[wordIndex];
		const word = words[wordIndex];
		//first letter
		glyphList.push(starters[letterIndex(word[0])]);
		// middle letters
		for (let letterPos = 1; letterPos < word.length - 1; letterPos++) {
			glyphList.push(middlers[letterIndex(word[letterPos])]);
		}
		// last letter (if length > 1)
		if (word.length != 1) {
			glyphList.push(enders[letterIndex(word[word.length-1])]);
		}
	}
	return glyphs;
}

// Code from https://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript
function cartesian(a) {
	return a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
}

//['a1','l1','v2','a2','r2']
function countStrokes(structure) {
//	if (typeof structure === 'string') {
//		return parseInt(structure[1]);
//	}

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

	let words = document.getElementById('ambigenerator input').value;
	let style = document.getElementById('style dropdown').value;

	let doubleWords = true;
	
	// Check if string is valid
	if ((/[^a-zA-Z\s]/.test(words))) {
		say(["No no, you can't include anything other than letters..", 'No special characters...\nYou silly goose.', 'Only letters pleeease!']);
	}

	words = words.toLowerCase().split(' ');
	
	if (words.length > 2) {
		say([`I can't make an ambigram of ${words.length} words you nincompoop`, 'How would I match more than two words together, huh?', `${words.length} words???`]);
		return;
	}
	else if (words == '') {
		say(['You have to actually type something for me to generate...', 'No... You have to type something first...', "There's a box there for you to type!"]);
		return;
	}
	else if (words.length == 1) {
		words = [words[0], words[0]];
		doubleWords = false;
	}

	const glyphs = getPossibleGlyphs(words, style);

	let permutsA = cartesian(glyphs[0]);
	let permutsB = cartesian(glyphs[1]);

	let matchingCombos = [];

	// If two words:
	if (doubleWords) {
		for (let permutA of permutsA) { for (let permutB of permutsB) {
			permutA = Array.isArray(permutA) ? permutA : [permutA];
			permutB = Array.isArray(permutB) ? permutB : [permutB];

			if (countStrokes(permutA) == countStrokes(permutB)) {
				matchingCombos.push([permutA, permutB]);
			}
		}}
	}
	else {
		for (let i of permutsA) {
			matchingCombos.push([i,i]);
		}
	}
	// If one word, matchingCombos = [[a,a],[b,b]...] where a and b are elements of permutsA
	
	if (matchingCombos.length == 0) {
		say(["Those two are completely different lengths!\n\n>:(", `${words[0]} doesn't fit with ${words[1]}...`, `How do you even expect me to match ${words[0]} with ${words[1]}?!`]);
		return;
	}
	for (const combo of matchingCombos) {
		let width = countStrokes(combo[0]);
		const strokeWidth = glyphs_lookup[style][3];
		width += 3;
		width *= strokeWidth;
		let canvas = spawnCanvas(width, glyphs_lookup[style][4]);
		let ctx = canvas.getContext('2d');

		if (style == "pixel") {
			canvas.style.imageRendering = 'pixelated';
		}

		// These for loops could be less repetetive but no
		let x = 0;
		for (const glyph of combo[0]) {
			const glyphImage = await getGlyphImage(glyph, style);
			ctx.drawImage(glyphImage, x, 0);
			x += strokeWidth * countStrokes([glyph]);
		}
		ctx.rotate(Math.PI);
		
		x = 0;
		for (const glyph of combo[1]) {
			const glyphImage = await getGlyphImage(glyph, style);
			ctx.drawImage(glyphImage, x-canvas.width, -canvas.height);
			x += strokeWidth * countStrokes([glyph]);
		}
	}
}