 

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

const DASHTIME = 200;
const GAPTIME = 300;
const SPACETIME = 1000;

function keyDown() {
    downStartTime = Date.now();
}

function keyUp() {
    upStartTime = Date.now();
}

// Interprets and clears buffer
function moveBuffer() {
    if (morseDictionary.hasOwnProperty(buffer)) {
        output += morseDictionary[buffer];
    }
    else {
        output += '['+buffer+']';
    }
    buffer = '';
}

function update() {
    let downLength = Date.now() - downStartTime;

    if (downLength > DASHTIME) {
        character = '-';
    } 
    else {
        character = '.';
    }
    
	document.getElementById('output').textContent = output + buffer + character;
}

setInterval(update, 10);
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);