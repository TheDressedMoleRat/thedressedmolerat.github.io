// Source - https://stackoverflow.com/a/48161723
async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);                    

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

for (const cryptic_div of document.getElementsByClassName("cryptic")) {
	let children = cryptic_div.children
	let input = children[0]
	let button = children[1]
	let p = children[2]
	let hash = cryptic_div.dataset.hash

	button.addEventListener("click", async () => {
		if (1) {
			if (await sha256(input.value.toLowerCase()) == hash) {
				p.textContent = "You got it!"
				p.style.color = "#50fa7b"
			} else {
				p.textContent = "Incorrect"
				p.style.color = "#ff5555"
			}

		}
	})
}