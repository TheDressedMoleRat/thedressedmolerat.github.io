// Ok if you want you can read the splash texts here, but where's the fun in that?? Just click on them instead it cycles don't worry.
const splash_texts = 
`Don't say "two eyes wow" in toki pona, worst mistake of my life
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
how did you even find this site?
Welcome to thedressedmolerat.github.io, the website where I write whatever I want, because it's my website, and not yours.
Flexbox my beloved <3
I want to marry markdown <3
Did you know I know morse code?
-- --- - ···· · ·-· ··-· ··- -·-· -·- · ·-·
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
Orion's 'sword'
pu-rist jan Usawi be like wan, tu, tu wan, tu tu, luka, luka wan, likujo!
IP-address? They know where I pee?
Oll Korrekt schmoll schmorrect.
H-He. Libeb Cnofne. Namgal Sipsclar.
Exactly half of the latin alphabet's minuscules fit in x-height.
My give a fucks are on vacation. Just kidding I care <3
A broken record is still right maybe it depends I guess
If you rearrange the letters in Peru, you could spell Europe.
T***s N*w R***n
Woo gays, gay it up
Oh ok Nguyen is pronounced ŋwiən apparently??
Live laugh love? Honey. Die cry hate. (don't)
Zorp Schmorp
Are you guys lgbt or something
Crazy how there's that one donut topology joke and no other ones but what even is topology
I am the truest repairman
Zoo-Wee Mama
I feel like an umbrella (quoIzf48YeM?t=172)
sina toki pona ala la, o moli
Gazebo? Gazoinksbo
Bosskeep Gatelight Gasgirl
Light Keep Boss
I could lie, say I likey-like that
Never heard of the dressed mole-rat? You are one of today's lucky 10,000
It's giving dirt girl from dirt girl (2leQfHW9sX4?t=1075)
When I risk it for a biscuit then I'm in a good mood
använd piltangenterna för att styra din figur <3
I love drinking soowi tello wawa kəpecken nəmacko en cooleh I.O. kasi
Ok but what reason is there to pronounce a K in et cetera? Where is it??
"I" love randomly inserting quotation marks.
Oh no! Come on, girl. - Terry Mennanecker
Ugh, food for dinner, again?
Exercise? I thought you said extra fries!
my baby loves his apparatus (cAeYMYkew_k?t=2m10s)
Is it true you went to school with skinny but pretty voice totally tattoo all over da body but pretty drugs taking singing miss wine in the house
That's numberwang!
Hi mom, I wish I could come back! (Wm6BuznFKHY?t=980)
τ > π
Shortening <i>there are</i> to <i>there's</i> unnerves me slightly.
sadly I think these splash texts are where most of this websites effort lies
Oh yeah that classic turn that CLEARLY says "Hurry, boy, it's waiting there for you"
But acerooolaaaa
Boyfriend skinner <3
Lelda, Danongorf, and Zink
Americans be like yeah I love studying mathematic
Apparently Denmark grades 12, 10, 7, 4, 02, 00, -3 instead of A-F
I'm trying to be linguistically descriptivistic but oh brother
In Swedish "fishes" and "fishers" are the same word for some reason`.split("\n")

let splash_index = Math.floor(Math.random() * splash_texts.length);
const splash_element = document.getElementById("splash");

let theme_index = 0;
const themes = {
	default: {
		"vars":{
			main_bg: '#282a36',
			secondary_bg: '#44475A',
			text: '#F8F8F2',
			links: '#ffaad5',
			splash: '#6272A4'
		},
		"bg-image":"/media/images/backgrounds/tokipona.png"
	},
	light: {
		"vars":{
			main_bg: 'white',
			secondary_bg: '#ccc',
			text: '#202122',
			links: '#36c',
			splash: '#bb708f'
		},
		"bg-image":"/media/images/backgrounds/white.png"
	},
	space: {
		"vars":{
			main_bg: 'black',
			secondary_bg: '#333',
			text: 'white',
			links: '#c7f',
			splash: '#555'
		},
		"bg-image":"/media/images/backgrounds/spacebg.gif"
	}
};

function splash() {
	splash_index = (splash_index + 1) % splash_texts.length;
	splash_element.innerHTML = splash_texts[splash_index];
}

function set_theme(theme_dictionary) {
	let root = document.querySelector(':root');
	for ([var_name, color] of Object.entries(theme_dictionary["vars"])) {
		root.style.setProperty("--"+var_name, color);
	}

	let bg_element = document.getElementById("bg")
	bg_element.style.backgroundImage = "url("+theme_dictionary["bg-image"]+")";

	if (theme_dictionary["bg-image"].endsWith(".gif")) {
		bg_element.style.animation = "none";
	} else {
		bg_element.style.animation = "6s linear infinite bg";
	}
}

function cycle_theme() {
	theme_index = (theme_index + 1) % Object.keys(themes).length;
	console.log("setting " + theme_index);
	set_theme(Object.values(themes)[theme_index]);
}

splash();
console.log("There are " + splash_texts.length + " splash texts in total. I'm trying to add new ones but It's not easy to come up with funny things!!");

set_theme(themes["default"]);