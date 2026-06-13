"use client";
// ─── PWA SETUP ────────────────────────────────────────────────────────────────
// Add these to app/layout.tsx:
// <meta name="theme-color" content="#f7f4ef" />
// <meta name="apple-mobile-web-app-capable" content="yes" />
// <meta name="apple-mobile-web-app-status-bar-style" content="default" />
// <meta name="apple-mobile-web-app-title" content="Salt" />
// <link rel="manifest" href="/manifest.json" />
// Create public/manifest.json: { name:"Salt", short_name:"Salt", start_url:"/", display:"standalone", theme_color:"#f7f4ef" }
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from "react";

const CDN = "https://res.cloudinary.com/dhok4m7m3/image/upload/q_auto/f_auto";
const PHOTOS: Record<string, string> = {
  home_hero:      `${CDN}/v1780744556/IMG_0064_kfqr1e.jpg`,
  marseille_hero: `${CDN}/IMG_0063_zaxibl`,
  vallon:         `${CDN}/v1780744556/IMG_0062_fkpv1u.jpg`,
  rocks:          `${CDN}/v1780744557/IMG_0065_nmuuo2.jpg`,
  livingston:     `${CDN}/v1780744556/IMG_0066_xz7yyu.jpg`,
  le_petit_nice:  `${CDN}/v1781361097/IMG_0092_llcgze.jpg`,
  la_mercerie:    `${CDN}/v1781364411/IMG_0093_b2bz91.jpg`,
  le_rhul:        `${CDN}/v1781364433/image_f8710e.jpg`,
  prosper:        `${CDN}/v1781364450/IMG_0095_pgwwks.jpg`,
  acuda:          `${CDN}/v1781364466/IMG_0096_crvcjo.jpg`,
  cantoche:       `${CDN}/v1781364475/image_jspyla.jpg`,
  figure:         `${CDN}/v1781364487/image_knutb6.jpg`,
  bistrot_chave:  `${CDN}/v1781364498/IMG_0099_q87scj.jpg`,
  cielo:          `${CDN}/v1781364510/IMG_0100_tfxoh4.jpg`,
  bonnies:        `${CDN}/v1781364519/image_jmfz8c.jpg`,
  poissonnerie:   `${CDN}/v1781364527/image_ntlnlc.jpg`,
  travers:        `${CDN}/v1781364536/IMG_0103_yyykdc.jpg`,
  a_moro:         `${CDN}/v1781364544/IMG_0104_at2bdp.jpg`,
  gingembre:      `${CDN}/v1781364553/image_eht5ze.jpg`,
  hako:           `${CDN}/v1781364562/image_gtap6m.jpg`,
  petit_jean:     `${CDN}/v1781364575/IMG_0107_nsbnhh.jpg`,
  babines:        `${CDN}/v1781364585/IMG_0108_smo7db.jpg`,
  panjim:         `${CDN}/v1781366321/image_c528mr.jpg`,
};

const T = {
  cream:"#f7f4ef", paper:"#f0ebe2", border:"#e2dbd0",
  muted:"#a09880", charcoal:"#1e1c1a", caption:"#8a8070",
  accent:"#c8a96e", dark:"#141210",
};

const G: Record<string, [string, string]> = {
  food:["#2a1a0e","#8a5a30"], drink:["#3a1020","#8a3050"],
  stay:["#1a2e3a","#3a6a7a"], local:["#1a3d28","#5a8a6a"],
  mrs:["#2d4a6b","#c4703a"], lyon:["#3d2e1e","#c4963a"],
};

