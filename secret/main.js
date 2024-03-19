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
let character = '';
let buffer = '';
let output = '';
let down = false;

const DASHTIME = 200;
const GAPTIME = 300;
const SPACETIME = 1000;

function keyDown() {
    down = true;
	downStartTime = Date.now();
};

function keyUp() {
    down = false;
	upStartTime = Date.now();

    if (Date.now() - downStartTime > DASHTIME) { buffer += '-'; }
	else { buffer += '.'; }
}

function update() {
    // if upTime > spaceTime, add a space
    if (!down && Date.now() - upStartTime > SPACETIME) { 
        console.log(output);
        if (output.charAt(output.length-1) != '_') {
            output += '_';
        }
    }

    // if upTime > gapTime and key is up, move buffer to output
    if (!down && Date.now() - upStartTime > GAPTIME) {

        if (morseDictionary.hasOwnProperty(buffer)) { output += morseDictionary[buffer]; }
        else { output += buffer; }
        buffer = '';

    }

	document.getElementById('output').textContent = output;
}

setInterval(update, 100);

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);