// TODO: button works bad
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
	".----.": "'",
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

let out_paragraph = document.getElementById("out_paragraph");

let dash_ms;
let gap_ms;
let space_ms;

setInterval(update_output, 60);

function get_threshold(unsorted_list) {
	let sorted_list = [...unsorted_list].sort((a,b) => a-b);

	const log_list = sorted_list.map(Math.log);
	
	let biggest_gap = 0;
	let threshold = 0;
	
	for (let i = 0; i < log_list.length-1; i++) {
		if (log_list[i+1]-log_list[i] > biggest_gap) {
			biggest_gap = log_list[i+1]-log_list[i];
			threshold = (sorted_list[i+1]+sorted_list[i]) / 2;
		}
	}   

	const dit_dah_ratio = sorted_list.filter(d => d<threshold).length / sorted_list.filter(d => d>threshold).length;

	// a very ditty message like "she is her" has 20 dits to 1 dah = a ratio of 20
	// "mom or tom" has 2 dits to 18 dahs = a ratio of 0.111...
	if (dit_dah_ratio < 0.1) {
		console.log("removing shortie " + sorted_list[0] + " cuz of ratio " + dit_dah_ratio);
		return get_threshold(sorted_list.slice(1)); // remove first
	} else if (dit_dah_ratio > 20) {
		console.log("removing longie " + sorted_list[-1] + " cuz of ratio " + dit_dah_ratio);
		return get_threshold(sorted_list.slice(0, -1)) // remove last
	}

	return threshold;
}



function add_duration() {
	if (last_toggle == 0) {
		last_toggle = Date.now();
		return;
	}

	durations.push(Date.now() - last_toggle);

	last_toggle = Date.now();
}

function letter(morse) {
	if (morse == "") return "";
	return (morse in morse_dict) ? morse_dict[morse] : `<em>${morse}</em>`;
}

function update_output() {
	dash_ms = get_threshold(durations.filter((_, i) => i%2 == 0))
	unit = dash_ms / 3;
	gap_ms = 3 * unit;
	space_ms = 7 * unit;
	let wpm = Math.round(1200/unit);

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

	out_paragraph.innerHTML = out_string ? out_string : "_";
}

function clear_text() {
	navigator.clipboard.writeText(out_paragraph.innerHTML + "\n" + get_threshold(durations.filter((_,i) => i%2==0)) + "\n" + durations.filter((_,i) => i%2==0).join("\n"));
	durations = [];
	update_output();
	last_toggle = 0;
}

window.addEventListener('keydown', function(event) {
	if (event.key == "Backspace") {
		clear_text();
		return;
	}

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

// morse_button.addEventListener('mousedown', handle_press_start);
// morse_button.addEventListener('mouseup', handle_press_end);

// morse_button.addEventListener('touchstart', function(e) {
// 	e.preventDefault();
// 	handle_press_start();
// }, { passive: false });

// morse_button.addEventListener('touchend', function(e) {
// 	e.preventDefault();
// 	handle_press_end();
// }, { passive: false });