// Ok if you want you can read the splash texts here, but where's the fun in that?? Just click on them instead it cycles don't worry.
const splash_texts = `
Don't say "two eyes wow" in toki pona, worst mistake of my life || It's 󱥺󱥮󱤀 and you'll have to figure out what that sounds like
Did you know proportional fonts are literally better for coding?
Do you ever have several songs at the same time mashupping in your head?
Oiler 'discovering' a number (literally 3)
Did you know mole-rats are blind? Ok
Peanits schmeanits
So what are yall's genders?
Oh mama
My friends though I was joking when I said there was a font subreddit :(
Self hosting? In this economy?!
Welcome to thoughts for your thoughts
and turn into worms. It will completely turn into worms.
Welcome to here, the website where I write whatever I want, because it's my website, and not yours.
Flexbox my beloved <3
Did you know I know morse code?
	-- --- - ···· · ·-· ··-· ··- -·-· -·- · ·-·
	sorry :)
Inter is love, Inter is life. (the font, i think it's pretty)
I would rather have a bunch of ok teeth, than one really really good tooth.
⊂Ꮮıïᔨ
Evil scary dillar :skull:
sina ken ala toki pona e ijo la sina sona ala e ona
it snot funny (it is)
A broken compass is still right twice per 4π radians
Pump up the jam is my favorite Canadian national anthem <3
the pink one so terrify
Un petit d'un petit. S'étonne aux halles.
Microsoft is a crazy name if you think about it. ew sorry
Unattractive people in relationships far away from you!!
	get it because it's the opposite of yeah you get it
Orion's 'sword'
pu-rist jan Usawi be like wan, tu, tu wan, tu tu, luka, luka wan, likujo!
IP-address? They know where I pee?
Oll Korrekt schmoll schmorrect.
I want to marry markdown <3
H-He. Libeb Cnofne. Namgal Sipsclar.
Exactly half of the latin alphabet's minuscules fit in x-height.
	acemnorsuvwxz / bdfghijklpqty
My give a fucks are on vacation.
	Just kidding I care <3
A broken record is still right maybe it depends I guess
If you rearrange the letters in Peru, you could spell Europe.
T***s N*w R***n
Woo gays, gay it up
Oh ok Nguyen is pronounced ŋwiən apparently??
Live laugh love? Honey. Die cry hate.
	(don't)
<q>Zorp Schmorp!</q>
	<q>Doomsday Prediction Falls Flat as Citizens Spend Evening Enjoying One of Pawnee's Finest Parks</q>
	That's a reference to when Leslie Knope suggested a very long headline which is funny
Are you guys lgbt or something
Crazy how there's that one donut topology joke and no other ones but what even is topology
I am the truest repairman
Zoo-Wee Mama
I feel like an umbrella || quoIzf48YeM?t=172
sina toki pona ala la, o moli
Gazebo? More like gazoinksbo || Leslie knope said that once
Bosskeep Gatelight Gasgirl
	Light Keep Boss
I could lie, say I likey-like that
Never heard of the dressed mole-rat? You are one of today's lucky 10,000
It's giving dirt girl from dirt girl || 2leQfHW9sX4?t=1075
When I risk it for a biscuit then I'm in a good mood
använd piltangenterna för att styra din figur <3
I love drinking soowi tello wawa kəpecken nəmacko en cooleh I.O. kasi
Ok but what reason is there to pronounce a K in et cetera? Where is it??
"I" love randomly inserting quotation marks.
Oh no! Come on, girl. - Terry Mennanecker
Ugh, food for dinner, again?
Is it true you went to school with skinny but pretty voice totally tattoo all over da body but pretty drugs taking singing miss wine in the house || Have you seen that interview with Adele it's pretty racist but really funny
That's numberwang!
τ > π
	In the literal sense and the Steve Mould sense
I thought you said extra fries!
Shortening <i>there are</i> to <i>there's</i> unnerves me slightly.
sadly I think these splash texts are where most of this websites effort lies
Oh yeah that classic turn that CLEARLY says "Hurry, boy, it's waiting there for you"
But acerooolaaaa
Boyfriend skinner <3 || I'm guessing that's what it stands for
Lelda, Danongorf, and Zink
Americans be like yeah I love studying mathematic
Apparently Denmark grades 12, 10, 7, 4, 02, 00, -3 instead of A-F
I'm trying to be linguistically descriptivistic but oh brother
In Swedish "the fish" and "the fishers" are the same word for some reason
	Also "six" and "sex" are the same
Every person's just a unicycle, looking for a second wheel
What the bullcrud?
Human rights? Yeah I sure hope she does.
I'm so glad Swedish doesn't have vowel reduction, it sounds so gross
Logan Pail‽
How often do you actually think the "I know what you're thinking" thought?
It's literally just sauce || 2ai5NWd8nuo?t=7m59s
The bane of the internet is people who that the webrings somewhere so are hard to find
Did you know that women are the second most respected gender? The first one might surprise you!
I don't think more people have been to Berlin than I have
This website is a mere dream ballet away from being a true gesamtkunstwerk
Digital dancing? Hey this is fun!
bye (watch Junferno?)
If you pronounce Nod and Gnawed the same I don't respect or like you
A little baby pigeon :o
Great vowel shift is my opp
Ahh, no good! Caca!
Ohhh! It's me, Madi! So sorry I died.
That feeling when you <q>drill into it, and drain every last drop of fluid</q>
Flip a ollie for da girls
ona li mijomi e akesi!!!!!!!!!
Being hard to believe, after allegedly trying to go back to repeatedly inspiring fear using rag-tag groups of suspicious-looking clowns, despite resistance.
Just musing in my Brandity Brand Cocoon™
Can English stop with -ous please?
The Swedish alphabet has a prime number of letters to the sadness of everyone
Does anyone read these?
Nishiki-teki my beloved
This is the last splash text so if you click it you'll loop around to the first one!`.split("\n").slice(1)

