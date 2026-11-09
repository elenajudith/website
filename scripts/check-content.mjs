import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {load} from 'cheerio';
import {excludedBiographies,normalize,corrected,plainDashes,yogaPageQuotes,retreatQuotes,silentQuotes,shamanicQuotes,kraftQuotes,wiseQuotes,courseQuotes} from '../src/final.mjs';
const originals=JSON.parse(await fs.readFile('content/original-2026-10-27.json','utf8'));
const docs=JSON.parse(await fs.readFile('content/drive-texts-2026-10-27.json','utf8'));
const quotes=JSON.parse(await fs.readFile('content/source-testimonials.json','utf8'));
let blockCount=0,quoteCount=0,docCount=0;
for(const locale of ['de','en']){
 const prefix=locale==='en'?'dist/en':'dist';
 for(const source of originals){
  const $=load(await fs.readFile(`${prefix}/${source.slug?source.slug+'/':''}index.html`,'utf8'));
  const seen=new Set();
  for(const w of source.widgets){
   if(!['heading','text-editor','button','call-to-action','animated-headline','icon-box'].includes(w.type.split('.')[0])||!w.text.trim()||excludedBiographies.has(w.id))continue;
   // Elena 2026-10-28 (B-05): Die Originalblöcke der Startseite („Namaste and Shalom,“, „Mehr über mich“) wurden bewusst entfernt.
   if(source.slug===''||source.slug==='11-sessions'||source.slug==='kambo'||source.slug==='yoga-nidra'||source.slug==='inner-child'||source.slug==='song-of-the-soul'||source.slug==='silent-retreat'||source.slug==='schamanisches-retreat'||source.slug==='kraft'||source.slug==='wise-in-her-ways-1'||source.slug==='dreaming-reality'||source.slug==='a'||source.slug==='services'||source.slug==='music'||source.slug==='contact'||source.slug==='datenschutz'||source.slug==='my-art')continue; // my-art: Elena 2026-11-09, nur noch Kacheln Musik und Kleidung // kambo: Elena 2026-10-29, Text jetzt in content/kambo.json // 11-sessions: Elena 2026-10-29, Text jetzt in content/sessions.json
   const expected=normalize(w.text);if(seen.has(expected))continue;seen.add(expected);
   const actual=$(`[data-original-source="${source.slug||'home'}:${w.id}"]`);
   assert.equal(actual.length,1,`${locale} ${source.slug} missing source block ${w.id}`);
   assert.equal(normalize(actual.text()),expected,`${source.slug} changed copy ${w.id}`);blockCount++;
  }
  // Elena 2026-10-28 (B-11): Die Startseite zeigt die neuen Stimmen aus content/elena-testimonials.json.
  for(const q of quotes.filter(q=>q.page===source.slug&&q.page!==''&&q.page!=='11-sessions'&&q.page!=='kambo'&&q.page!=='yoga-nidra'&&q.page!=='inner-child'&&q.page!=='song-of-the-soul'&&q.page!=='silent-retreat'&&q.page!=='schamanisches-retreat'&&q.page!=='kraft'&&q.page!=='wise-in-her-ways-1'&&q.page!=='dreaming-reality'&&q.page!=='a'&&q.page!=='services'&&q.page!=='music'&&q.page!=='contact')){
   const actual=$('[data-original-quote]').filter((_,e)=>$(e).attr('data-original-quote')===q.page+':'+q.source+':'+q.name);
   assert.equal(normalize(actual.text()),normalize(q.quote),`${source.slug} changed quote ${q.name}`);quoteCount++;
  }
 }
 for(const d of docs){
  if(['1TiNWH0AcoQoG9anl3mQpyrF7SLPUUvaK','1MWT-oGGmkNTN_t_TtmMZ9s98Tu9aK6LI','1UwjvNoAZWX_oYoDsHAd97Aw8_4-sa9jX'].includes(d.id))continue; // 1:1 Begleitung: geprüft über content/sessions.json und die Stimmen-Prüfung unten
  const route=d.id==='1__UyvceabZDIlJVE3FkvLmOg-1ZudECC'?'about':d.id==='1UwjvNoAZWX_oYoDsHAd97Aw8_4-sa9jX'?'yoga-nidra':'11-sessions';
  const $=load(await fs.readFile(`${prefix}/${route}/index.html`,'utf8'));
  const first=['1UwjvNoAZWX_oYoDsHAd97Aw8_4-sa9jX','1MWT-oGGmkNTN_t_TtmMZ9s98Tu9aK6LI'].includes(d.id)?1:0;
  for(let i=first;i<d.blocks.length;i++){
   assert.equal(plainDashes($(`[data-drive-source="${d.id}:${i}"]`).first().text()),plainDashes(corrected(d.blocks[i].text)),`${locale}: Drive copy changed ${d.id}:${i}`);docCount++;
  }
 }
}
// Elena 2026-10-28 (B-11): jede freigegebene Stimme steht vollständig und unverändert im Karussell der Startseite.
const elena=JSON.parse(await fs.readFile('content/elena-testimonials.json','utf8')).testimonials.filter(q=>q.status==='bereit');
let elenaCount=0;
for(const prefix of ['dist','dist/en']){
 const $=load(await fs.readFile(`${prefix}/index.html`,'utf8'));
 assert.equal($('#teilnehmerstimmen .quote').length,elena.length,`${prefix}: Anzahl der Teilnehmerstimmen`);
 for(const q of elena){
  const figure=$(`[data-testimonial="${q.id}"]`);
  const full=figure.find('.quote-full').length?figure.find('.quote-full'):figure.find('blockquote');
  assert.equal(normalize(full.find('p').map((_,e)=>$(e).text()).get().join(' ')),normalize(q.paragraphs.join(' ')),`${prefix}: Stimme ${q.id} (${q.name}) geändert`);elenaCount++;
 }
}
// Elena 2026-10-29: Seite „1:1 Begleitung“ – alle Texte aus content/sessions.json und alle Stimmen stehen vollständig auf der Seite.
const {sessionQuotes}=await import('../src/final.mjs');
const sessions=JSON.parse(await fs.readFile('content/sessions.json','utf8'));
let sessionCount=0;
for(const [locale,prefix] of [['de','dist'],['en','dist/en']]){
 const $=load(await fs.readFile(`${prefix}/astrologie-human-design/index.html`,'utf8'));
 const flat=t=>normalize(t).replace(/\s+/g,''); // Leitsätze stehen als eigener Block ohne Leerzeichen davor
 const page=flat($('main').text());
 const c=sessions[locale];
 const texts=[c.subtitle,...(c.questions||[]),...[...(c.astrology||[]),...(c.humanDesign||[]),...(c.body||[])].flatMap(b=>b.items||(b.text?[b.text]:[])),...c.readings.flatMap(r=>[r.name,...r.text]),...c.readingsNote,...Object.values(c.groupIntro||{})];
 for(const t of texts){assert.ok(page.includes(flat(t)),`${locale} 1:1 Begleitung: Text fehlt: ${t.slice(0,60)}`);sessionCount++;}
 assert.ok(!page.includes(flat('Allen Menschen, die darüber lachen')),'Entfernter Absatz steht wieder auf der Seite');
 assert.ok(!page.includes('108Euro')&&!page.includes('108€'),'Alter Preis steht wieder auf der Seite');
 assert.equal($('#stimmen .quote').length,sessionQuotes.length,`${locale}: Anzahl der Stimmen auf 1:1 Begleitung`);
 for(const q of sessionQuotes){
  const figure=$(`#stimmen [data-testimonial="${q.id}"]`);const full=figure.find('.quote-full').length?figure.find('.quote-full'):figure.find('blockquote');
  assert.equal(normalize(full.find('p').map((_,e)=>$(e).text()).get().join(' ')),normalize(q.paragraphs.join(' ')),`${locale}: Stimme ${q.name} geändert`);sessionCount++;
 }
 assert.equal($('#session-form').length,1,`${locale}: Anfrageformular fehlt`);
}
const overview=JSON.parse(await fs.readFile('content/sessions-overview.json','utf8'));
for(const [locale,prefix,p] of [['de','dist',''],['en','dist/en','/en']]){
 const $=load(await fs.readFile(`${prefix}/11-sessions/index.html`,'utf8'));
 assert.equal($('.overview-tile').length,overview.tiles.length,`${locale}: Kacheln der Übersicht 1:1 Begleitung`);
 for(const tile of overview.tiles)assert.ok($(`.overview-tile h2 a[href="${p}${tile.href}"]`).length,`${locale}: Kachel ${tile.href} fehlt`);
}
const yogaContent=JSON.parse(await fs.readFile('content/yoga-nidra.json','utf8'));
for(const [locale,prefix] of [['de','dist'],['en','dist/en']]){
 const $=load(await fs.readFile(`${prefix}/yoga-nidra/index.html`,'utf8'));const flat=t=>normalize(t).replace(/\s+/g,'');const page=flat($('main').text());const c=yogaContent[locale];
 for(const t of [c.title,c.claim,...c.highlight.big,c.highlight.text,...c.blocks.flatMap(b=>b.items||(b.text?[b.text]:[]))]){assert.ok(page.includes(flat(t)),`${locale} Yoga Nidra: Text fehlt: ${t.slice(0,60)}`);sessionCount++;}
 const qs=yogaPageQuotes(locale);assert.equal($('#stimmen .quote').length,qs.length,`${locale} Yoga Nidra: Anzahl Stimmen`);
 for(const q of qs){const fig=$(`#stimmen [data-testimonial="${q.id}"]`);const full=fig.find('.quote-full').length?fig.find('.quote-full'):fig.find('blockquote');assert.equal(normalize(full.find('p').map((_,e)=>$(e).text()).get().join(' ')),normalize(q.paragraphs.join(' ')),`${locale} Yoga Nidra: Stimme ${q.name} geändert`);sessionCount++;}
 assert.equal($('main figcaption:not(.quote figcaption)').length,0,`${locale} Yoga Nidra: keine Bildbeschreibungen`);
}
const icContent=JSON.parse(await fs.readFile('content/inner-child.json','utf8'));
for(const [locale,prefix] of [['de','dist'],['en','dist/en']]){
 const $=load(await fs.readFile(`${prefix}/inner-child/index.html`,'utf8'));const flat=t=>normalize(t).replace(/\s+/g,'');const page=flat($('main').text());const c=icContent[locale];
 for(const t of [c.title,c.subtitle,c.claim,c.date,...c.questions,...c.closing,c.places,...c.blocks.flatMap(b=>b.items||(b.text?[b.text]:[]))]){assert.ok(page.includes(flat(t)),`${locale} Inner Child: Text fehlt: ${t.slice(0,60)}`);sessionCount++;}
 const qs=retreatQuotes('Inner Child');assert.equal($('#stimmen .quote').length,qs.length,`${locale} Inner Child: Anzahl Stimmen`);
 assert.ok(qs.every(q=>!/Reading|Onlinekurs/i.test(q.context)),'Inner Child: keine Reading- oder Onlinekurs-Stimmen');
 assert.equal($('#session-form').length,1,`${locale} Inner Child: Formular fehlt`);
}
const sotsContent=JSON.parse(await fs.readFile('content/song-of-the-soul.json','utf8'));
for(const [locale,prefix] of [['de','dist'],['en','dist/en']]){
 const $=load(await fs.readFile(`${prefix}/song-of-the-soul/index.html`,'utf8'));const flat=t=>normalize(t).replace(/\s+/g,'');const page=flat($('main').text());const c=sotsContent[locale];
 for(const t of [c.title,c.claim,c.date,c.questionsIntro,...c.questions,...c.closing,c.places,c.motto,...c.blocks.flatMap(b=>b.items||(b.text?[b.text]:[]))]){assert.ok(page.includes(flat(t)),`${locale} Song of the Soul: Text fehlt: ${t.slice(0,60)}`);sessionCount++;}
 assert.ok(!/Steffen|Reset und Init|ÜBER UNS/i.test($('main').text()),'Song of the Soul: Steffen/Reset/Über uns sollen weg sein');
 assert.ok(!$('main .retreat-story img[src*="/images/web-"],main .sessions-intro img[src*="/images/web-"]').length,'Song of the Soul: keine Fotos der alten Website');
 assert.equal($('#stimmen .quote').length,retreatQuotes('Song of the Soul').length,`${locale} Song of the Soul: Anzahl Stimmen`);
}
const silContent=JSON.parse(await fs.readFile('content/silent-retreat.json','utf8'));
for(const [locale,prefix] of [['de','dist'],['en','dist/en']]){
 const $=load(await fs.readFile(`${prefix}/silent-retreat/index.html`,'utf8'));const flat=t=>normalize(t).replace(/\s+/g,'');const page=flat($('main').text());const c=silContent[locale];
 for(const t of [c.title,c.claim,c.date,...c.closing,c.places,...c.blocks.flatMap(b=>b.items||(b.text?[b.text]:[]))]){assert.ok(page.includes(flat(t)),`${locale} Schweigewochenende: Text fehlt: ${t.slice(0,60)}`);sessionCount++;}
 assert.ok(!/Über Elena|Weltreisende mit deutschen/i.test($('main').text()),'Schweigewochenende: Über Elena soll weg sein');
 const qs=silentQuotes();assert.equal($('#stimmen .quote').length,qs.length,`${locale} Schweigewochenende: Anzahl Stimmen`);
 for(const q of qs){const fig=$(`#stimmen [data-testimonial="${q.id}"]`);const full=fig.find('.quote-full').length?fig.find('.quote-full'):fig.find('blockquote');assert.equal(normalize(full.find('p').map((_,e)=>$(e).text()).get().join(' ')),normalize(q.paragraphs.join(' ')),`${locale} Schweigewochenende: Stimme ${q.name} geändert`);}
}
const shContent=JSON.parse(await fs.readFile('content/shamanic-retreat.json','utf8'));
for(const [locale,prefix] of [['de','dist'],['en','dist/en']]){
 const $=load(await fs.readFile(`${prefix}/schamanisches-retreat/index.html`,'utf8'));const flat=t=>normalize(t).replace(/\s+/g,'');const page=flat($('main').text());const c=shContent[locale];
 for(const t of [c.title,c.claim,c.date,...c.questions,...c.closing,c.places,...c.blocks.flatMap(b=>b.items||(b.text?[b.text]:[]))]){assert.ok(page.includes(flat(t)),`${locale} Schamanisches Retreat: Text fehlt: ${t.slice(0,60)}`);sessionCount++;}
 const qs=shamanicQuotes();assert.equal($('#stimmen .quote').length,qs.length,`${locale} Schamanisches Retreat: Anzahl Stimmen`);
 for(const q of qs){const fig=$(`#stimmen [data-testimonial="${q.id}"]`);const full=fig.find('.quote-full').length?fig.find('.quote-full'):fig.find('blockquote');assert.equal(normalize(full.find('p').map((_,e)=>$(e).text()).get().join(' ')),normalize(q.paragraphs.join(' ')),`${locale} Schamanisches Retreat: Stimme ${q.name} geändert`);}
}
const krContent=JSON.parse(await fs.readFile('content/kraft.json','utf8'));
for(const [locale,prefix] of [['de','dist'],['en','dist/en']]){
 const $=load(await fs.readFile(`${prefix}/kraft/index.html`,'utf8'));const flat=t=>normalize(t).replace(/\s+/g,'');const page=flat($('main').text());const c=krContent[locale];
 for(const t of [c.title,c.claim,c.date,c.questionsIntro,c.questionsLead,...c.questions,...c.closing,...c.blocks.flatMap(b=>b.items||(b.text?[b.text]:[]))]){assert.ok(page.includes(flat(t)),`${locale} Kraft meiner Wurzeln: Text fehlt: ${t.slice(0,60)}`);sessionCount++;}
 const qs=kraftQuotes();assert.equal($('#stimmen .quote').length,qs.length,`${locale} Kraft meiner Wurzeln: Anzahl Stimmen`);
}
const wiContent=JSON.parse(await fs.readFile('content/wise.json','utf8'));
for(const [locale,prefix] of [['de','dist'],['en','dist/en']]){
 const $=load(await fs.readFile(`${prefix}/wise-in-her-ways-1/index.html`,'utf8'));const flat=t=>normalize(t).replace(/\s+/g,'');const page=flat($('main').text());const c=wiContent[locale];
 for(const t of [c.title,c.claim,c.date,c.questionsIntro,...c.questions,...c.closing,...c.blocks.flatMap(b=>b.items||(b.text?[b.text]:[]))]){assert.ok(page.includes(flat(t)),`${locale} Wise In Her Ways: Text fehlt: ${t.slice(0,60)}`);sessionCount++;}
 const qs=wiseQuotes();assert.equal($('#stimmen .quote').length,qs.length,`${locale} Wise In Her Ways: Anzahl Stimmen`);
}
const coContent=JSON.parse(await fs.readFile('content/courses.json','utf8'));
for(const slug of ['dreaming-reality','a'])for(const [locale,prefix] of [['de','dist'],['en','dist/en']]){
 const $=load(await fs.readFile(`${prefix}/${slug}/index.html`,'utf8'));const flat=t=>normalize(t).replace(/\s+/g,'');const page=flat($('main').text());const c=coContent[slug][locale];
 for(const t of [c.title,c.claim,c.tags,c.after,...c.questions,...c.closing,c.places,...c.blocks.flatMap(b=>b.items||(b.text?[b.text]:[]))]){assert.ok(page.includes(flat(t)),`${locale} ${slug}: Text fehlt: ${t.slice(0,60)}`);sessionCount++;}
 assert.equal($('#stimmen .quote').length,courseQuotes(slug).length,`${locale} ${slug}: Anzahl Stimmen`);
}
const kamboContent=JSON.parse(await fs.readFile('content/kambo.json','utf8'));
for(const [locale,prefix] of [['de','dist'],['en','dist/en']]){
 const $=load(await fs.readFile(`${prefix}/kambo/index.html`,'utf8'));const flat=t=>normalize(t).replace(/\s+/g,'');const page=flat($('main').text());const c=kamboContent[locale];
 for(const t of [c.title,c.claim,c.claim2,...c.blocks.flatMap(b=>b.items||(b.text?[b.text]:[]))]){assert.ok(page.includes(flat(t)),`${locale} Kambo: Text fehlt: ${t.slice(0,60)}`);sessionCount++;}
 assert.equal($('main figcaption').filter((i,e)=>!$(e).closest('#teilnehmerstimmen').length).length,0,`${locale} Kambo: keine Bildbeschreibungen`);
 assert.ok(!page.includes(flat('Einblicke in die Arbeit')),'Kambo: Galerie-Überschrift soll weg sein');
 assert.equal($('#session-form').length,1,`${locale} Kambo: Anfrageformular fehlt`);
}
console.log(`PASS: ${sessionCount} Texte und Stimmen der Seite „1:1 Begleitung“ geprüft.`);
console.log(`PASS: ${elenaCount} freigegebene Teilnehmerstimmen der Startseite vollständig geprüft.`);
console.log(`PASS: ${blockCount} original blocks, ${quoteCount} complete original testimonials and ${docCount} Drive paragraphs verified against captured sources across both locales.`);