interface ImgProps { colors:[string,string]; photo?:string; label?:string; style?:React.CSSProperties; position?:string; }
function Img({ colors, photo, label, style={}, position="center center" }: ImgProps) {
  const [err, setErr] = useState(false);
  if (photo && !err) return (
    <div style={{position:"relative",overflow:"hidden",...style}}>
      <img src={photo} alt={label||""} onError={()=>setErr(true)}
        style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:position,display:"block"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 60%,rgba(0,0,0,0.15) 100%)"}}/>
    </div>
  );
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 50%,rgba(0,0,0,0.2) 100%)"}}/>
    </div>
  );
  const [a,b]=colors;
  return (
    <div style={{background:`linear-gradient(135deg,${a},${b})`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",...style}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,0.25) 100%)"}}/>
      {label&&<div style={{position:"relative",zIndex:1,fontFamily:"sans-serif",fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.4)",textAlign:"center",padding:"0 12px"}}>{label}</div>}
    </div>
  );
}

interface Place { name:string; type:string; tag:string; colors:[string,string]; photo?:string; desc:string; link?:string; address?:string; hours?:string; phone?:string; maps?:string; }
interface GettingItem { heading:string; body:string; linkLabel:string; link:string; }
interface FoodTier { id:string; name:string; desc:string; places:Place[]; }
interface Section { id:string; label:string; data:Place[]|GettingItem[]; }
interface City { id:string; name:string; tagline:string; photo?:string; colors:[string,string]; available?:boolean; }
interface Country { id:string; name:string; available:boolean; cities?:City[]; }
interface Story { tag:string; title:string; sub:string; photo:string; colors:[string,string]; city:string; }

const COUNTRIES: Country[] = [
  { id:"france", name:"France", available:true, cities:[
    { id:"marseille", name:"Marseille", tagline:"Raw, electric, Mediterranean.", photo:PHOTOS.marseille_hero, colors:G.mrs },
    { id:"lyon", name:"Lyon", tagline:"Chef-led, unhurried, deeply French.", colors:G.lyon },
    { id:"luberon", name:"Luberon", tagline:"Villages, vineyards, silence.", colors:G.local, available:false },
  ]},
  { id:"italy", name:"Italy", available:false },
  { id:"spain", name:"Spain", available:false },
  { id:"india", name:"India", available:true, cities:[
    { id:"panjim", name:"Panjim", tagline:"The Portuguese city the monsoon makes its own.", colors:["#1a3020","#4a8060"], available:false },
    { id:"mumbai", name:"Mumbai", tagline:"Thirty years of knowing exactly where to eat.", colors:["#2a1a0e","#8a4020"], available:false },
  ]},
  { id:"srilanka", name:"Sri Lanka", available:false },
];

// ─── FOOD ─────────────────────────────────────────────────────────────────────
const FOOD_TIERS: FoodTier[] = [
  {
    id:"tyre-trail", name:"The Tyre Trail",
    desc:"Destination restaurants. The tables worth planning a trip around.",
    places:[
      { name:"Le Petit Nice", type:"Restaurant · Michelin ★★★", tag:"Corniche", photo:PHOTOS.le_petit_nice, colors:G.food,
        desc:"Gérald Passedat's three-star table on the Corniche — the most serious address in Marseille. The tasting menu is built entirely around the sea: each course a different expression of the Mediterranean. A meal that takes hours and is worth every minute.", link:"https://www.passedat.fr" },
      { name:"La Mercerie", type:"Restaurant · Michelin listed", tag:"Noailles", photo:PHOTOS.la_mercerie, colors:G.food,
        desc:"Harry Cummins (ex-Frenchie), Laura Vidal — France's best sommelier — and Julia Mitton set up in an old haberdashery in Noailles in 2018. The five-course evening menu is where Cummins fully opens up. Sit at the counter facing the kitchen. Book well ahead — always full.",
        address:"9 Cours Saint-Louis, 13001 Marseille", hours:"Tue–Sat lunch & dinner" },
      { name:"Livingston", type:"Restaurant · Wine Bar", tag:"Cours Julien", photo:PHOTOS.livingston, colors:G.food,
        desc:"Marseille's most talked-about table. Chef Mads Christensen's kitchen changes with what arrives each morning. Natural wine, creative Mediterranean cooking. The kind of place that makes you understand why people move to Marseille.",
        address:"5 Rue Crudère, 13006 Marseille", hours:"Tue–Sat evenings" },
      { name:"Le Rhul", type:"Restaurant · Bouillabaisse", tag:"Corniche", photo:PHOTOS.le_rhul, colors:G.food,
        desc:"Perched on a rock on Corniche Kennedy, specialising in bouillabaisse since 1948. The most iconic dish in Marseille, made properly — whole fish, rouille, croutons, the ritual in full. Book ahead and order the bouillabaisse when you call.", link:"https://www.lerhul.com" },
    ]
  },
  {
    id:"independents", name:"Independents",
    desc:"The neighbourhood restaurants and bistros that locals actually go to. No stars, no PR. Just good food.",
    places:[
      { name:"Prosper", type:"Restaurant · Michelin Bib", tag:"La Plaine", photo:PHOTOS.prosper, colors:G.food,
        desc:"François Roche (ex-Septime) and Santiago Michel (the man behind the travelling Argentine barbecue Fueguito) met at Frenchie and set up together near La Plaine. Pizza fritta with taleggio, squid ink rice with octopus, whatever arrived that week. Michelin Bib already. Monday to Friday evenings only." },
      { name:"Acuda", type:"Restaurant · Cave à vins", tag:"Vieux Port", photo:PHOTOS.acuda, colors:G.food,
        desc:"Place aux Huiles. Neo-bistro with a serious cellar. Young team, extraordinary produce, the kind of lunch that runs into early evening. Let it." },
      { name:"Cantoche", type:"Restaurant", tag:"Noailles", photo:PHOTOS.cantoche, colors:G.food,
        desc:"Louise and Julia grew up in their father's restaurant — it shows. Rue Haxo, Moroccan tile counter, ceramics by Franca, the menu written fresh each morning. Mediterranean market cooking that moves between Italy, North Africa and Provence. Lunch only, Tuesday to Saturday." },
      { name:"Figure", type:"Cave à manger", tag:"Vauban", photo:PHOTOS.figure, colors:G.food,
        desc:"Natural wine, small plates, a pink boudoir counter where Marseille refakes the world. No reservations — arrive early or wait at the bar. Worth both." },
      { name:"Bistrot Chave", type:"Restaurant", tag:"Chave", photo:PHOTOS.bistrot_chave, colors:G.food,
        desc:"A Marseille institution. Zinc bar, Ricard, simple food done beautifully. The regulars have been coming for forty years. You'll understand why immediately." },
      { name:"Cielo Trattoria Jogging", type:"Restaurant · Trattoria", tag:"Rue Paradis", photo:PHOTOS.cielo, colors:G.food,
        desc:"Alessandro Allegri cooks Lombardy inside Olivier Amsellem's Jogging concept store. Grandma curtains, candles, tables properly laid. Ravioli with Mantua squash and sage butter, tongue tonnato, proper antipasti. The three counter seats facing the kitchen are the ones to ask for." },
      { name:"Bonnie's", type:"Restaurant · Bar", tag:"Cours Lieutaud", photo:PHOTOS.bonnies, colors:G.food,
        desc:"Megan Moore left Glasgow, passed through Mexico and London, ended up at Livingston. Then she took over a bar on Cours Lieutaud and called it Bonnies. Simple weekly board: roast chicken, lasagne, steak, aïoli on Fridays. Chorizo-merguez on match nights. The kind of place that reminds you why you moved here." },
      { name:"Poissonnerie Kennedy", type:"Restaurant · Fish", tag:"Malmousque", photo:PHOTOS.poissonnerie, colors:G.food,
        desc:"Half fishmonger, half restaurant on the Corniche at Malmousque. Gae Aulenti lamps, marble tables, a hidden patio. Chef Thomas Assioma cooks what the sea brings. The tarama alone is worth the visit. Go for lunch — the Corniche backdrop does the rest." },
      { name:"Travers", type:"Restaurant · Grill", tag:"Vieux Port", photo:PHOTOS.travers, colors:G.food,
        desc:"Marine and Jules built Coquille, then came back to Place aux Huiles and went full carnivore. Chef Matéo Viala trained at La Réserve and Villa Madie — bone marrow, matured Galician prime rib, pâté en croûte with duck. Over 220 wines. The terrace on Place aux Huiles is the right setting for all of it." },
      { name:"A Moro", type:"Restaurant · Italian", tag:"Opéra", photo:PHOTOS.a_moro, colors:G.food,
        desc:"Benjamin named it after himself and the Italian word for love. A quiet cobbled street near the Opéra — long bar, speckled tiles, afternoon terrace. The vitello tonnato is what people come back for weekly. Gnudi with sage butter, paccheri with caponata. Lunch Monday to Friday, Thursday and Friday evenings." },
      { name:"Gingembre", type:"Restaurant · Vietnamese", tag:"Noailles", photo:PHOTOS.gingembre, colors:G.food,
        desc:"A Saigon chef took over a former bakery on Rue d'Aubagne and kept everything Vietnamese — including the menu, which arrives mostly in Vietnamese and requires guidance. Bright yellow spiral staircase, the smell of ginger and herbs. The beef tataki, the pho, the tapioca with banana at the end. Open seven days." },
      { name:"Hako+", type:"Izakaya", tag:"Roucas Blanc", photo:PHOTOS.hako, colors:G.food,
        desc:"Fumio Ishikawa runs this pocket izakaya above Place du Terrail — one wooden table, about ten seats. Real family Japanese cooking: marinated aubergines, sesame tuna tataki, chirashi with octopus and cuttlefish. The ramen is Friday only and worth planning your week around. One of Marseille's best kept secrets." },
      { name:"Chez Petit-Jean", type:"Restaurant", tag:"Les Goudes", photo:PHOTOS.petit_jean, colors:G.food,
        desc:"Handwritten menu, grandmother in the kitchen. Ask what's fresh. Order the fish. Drive out to Les Goudes just for this lunch — you won't regret it." },
      { name:"Les Babines de Mars", type:"Restaurant · Bar", tag:"Longchamp", photo:PHOTOS.babines, colors:G.food,
        desc:"Took over from the beloved Les Eaux de Mars at the same address near Longchamp. Same spirit, same team, a touch more creative. Seasonal Mediterranean — sharing plates in the evening, proper lunch menu at €27. Natural wines, terrace, open Monday to Friday." },
      { name:"La Relève", type:"Restaurant · Bar · Rooms", tag:"Endoume", photo:PHOTOS.la_releve, colors:G.food,
        desc:"Since 1944. The Art Deco sign announces it in iron letters — BAR DE LA RELÈVE. Chef Arnaud writes the menu after the market each day. Hugo pours the organic wines. Four rooms upstairs designed by Honoré. One address, three reasons to stay." },
    ]
  },
  {
    id:"the-block", name:"The Block",
    desc:"Street food, market stalls, the €3 thing you'll think about for weeks. No table, no reservation, no ceremony.",
    places:[
      { name:"Razzia", type:"Sandwiches · Coffee", tag:"La Plaine", colors:G.food,
        desc:"Axelle and Thomas opened Razzia in late 2022 on Rue Fontange and immediately became the reason La Plaine doesn't seem to work normal hours. The menu changes daily on Pain Pan brioche from next door. Le Fooding's best finger food 2024. Specialty coffee from Deep and La Tisserie. Tue–Fri 8:30am, Sat 9:30am." },
      { name:"Pétrin Couchette", type:"Bakery · Café", tag:"Noailles", colors:G.food,
        desc:"The bakery the La Mercerie team opened next door because they couldn't stop themselves. Basile Milou bakes with natural sourdough and heirloom wheats. The Arles pork and kimchi ciabatta is the sandwich. The afternoon terrace gets the sun. Tue–Sun 8am–6pm." },
      { name:"Ferments", type:"Bakery · Coffee", tag:"Vauban", colors:G.food,
        desc:"Guillaume bakes, Mati makes the coffee. Long fermentation sourdoughs from organic and heritage grain flours. The V60 is exceptional. The bread is serious. Wednesday to Saturday from 8:30am. Sunday mornings at the Vieux Port market." },
      { name:"Pompe", type:"Bakery", tag:"Vauban", colors:G.food,
        desc:"Carlotta With's father fills the bakery inside her Vauban restaurant with the smell of olive oil and orange blossom. The pompe à huile — Provençal olive oil brioche, one of the thirteen Christmas desserts — made daily from ancient grains. Open every day from 7am." },
      { name:"Pain Béni", type:"Sandwiches · Coffee", tag:"Notre-Dame du Mont", colors:G.food,
        desc:"Emma Djian's tiny sandwich shop under the bell tower on Place Notre-Dame du Mont. The leftovers from her restaurant La Ciergerie across the square become sandwiches here. Specialty coffee, Marseille kombucha, Italian gelato from the machine on the pavement. Open until 6pm daily." },
      { name:"L'Eau à la Bouche", type:"Pizzeria", tag:"Malmousque", colors:G.food,
        desc:"A cabanon the size of a pocket square on the Corniche at Malmousque. Rodolphe trained under Guy Savoy and Alain Ducasse, then came south and decided pizza was the right thing to do with all that knowledge. Wood-fired, handmade.",
        address:"120 Corniche Kennedy, 13007 Marseille", hours:"Tue–Sun lunch & dinner", phone:"04 91 52 16 16" },
      { name:"Pizzeria La Bonne Mère", type:"Pizzeria", tag:"Notre-Dame de la Garde", colors:G.food,
        desc:"Mahéva sources from the best Neapolitan producers. Jérémy makes the dough from stone-milled durum wheat, hand-stretched, 48 hours fermentation, wood-fired. Le Fooding called it the best pizza in France in 2016. At the foot of Notre-Dame de la Garde. Book by phone.",
        address:"16 Rue Fort du Sanctuaire, 13006 Marseille", hours:"Tue–Sat eve · Fri–Sat lunch", phone:"04 91 58 22 05" },
      { name:"L'Épicerie L'Idéal", type:"Grocery · Lunch", tag:"Noailles", colors:G.food,
        desc:"Julia Sammut's grocery store and lunch spot on Rue d'Aubagne in Noailles. The shelves: Norwegian anchovies, Bordier butter, Marou chocolate, feta from Lemnos. At lunch the pantry becomes the menu — whatever Julia feels like that day. Go hungry. Buy something to take home." },
      { name:"Vanille Noire", type:"Gelato", tag:"Le Panier · Opéra", colors:G.food,
        desc:"Nicolas quit his Paris tech job, moved to Marseille for the surf, and became obsessed with gelato. The black vanilla — coal-dark, faintly salty — is the one that made his name. The Beyrouth Nights is the one you'll order twice. Original in Le Panier: 13 Rue Caisserie." },
      { name:"Loulou Monsieur Glacé", type:"Gelato · Coffee", tag:"Corniche", colors:G.food,
        desc:"Loïc has been in Marseille 35 years and decided the Corniche needed a better ice cream. Buffalo milk from a farm in the Aveyron, toppings roasted in L'Estaque. The blood orange sorbet and the hazelnut-pistachio are the ones. Right on the Malmousque stretch — directly before or after a swim." },
      { name:"Marché du Cours Julien", type:"Market", tag:"Cours Julien", colors:G.food,
        desc:"Thursday and Sunday mornings. Organic producers, natural wine by the glass, cheese, charcuterie, bread. Arrive hungry. Buy more than you need. Eat standing up." },
      { name:"Noailles Market", type:"Street Market", tag:"Noailles", colors:G.food,
        desc:"The real Marseille market — Arab, African, Mediterranean all in one block. Spices, olives, fresh produce, the best cheap lunch in the city. Loud, chaotic, completely alive. Daily on Rue d'Aubagne." },
    ]
  }
];

const FOOD: Place[] = FOOD_TIERS.flatMap(t => t.places);

// ─── DRINK ────────────────────────────────────────────────────────────────────
const DRINK: Place[] = [
  { name:"Gaspard", type:"Cocktail Bar", tag:"Notre Dame", colors:G.drink,
    desc:"Ben Colombani trained at the Connaught in London. Then he came to Marseille and decorated a bar like a fisherman's dream — azure ceiling, rattan stools, lobster trap lights. The menu is a blank page. Tell him what you feel like and he makes it. No reservations — walk in." },
  { name:"Double Zéro", type:"Hi-Fi Bar · Wine · Food", tag:"Camas", colors:G.drink,
    desc:"Grégoire, Maeve and Gaël spent years throwing the best parties in Marseille. In 2025 they found a permanent room in Camas. The hi-fi sound system is a work of art. The natural wine list is serious. Vinyl all night — disco, funk, soul. You'll stay four hours. Thu–Mon evenings." },
  { name:"Ripaille", type:"Wine Bar · Bistro", tag:"Le Panier", colors:G.drink,
    desc:"Blue facade, Le Panier district. The most generous wine bar in the city. Local food, honest pours. Find out when the monthly Sunday brunch is on." },
  { name:"La Baleine", type:"Cinema · Wine Bar · Bistro", tag:"Cours Julien", colors:G.drink,
    desc:"An art-house cinema, a natural wine bar and a bistrot all sharing the same address on Cours Julien. Come for a glass before a film, stay for dinner after. The kind of room where the conversation runs long. Evenings from 6:30pm, weekends from 11am." },
  { name:"Bibine Club", type:"Wine Cave · Épicerie", tag:"Les Catalans", colors:G.drink,
    desc:"Sarah found an old motorbike workshop on Rue Decazes near Les Catalans and turned it into the neighbourhood's best reason to stop. Long counter, patio, natural wines from producers you won't find on any other list. Sarah knows every bottle personally. Ask her what she's excited about." },
  { name:"Le Vin sur la Main", type:"Wine Bar", tag:"Centre", colors:G.drink,
    desc:"The city's essential natural wine bar. Small producers you won't find on any list. You'll accidentally spend three hours here." },
  { name:"Deep Coffee Roasters", type:"Coffee · Roastery", tag:"Opéra", colors:G.drink,
    desc:"Roasting in the Opéra district since 2018. Tucked down a quiet street two minutes from the Vieux Port — you smell it before you find it. Coffees from Brazil, Ethiopia, Costa Rica, all roasted on site. The V60 is exceptional." },
  { name:"Cécile Food Club", type:"Café", tag:"Centre", colors:G.drink,
    desc:"The best morning ritual in Marseille. Exceptional coffee, seasonal pastries. Arrive when it opens." },
  { name:"Tuba Club", type:"Beach Club · Bar", tag:"Les Goudes", colors:G.local,
    desc:"The most glamorous spot on the coast. Long lunch, natural wine, the light on the water at 6pm. Dinner reservation required in summer. They have rooms." },
];

// ─── STAY ─────────────────────────────────────────────────────────────────────
const STAY: Place[] = [
  { name:"Casa Youm", type:"Maison d'Hôtes", tag:"L'Estaque", colors:G.stay,
    desc:"A former manager and a French-Italian photographer running an intimate estate in L'Estaque — two double rooms and a suite, each with a sea-facing terrace on the house where Cézanne once lived. Extraordinary. The most personal stay in the area.", link:"https://casayoum.com" },
  { name:"Jogging Saména", type:"House · Restaurant", tag:"Calanque de Saména", colors:G.stay,
    desc:"Olivier Amsellem found an abandoned house in the Calanque de Saména and let time show in the walls. Two patios, an outdoor pool, a clawfoot bath, the sea 50 metres away. Breakfast from L'Épicerie L'Idéal. Jogging Trattoria in the restaurant. Two nights minimum. From €250.", link:"https://joggingjogging.com" },
  { name:"Les Bords de Mer", type:"Hotel", tag:"Corniche Kennedy", colors:G.stay,
    desc:"Art Deco, 19 rooms all facing directly to sea. The former Hôtel Richelieu completely reimagined. Every room opens to the Mediterranean. From €200.", link:"https://www.lesbordsdemer.com" },
  { name:"C2 Hotel", type:"Hotel ★★★★★", tag:"Centre", colors:G.stay,
    desc:"A 19th century private mansion between Vieux Port and Notre-Dame de la Garde. 20 rooms, each individually designed. The bar alone is worth a visit. From €280.", link:"https://www.c2-hotel.com" },
  { name:"Pension Edelweiss", type:"Guesthouse", tag:"Centre", colors:G.stay,
    desc:"Five guest rooms in a duplex apartment furnished with vintage pieces from the 30s, 50s, 60s and 70s — each with a private bathroom. Eccentric, personal, completely un-hotel-like. The kind of stay you'll tell people about for years." },
  { name:"La Relève", type:"Bar · Restaurant · Rooms", tag:"Endoume", colors:G.stay,
    desc:"Four 50s-inspired rooms above the best bar in the neighbourhood, designed by Honoré. Wake up to Chef Arnaud's cooking downstairs, Hugo's wine in the evening. The most atmospheric stay in the 7th. See also: Food and Drink sections." },
  { name:"La Bastide des Culs-Rousset", type:"Maison d'Hôtes", tag:"Marseille Hills", colors:G.local,
    desc:"Isabelle's 18th century bastide on the hills above Marseille. 8,000m² garden, infinity pool, table d'hôtes. A genuine secret.", link:"https://bastideculsrousset.fr" },
  { name:"Tuba Club", type:"Hotel · Beach Club", tag:"Les Goudes", colors:G.local,
    desc:"Cabanons with rooms at the edge of the Calanques. The most atmospheric stay outside the city. Book the table and the room at the same time." },
  { name:"Île Degaby", type:"Island · Restaurant", tag:"Rade de Marseille", colors:G.stay,
    desc:"A fort built for Louis XIV, gifted to a famous artist, abandoned for decades, reopened as a restaurant in 2024. Take the boat from Malmousque — 15 minutes. Chef Sébastien Dugast cooks short, precise Mediterranean plates. The sun sets directly in front of you. Open May to mid-October only.", link:"https://iledegaby.com" },
  { name:"Zannier Île de Bendor", type:"Island Hotel", tag:"Bandor — 50 min east", colors:G.stay,
    desc:"Paul Ricard bought this seven-hectare island off Bandol in the 1950s. Zannier Hotels has given it back its soul — 1960s Riviera glamour, a serious wellness centre, Provençal houses where time genuinely stops. Eight places to eat and drink. Seven-minute ferry from Bandol. Open May to November only.", link:"https://zannierhotels.com" },
  { name:"Les Roches Blanches", type:"Hotel ★★★★★", tag:"Cassis", colors:G.stay,
    desc:"The legendary Cassis hotel restored to its 1930s Art Deco glory. Winston Churchill and Edith Piaf both stayed. Forty-five minutes from Marseille.", link:"https://www.roches-blanches-cassis.com" },
  { name:"Le Rose Thé", type:"Hotel · Restaurant", tag:"La Ciotat", colors:G.stay,
    desc:"La Ciotat's most beloved address since 1933. Faces the sea completely. Book a room with a jacuzzi terrace.", link:"https://lerosethe.com" },
  { name:"La Magdeleine", type:"Hotel · Michelin ★", tag:"Gémenos", colors:G.stay,
    desc:"Michelin-starred chef Mathias Dandine's 18th century bastide. Twenty minutes from Marseille, a world away. From €312.", link:"https://relais-magdeleine.com" },
];

// ─── LOCAL ────────────────────────────────────────────────────────────────────
const LOCAL: Place[] = [
  { name:"Vallon des Auffes", type:"Hidden Port", tag:"Corniche", photo:PHOTOS.vallon, colors:G.local,
    desc:"A tiny fishing port hidden beneath the Corniche road. Blink and you'd miss it. Watch the boats, sit on the rocks, do nothing. L'Épuisette restaurant is here — book well ahead." },
  { name:"Malmousque", type:"Coastline", tag:"Malmousque", photo:PHOTOS.rocks, colors:G.local,
    desc:"The most beautiful stretch of Marseille's coastline — rocky, wild, no beach chairs. Locals swim here before work. Walk it at dawn before the city wakes." },
  { name:"La Bonne Mère", type:"Basilica", tag:"Notre-Dame de la Garde", colors:G.local,
    desc:"The Bonne Mère watches over everything. Climb to her at dawn or dusk — the city below, the sea in every direction, the islands, the Calanques. Marseille makes more sense from up here. Go once on your first morning." },
  { name:"Île Degaby", type:"Island · Restaurant", tag:"Rade de Marseille", colors:G.local,
    desc:"Take the boat from Malmousque — 15 minutes — and arrive at something that shouldn't exist. A Louis XIV fort reopened as a restaurant and bar. The most extraordinary evening in Marseille. Book the boat when you book the table. May–October only." },
  { name:"Les Goudes", type:"Village", tag:"Les Goudes", colors:G.local,
    desc:"Drive to the end of the road. This ancient fishing village sits at the edge of the Calanques. Swim, watch the fishermen, have the best lunch of your trip. Go early — the drive back at sunset is the payoff." },
  { name:"Le Panier", type:"Neighbourhood", tag:"Le Panier", colors:G.local,
    desc:"Marseille's oldest neighbourhood. Arab, Italian, African, French — all layered over centuries. No plan. Get lost. Buy something from Père Blaize on the way out." },
  { name:"Cours Julien", type:"Neighbourhood", tag:"Cours Julien", colors:G.local,
    desc:"The most densely painted neighbourhood in the south of France. Thrift shops, flea markets, natural wine bars, the market on Thursday mornings. Start at the stairs and walk uphill." },
  { name:"Sessùn Alma", type:"Concept Space · Canteen", tag:"Rue Sainte", colors:G.local,
    desc:"The Marseille fashion brand Sessùn transformed a former soap factory into a 170m² concept space with a 24-cover canteen serving simple, local, seasonal food behind a listed mahogany door. Fashion, ceramics, books, lunch." },
  { name:"Jogging Jogging", type:"Concept Store", tag:"Rue Paradis", colors:G.local,
    desc:"Founded by photographer Olivier Amsellem. Backed Jacquemus before Paris noticed. Fashion, design objects, art, a secret garden at the back. Also: Cielo Trattoria inside, Jogging Saména in the Calanques." },
  { name:"La Cantine d'Aussih", type:"Canteen · Design", tag:"Les Catalans", colors:G.local,
    desc:"Audrey and Jessie named it after themselves. Near Les Catalans — 250m² of canteen, design objects, contemporary lighting and a courtyard terrace. Chef Damien cooks seasonal Mediterranean. The salon de thé runs on Père Blaize teas. Lunch only, Tuesday to Saturday." },
  { name:"Père Blaize", type:"Herbalist · Since early 1800s", tag:"Noailles", colors:G.local,
    desc:"Toussaint Blaize came down from the Alps in the early 1800s and started healing Marseille with plants. Six generations later the shop on Rue Méolan is still here. The best souvenir in Marseille: the Château d'If tisane from Maison Blaize opposite — anise, like a pastis without the alcohol." },
  { name:"Maison Empereur", type:"Institution · Since 1827", tag:"Noailles", colors:G.local,
    desc:"France's oldest hardware store. Four floors of kitchen tools, Marseille soap, Provençal linens, things you never knew you needed. Budget two hours and go without a list." },
  { name:"Road Social Club", type:"Coffee · Canteen · Fitness", tag:"Rue de Rome", colors:G.local,
    desc:"Clara and Claire opened Road in autumn 2025 — a coffee shop, a canteen and a fitness studio all sharing the same address. Daily specials with local produce, specialty coffee, events throughout the week. The kind of space that makes a neighbourhood feel like a community." },
  { name:"The Solar Club", type:"Creative Community", tag:"@the.solar.club", colors:G.local,
    desc:"Marseille's creative underground, organised. DM them on Instagram before you arrive. The right introduction changes everything." },
];

// ─── GETTING HERE ─────────────────────────────────────────────────────────────
const GETTING: GettingItem[] = [
  { heading:"Fly into Marseille Provence. Not Nice.",
    body:"Marseille Provence Airport (MRS) is 30 minutes from the city by the Navette shuttle (€10, every 20 minutes). Nice is two hours away by road. Unless you're starting in Nice, there's no reason to land there.",
    linkLabel:"Search flights →", link:"https://www.skyscanner.net" },
  { heading:"Take the train if you're coming from Paris.",
    body:"The TGV from Paris to Marseille takes 3 hours 20 minutes. First class is worth it. Book at least three weeks ahead for the best prices.",
    linkLabel:"Book trains →", link:"https://www.thetrainline.com" },
  { heading:"Rent a car. You need one.",
    body:"Marseille itself you can navigate without a car. But to reach Les Goudes, the Calanques, Cassis, La Ciotat, and the Luberon — you need wheels. Rent for at least three days.",
    linkLabel:"Compare car hire →", link:"https://www.rentalcars.com" },
  { heading:"Getting to Île Degaby.",
    body:"Take the boat from the Malmousque quay or the Mucem — 15 minutes, €20 return. Book through the restaurant when you make your reservation. Weather-dependent — confirmation 24 hours before.",
    linkLabel:"Book Île Degaby →", link:"https://iledegaby.com" },
  { heading:"Getting to Île de Bendor.",
    body:"Seven-minute ferry from Bandol harbour, which is 50 minutes east of Marseille by car or train. Book through Zannier Hotels — ferry included with reservation.",
    linkLabel:"Book Zannier Île de Bendor →", link:"https://zannierhotels.com" },
];

const SECTIONS: Section[] = [
  { id:"food", label:"Food", data:FOOD },
  { id:"drink", label:"Drink", data:DRINK },
  { id:"stay", label:"Stay", data:STAY },
  { id:"local", label:"Local", data:LOCAL },
  { id:"getting", label:"Getting Here", data:GETTING },
];

const FEATURED: Story[] = [
  { tag:"Marseille · Right now", title:"Mads Christensen is cooking at Livingston.",
    sub:"The Danish chef running Marseille's most talked-about kitchen. Natural wine, a menu that changes with what arrives that morning.",
    photo:PHOTOS.livingston, colors:G.food, city:"marseille" },
  { tag:"Marseille · Local", title:"The port the city forgot to tell anyone about.",
    sub:"Vallon des Auffes sits beneath the Corniche road. You'd miss it at 60km/h. Slow down. Turn left. This is the real Marseille.",
    photo:PHOTOS.vallon, colors:G.local, city:"marseille" },
  { tag:"Marseille · Summer", title:"Where locals actually swim.",
    sub:"No beach chairs, no vendors, no tourists. Just limestone, clear water, and the Mediterranean the way it's always been.",
    photo:PHOTOS.rocks, colors:G.local, city:"marseille" },
  { tag:"India · Coming soon", title:"Panjim in the monsoon.",
    sub:"Come in July. The city exhales. The tourists are gone, the rain is constant, and Panjim becomes itself again. We're going.",
    photo:PHOTOS.panjim, colors:["#1a3020","#4a8060"], city:"panjim" },
];

// ─── CSS ──────────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{background:${T.cream};font-family:'DM Sans',sans-serif;color:${T.charcoal};}
.nav{position:sticky;top:0;z-index:200;background:rgba(247,244,239,0.97);backdrop-filter:blur(20px);border-bottom:1px solid ${T.border};display:flex;align-items:center;justify-content:space-between;padding:0 20px;height:56px;}
.brand{cursor:pointer;}
.brand-name{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:400;letter-spacing:0.08em;color:${T.charcoal};line-height:1;text-transform:uppercase;}
.menu-btn{background:none;border:none;cursor:pointer;display:flex;flex-direction:column;gap:5px;padding:4px;}
.ml{width:22px;height:1px;background:${T.charcoal};}
.overlay{position:fixed;inset:0;z-index:300;background:${T.dark};overflow-y:auto;}
.oi{padding:0 28px 52px;}
.oh{display:flex;align-items:center;justify-content:space-between;height:56px;border-bottom:1px solid rgba(255,255,255,0.08);margin-bottom:32px;}
.ob{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:400;letter-spacing:0.08em;color:white;text-transform:uppercase;}
.ox{background:none;border:none;cursor:pointer;font-size:24px;color:rgba(255,255,255,0.5);}
.ol{font-size:8px;letter-spacing:0.28em;text-transform:uppercase;color:rgba(255,255,255,0.3);margin-bottom:16px;}
.cb{display:flex;align-items:center;justify-content:space-between;width:100%;background:none;border:none;cursor:pointer;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);}
.cn{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:300;color:white;letter-spacing:-0.01em;}
.cs{font-size:8px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.2);}
.cities{padding:8px 0 4px 16px;}
.cityb{display:block;width:100%;background:none;border:none;cursor:pointer;text-align:left;padding:8px 0;font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:300;color:rgba(255,255,255,0.6);border-bottom:1px solid rgba(255,255,255,0.04);transition:color 0.2s;}
.cityb:hover{color:${T.accent};}
.soon{color:rgba(255,255,255,0.2)!important;cursor:default!important;}
.home-hero{position:relative;height:70vw;max-height:360px;overflow:hidden;}
.hho{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.6) 100%);}
.hht{position:absolute;bottom:0;left:0;right:0;padding:24px;}
.hhe{font-size:8px;letter-spacing:0.26em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:8px;}
.hh1{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:300;color:white;line-height:1.1;letter-spacing:-0.01em;margin-bottom:6px;}
.hh2{font-size:12px;color:rgba(255,255,255,0.7);font-weight:300;line-height:1.6;}
.cta{display:inline-block;margin-top:14px;padding:10px 18px;background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.3);font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:white;cursor:pointer;font-family:'DM Sans',sans-serif;}
.feed{padding:0 0 52px;}
.fl{font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:${T.muted};padding:24px 20px 16px;display:flex;align-items:center;gap:10px;}
.fl::after{content:'';flex:1;height:1px;background:${T.border};}
.stories-grid{display:block;}
.sc{margin:0 20px 20px;cursor:pointer;border:1px solid ${T.border};transition:opacity 0.15s;}
.sc:hover{opacity:0.8;}
.sb{padding:16px;}
.st{font-size:8px;letter-spacing:0.2em;text-transform:uppercase;color:${T.accent};margin-bottom:6px;}
.s1{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:400;color:${T.charcoal};line-height:1.1;margin-bottom:6px;}
.s2{font-size:12px;color:${T.caption};font-weight:300;line-height:1.65;}
.sr{display:inline-block;margin-top:10px;font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:${T.charcoal};border-bottom:1px solid ${T.border};padding-bottom:1px;}
.eb{margin:8px 20px 28px;border:1px solid ${T.border};padding:20px;background:${T.paper};position:relative;overflow:hidden;}
.eb::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,${T.accent},transparent);}
.ee{font-size:8px;letter-spacing:0.26em;text-transform:uppercase;color:${T.accent};margin-bottom:7px;}
.et{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:400;color:${T.charcoal};line-height:1.2;margin-bottom:5px;}
.es{font-size:12px;color:${T.muted};font-weight:300;line-height:1.6;margin-bottom:14px;}
.er{display:flex;gap:8px;}
.ei{flex:1;padding:10px 12px;border:1px solid ${T.border};background:${T.cream};font-family:'DM Sans',sans-serif;font-size:12px;color:${T.charcoal};outline:none;}
.ei::placeholder{color:${T.muted};}
.ej{padding:10px 16px;background:${T.charcoal};border:none;color:${T.cream};font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;cursor:pointer;white-space:nowrap;}
.eok{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:300;font-style:italic;color:${T.accent};text-align:center;padding:4px 0;}
.city-back{position:absolute;top:16px;left:16px;z-index:10;background:rgba(0,0,0,0.35);backdrop-filter:blur(8px);border:none;cursor:pointer;padding:8px 14px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:white;font-family:'DM Sans',sans-serif;}
.city-info{padding:20px 24px 8px;}
.city-ey{font-size:9px;letter-spacing:0.26em;text-transform:uppercase;color:${T.muted};margin-bottom:10px;display:flex;align-items:center;gap:8px;}
.city-ey::after{content:'';flex:1;height:1px;background:${T.border};}
.city-nm{font-family:'Cormorant Garamond',serif;font-size:52px;font-weight:300;line-height:0.88;color:${T.charcoal};letter-spacing:-0.02em;margin-bottom:8px;}
.city-tg{font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:300;font-style:italic;color:${T.muted};}
.city-rule{height:1px;background:${T.border};margin:14px 24px 0;}
.tabs{display:flex;overflow-x:auto;border-bottom:1px solid ${T.border};background:${T.cream};scrollbar-width:none;position:sticky;top:56px;z-index:100;}
.tabs::-webkit-scrollbar{display:none;}
.tab{padding:0 14px;height:44px;white-space:nowrap;font-size:9px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:${T.muted};cursor:pointer;border:none;background:none;font-family:'DM Sans',sans-serif;border-bottom:2px solid transparent;transition:all 0.2s;flex-shrink:0;}
.tab.active{color:${T.charcoal};border-bottom-color:${T.accent};}
.sec{padding:24px 20px 40px;}
.si{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:300;color:${T.charcoal};margin-bottom:6px;line-height:1;}
.ss{font-size:12px;color:${T.muted};font-weight:300;line-height:1.65;margin-bottom:24px;}
.places-grid{display:block;}
.pc{border-bottom:1px solid ${T.border};padding:0 0 24px;margin-bottom:24px;}
.pc:last-child{border-bottom:none;}
.ptag{font-size:9px;letter-spacing:0.16em;text-transform:uppercase;color:${T.accent};margin-bottom:4px;margin-top:12px;}
.pty{font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:${T.muted};margin-bottom:4px;}
.pn{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:400;color:${T.charcoal};line-height:1.05;margin-bottom:7px;}
.pd{font-size:13px;color:${T.caption};font-weight:300;line-height:1.75;margin-bottom:8px;}
.pl{font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:${T.charcoal};text-decoration:none;border-bottom:1px solid ${T.border};padding-bottom:1px;}
.tier-hdr{border-bottom:1px solid ${T.border};padding-bottom:14px;margin-bottom:8px;}
.tier-name{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:400;color:${T.charcoal};line-height:1;}
.tier-desc{font-size:12px;color:${T.muted};font-weight:300;line-height:1.65;margin-top:4px;margin-bottom:20px;}
.gc{border-bottom:1px solid ${T.border};padding:0 0 24px;margin-bottom:24px;}
.gc:last-child{border-bottom:none;}
.gh{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:400;color:${T.charcoal};margin-bottom:8px;line-height:1.15;}
.gb{font-size:13px;color:${T.caption};font-weight:300;line-height:1.75;margin-bottom:10px;}
.glink{font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:${T.charcoal};text-decoration:none;border-bottom:1px solid ${T.border};padding-bottom:1px;}
.ft{padding:24px;border-top:1px solid ${T.border};text-align:center;margin-top:16px;}
.fb{font-family:'Cormorant Garamond',serif;font-size:13px;font-weight:400;letter-spacing:0.22em;text-transform:uppercase;color:${T.muted};margin-bottom:4px;}
.fs{font-size:10px;color:${T.border};letter-spacing:0.08em;}

