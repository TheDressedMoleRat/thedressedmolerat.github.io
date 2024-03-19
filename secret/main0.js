const morseDictionary = {
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  ".---": "J",
  "-.-": "K",
  ".-..": "L",
  "--": "M",
  "-.": "N",
  "---": "O",
  ".--.": "P",
  "--.-": "Q",
  ".-.": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  "-..-": "X",
  "-.--": "Y",
  "--..": "Z",
};

let downStartTime;
let upStartTime;
let buffer = '';
let output = '';

const DASHTIME = 200;
const GAPTIME = 300;
const SPACETIME = 1000;

function interpret() {
  if (Date.now() - upStartTime > GAPTIME) {
		if (morseDictionary.hasOwnProperty(buffer)) {
			output += morseDictionary[buffer];
		}
		else {
			output += '['+buffer+']';
		}
		update();
		buffer = '';
  }
};

function keyDown() {
	downStartTime = Date.now();

  interpret();
};

function keyUp() {
	upStartTime = Date.now();

	if (Date.now() - downStartTime > DASHTIME) {
		buffer += '-';
	}
	else {
		buffer += '.';
	}

  setTimeout(() => {
    interpret();
  }, GAPTIME);

	update();
}

function update() {
	document.getElementById('output').textContent = output + buffer;
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);