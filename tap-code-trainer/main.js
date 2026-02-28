let slider = document.getElementById("slider");
let slider_display = document.getElementById("slider_display");
let out_paragraph = document.getElementById("out_paragraph");
let next_letter_button = document.getElementById("next_letter_button");
let random_word;
let letter_index = 0;
let words = [];
const alphabet = "abcdefghijlmnopqrstuvwxyz";
let playing = false;
let revealed = "";

update_timings()
slider.oninput = update_timings;

function update_timings() {
	slider_display.textContent = `Speed: ${slider.value}`;
}

async function play_letter() {
	if (playing) return;

	// I had to learn how to use the web audio API for this because
	// normal audio stuff didn't work at all for this

	// I watched the beginning of this: https://youtu.be/vzdonYZYCOA

	if (audio_context.state == "suspended") {
		audio_context.resume();
	}

	// if word is done, new word
	if (random_word == undefined || letter_index > random_word.length) {
		next_letter_button.textContent = "new word"
		revealed = "";

		while (true) {
			random_word = words[Math.floor(Math.random() * words.length)];
			random_word = random_word.toLowerCase();
			random_word = random_word.replace(/[^a-z]/gi, '')
			if (random_word.length > 3) break;
		}

		letter_index = 0;
	}

	// if on last letter or one after, reveal
	if (letter_index <= random_word.length) {
		revealed += random_word[letter_index - 1] || "";
		out_paragraph.textContent = revealed + "�".repeat(random_word.length - letter_index);
		// if specifically one after, increase and return
		if (letter_index == random_word.length) {
			next_letter_button.textContent = "new word";
			letter_index++;
			return;
		}
	}

	playing = true;
	next_letter_button.textContent = "playing..."

	let i = random_word.replace("k", "c")[letter_index]

	let x = alphabet.indexOf(i) % 5 + 1;
	let y = Math.floor(alphabet.indexOf(i) / 5) + 1;

	for (let i = 0; i < y; i++) {
		tap_audio.play();
		await new Promise(r => setTimeout(r, 8000/slider.value));
	}

	await new Promise(r => setTimeout(r, 12000/slider.value));

	for (let i = 0; i < x; i++) {
		tap_audio.play();
		await new Promise(r => setTimeout(r, 8000 / slider.value));
	}

	playing = false;
	if (letter_index == random_word.length - 1) {
		next_letter_button.textContent = "reveal word";
	} else {
		next_letter_button.textContent = "next letter";
	}
	letter_index++;
}

// main
fetch('words.txt')
	.then(r => r.text())
	.then(text => {
		words = text.split("\n");
	})

const audio_context = new AudioContext();
const tap_audio = new Audio("tap.wav");
const source = audio_context.createMediaElementSource(tap_audio);
source.connect(audio_context.destination);