@media(min-width:768px){
  .nav{padding:0 48px;height:64px;}
  .brand-name{font-size:26px;}
  .home-hero{height:56vw;max-height:600px;}
  .hh1{font-size:52px;}
  .hh2{font-size:15px;max-width:480px;}
  .hht{padding:48px;}
  .fl{padding:40px 48px 24px;}
  .stories-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;padding:0 48px;margin-bottom:24px;}
  .sc{margin:0;}
  .eb{margin:0 48px 40px;}
  .city-info{padding:32px 48px 12px;}
  .city-nm{font-size:80px;}
  .city-rule{margin:16px 48px 0;}
  .tabs{padding:0 32px;}
  .sec{padding:32px 48px 60px;}
  .places-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;}
  .pc{border-bottom:none;padding:0;margin:0;}
  .si{font-size:42px;}
  .pn{font-size:28px;}
}

@media(min-width:1200px){
  .nav{padding:0 80px;}
  .hht{padding:64px 80px;}
  .fl{padding:48px 80px 24px;}
  .stories-grid{padding:0 80px;grid-template-columns:1fr 1fr 1fr 1fr;}
  .eb{margin:0 80px 48px;}
  .city-info{padding:40px 80px 12px;}
  .city-rule{margin:16px 80px 0;}
  .tabs{padding:0 64px;}
  .sec{padding:40px 80px 80px;}
  .city-nm{font-size:96px;}
}

