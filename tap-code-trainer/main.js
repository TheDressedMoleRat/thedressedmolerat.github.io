let slider = document.getElementById("slider");
let slider_display = document.getElementById("slider_display");
let input_box = document.getElementById("input_box");
let next_letter_button = document.getElementById("next_letter_button");
let random_word;
let result_p = document.getElementById("result");
let words = [];
const alphabet = "abcdefghijlmnopqrstuvwxyz";
let playing = false;
let revealed = "";

update_timings()
slider.oninput = update_timings;

function update_timings() {
	slider_display.textContent = `Speed: ${slider.value}`;
}

async function play_word() {
	if (playing) return;

	// I had to learn how to use the web audio API for this because
	// normal audio stuff didn't work at all for this

	// I watched the beginning of this: https://youtu.be/vzdonYZYCOA

	if (audio_context.state == "suspended") {
		audio_context.resume();
	}

	while (true) {
		random_word = words[Math.floor(Math.random() * words.length)];
		random_word = random_word.toLowerCase();
		random_word = random_word.replace(/[^a-z]/gi, '');
		if (random_word.length > 3) break;
	}

	playing = true;
	next_letter_button.textContent = "playing...";
	result_p.textContent = "";
	input_box.value = "";

	for (let i = 0; i < random_word.length; i++) {
		let letter = random_word[i].replace("k", "c");

		let x = alphabet.indexOf(letter) % 5 + 1;
		let y = Math.floor(alphabet.indexOf(letter) / 5) + 1;

		for (let i = 0; i < y; i++) {
			tap_audio.play();
			await new Promise(r => setTimeout(r, 8000 / slider.value));
		}

		await new Promise(r => setTimeout(r, 12000 / slider.value));

		for (let i = 0; i < x; i++) {
			tap_audio.play();
			await new Promise(r => setTimeout(r, 8000 / slider.value));
		}

		if (i != random_word.length - 1) {
			await new Promise(r => setTimeout(r, 24000 / slider.value));
		}
	}

	playing = false;
	next_letter_button.textContent = "new word";
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

// input
let check_div = document.getElementById("input_check");

let children = check_div.children;
let input = children[0];
let button = children[1];
let p = children[2];

button.addEventListener("click", () => {
	if (input.value.toLowerCase()?.replace("c", "k") == random_word?.replace("c", "k")) {
		p.textContent = "You got it!";
		p.style.color = "#50fa7b";
	} else {
		p.textContent = "Incorrect. Answer: " + random_word;
		p.style.color = "#ff5555";
	}
})