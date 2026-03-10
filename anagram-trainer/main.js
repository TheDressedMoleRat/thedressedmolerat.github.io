let guess_div = document.getElementById("guess");
let anagram_p = document.getElementById("anagram_p");
let words;
let answer;

function check_answer() {
	if (guess_div.value.split('').sort().join("") == word.split('').sort().join("") && words.includes(guess_div.value)) {
		new_word();
	}
}

function new_word() {
	while (true) {
		word = words[Math.floor(Math.random() * words.length)];
		if (word.length > 2) break;
	}

	word = word.toLowerCase();

	anagram_p.textContent = shuffle(word);
	guess_div.value = "";
}

function shuffle(unshuffled) {
	if (unshuffled.length < 2) return;

	let i = unshuffled.length;
	let result = unshuffled.split("");

	while (i != 0) {
		let randomIndex = Math.floor(Math.random() * i);
		i--;
		[result[i], result[randomIndex]] = [result[randomIndex], result[i]];
	}

	if (result.join("") == unshuffled) {
		return shuffle(unshuffled);
	} else {
		return result.join("");
	}
}

fetch('/media/words.txt')
	.then(r => r.text())
	.then(text => {
		words = text.split("\n").map(word => word.trim());
		new_word();
	})

guess_div.oninput = check_answer;

guess_div.onkeydown = (e) => {
	if (e.key == "Enter") {
		if (anagram_p.textContent == word) {
			new_word();
			anagram_p.style.color = "var(--text)";
		} else {
			anagram_p.textContent = word;
			anagram_p.style.color = "#ff5555";
		}
	}

	// It was too easy with this ↓
	// if (e.code == "Space") {
	// 	e.preventDefault();
	// 	anagram_p.textContent = shuffle(word);
	// }
};