@media(max-width:767px){
  .salt-wrap{max-width:430px;margin:0 auto;}
}

/* ── PLACE DRAWER ── */
.drawer-overlay{position:fixed;inset:0;z-index:400;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);animation:fi 0.2s ease;}
.drawer{position:fixed;bottom:0;left:0;right:0;z-index:401;background:${T.cream};max-height:92vh;overflow-y:auto;border-radius:16px 16px 0 0;animation:slideUp 0.3s cubic-bezier(0.32,0.72,0,1);}
@keyframes slideUp{from{transform:translateY(100%);}to{transform:translateY(0);}}
.drawer-handle{width:36px;height:4px;background:${T.border};border-radius:2px;margin:12px auto 0;}
.drawer-hero{width:100%;height:52vw;max-height:260px;position:relative;}
.drawer-close{position:absolute;top:12px;right:12px;background:rgba(0,0,0,0.4);backdrop-filter:blur(8px);border:none;color:white;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;}
.drawer-body{padding:20px 24px 40px;}
.drawer-tag{font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:${T.accent};margin-bottom:4px;}
.drawer-type{font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:${T.muted};margin-bottom:6px;}
.drawer-name{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:300;color:${T.charcoal};line-height:0.95;margin-bottom:14px;letter-spacing:-0.01em;}
.drawer-desc{font-size:14px;color:${T.caption};font-weight:300;line-height:1.8;margin-bottom:20px;}
.drawer-meta{border-top:1px solid ${T.border};padding-top:16px;margin-bottom:20px;}
.drawer-meta-row{display:flex;gap:10px;align-items:flex-start;margin-bottom:8px;}
.drawer-meta-label{font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:${T.muted};width:64px;flex-shrink:0;padding-top:2px;}
.drawer-meta-value{font-size:13px;color:${T.charcoal};font-weight:300;line-height:1.5;}
.drawer-actions{display:flex;gap:10px;}
.drawer-btn{flex:1;padding:13px 10px;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;cursor:pointer;text-align:center;text-decoration:none;display:block;transition:opacity 0.2s;}
.drawer-btn.primary{background:${T.charcoal};color:${T.cream};border:none;}
.drawer-btn.secondary{background:transparent;color:${T.charcoal};border:1px solid ${T.border};}
.drawer-btn:hover{opacity:0.8;}
.pc{cursor:pointer;transition:opacity 0.15s;}
.pc:hover{opacity:0.85;}
`;

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function EmailCapture() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = () => { if (email.includes("@")) setDone(true); };
  if (done) return <div className="eb"><div className="eok">You're on the list. Next stop coming soon.</div></div>;
  return (
    <div className="eb">
      <div className="ee">New cities dropping soon</div>
      <div className="et">We're building city by city.</div>
      <div className="es">France, Italy, Spain, India, Sri Lanka. Be the first to know.</div>
      <div className="er">
        <input className="ei" type="email" placeholder="your@email.com"
          value={email} onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()} />
        <button className="ej" onClick={submit}>Join</button>
      </div>
    </div>
  );
}

function isGettingItem(item: Place | GettingItem): item is GettingItem {
  return "heading" in item;
}

function PlaceDrawer({ place, onClose }: { place: Place; onClose: () => void }) {
  const mapsUrl = place.maps ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + (place.address || "Marseille"))}`;
  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer">
        <div className="drawer-handle" />
        <div className="drawer-hero">
          <Img colors={place.colors} photo={place.photo} label={place.name}
            style={{ width:"100%", height:"100%" }} />
          <button className="drawer-close" onClick={onClose}>×</button>
        </div>
        <div className="drawer-body">
          <div className="drawer-tag">{place.tag}</div>
          <div className="drawer-type">{place.type}</div>
          <div className="drawer-name">{place.name}</div>
          <div className="drawer-desc">{place.desc}</div>
          {(place.address || place.hours || place.phone) && (
            <div className="drawer-meta">
              {place.address && (
                <div className="drawer-meta-row">
                  <div className="drawer-meta-label">Address</div>
                  <div className="drawer-meta-value">{place.address}</div>
                </div>
              )}
              {place.hours && (
                <div className="drawer-meta-row">
                  <div className="drawer-meta-label">Hours</div>
                  <div className="drawer-meta-value">{place.hours}</div>
                </div>
              )}
              {place.phone && (
                <div className="drawer-meta-row">
                  <div className="drawer-meta-label">Phone</div>
                  <div className="drawer-meta-value">{place.phone}</div>
                </div>
              )}
            </div>
          )}
          <div className="drawer-actions">
            <a className="drawer-btn primary" href={mapsUrl} target="_blank" rel="noopener noreferrer">
              Get Directions →
            </a>
            {place.link && (
              <a className="drawer-btn secondary" href={place.link} target="_blank" rel="noopener noreferrer">
                Book
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function PlaceCard({ place }: { place: Place }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="pc" onClick={() => setOpen(true)}>
        <Img colors={place.colors} photo={place.photo} label={place.name}
          style={{ width:"100%", height:220 }} />
        <div className="ptag">{place.tag}</div>
        <div className="pty">{place.type}</div>
        <div className="pn">{place.name}</div>
        <div className="pd">{place.desc}</div>
        <div style={{ fontSize:9, letterSpacing:"0.12em", textTransform:"uppercase", color:T.accent, marginTop:6 }}>
          More info →
        </div>
      </div>
      {open && <PlaceDrawer place={place} onClose={() => setOpen(false)} />}
    </>
  );
}

function SectionContent({ section }: { section: Section }) {
  const subs: Record<string, string> = {
    food:"From the destination tables to the best three euros you'll spend.",
    drink:"Natural wine bars, cocktails, cafés and the places in between.",
    stay:"The most considered places to sleep — in the city and along the coast.",
    local:"The Marseille that isn't in any guidebook.",
    getting:"Our honest advice. Written from experience, not a brochure."
  };

  if (section.id === "food") return (
    <div className="sec">
      <div className="si">Where to eat.</div>
      <div className="ss">{subs.food}</div>
      {FOOD_TIERS.map(tier => (
        <div key={tier.id} style={{ marginBottom:48 }}>
          <div className="tier-hdr">
            <div className="tier-name">{tier.name}</div>
            <div className="tier-desc">{tier.desc}</div>
          </div>
          <div className="places-grid">
            {tier.places.map((place, i) => <PlaceCard key={i} place={place} />)}
          </div>
        </div>
      ))}
      <div className="ft"><div className="fb">Salt</div><div className="fs">© 2026</div></div>
    </div>
  );

  if (section.id === "getting") return (
    <div className="sec">
      <div className="si">How to arrive.</div>
      <div className="ss">{subs.getting}</div>
      {(section.data as GettingItem[]).map((item, i) => (
        <div className="gc" key={i}>
          <div className="gh">{item.heading}</div>
          <div className="gb">{item.body}</div>
          <a className="glink" href={item.link} target="_blank" rel="noopener noreferrer">{item.linkLabel}</a>
        </div>
      ))}
      <div className="ft"><div className="fb">Salt</div><div className="fs">© 2026</div></div>
    </div>
  );

  const labels: Record<string, string> = { drink:"Where to drink.", stay:"Where to stay.", local:"What remains." };
  return (
    <div className="sec">
      <div className="si">{labels[section.id]}</div>
      <div className="ss">{subs[section.id]}</div>
      <div className="places-grid">
        {(section.data as Place[]).map((item, i) => <PlaceCard key={i} place={item} />)}
      </div>
      <div className="ft"><div className="fb">Salt</div><div className="fs">© 2026</div></div>
    </div>
  );
}

function CityView({ city, onBack }: { city: string; onBack: () => void }) {
  const [tab, setTab] = useState("food");
  const c = COUNTRIES.flatMap(x => x.cities || []).find(x => x.id === city);
  const activeSection = SECTIONS.find(s => s.id === tab)!;
  return (
    <div>
      <div style={{ position:"relative" }}>
        <Img colors={c?.colors || G.mrs} photo={c?.photo} label={c?.name}
          style={{ width:"100%", height:"54vw", maxHeight:270 }} />
        <button className="city-back" onClick={onBack}>← Back</button>
      </div>
      <div className="city-info">
        <div className="city-ey">South of France</div>
        <div className="city-nm">{c?.name}</div>
        <div className="city-tg">{c?.tagline}</div>
      </div>
      <div className="city-rule" />
      <div className="tabs">
        {SECTIONS.map(s => (
          <button key={s.id} className={`tab ${tab === s.id ? "active" : ""}`} onClick={() => setTab(s.id)}>
            {s.label}
          </button>
        ))}
      </div>
      <SectionContent section={activeSection} />
    </div>
  );
}

function Menu({ onClose, onCity }: { onClose: () => void; onCity: (id: string) => void }) {
  const [exp, setExp] = useState("france");
  return (
    <div className="overlay">
      <div className="oi">
        <div className="oh">
          <div className="ob">Salt</div>
          <button className="ox" onClick={onClose}>×</button>
        </div>
        <div className="ol">Destinations</div>
        {COUNTRIES.map(c => (
          <div key={c.id}>
            <button className="cb" onClick={() => c.available && setExp(exp === c.id ? "" : c.id)}>
              <span className={`cn ${!c.available ? "soon" : ""}`}>{c.name}</span>
              {!c.available && <span className="cs">Coming soon</span>}
              {c.available && <span style={{ color:"rgba(255,255,255,0.3)", fontSize:16 }}>{exp === c.id ? "−" : "+"}</span>}
            </button>
            {exp === c.id && c.cities && (
              <div className="cities">
                {c.cities.map(city => (
                  <button key={city.id}
                    className={`cityb ${city.available === false ? "soon" : ""}`}
                    onClick={() => { if (city.available !== false) { onCity(city.id); onClose(); } }}>
                    {city.name}
                    {city.available === false && <span style={{ fontSize:10, marginLeft:8, opacity:0.4 }}>soon</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div style={{ marginTop:40, paddingTop:24, borderTop:"1px solid rgba(255,255,255,0.08)" }}>
          <div className="ol">Coming next</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontWeight:300, color:"rgba(255,255,255,0.35)", lineHeight:2.2, marginBottom:8 }}>
            Panjim in the monsoon
          </div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:13, fontWeight:300, fontStyle:"italic", color:"rgba(255,255,255,0.18)", lineHeight:1.7, marginBottom:20 }}>
            Come in July. The city exhales. The tourists are gone, the rain is constant, and Panjim becomes itself again.
          </div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, fontWeight:300, color:"rgba(255,255,255,0.18)", lineHeight:2.2 }}>
            Naples · Barcelona · Mumbai · Galle · San Sebastián · Bologna · Kerala · Colombo
          </div>
        </div>
      </div>
    </div>
  );
}

function Home({ onCity }: { onCity: (id: string) => void }) {
  return (
    <>
      <div className="home-hero">
        <Img colors={G.mrs} photo={PHOTOS.home_hero} style={{ position:"absolute", inset:0 }} />
        <div className="hho" />
        <div className="hht">
          <div className="hhe">This week on Salt</div>
          <div className="hh1">A table on the rocks, the sea below.</div>
          <div className="hh2">The South of France the way locals actually live it. No pretence, no tourist traps.</div>
          <button className="cta" onClick={() => onCity("marseille")}>Open Marseille →</button>
        </div>
      </div>
      <div className="feed">
        <div className="fl">Latest</div>
        <div className="stories-grid">
          {FEATURED.map((f, i) => (
            <div className="sc" key={i} onClick={() => onCity(f.city)}>
              <Img colors={f.colors} photo={f.photo} style={{ width:"100%", height:"50vw", maxHeight:210 }} />
              <div className="sb">
                <div className="st">{f.tag}</div>
                <div className="s1">{f.title}</div>
                <div className="s2">{f.sub}</div>
                <div className="sr">Read more →</div>
              </div>
            </div>
          ))}
        </div>
        <div className="eb" style={{ margin:"8px 20px 28px" }}>
          <EmailCapture />
        </div>
        <div className="ft"><div className="fb">Salt</div><div className="fs">© 2026 · A food & drink guide</div></div>
      </div>
    </>
  );
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [city, setCity] = useState<string | null>(null);
  return (
    <>
      <style>{css}</style>
      <div className="salt-wrap" style={{ minHeight:"100vh", background:T.cream }}>
        {menu && <Menu onClose={() => setMenu(false)} onCity={(c) => { setCity(c); setMenu(false); }} />}
        <div className="nav">
          <div className="brand" onClick={() => setCity(null)}>
            <div className="brand-name">Salt</div>
          </div>
          <button className="menu-btn" onClick={() => setMenu(true)}>
            <div className="ml" /><div className="ml" /><div className="ml" />
          </button>
        </div>
        {city ? <CityView city={city} onBack={() => setCity(null)} /> : <Home onCity={setCity} />}
      </div>
    </>
  );
}