let splash_index = 0;
const splash_element = document.getElementById("splash");

const theme_dicts = [
	{ // default
		bg: '#282a36',
		box_bg: '#282a36',
		secondary_bg: '#44475A',
		text: '#F8F8F2',
		links: '#FF79C6',
		button_text: 'white',
		splash: '#6272A4',
		body_font: "Atkinson Hyperlegible Next, sans-serif",
		heading_font: "Kalnia, serif",
		box_rounding: "35px",
		bg_image: "url(/media/images/backgrounds/tokipona.webp)",
		bg_animation: "6s linear infinite bg",
	},
	{ // light
		bg: 'white',
		box_bg: 'white',
		secondary_bg: '#ccc',
		text: '#202122',
		links: '#36c',
		button_text: "black",
		splash: '#bb708f',
		body_font: "Atkinson Hyperlegible Next, sans-serif",
		heading_font: "Kalnia, serif",
		box_rounding: "35px",
		bg_image:"url(/media/images/backgrounds/white.webp)",
		bg_animation: "6s linear infinite bg",
	},
	{ // space
		bg: '#000',
		box_bg: '#000',
		secondary_bg: '#222',
		text: '#FFF',
		links: '#F33',
		splash: '#555',
		button_text: 'white',
		body_font: "Times New Roman, serif",
		heading_font: "Times New Roman, serif",
		box_rounding: "0px",
		bg_image:"url(/media/images/backgrounds/spacebg.gif)",
		bg_animation: "none",
	},
	{ // pink
		bg: '#ff95bd',
		box_bg: 'white',
		secondary_bg: '#f7669c',
		text: '#f7669c',
		links: '#00abff',
		splash: '#ff95bd',
		button_text: 'white',
		body_font: "Comic Sans MS, Comic Neue, cursive, sans-serif",
		heading_font: "Comic Sans MS, Comic Neue, cursive, sans-serif",
		box_rounding: "0px",
		bg_image:"url(/media/images/backgrounds/pink.webp)",
		bg_animation: "6s linear infinite bg",
	}
];

function splash() {
	splash_index = (splash_index + 1) % splash_texts.length;
	let splash_split = splash_texts[splash_index].split("||");

	if (splash_split.length == 2) {
		splash_element.innerHTML = `<abbr data-title="${splash_split[1]}">${splash_split[0]}</abbr>`;
	} else {
		splash_element.innerHTML = splash_texts[splash_index];
	}
}

function set_theme(theme_dictionary) {
	let root = document.querySelector(':root');
	for ([var_name, var_value] of Object.entries(theme_dictionary)) {
		if (var_name.endsWith("font")) {
			root.style.setProperty("--"+var_name, var_value+", nishiki");
		} else {
			root.style.setProperty("--"+var_name, var_value);
		}
	} 
}

function cycle_theme() {
	let theme_index = (parseInt(read_cookie("theme_index")) + 1) % theme_dicts.length;
	document.cookie = `theme_index=${theme_index}; path=/; expires=${new Date(Date.now() + 30*24*60*60*1000).toUTCString()}`;
	set_theme(theme_dicts[theme_index]);
}

function read_cookie(cookie_name) {
	cookies = document.cookie.split(";");
	for (const c of cookies) {
		if (c.startsWith(cookie_name)) {
			return c.split("=")[1];
		}
	}
}

function toggleFullScreen(video) {
	if (!document.fullscreenElement) {
		video.requestFullscreen();
	} else {
		document.exitFullscreen?.();
	}
}

function spin(canvas) {
	let angle = parseInt(canvas.dataset.angle || 0);
	angle += 180;
	canvas.dataset.angle = angle;
	canvas.style.transform = `rotate(${angle}deg)`;
}

let is_toki_pona = window.location.href.endsWith("tp.html");

if (is_toki_pona) {
	splash_element.innerHTML = "󱤪󱤽󱥳󱥍󱤰󱤄";
} else {
	while (true) {
		splash_index = Math.floor(Math.random() * splash_texts.length);
		if (!splash_texts[splash_index].startsWith("\t")) {
			break;
		}
	}
	splash_index -= 1;
	splash();
}
console.log("There are " + splash_texts.length + " splash texts in total. I'm trying to add new ones but It's not easy to come up with funny things!!");

let theme_cookie_value = read_cookie("theme_index");
if (theme_cookie_value == undefined || theme_cookie_value == "NaN") {
	set_theme(theme_dicts[0]);
	document.cookie = `theme_index=0; path=/; expires=${new Date(Date.now() + 30*24*60*60*1000).toUTCString()}`;
} else {
	set_theme(theme_dicts[parseInt(theme_cookie_value)]);
}

let date_spans = document.getElementsByClassName("date");

for (const span of date_spans) {
	days_ago = Math.floor((Date.now()-Date.parse(span.innerHTML))/(1000*60*60*24));

	if (is_toki_pona) {
		span.innerHTML = `<abbr data-title='${span.innerHTML}'>` + "󱥫󱥤󱥐󱤽" + days_ago + "</abbr>";
	} else {
		span.innerHTML = `<abbr data-title='${span.innerHTML}'>` + days_ago + (days_ago==1 ? " day ago" : " days ago") + "</abbr>";	
	}
}

for (const audio of document.querySelectorAll('audio')) {
	audio.volume = 0.4;
}

for (let ambigram of document.getElementsByClassName('ambigram')) {
	ambigram.addEventListener('click', () => spin(ambigram));
}