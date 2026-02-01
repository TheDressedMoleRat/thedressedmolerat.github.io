let out_p = document.getElementById("out");
let nnp = document.getElementById("nnp");

const units = {
	1: "W",
	2: "T",
	5: "L",
	20: "M",
	100: "A",
}

const unit_numbers = Object.keys(units).sort((a, b) => b-a);

function parse(number) {
	let output = "";
	let rest = number;

	for (const unit of unit_numbers) {
		let times = Math.floor(rest/unit);
		rest -= unit * times;
		if (times > 2) {
			output += parse(times) + units[unit];
		} else {
			output += units[unit].repeat(times);
		}
	}

	return output;
}

setInterval(() => {
	out_p.textContent = parse(nnp.value);
}, 100);