// Ok if you want you can try to read the splash texts here, but where's the fun in that??
const splash_secret = "yfirret os eno knip eht§3< mehtna lanoitan naidanaC etirovaf ym si maj eht pu pmuP§snaidar π4 rep eciwt thgir llits si ssapmoc nekorb A§)si ti( ynnuf tons ti§ano e ala anos anis al oji e anop ikot ala nek anis§:lluks: rallid yracs livE§ᔨïıᏞ⊂§.htoot doog yllaer yllaer eno naht ,hteet ko fo hcnub a evah rehtar dluow I§)ytterp s'ti kniht i tnof eht( .efil si retnI ,evol si retnI§·-· · -·- ·-·- -·· ·-·· ·-· · ···· - --- --§?edoc esrom wonk I wonk uoy diD§3< nwodkram yrram ot tnaw I§3< devoleb ym xobxelF§?etis siht dnif neve uoy did woh§.smrow otni nrut yletelpmoc lliw tI .smrow otni nrut dna§.sruoy ton dna ,etisbew ym s'ti esuaceb ,tnaw I revetahw etirw I erehw etisbew eht ,oi.buhtig.tarelomdesserdeht ot emocleW§sthguoht ruoy rof sthguoht ot emocleW§!?ymonoce siht nI ?gnitsoh fleS§(: tidderbus tnof a saw ereht dias I nehw gnikoj saw I hguoht sdneirf yM§.amam hO§?sredneg s'llay era tahw oS§.stinaemhcs stinaeP§kO ?dnilb era star-elom wonk uoy diD§)3 yllaretil( rebmun a 'gnirevocsid' reliO§?daeh ruoy ni gnippuhsam emit emas eht ta sgnos lareves evah reve uoy oD§?gnidoc rof retteb yllaretil era stnof lanoitroporp wonk uoy diD§reh dekil I ijome gnihgual gniyrc eht kcab gnirb ew naC§tiaw !!hsilgne ot ipip am okos etalsnart t'noD";
let splash_texts = [...splash_secret].reverse().join('').split('§');
let current_index = Math.floor(Math.random() * splash_texts.length);

const splash_element = document.getElementById("splash");

function splash() {
	current_index = (current_index + 1) % splash_texts.length;
	splash_element.innerHTML = splash_texts[current_index];
}

splash();