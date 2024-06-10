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
    ".--.-": "Å",
    ".-.-": "Ä",
    "---.": "Ö",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",
    "-----": "0",
    "--..--": ",",
    ".-.-.-": ".",
    "..--..": "?",
    "-.-.--": "!",
    "-..-.": "/",
    "-.--.": "(",
    "-.--.-": ")",
    ".-...": "&",
    "---...": ":",
    "-.-.-.": ";",
    "-...-": "=",
    ".-.-.": "+",
    "-....-": "-",
    "..--.-": "_",
    ".-..-.": "\"",
    "...-..-": "$",
    ".--.-.": "@",
  };
  

let downStartTime;
let upStartTime;
let character = '';
let buffer = '';
let output = '';
let down = false;

let dashTime = 150;
let gapTime = dashTime;
let spaceTime = (7/3)*dashTime;

function keyDown() {
    down = true;
	downStartTime = Date.now();
};

function keyUp() {
    down = false;
	upStartTime = Date.now();

    if (Date.now() - downStartTime > dashTime) { buffer += '-'; }
	else { buffer += '.';}
}

function update() {
    // if upTime > spaceTime, add a space
    if (!down && Date.now() - upStartTime > spaceTime) { 
        if (output.charAt(output.length-1) != ' ' && output != '') {
            output += " ";
        }
    }

    // if upTime > gapTime and key is up, move buffer to output
    if (!down && Date.now() - upStartTime > gapTime) {

        if (morseDictionary.hasOwnProperty(buffer)) { output += morseDictionary[buffer]; }
        else { output += buffer; }
        buffer = '';

    }

	document.getElementById('output').textContent = output;
}

function updateDuration() {
    value = document.getElementById('inputNumber').value;
    if(value == '') {return;}
    dashTime = parseInt(value);
    let box = document.getElementById('inputNumber');
    box.value = '';
    box.placeholder = "Dash length (" + value + ")";
}

function clearText() {
    output = '';
    document.activeElement.blur();
}

setInterval(update, 100);

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);