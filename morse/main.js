const morse_dict = {
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

let anyKeyPressed = false;
let durations = [];
let last_toggle = 0

let slider = document.getElementById("slider");
let slider_display = document.getElementById("slider_display");
let out_paragraph = document.getElementById("out_paragraph");

update_timings()
slider.oninput = update_timings;
setInterval(update_output, 60);

function update_timings() {
	dash_ms = 3*slider.value;
	gap_ms = 3*slider.value;
	space_ms = 7*slider.value;
	
	slider_display.innerHTML = slider.value;

	update_output();
}

function add_duration() {
	if (last_toggle == 0) {
		last_toggle = Date.now();
		return;
	}

	durations.push(Date.now() - last_toggle);

	last_toggle = Date.now();
}

window.addEventListener('keydown', function(event) {
	if (anyKeyPressed) {
		return;
	}

	anyKeyPressed = true;

	add_duration();
});

window.addEventListener('keyup', function(event) {
	if (!anyKeyPressed) {
		return;
	}

	anyKeyPressed = false;

	add_duration();
});

function letter(morse) {
	return (morse in morse_dict) ? morse_dict[morse] : morse;
}

function update_output() {
	let out_string = "";
	let buffer = "";

	durations.forEach((duration, i) => {
		let is_down_duration = (i % 2 == 0);

		if (is_down_duration) {
			if (duration > dash_ms) {buffer += "-";}
			else {buffer += ".";}
		}
		else {
			if (duration > gap_ms) {
				out_string += letter(buffer);
				buffer = "";
			}
			if (duration > space_ms) {out_string += "  ";}
		}
	});
	
	out_string += letter(buffer);

	out_paragraph.textContent = out_string;
}

function clear_text() {
    durations = [];
    update_output();
    last_toggle = 0;
}