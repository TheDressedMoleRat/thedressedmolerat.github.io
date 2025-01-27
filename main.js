// Ok if you want you can try to read the splash texts here, but where's the fun in that??
const splash_secret = "ygolopot si neve tahw tub seno rehto on dna ekoj ygolopot eno taht s'ereht woh yzarC§gnihtemos ro tbgl uoy erA§promhcS proZ§)t'nod( .etah yrc eiD .yenoH ?evol hgual eviL§yltnerappa nəiwŋ decnuonorp si neyugN ko hO§seirt regnif eht nehw edih tub gnikool s'eugnot ruoy nehw tuo emoc sbmurc kniht I§pu ti yag ,syag ooW§efil ym fo ekatsim tsrow ,anop ikot ni 'wow ,seye owT' yas t'noD§🤢 ****R **N ****T§.eporuE lleps dluoc uoy ,ureP ni srettel eht egnarraer uoy fI§sseug I sdneped ti ebyam thgir llits si drocer nekorb A§.erac od ylbaborp I gniddik tsuJ .noitacav no era skcuf a evig yM§.thgieh-x ni tif selucsunim s'tebahpla nital eht fo flah yltcaxE§.ralcspiS lagmaN .enfonC bebiL .eH-H§.tcerromhcs llomhcs tkerroK llO§?eep I erehw wonk yehT ?sserdda-PI§!ojukil ,naw akul ,akul ,ut ut ,naw ut ,ut ,naw§'drows' s'noirO§3< evrefecaF enograF§!!uoy morf yawa raf spihsnoitaler ni elpoep evitcarttanU§yrros we .ti tuoba kniht uoy fi eman yzarc a si tfosorciM§.sellah xua ennoté'S .titep nu'd titep nU§yfirret os eno knip eht§3< mehtna lanoitan naidanaC etirovaf ym si maj eht pu pmuP§snaidar π4 rep eciwt thgir llits si ssapmoc nekorb A§)si ti( ynnuf tons ti§ano e ala anos anis al oji e anop ikot ala nek anis§:lluks: rallid yracs livE§ᔨïıᏞ⊂§.htoot doog yllaer yllaer eno naht ,hteet ko fo hcnub a evah rehtar dluow I§)ytterp s'ti kniht i ,tnof eht( .efil si retnI ,evol si retnI§·-· · -·- ·-·- -·· ·-·· ·-· · ···· - --- --§?edoc esrom wonk I wonk uoy diD§3< nwodkram yrram ot tnaw I§3< devoleb ym xobxelF§?etis siht dnif neve uoy did woh§.smrow otni nrut yletelpmoc lliw tI .smrow otni nrut dna§.sruoy ton dna ,etisbew ym s'ti esuaceb ,tnaw I revetahw etirw I erehw etisbew eht ,oi.buhtig.tarelomdesserdeht ot emocleW§sthguoht ruoy rof sthguoht ot emocleW§!?ymonoce siht nI ?gnitsoh fleS§(: tidderbus tnof a saw ereht dias I nehw gnikoj saw I hguoht sdneirf yM§.amam hO§?sredneg s'llay era tahw oS§.stinaemhcs stinaeP§kO ?dnilb era star-elom wonk uoy diD§)3 yllaretil( rebmun a 'gnirevocsid' reliO§?daeh ruoy ni gnippuhsam emit emas eht ta sgnos lareves evah reve uoy oD§?gnidoc rof retteb yllaretil era stnof lanoitroporp wonk uoy diD§reh dekil I ijome gnihgual gniyrc eht kcab gnirb ew naC§...tiaw !!hsilgne ot ipip am okos etalsnart t'noD";
let splash_texts = [...splash_secret].reverse().join('').split('§');
let splash_index = Math.floor(Math.random() * splash_texts.length);
const splash_element = document.getElementById("splash");

let theme_index = 0;
const themes = {
	default: {
		main_bg: '#282a36',
		secondary_bg: '#44475A',
		text: '#F8F8F2',
		links: '#8BE9FD',
		splash: '#6272A4'
	},
	test: {
		main_bg: 'white',
		secondary_bg: '#ccc',
		text: '#202122',
		links: '#36c',
		splash: '#bb708f'
	}
};

function splash() {
	splash_index = (splash_index + 1) % splash_texts.length;
	splash_element.innerHTML = splash_texts[splash_index];
}

function set_theme(theme_dictionary) {
	let root = document.querySelector(':root');
	for ([var_name, color] of Object.entries(theme_dictionary)) {
		root.style.setProperty("--"+var_name, color);
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