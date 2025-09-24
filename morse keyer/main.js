// TODO: get a threshold for up-signals, and check if that or down-signals is a better option, and figure out when up-signals should know there is no word-space, only letter and min space.
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

let slider = document.getElementById("slider");
let slider_display = document.getElementById("slider_display");
let out_paragraph = document.getElementById("out_paragraph");
let auto_checkbox = document.getElementById("auto_threshold");

let dash_ms;
let gap_ms;
let space_ms;

update_timings()
slider.oninput = update_timings;
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
		return get_threshold(sorted_list.slice(1)); // remove first
	} else if (dit_dah_ratio > 20) {
		return get_threshold(sorted_list.slice(0, -1)) // remove last
	}

	return threshold;
}

function update_timings() {
	if (auto_checkbox.checked) { return; }
	let unit = 1000 * 60 / (50 * slider.value);
	dash_ms = 3 * unit;
	gap_ms = 3 * unit;
	space_ms = 7 * unit;
	
	slider_display.textContent = "Current speed: " + slider.value + " words per minute";
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
	if (auto_checkbox.checked) {
		dash_ms = get_threshold(durations.filter((_, i) => i%2 == 0))
		unit = dash_ms / 3;
		gap_ms = 3 * unit;
		space_ms = 7 * unit;
		let wpm = Math.round(1200/unit);
		slider_display.textContent = `Current speed: Automatic (${wpm} wpm)`
		slider.value = wpm;

	} else {
		update_timings();
	}

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
	durations = [];
	update_output();
	last_toggle = 0;
}

window.addEventListener('keydown', function(event) {
	if (event.key == "Backspace") {
		clear_text();
		return;
	} else if (event.key == "Escape") {
		navigator.clipboard.writeText(durations.filter((_,i) => i%2==0).join("\n") + "\n\n---\n\n" + durations.filter((_,i) => i%2==1).join("\n"));
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