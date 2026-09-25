let slider = document.getElementById("slider");
let slider_display = document.getElementById("slider_display");
let input_box = document.getElementById("input_box");
let next_letter_button = document.getElementById("next_letter_button");
let word;
let result_p = document.getElementById("result");
let words = [];
let playing = false;
let revealed = "";

const morse = {
	a: ".-",
	b: "-...",
	c: "-.-.",
	d: "-..",
	e: ".",
	f: "..-.",
	g: "--.",
	h: "....",
	i: "..",
	j: ".---",
	k: "-.-",
	l: ".-..",
	m: "--",
	n: "-.",
	o: "---",
	p: ".--.",
	q: "--.-",
	r: ".-.",
	s: "...",
	t: "-",
	u: "..-",
	v: "...-",
	w: ".--",
	x: "-..-",
	y: "-.--",
	z: "--.."
};

const audio_context = new AudioContext();

update_timings();
slider.oninput = update_timings;

function update_timings() {
	slider_display.textContent = `Speed: ${slider.value}`;
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function play_tone(duration) {
	const oscillator = audio_context.createOscillator();
	const gain = audio_context.createGain();

	oscillator.frequency.value = 600;
	oscillator.type = "sine";

	gain.gain.value = 0.15;

	oscillator.connect(gain);
	gain.connect(audio_context.destination);

	oscillator.start();
	oscillator.stop(audio_context.currentTime + duration / 1000);
}

async function play_word() {
	if (playing) return;

	if (audio_context.state == "suspended") {
		await audio_context.resume();
	}

	while (true) {
		word = words[Math.floor(Math.random() * words.length)];
		word = word.toLowerCase();
		word = word.replace(/[^a-z]/gi, '');

		if (word.length > 3) break;
	}

	playing = true;
	next_letter_button.textContent = "playing...";
	result_p.textContent = "";
	input_box.value = "";

	const unit = 1200 / slider.value;

	for (let i = 0; i < word.length; i++) {
		const code = morse[word[i]];

		for (let j = 0; j < code.length; j++) {
			const symbol = code[j];

			if (symbol === ".") {
				play_tone(unit);
				await sleep(unit);
			} else {
				play_tone(unit * 3);
				await sleep(unit * 3);
			}

			if (j < code.length - 1) {
				await sleep(unit);
			}
		}

		if (i < word.length - 1) {
			await sleep(unit * 3);
		}
	}

	playing = false;
	next_letter_button.textContent = "new word";
}


// main
fetch('/media/words.txt')
	.then(r => r.text())
	.then(text => {
		words = text.split("\n");
	});


// input
let check_div = document.getElementById("input_check");

let children = check_div.children;
let input = children[0];
let button = children[1];
let p = children[2];

button.addEventListener("click", () => {
	if (input.value.toLowerCase().trim() == word?.toLowerCase()) {
		p.textContent = "You got it!";
		p.style.color = "#50fa7b";
	} else {
		p.textContent = "Incorrect. Answer: " + word;
		p.style.color = "#ff5555";
	}
});