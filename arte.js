// Binder Johto · illustrazioni delle stampe e facce delle carte segnaposto (usate dall'app e dal «Viaggio»)
// ---- Stampe: illustrazioni originali oro su verde (63×88, formato carta) ----
const GOLD="#d8b765",BG="#15301f",PALE="#efe3bf",SIL="#d5dbe0";
const S=(d,w=.7,c=GOLD)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const CIR=(x,y,r,w=.7,f="none",c=GOLD)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" stroke="${c}" stroke-width="${w}"/>`;
const TXT=(t,x,y,sz,o="")=>`<text x="${x}" y="${y}" text-anchor="middle" font-family="'Shippori Mincho B1',Georgia,serif" font-size="${sz}" fill="${GOLD}" ${o}>${t}</text>`;
function frame(label,inner,opts={}){
  const sz=label.length>20?3.3:label.length>15?3.8:4.3;
  return `<svg viewBox="0 0 63 88" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}"><rect width="63" height="88" rx="3" fill="${BG}"/>${opts.under||""}<rect x="2.6" y="2.6" width="57.8" height="82.8" rx="2" fill="none" stroke="${GOLD}" stroke-width=".35"/>${inner}${label?`<path d="M14 72.5H49" stroke="${GOLD}" stroke-width=".25"/>`+TXT(label,31.5,79.5,sz,'letter-spacing=".25"'):""}</svg>`;
}
// glifi riutilizzabili, centrati in (x,y)
const G={
 wing:(x,y)=>S(`M${x-8} ${y+6}C${x-6} ${y-4} ${x+2} ${y-9} ${x+9} ${y-8}C${x+5} ${y-4} ${x+1} ${y} ${x-2} ${y+3}M${x-5} ${y+5}C${x-1} ${y+1} ${x+5} ${y-1} ${x+9} ${y-1}C${x+5} ${y+3} ${x} ${y+5} ${x-5} ${y+5}M${x-2} ${y+6}C${x+2} ${y+5} ${x+6} ${y+5} ${x+8} ${y+6}`),
 hive:(x,y)=>{let p="";for(let r of[8,4]){p+="M";for(let i=0;i<6;i++){const a=Math.PI/3*i+Math.PI/6;p+=`${(x+r*Math.cos(a)).toFixed(2)} ${(y+r*Math.sin(a)).toFixed(2)}${i<5?"L":"Z"}`}}return S(p)},
 plain:(x,y)=>CIR(x,y,8)+CIR(x,y,2.6,.7,GOLD),
 spiral:(x,y)=>{let p=`M${x} ${y}`;for(let t=0;t<=16;t+=.25){const r=t*.55;p+=`L${(x+r*Math.cos(t)).toFixed(2)} ${(y+r*Math.sin(t)).toFixed(2)}`}return S(p)},
 storm:(x,y)=>S(`M${x-9} ${y-3}q3-3 6 0t6 0 6 0M${x-9} ${y+1}q3-3 6 0t6 0 6 0M${x-9} ${y+5}q3-3 6 0t6 0 6 0M${x+1} ${y-10}l-4 6h5l-4 6`),
 mineral:(x,y)=>S(`M${x} ${y-10}L${x+7} ${y-3}L${x} ${y+10}L${x-7} ${y-3}ZM${x-7} ${y-3}H${x+7}M${x-3} ${y-3}L${x} ${y+10}L${x+3} ${y-3}M${x} ${y-10}L${x-3} ${y-3}M${x} ${y-10}L${x+3} ${y-3}`),
 ice:(x,y)=>{let p="";for(let i=0;i<6;i++){const a=Math.PI/3*i,c=Math.cos(a),s=Math.sin(a);p+=`M${x} ${y}L${(x+9*c).toFixed(2)} ${(y+9*s).toFixed(2)}`;const mx=x+5.5*c,my=y+5.5*s,b=Math.PI/4;p+=`M${mx.toFixed(2)} ${my.toFixed(2)}L${(mx+2.5*Math.cos(a+b)).toFixed(2)} ${(my+2.5*Math.sin(a+b)).toFixed(2)}M${mx.toFixed(2)} ${my.toFixed(2)}L${(mx+2.5*Math.cos(a-b)).toFixed(2)} ${(my+2.5*Math.sin(a-b)).toFixed(2)}`}return S(p)},
 rising:(x,y)=>{let p=`M${x-10} ${y+3}H${x+10}M${x-6} ${y+3}A6 6 0 0 1 ${x+6} ${y+3}`;for(let i=0;i<7;i++){const a=Math.PI+Math.PI/6*i;p+=`M${(x+8*Math.cos(a)).toFixed(2)} ${(y+3+8*Math.sin(a)).toFixed(2)}L${(x+11*Math.cos(a)).toFixed(2)} ${(y+3+11*Math.sin(a)).toFixed(2)}`}return S(p)},
 eye:(x,y)=>S(`M${x-10} ${y}Q${x} ${y-9} ${x+10} ${y}Q${x} ${y+9} ${x-10} ${y}`)+CIR(x,y,3.2)+CIR(x,y,1.2,.5,GOLD),
 shuriken:(x,y)=>S(`M${x} ${y-10}L${x+2.5} ${y-2.5}L${x+10} ${y}L${x+2.5} ${y+2.5}L${x} ${y+10}L${x-2.5} ${y+2.5}L${x-10} ${y}L${x-2.5} ${y-2.5}Z`)+CIR(x,y,1.6),
 stone:(x,y)=>S(`M${x-9} ${y+8}L${x-4} ${y-6}L${x+1} ${y-1}L${x+4} ${y-8}L${x+10} ${y+8}ZM${x-4} ${y-6}L${x-2} ${y+8}M${x+4} ${y-8}L${x+3} ${y+8}`),
 moon:(x,y)=>S(`M${x+3} ${y-9}A9 9 0 1 0 ${x+3} ${y+9}A7 7 0 1 1 ${x+3} ${y-9}Z`)+CIR(x+7,y-6,.8,.4,GOLD)+CIR(x+9,y+1,.6,.4,GOLD),
 crown:(x,y)=>S(`M${x-10} ${y+6}L${x-10} ${y-5}L${x-5} ${y+1}L${x} ${y-8}L${x+5} ${y+1}L${x+10} ${y-5}L${x+10} ${y+6}ZM${x-10} ${y+9}H${x+10}`)+CIR(x,y-9,1,.5,GOLD),
 star4:(x,y)=>S(`M${x} ${y-10}Q${x+1.5} ${y-1.5} ${x+10} ${y}Q${x+1.5} ${y+1.5} ${x} ${y+10}Q${x-1.5} ${y+1.5} ${x-10} ${y}Q${x-1.5} ${y-1.5} ${x} ${y-10}Z`,.7,SIL)
};
function pagoda(sun){
  let s=sun?CIR(45,24,8,0,GOLD).replace('stroke-width="0"','stroke-width="0" opacity=".9"'):"";
  s+=S("M31.5 9V18")+CIR(31.5,12,1)+CIR(31.5,15.5,1);
  for(let i=0;i<5;i++){const y=19+i*9,w=7+i*3.2;
    s+=`<path d="M${31.5-w-3} ${y+4}Q${31.5-w} ${y+2.5} ${31.5-w+1.5} ${y}H${31.5+w-1.5}Q${31.5+w} ${y+2.5} ${31.5+w+3} ${y+4}Z" fill="${BG}" stroke="${GOLD}" stroke-width=".7" stroke-linejoin="round"/>`;
    s+=S(`M${31.5-w*.7} ${y+4}V${y+9}M${31.5+w*.7} ${y+4}V${y+9}`)}
  return s+S("M10 66H53");
}
function lighthouse(glow){
  let s=`<path d="M36 26L57 18V36Z" fill="${GOLD}" opacity="${glow?.35:.18}"/><path d="M27 26L6 18V36Z" fill="${GOLD}" opacity="${glow?.25:.12}"/>`;
  if(glow) s+=CIR(31.5,27,6,0,"#f6d873").replace('stroke-width="0"','stroke-width="0" opacity=".85"');
  s+=S("M26.5 64L28.8 31H34.2L36.5 64ZM27.7 42H35.3M27 53H36")+S("M28.5 24H34.5V31H28.5ZM27.5 24L31.5 18.5L35.5 24")+S("M8 66Q14 62 20 65T33 65T46 64T56 66",.6);
  return s;
}
function mapPart(i){
  const towns=[["Borgo Foglianova","Fiorpescopoli","Violapoli","Azalina"],["Fiordoropoli","Amarantopoli","Olivinopoli","Fiorlisopoli"],["Mogania","Lago d'Ira","Ebanopoli","Monte Argento"]][i];
  const yAt=x=>40+7*Math.sin((x+i*63)/14);
  let p="M0 "+yAt(0).toFixed(2);for(let x=1;x<=63;x++)p+="L"+x+" "+yAt(x).toFixed(2);
  let s=S(p,.6)+S(p.replace(/(\d+\.\d+)/g,m=>(+m+1.6).toFixed(2)),.25);
  towns.forEach((t,k)=>{const x=9+k*15,y=yAt(x),up=k%2===0;
    s+=CIR(x,y,1.8,.6,BG)+CIR(x,y,.7,.3,GOLD)+`<text x="${x}" y="${(up?y-5:y+8).toFixed(2)}" text-anchor="middle" font-family="'Zen Kaku Gothic New',sans-serif" font-size="2.5" fill="${PALE}">${t}</text>`});
  if(i===0)s+=TXT("JOHTO",31.5,16,5,'letter-spacing="1.4"');
  if(i===2)s+=S("M50 12V22M45 17H55")+TXT("N",50,10.5,3);
  if(i===1)s+=S("M10 64Q20 61 31.5 64T53 64",.4);
  return s;
}
function puzzle(kind){
  let s="",x0=13.5,y0=18,c=9;
  if(kind==="spiral")s+=G.spiral(31.5,36).replace('stroke-width="0.7"','stroke-width="1"');
  else{for(let i=0;i<12;i++){const a=Math.PI/6*i;s+=S(`M${31.5+5*Math.cos(a)} ${36+5*Math.sin(a)}L${31.5+16*Math.cos(a)} ${36+16*Math.sin(a)}`,.8)}s+=CIR(31.5,36,4.5,.8)}
  s+=`<rect x="${x0+3*c}" y="${y0+3*c}" width="${c}" height="${c}" fill="${BG}"/>`;
  for(let k=0;k<=4;k++)s+=S(`M${x0} ${y0+k*c}H${x0+4*c}M${x0+k*c} ${y0}V${y0+4*c}`,.35);
  return s+`<rect x="${x0+3*c+3}" y="${y0+3*c+3}" width="${c}" height="${c}" fill="none" stroke="${GOLD}" stroke-width=".5" stroke-dasharray="1 1"/>`;
}
const ART={
 "Torre Campana":()=>pagoda(false),
 "Torre Campana al tramonto":()=>pagoda(true),
 "Faro di Olivinopoli":()=>lighthouse(false),
 "Amphy al faro":()=>lighthouse(true),
 "JOHTO · ジョウト地方":()=>TXT("JOHTO",31.5,42,11.5,'letter-spacing="1.2" font-weight="800"')+TXT("ジョウト地方",31.5,52,4.6,'letter-spacing="1.6"')+S("M12 30H51M12 58H51",.3)+CIR(31.5,22,3),
 "Mappa di Johto · 1/3":()=>mapPart(0),"Mappa di Johto · 2/3":()=>mapPart(1),"Mappa di Johto · 3/3":()=>mapPart(2),
 "Laboratorio di Elm":()=>S("M14 64V38H49V64ZM11 38L31.5 24L52 38M28 64V52H35V64M18 44H25V50H18ZM38 44H45V50H38Z")+S("M31.5 24V18M29 18H34",.6)+S("M8 66H55"),
 "Il rivale Silver":()=>G.star4(31.5,36)+S("M14 58H49",.3)+TXT("RIVALE",31.5,64,3.2,'letter-spacing="1.2"'),
 "Percorso 29":()=>S("M24 66C26 56 40 52 38 44S24 34 30 26S36 16 33 10",1)+S("M38 66C40 56 50 52 48 44",.4)+["12,54","16,40","46,30","50,58","20,24"].map(p=>{const[a,b]=p.split(",").map(Number);return S(`M${a-2} ${b}L${a-1} ${b-3}L${a} ${b}L${a+1} ${b-3.5}L${a+2} ${b}`,.5)}).join("")+CIR(52,18,4)+S("M52 22V27"),
 "Raffaello (Bugsy)":()=>G.hive(31.5,36)+TXT("CAPOPALESTRA",31.5,64,3,'letter-spacing="1"'),
 "Alfredo (Pryce)":()=>G.ice(31.5,36)+TXT("CAPOPALESTRA",31.5,64,3,'letter-spacing="1"'),
 "Porto di Olivinopoli":()=>S("M6 52H40V58H6ZM10 52V44H16V52M22 52V40H28V52M40 52L46 40",.6)+S("M6 60q4-3 8 0t8 0 8 0 8 0 8 0 8 0M6 66q4-3 8 0t8 0 8 0 8 0 8 0 8 0",.5)+S("M44 40V22M44 24L54 28L44 32",.6)+CIR(50,16,3),
 "Motonave Acqua":()=>S("M10 50H53L48 60H15ZM18 50V42H44V50M22 42V36H38V42M26 45H29M33 45H36M30 36V28M30 28L36 31",.7)+S("M6 64q4-3 8 0t8 0 8 0 8 0 8 0 8 0",.5)+S("M4 34q6-4 12 0",.4),
 "Farmacia di Fiorlisopoli":()=>S("M16 62V34H47V62ZM13 34L31.5 22L50 34M28 62V52H35V62")+S("M31.5 38V48M26.5 43H36.5",1.1)+S("M6 64q4-3 8 0t8 0 8 0 8 0 8 0 8 0",.5),
 "Furio (Chuck)":()=>G.storm(31.5,36)+TXT("CAPOPALESTRA",31.5,64,3,'letter-spacing="1"'),
 "Pozzo Slowpoke":()=>S("M20 44A11.5 3.5 0 0 0 43 44A11.5 3.5 0 0 0 20 44ZM20 44V60A11.5 3.5 0 0 0 43 60V44M18 44V22M45 44V22M15 24L31.5 15L48 24M31.5 18V40M29 40H34V45H29Z")+S("M20 50H43M20 55H43",.3),
 "Franz e le Ghicocche":()=>S("M8 22C20 26 34 22 56 30",.9)+[[18,34,"#c9514a"],[31,38,"#4f7fc4"],[44,40,"#e1c04a"]].map(([x,y,c])=>S(`M${x} ${y-24+((x===18)?13:x===31?11:14)}V${y-6}`,.4)+CIR(x,y,5.5,.7,c).replace(`fill="${c}"`,`fill="${c}" fill-opacity=".55"`)+S(`M${x+1} ${y-5.5}q3-3 5-1`,.5)).join(""),
 "Santuario di Lecci":()=>S("M24 40H39V56H24ZM21 40L31.5 33L42 40M22 56H41V60H22ZM29 46H34V56")+S("M12 60L8 60L12 30L16 60ZM51 60L47 60L51 26L55 60",.6)+S("M6 62H57"),
 "Parco Nazionale":()=>S("M18 58H45M22 58V54H41V58M27 54V46H36V54M31.5 46V38")+S("M31.5 38C28 34 24 36 23 42M31.5 38C35 34 39 36 40 42",.5)+CIR(12,40,5)+S("M12 45V58")+CIR(51,36,6)+S("M51 42V58")+S("M6 60H57"),
 "Treno Magnetico":()=>S("M6 62L28 30M57 62L35 30M10 56H53M15 49H48M20 42H43",.4)+S("M22 46C22 36 26 30 31.5 30C37 30 41 36 41 46ZM25 46H38M27 37H36"),
 "Amarantopoli":()=>S("M31.5 12V20M24 24Q31.5 18 39 24H24M26 24V30M37 24V30M22 31Q31.5 25 41 31Z")+[[12,46,8],[24,50,7],[40,48,8],[52,52,6]].map(([x,y,w])=>`<path d="M${x-w-2} ${y}Q${x} ${y-6} ${x+w+2} ${y}Z" fill="${BG}" stroke="${GOLD}" stroke-width=".7"/>`+S(`M${x-w+1} ${y}V${y+9}H${x+w-1}V${y}`,.5)).join("")+S("M6 62H57"),
 "Teatro delle Danze":()=>S("M8 14H55M8 14C14 30 12 50 16 62M55 14C49 30 51 50 47 62M10 20C20 22 28 18 31.5 20C35 18 43 22 53 20")+S("M18 62H45",.8)+fan(31.5,52,9),
 "Le cinque ragazze kimono":()=>[0,1,2,3,4].map(i=>fan(11+i*10.25,46-Math.abs(i-2)*3,6)).join("")+S("M8 60H55",.3),
 "Lago d'Ira":()=>CIR(46,20,5)+[30,38,46,54].map((y,k)=>S(`M${6+k*2} ${y}q4-4 8 0t8 0 8 0 8 0 8 0 8 0`,.6)).join("")+S("M6 26H57",.3),
 "Isole Vorticose":()=>G.spiral(22,32)+G.spiral(44,46).replace(/d="/,'transform="scale(1)" d="')+S("M6 60q4-3 8 0t8 0 8 0 8 0 8 0 8 0",.5)+S("M42 22L46 16L50 22",.5),
 "Ala d'Argento":()=>feather(SIL),
 "Piuma Iridata":()=>feather("url(#rb)"),
 "Via Gelata":()=>S("M8 64V32Q31.5 8 55 32V64",.6)+[[20,64,6,18],[31.5,64,7,26],[43,64,6,16],[26,24,3,-9],[38,24,3,-8]].map(([x,y,w,h])=>S(`M${x-w/2} ${y}L${x} ${y-h}L${x+w/2} ${y}`,.7)).join("")+G.ice(46,40).replace('stroke-width="0.7"','stroke-width=".4"'),
 "Tana del Drago":()=>S("M22 42H41V50H22ZM19 42L31.5 34L44 42M18 50H45")+S("M6 56q4-3 8 0t8 0 8 0 8 0 8 0 8 0M6 62q4-3 8 0t8 0 8 0 8 0 8 0 8 0",.5)+[14,49].map(x=>S(`M${x} 52V30`,.5)+CIR(x,28,2,.6,"#f6d873").replace('fill="#f6d873"','fill="#f6d873" fill-opacity=".6"')).join(""),
 "Il risveglio":()=>S("M20 66V46L24 40L22 34H41L39 40L43 46V66M18 34L31.5 26L45 34",.7)+S("M26 40L29 44L27 48M36 42L34 46",.4)+[[18,18,"#e8c64a"],[31.5,12,"#d65a3a"],[45,18,"#5aa7d6"]].map(([x,y,c])=>CIR(x,y,2.6,0,c).replace('stroke-width="0"','stroke-width="0" fill-opacity=".9"')+S(`M${x} ${y+3}Q${x+(x<31?3:x>32?-3:0)} ${y+9} ${31.5} 26`,.3,c)).join(""),
 "Sala d'Onore":()=>laurel()+G.star4(31.5,32).replace(new RegExp(SIL,"g"),GOLD),
 "Diploma di Campione":()=>S("M14 22H49V54H14ZM12 20V24M51 52V56M14 22C10 22 10 26 14 26M49 54C53 54 53 50 49 50M20 30H43M20 35H43M20 40H36",.6)+CIR(40,50,5)+S("M37 54L35 62L38 60L40 63M43 54L45 62L42 60L40 63",.5),
 "Monte Argento":()=>S("M6 62L20 34L26 42L34 22L44 38L48 32L57 62")+S("M30 28L34 22L38 30L35 28L32 31ZM17 40L20 34L23 39",.6,PALE)+S("M10 50H24M36 46H52M14 56H30",.3),
 "« … »":()=>TXT("« … »",31.5,44,10),
 "Stanza di Pino":()=>room(G.eye),"Stanza di Koga":()=>room(G.shuriken),"Stanza di Bruno":()=>room(G.stone),"Stanza di Karen":()=>room(G.moon),"Stanza del Campione":()=>room(G.crown,true),
 "Enigma di Kabuto":()=>puzzle("spiral"),"Enigma di Ho-Oh":()=>puzzle("sun")
};
const MEDALS={Sasso:["I",G.stone],Cascata:["II",G.storm],Tuono:["III",G.storm],Arcobaleno:["IV",G.rising],Anima:["V",G.eye],Palude:["VI",G.spiral],Vulcano:["VII",G.rising],Terra:["VIII",G.mineral],Zefiro:["I",G.wing],Alveare:["II",G.hive],Piana:["III",G.plain],Nebbia:["IV",G.spiral],Tempesta:["V",G.storm],Minerale:["VI",G.mineral],Gelo:["VII",G.ice],Levante:["VIII",G.rising]};
function fan(x,y,r){let p=`M${x} ${y}L${x-r} ${y-r*.75}A${r*1.25} ${r*1.25} 0 0 1 ${x+r} ${y-r*.75}Z`;for(let i=1;i<5;i++){const a=Math.PI*(1.15+.7*i/5);p+=`M${x} ${y}L${(x+r*1.25*Math.cos(a)).toFixed(2)} ${(y+r*1.25*Math.sin(a)).toFixed(2)}`}return S(p,.5)}
function feather(c){const d=`M20 64C24 50 30 30 44 14C48 26 42 44 26 58Z`;let s=`<defs><linearGradient id="rb" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#d65a3a"/><stop offset=".35" stop-color="#e8c64a"/><stop offset=".65" stop-color="#5fb07a"/><stop offset="1" stop-color="#5a8fd6"/></linearGradient></defs>`;
  s+=`<path d="${d}" fill="none" stroke="${c}" stroke-width=".9" stroke-linejoin="round"/>`+S("M18 68C26 50 34 32 44 14",.6,c==="url(#rb)"?GOLD:c);
  for(let i=0;i<8;i++){const t=i/8,x=22+t*19,y=56-t*38;s+=S(`M${x.toFixed(1)} ${y.toFixed(1)}l${-4+t*2} ${-1-t}M${x.toFixed(1)} ${y.toFixed(1)}l${5-t*2} ${-2}`,.35,c==="url(#rb)"?GOLD:c)}return s}
function room(gl,gold){return `<path d="M17 64V32Q31.5 14 46 32V64" fill="${gold?"#2a3f1d":"none"}" stroke="${GOLD}" stroke-width=".7"/>`+S("M13 64H50M17 64L13 68M46 64L50 68",.4)+gl(31.5,44)}
function laurel(){let s="";for(const sg of[-1,1]){s+=S(`M${31.5+sg*4} 62C${31.5+sg*20} 56 ${31.5+sg*20} 30 ${31.5+sg*10} 18`,.6);for(let i=0;i<6;i++){const t=i/6,x=31.5+sg*(6+16*Math.sin(t*2.6)),y=58-t*38;s+=`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="1.4" ry="3" transform="rotate(${sg*(40-t*40)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="none" stroke="${GOLD}" stroke-width=".5"/>`}}return s}
function medal(nm){const[r,gl]=MEDALS[nm];return CIR(31.5,38,17,.8)+CIR(31.5,38,13.5,.4)+gl(31.5,39)+TXT(r,31.5,16.5,3.4,'letter-spacing=".6"')}
function fallbackArt(n){
  if(/Palestra/.test(n))return room(G.plain);
  if(/Torre|campane|Saggio/.test(n))return pagoda(/tramonto|Arcobaleno|Ho-Oh/.test(n));
  if(/faro/i.test(n))return lighthouse(/luce|Cima/i.test(n));
  if(/Lago|mare|isole|Isole|Spiaggia|Porto|porto|cascata|abissi|Percorso 4[013]|Caffè/.test(n))return S("M6 40q4-3 8 0t8 0 8 0 8 0 8 0 8 0M6 48q4-3 8 0t8 0 8 0 8 0 8 0 8 0M6 56q4-3 8 0t8 0 8 0 8 0 8 0 8 0",.6)+CIR(46,22,5);
  if(/Grotta|Monte|montagna|Vittoria|vetta|Altopiano/.test(n))return S("M6 62L20 34L26 42L34 22L44 38L48 32L57 62")+S("M30 28L34 22L38 30",.6,PALE);
  if(/Percorso|Parco|Bosco|Fattoria|Gara|Annaffiatoio|Notte|Fiorpescopoli|Violapoli|Biancavilla|Kanto/.test(n))return S("M24 66C26 56 40 52 38 44S24 34 30 26S36 16 33 10",1)+S("M10 60L13 50L16 60ZM48 58L51 46L54 58Z",.6)+CIR(50,18,4);
  if(/Uovo/.test(n))return `<ellipse cx="31.5" cy="40" rx="11" ry="14" fill="none" stroke="${GOLD}" stroke-width=".8"/>`+S("M21 42l4-3 4 3 4-3 4 3 4-3 3 2",.5);
  if(/Silver|Eusine|Furio|Raffaello|Alfredo/.test(n))return G.star4(31.5,36)+TXT("PERSONAGGIO",31.5,64,3,'letter-spacing="1"');
  if(/Shining|cromatic|Scaglia/.test(n))return G.star4(31.5,38).replace(new RegExp(SIL,"g"),GOLD)+G.star4(20,24).replace(new RegExp(SIL,"g"),GOLD).replace(/M20/,"M20");
  return G.star4(31.5,38);
}
function art(x){
  if(RICH[x.n])return RICH[x.n]();
  if(/^Medaglia /.test(x.n))return frame(x.n,medal(x.n.slice(9)));
  const f=ART[x.n];
  const label=x.n==="JOHTO · ジョウト地方"||x.n==="« … »"?"":x.n.replace(/ \((Bugsy|Pryce|Chuck)\)/,"").replace(/^Mappa di Johto · /,"Johto · ");
  return frame(label,f?f():fallbackArt(x.n));
}

function cardLink(x){if(x.n==="Guardia Forestale")return "https://www.google.com/search?tbm=isch&q="+encodeURIComponent("Guardia Forestale carta Pokémon e-Card");
 const set=x.s.split(" · ")[0];return "https://www.google.com/search?tbm=isch&q="+encodeURIComponent(enName(x.n)+" "+set+" pokemon card");}
// ---- Stampe "finite": cielo, atmosfera, foil dorato e grana di carta (pagina 1) ----
let RID=0;
function rich(label,build){
  const id="r"+(++RID);
  const d={foil:`url(#${id}f)`,id};
  const body=build(d);
  const sz=label.length>20?3.3:label.length>15?3.8:4.3;
  return `<svg viewBox="0 0 63 88" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label||"JOHTO"}">
<defs>
 <linearGradient id="${id}f" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a97f2c"/><stop offset=".35" stop-color="#f4dd96"/><stop offset=".55" stop-color="#c79a3d"/><stop offset=".8" stop-color="#f0d488"/><stop offset="1" stop-color="#9c7428"/></linearGradient>
 <filter id="${id}g" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="${RID}"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 .95  0 0 0 0 .8  0 0 0 .07 0"/></filter>
 <filter id="${id}e"><feGaussianBlur stdDeviation=".25"/></filter>
 ${body.defs||""}
</defs>
<rect width="63" height="88" rx="3" fill="#122a1c"/>
${body.bg||""}
<rect width="63" height="88" rx="3" filter="url(#${id}g)"/>
${body.fg||""}
<rect x="2.6" y="2.6" width="57.8" height="82.8" rx="2" fill="none" stroke="${d.foil}" stroke-width=".45"/>
<rect x="3.6" y="3.6" width="55.8" height="80.8" rx="1.6" fill="none" stroke="${d.foil}" stroke-width=".15" opacity=".7"/>
${label?`<rect x="8" y="71.2" width="47" height="12" fill="#122a1c" opacity=".75"/><path d="M14 72.8H49" stroke="${d.foil}" stroke-width=".3"/><text x="31.5" y="79.6" text-anchor="middle" font-family="'Shippori Mincho B1',Georgia,serif" font-size="${sz}" fill="${d.foil}" letter-spacing=".3">${label}</text>`:""}
</svg>`;
}
const R={
 sky:(id,a,b,c)=>`<linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".62" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>`,
 glow:(id,col)=>`<radialGradient id="${id}h"><stop offset="0" stop-color="${col}" stop-opacity=".95"/><stop offset=".35" stop-color="${col}" stop-opacity=".35"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient>`,
 stars:(n,seed,ymax=34)=>{let s="",r=seed;const rnd=()=>(r=(r*9301+49297)%233280)/233280;for(let i=0;i<n;i++){const x=5+rnd()*53,y=5+rnd()*(ymax-5),k=rnd();s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(.18+k*.32).toFixed(2)}" fill="#f6e6b4" opacity="${(.35+k*.55).toFixed(2)}"/>`}return s},
 mist:(y,o=.07)=>`<ellipse cx="20" cy="${y}" rx="26" ry="2.4" fill="#e9f0e6" opacity="${o}"/><ellipse cx="44" cy="${y+3}" rx="24" ry="2" fill="#e9f0e6" opacity="${o*.8}"/>`,
 pines:(y,xs,col="#0b1d13")=>xs.map(([x,h])=>`<path d="M${x} ${y-h}L${x+h*.32} ${y}H${x-h*.32}Z" fill="${col}"/>`).join("")
};
const RICH={
 "Torre Campana":()=>rich("Torre Campana",d=>{
   let p="";
   for(let i=0;i<5;i++){const y=21+i*8.6,w=6.2+i*3.1;
     p+=`<path d="M${31.5-w*.72} ${y+3.6}V${y+8.6}H${31.5+w*.72}V${y+3.6}" fill="#173826" stroke="${d.foil}" stroke-width=".35"/>`;
     for(let k=-2;k<=2;k++)p+=`<rect x="${(31.5+k*w*.26-.6).toFixed(2)}" y="${y+5.2}" width="1.2" height="2" fill="#f2c96a" opacity="${.35+.12*(2-Math.abs(k))}"/>`;
     p+=`<path d="M${31.5-w-3.4} ${y+4.2}Q${31.5-w-.6} ${y+3} ${31.5-w+1.2} ${y}H${31.5+w-1.2}Q${31.5+w+.6} ${y+3} ${31.5+w+3.4} ${y+4.2}Q${31.5} ${y+3} ${31.5-w-3.4} ${y+4.2}Z" fill="#0f2419" stroke="${d.foil}" stroke-width=".6" stroke-linejoin="round"/>`;
     p+=`<circle cx="${31.5-w-3}" cy="${y+5.6}" r=".55" fill="${d.foil}"/><circle cx="${31.5+w+3}" cy="${y+5.6}" r=".55" fill="${d.foil}"/>`}
   p+=`<path d="M31.5 8.5V21" stroke="${d.foil}" stroke-width=".7"/>`+[11,13.6,16.2].map(y=>`<ellipse cx="31.5" cy="${y}" rx="1.4" ry=".55" fill="none" stroke="${d.foil}" stroke-width=".4"/>`).join("")+`<circle cx="31.5" cy="8" r=".8" fill="${d.foil}"/>`;
   p+=`<path d="M17 64.5H46L48 66.6H15Z" fill="#173826" stroke="${d.foil}" stroke-width=".4"/>`;
   return{defs:R.sky(d.id,"#0d2219","#1f4630","#7b6430")+R.glow(d.id,"#f3cf72"),
    bg:`<rect width="63" height="88" fill="url(#${d.id}s)"/>`+R.stars(22,7,26)+`<circle cx="31.5" cy="47" r="30" fill="url(#${d.id}h)" opacity=".55"/>`+R.mist(58,.06)+R.pines(68,[[7,9],[11,12],[15,8],[49,10],[53,13],[57,8]])+`<rect y="67.5" width="63" height="21" fill="#0b1d13"/>`,
    fg:p+R.mist(66,.08)}}),
 "Faro di Olivinopoli":()=>rich("Faro di Olivinopoli",d=>{
   let sea="";for(let i=0;i<7;i++){const y=55+i*2.1;sea+=`<path d="M${4+i%2*3} ${y}q2.5-1 5 0t5 0 5 0 5 0 5 0 5 0 5 0 5 0 5 0 5 0" fill="none" stroke="#9fc3b0" stroke-width=".25" opacity="${.5-i*.05}"/>`}
   const refl=[0,1,2,3,4].map(i=>`<rect x="${30.3-i*.4}" y="${56+i*2.2}" width="${2.4+i*.8}" height=".5" fill="#f6d873" opacity="${.55-i*.09}"/>`).join("");
   return{defs:R.sky(d.id,"#0b1d17","#173a2d","#2c5246")+R.glow(d.id,"#ffe08a")+`<linearGradient id="${d.id}b" x1="0" x2="1"><stop offset="0" stop-color="#ffe08a" stop-opacity=".45"/><stop offset="1" stop-color="#ffe08a" stop-opacity="0"/></linearGradient><linearGradient id="${d.id}c" x1="1" x2="0"><stop offset="0" stop-color="#ffe08a" stop-opacity=".3"/><stop offset="1" stop-color="#ffe08a" stop-opacity="0"/></linearGradient>`,
    bg:`<rect width="63" height="88" fill="url(#${d.id}s)"/>`+R.stars(26,3,40)+`<path d="M52 12a5 5 0 1 0 3 8a4 4 0 1 1-3-8z" fill="#efe2b8" opacity=".85"/>`+`<path d="M34 27L63 16V40Z" fill="url(#${d.id}b)"/><path d="M29 27L0 18V36Z" fill="url(#${d.id}c)"/>`+`<rect y="54" width="63" height="34" fill="#0d241b"/>`+sea+refl,
    fg:`<circle cx="31.5" cy="27" r="9" fill="url(#${d.id}h)"/>`+
     `<path d="M26.3 54L28.7 31.5H34.3L36.7 54Z" fill="#e9e1c9"/><path d="M27.4 43.5L35.6 43.5L36 47.5H27Z" fill="#a8473a"/><path d="M28.3 35.5H34.7L35 38.5H28Z" fill="#a8473a"/>`+
     `<path d="M26.3 54L28.7 31.5H34.3L36.7 54Z" fill="none" stroke="${d.foil}" stroke-width=".45"/>`+
     `<rect x="28.4" y="24.5" width="6.2" height="6.4" fill="#ffe7a0" stroke="${d.foil}" stroke-width=".45"/><path d="M28.4 27.7H34.6M31.5 24.5V30.9" stroke="#a37a2a" stroke-width=".25"/><path d="M27.2 24.5L31.5 19.4L35.8 24.5Z" fill="#0f2419" stroke="${d.foil}" stroke-width=".45"/><path d="M27 31.4H36" stroke="${d.foil}" stroke-width=".7"/><circle cx="31.5" cy="18.8" r=".6" fill="${d.foil}"/>`+
     `<path d="M14 58Q18 52 24 54L27 53H37L41 54Q47 52 50 58Z" fill="#0a1a12" stroke="${d.foil}" stroke-width=".35"/>`}}),
 "JOHTO · ジョウト地方":()=>rich("",d=>{
   let rays="";for(let i=0;i<24;i++){const a=Math.PI*2*i/24,r1=i%2?6.5:7.5,r2=i%2?9:11;rays+=`<path d="M${(31.5+r1*Math.cos(a)).toFixed(2)} ${(22+r1*Math.sin(a)).toFixed(2)}L${(31.5+r2*Math.cos(a)).toFixed(2)} ${(22+r2*Math.sin(a)).toFixed(2)}" stroke="${d.foil}" stroke-width="${i%2?.25:.45}"/>`}
   return{defs:R.glow(d.id,"#f3cf72"),
    bg:`<circle cx="31.5" cy="44" r="34" fill="url(#${d.id}h)" opacity=".18"/>`+R.stars(16,11,70),
    fg:rays+`<circle cx="31.5" cy="22" r="4.6" fill="${d.foil}"/>`+
     `<path d="M10 31.5H53" stroke="${d.foil}" stroke-width=".3"/><path d="M27 31.5l4.5-1.6 4.5 1.6-4.5 1.6z" fill="${d.foil}"/>`+
     `<text x="31.8" y="45.8" text-anchor="middle" font-family="'Shippori Mincho B1',Georgia,serif" font-weight="800" font-size="12" letter-spacing="1.1" fill="#07130d" opacity=".55">JOHTO</text>`+
     `<text x="31.5" y="45.4" text-anchor="middle" font-family="'Shippori Mincho B1',Georgia,serif" font-weight="800" font-size="12" letter-spacing="1.1" fill="${d.foil}">JOHTO</text>`+
     `<text x="31.5" y="54" text-anchor="middle" font-family="'Shippori Mincho B1',Georgia,serif" font-size="4.6" letter-spacing="1.6" fill="${d.foil}">ジョウト地方</text>`+
     `<path d="M10 59.5H53" stroke="${d.foil}" stroke-width=".3"/>`+
     `<path d="M18 67Q24 63 31.5 67Q39 63 45 67" fill="none" stroke="${d.foil}" stroke-width=".4"/>`+
     `<text x="31.5" y="76" text-anchor="middle" font-family="'Zen Kaku Gothic New',sans-serif" font-size="2.6" letter-spacing=".5" fill="#d9c79a">COLLEZIONE · 24 PAGINE</text>`}}),
 "Laboratorio di Elm":()=>rich("Laboratorio di Elm",d=>{
   const win=(x,y)=>`<rect x="${x}" y="${y}" width="6" height="6" fill="#ffd77a" opacity=".9"/><path d="M${x+3} ${y}V${y+6}M${x} ${y+3}H${x+6}" stroke="#7a5a1c" stroke-width=".3"/><rect x="${x}" y="${y}" width="6" height="6" fill="none" stroke="${d.foil}" stroke-width=".35"/>`;
   return{defs:R.sky(d.id,"#16352a","#3c6a52","#d7b46a")+R.glow(d.id,"#ffd77a"),
    bg:`<rect width="63" height="88" fill="url(#${d.id}s)"/><circle cx="48" cy="40" r="6" fill="#f6dc8a" opacity=".85"/>`+R.mist(34,.08)+`<path d="M0 52Q16 47 32 50T63 49V88H0Z" fill="#1d3f2c"/><path d="M0 58Q20 54 40 57T63 56V88H0Z" fill="#14301f"/>`,
    fg:`<circle cx="31.5" cy="44" r="18" fill="url(#${d.id}h)" opacity=".25"/>`+
     `<path d="M15 60V40H48V60Z" fill="#e6dcc0" stroke="${d.foil}" stroke-width=".45"/><path d="M12 40.5L31.5 28L51 40.5Z" fill="#2b5a40" stroke="${d.foil}" stroke-width=".5"/>`+
     win(18.5,44)+win(38.5,44)+`<path d="M28.5 60V50.5H34.5V60" fill="#5b3f22" stroke="${d.foil}" stroke-width=".4"/><circle cx="33.4" cy="55.5" r=".35" fill="${d.foil}"/>`+
     `<path d="M31.5 28V22.5M29 22.5H34M30 20.5L33 24.5M33 20.5L30 24.5" stroke="${d.foil}" stroke-width=".4"/>`+
     `<path d="M25 64Q31.5 60 34.5 60H28.5Q24 61 22 64Z" fill="#c9b98e" opacity=".55"/>`+
     `<path d="M4 61H13M50 61H59" stroke="${d.foil}" stroke-width=".35"/>`+[5,7.5,10,12.5,50.5,53,55.5,58].map(x=>`<path d="M${x} 61V58.3" stroke="${d.foil}" stroke-width=".35"/>`).join("")+
     `<circle cx="9" cy="47" r="5" fill="#173826" stroke="${d.foil}" stroke-width=".35"/><path d="M9 52V61" stroke="${d.foil}" stroke-width=".5"/>`}}),
};
function richMap(i){
  const towns=[["Borgo Foglianova","Fiorpescopoli","Violapoli","Azalina"],["Fiordoropoli","Amarantopoli","Olivinopoli","Fiorlisopoli"],["Mogania","Lago d'Ira","Ebanopoli","Monte Argento"]][i];
  return rich("Johto · "+(i+1)+"/3",d=>{
    const yAt=x=>40+7*Math.sin((x+i*63)/14);
    let route="M0 "+yAt(0).toFixed(2);for(let x=1;x<=63;x++)route+="L"+x+" "+yAt(x).toFixed(2);
    let topo="";for(let k=0;k<6;k++){let p="";for(let x=0;x<=63;x+=1.5){const X=x+i*63,y=12+k*10+2.2*Math.sin(X/9+k)+1.4*Math.sin(X/4.3+k*2);p+=(x?"L":"M")+x+" "+y.toFixed(2)}topo+=`<path d="${p}" fill="none" stroke="#7fa38c" stroke-width=".18" opacity=".45"/>`}
    let deco="";
    if(i===0)deco+=R.pines(66,[[8,5],[11,6.5],[14,5],[47,5.5],[50,7],[53,5]],"#2c5a3e")+`<text x="31.5" y="15" text-anchor="middle" font-family="'Shippori Mincho B1',serif" font-size="5" letter-spacing="1.4" fill="${d.foil}">JOHTO</text>`;
    if(i===1){for(let k=0;k<4;k++)deco+=`<path d="M${34+k*5} ${60+k%2*3}q1.2-1 2.4 0t2.4 0" fill="none" stroke="#9fc3b0" stroke-width=".35"/>`;deco+=`<path d="M8 66L13 58L16 62L19 57L24 66Z" fill="#2c5a3e" opacity=".8"/>`}
    if(i===2){deco+=`<path d="M38 64L45 52L48 56L52 48L59 64Z" fill="#2c5a3e"/><path d="M50.5 50.5L52 48L53.6 51.3L52 50.6Z" fill="#efe3bf"/>`;
      let cr="";for(let k=0;k<8;k++){const a=Math.PI/4*k-Math.PI/2,r=k%2?2.4:5.5;cr+=`<path d="M50 16L${(50+r*Math.cos(a-.25)).toFixed(2)} ${(16+r*Math.sin(a-.25)).toFixed(2)}L${(50+(k%2?2.4:5.5)*Math.cos(a)).toFixed(2)} ${(16+(k%2?2.4:5.5)*Math.sin(a)).toFixed(2)}Z" fill="${d.foil}" opacity="${k%2?.6:1}"/>`}
      deco+=`<circle cx="50" cy="16" r="6.6" fill="none" stroke="${d.foil}" stroke-width=".25"/>`+cr+`<text x="50" y="8.4" text-anchor="middle" font-family="'Shippori Mincho B1',serif" font-size="2.6" fill="${d.foil}">N</text>`}
    let dots="";towns.forEach((t,k)=>{const x=9+k*15,y=yAt(x),up=k%2===0;
      dots+=`<circle cx="${x}" cy="${y.toFixed(2)}" r="2" fill="#122a1c" stroke="${d.foil}" stroke-width=".55"/><circle cx="${x}" cy="${y.toFixed(2)}" r=".75" fill="${d.foil}"/><text x="${k===0?x-1.5:k===3?x+1.5:x}" y="${(up?y-4.6:y+7.4).toFixed(2)}" text-anchor="${k===0?"start":k===3?"end":"middle"}" font-family="'Zen Kaku Gothic New',sans-serif" font-size="2.5" fill="#efe3bf">${t}</text>`});
    return{bg:`<rect width="63" height="88" fill="#16331f"/>`+topo,
      fg:deco+`<path d="${route}" fill="none" stroke="#07130d" stroke-width="1.6" opacity=".5"/><path d="${route}" fill="none" stroke="${d.foil}" stroke-width=".8" stroke-dasharray="2.2 1"/>`+dots}});
}
RICH["Mappa di Johto · 1/3"]=()=>richMap(0);RICH["Mappa di Johto · 2/3"]=()=>richMap(1);RICH["Mappa di Johto · 3/3"]=()=>richMap(2);

// ---- Placeholder originali per le carte: colore per epoca, simbolo per categoria ----
const ERA_COL=[
 [/Fossil/,"WotC","1999","#3d5a2a"],[/Neo /,"Neo","2000–02","#1f5b5a"],[/Expedition|Aquapolis|e-Card/,"e-Card","2002–03","#2f4a72"],[/Legends Awakened/,"DP","2008","#4b3a72"],
 [/HeartGold|Unleashed|Undaunted|Triumphant|Call of Legends/,"HGSS","2010–11","#7a5a1c"],[/XY /,"XY","2016","#2d5f8a"],
 [/Lost Thunder|Team Up|Unbroken Bonds|Cosmic Eclipse|Dragon Majesty/,"Sole e Luna","2018–19","#8a4a1e"],
 [/Brilliant Stars|Astral Radiance|Silver Tempest|Crown Zenith|Battle Styles/,"Spada e Scudo","2021–23","#7a2335"],
 [/Paldea|Obsidian|Paradox Rift|Stellar Crown|Surging Sparks|Journey Together|Destined Rivals|Temporal Forces|Shrouded Fable/,"Scarlatto e Violetto","2023–25","#55306e"],
 [/Ascended Heroes|Mega Evolution|30th Celebration/,"Mega Evoluzione","2025–26","#8c2a24"]];
function era(x){for(const[r,n,y,c]of ERA_COL)if(r.test(x.s))return{n,y,c};return{n:"",y:"",c:"#3a4a40"}}
const TRAINERS=/^(Cinturanera|Tifo|Chiacchiere|Giudice|Domande|Professor|Metodo|PokéGear|Bill|Teletrasporto|Pescatore|Trucco|Sguardo|Lezione|Avventura|Valerio|Allenamento|Muro|Chiara|Latte|Fioraia|Sala Giochi|Mary|Angelo|Determinazione|Jasmine|Covo|Ariana|Archer|Proton|Pino|Trappola|Bruno|Karen|Lance|Sfida|Guardia|Litografia)/;
function cat(x){if(/Stadio/.test(x.s))return"stadio";if(/^Energia/.test(x.n))return"energia";if(TRAINERS.test(x.n)||/del Team Rocket$/.test(x.n)&&!/(Houndoom|Murkrow|Crobat|Wobbuffet)/.test(x.n))return"allenatore";return"pokemon"}
const CATL={pokemon:"Pokémon",allenatore:"Allenatore",stadio:"Stadio",energia:"Energia"};
const GLYPH={
 pokemon:'<svg viewBox="0 0 24 24"><path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z"/></svg>',
 allenatore:'<svg viewBox="0 0 24 24"><path d="M6 3h12v14l-6 4-6-4z"/><path d="M9 8h6M9 12h6"/></svg>',
 stadio:'<svg viewBox="0 0 24 24"><path d="M3 21V10L12 3l9 7v11"/><path d="M8 21v-6a4 4 0 018 0v6"/></svg>',
 energia:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M13 5l-4 8h4l-2 6"/></svg>'};
const FOIL=/holo|IR|SIR|Full Art|TG\d|GG\d|Prime|LEGEND|segreta|Prism/;
function cardFace(x){const e=era(x),k=cat(x);const tags=x.f.filter(f=>TAGL[f]).map(f=>`<span class="tag ${f}">${TAGL[f]}</span>`).join("");
 return `<span class="ph-top"><span class="ph-era">${e.n}</span><span class="ph-cat">${CATL[k]}</span></span><span class="ph-glyph">${GLYPH[k]}</span><span class="nm">${esc(x.n)}</span><span class="st">${esc(x.s)}</span><span class="tags">${tags}</span><span class="go" aria-hidden="true">↗</span>`}

