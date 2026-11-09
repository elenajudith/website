import fs from 'node:fs';
import {load} from 'cheerio';
import {esc,site} from './render.mjs';
import {socialIcons} from './design.mjs';
const originals=JSON.parse(fs.readFileSync(new URL('../content/original-2026-10-27.json',import.meta.url)));
const docs=JSON.parse(fs.readFileSync(new URL('../content/drive-texts-2026-10-27.json',import.meta.url)));
const testimonials=JSON.parse(fs.readFileSync(new URL('../content/source-testimonials.json',import.meta.url)));
const bannerCopy=JSON.parse(fs.readFileSync(new URL('../content/draft2.json',import.meta.url))).banner;
const images=JSON.parse(fs.readFileSync(new URL('../content/images.json',import.meta.url)));
const about=docs.find(d=>d.id==='1__UyvceabZDIlJVE3FkvLmOg-1ZudECC');
const reading=docs.find(d=>d.id==='1TiNWH0AcoQoG9anl3mQpyrF7SLPUUvaK');
// Superseded biographies only. The source snapshots retain every original widget.
export const excludedBiographies=new Set(['644ea0b1','0a7ca18','c4b8a63','5eb66937','3e16de8c','51f53e94','6319b28e']);
const textual=new Set(['heading','text-editor','button','call-to-action','animated-headline','icon-box']);
const routes=new Set(['','about','11-sessions','astrologie-human-design','services','yoga-nidra','kambo','my-art','contact','impressum','datenschutz','music','photography',...site.retreats.map(r=>r.slug),...site.courses.map(r=>r.slug)]);
// Elena 2026-10-29: auf allen Seiten nur der normale Bindestrich, keine langen Striche (– —).
export const plainDashes=s=>s.replace(/[\u2012\u2013\u2014\u2015\u2212]/g,'-');
export const normalize=s=>plainDashes(s).replace(/\s+/g,' ').trim();
// Elena 2026-10-28 (C-02): freigegebene Korrekturen an Drive-Texten. Die Prüfung in check-content.mjs wendet dieselben Korrekturen an.
const corrections=JSON.parse(fs.readFileSync(new URL('../content/elena-corrections.json',import.meta.url))).replacements;
export const corrected=text=>corrections.reduce((t,[from,to])=>t.split(from).join(to),text);
const docBlock=(d,i)=>`<p data-drive-source="${d.id}:${i}" class="verbatim">${esc(corrected(d.blocks[i].text))}</p>`;
function cleanHtml(html,locale){
 const $=load(html,null,false);
 $('script,style,iframe,svg,img,video,audio,noscript').remove();
 $('.elementor-cta__button').filter((_,el)=>!$(el).attr('href')).attr('href',`${locale==='en'?'/en':''}/contact/#contact-form`);
 $('*').each((_,el)=>{
  const node=$(el),tag=el.tagName;
  const href=tag==='a'?node.attr('href'):null;
  for(const key of Object.keys(el.attribs||{}))node.removeAttr(key);
  if(tag==='h1')el.tagName='h2';
  if(href){
   let resolved=href;
   if(/^https?:\/\/(www\.)?elenajudith\.de(?:\/|$)/.test(href)){
    const u=new URL(href),slug=u.pathname.replace(/^\/+|\/+$/g,'');
    if(routes.has(slug))resolved=(locale==='en'?'/en':'')+'/'+(slug?slug+'/':'');
   }
   if(href.startsWith('#'))node.attr('href',`${locale==='en'?'/en':''}/contact/#contact-form`);
   else if(/^(javascript|data):/i.test(href))node.replaceWith(node.contents());
   else {node.attr('href',resolved);if(resolved.startsWith('http'))node.attr({target:'_blank',rel:'noopener noreferrer'});}
  }
  if(!['a','p','br','h2','h3','h4','h5','h6','ul','ol','li','strong','b','i','em','u','s','blockquote','div','span'].includes(el.tagName))node.replaceWith(node.contents());
 });
 return $.html();
}
export function sourceBlocks(slug,locale){
 const page=originals.find(p=>p.slug===slug);if(!page)return '';
 const seen=new Set();
 return page.widgets.map(w=>{
  if(!textual.has(w.type.split('.')[0])||!w.text.trim())return '';
  if(slug===''&&excludedBiographies.has(w.id))return '';
  if(excludedBiographies.has(w.id))return `<div class="source-block replacement-bio" lang="de">${docBlock(about,1)}<a class="text-link" href="${locale==='en'?'/en':''}/about/">${locale==='en'?'About me':'Über mich'}</a></div>`;
  const key=normalize(w.text);if(seen.has(key))return '';seen.add(key);
  const html=cleanHtml(w.html,locale);
  const block=`<div class="source-block" data-original-source="${slug||'home'}:${w.id}">${html}</div>`;
  return /\b20(?:1\d|2[0-5])\b/.test(w.text)&&!['a','dreaming-reality','11-sessions','yoga-nidra','kambo'].includes(slug)?`<details class="historical-source"><summary>${locale==='en'?'Past event · original information':'Vergangene Veranstaltung · damalige Angaben'}</summary>${block}</details>`:block;
 }).join('');
}
function driveQuotes(id,kind){
 const doc=docs.find(d=>d.id===id),result=[];let buffer=[];
 for(let i=1;i<doc.blocks.length;i++){
  const text=doc.blocks[i].text;
  if(/^[\s\u00a0]*[-–—]/.test(text)||['Alice','Stephanie','Oliver','Ben'].includes(text.trim())){
   result.push({name:text.replace(/^[\s\u00a0]*[-–—]\s*/,''),quote:buffer.map(b=>b.text).join('\n\n'),blocks:buffer,nameBlock:i,doc:id,page:kind});buffer=[];
  }else buffer.push({text,index:i});
 }
 if(buffer.length)throw Error('Unpaired Drive testimonial '+id);
 return result;
}
const yogaQuotes=driveQuotes('1UwjvNoAZWX_oYoDsHAd97Aw8_4-sa9jX','yoga-nidra');
const readingQuotes=driveQuotes('1MWT-oGGmkNTN_t_TtmMZ9s98Tu9aK6LI','11-sessions');
function quoteSection(slug,locale){
 const en=locale==='en';
 let quotes=testimonials.filter(q=>q.page===slug);
 if(slug==='yoga-nidra')quotes=[...quotes,...yogaQuotes];
 if(slug==='11-sessions')quotes=[...quotes,...readingQuotes];
 if(slug==='services')quotes=testimonials.filter(q=>site.retreats.some(r=>r.slug===q.page));
 if(!quotes.length)return '';
 return `<section class="testimonials full-testimonials" id="teilnehmerstimmen" data-section="testimonials"><div class="shell testimonial-grid"><div class="testimonial-heading"><div><p class="eyebrow">${en?'IN THEIR WORDS':'TEILNEHMERSTIMMEN'}</p><h2>${en?'Experiences.':'Erfahrungen.'}</h2></div><div class="quote-controls" hidden><button data-quote-prev aria-label="${en?'Previous testimonial':'Vorherige Teilnehmerstimme'}">←</button><span data-quote-counter aria-hidden="true">01 / ${String(quotes.length).padStart(2,'0')}</span><button data-quote-next aria-label="${en?'Next testimonial':'Nächste Teilnehmerstimme'}">→</button><button class="quote-playback" data-quote-playback data-text-play="${en?'Play':'Start'}" data-text-pause="Pause" data-label-play="${en?'Start automatic rotation':'Automatischen Wechsel starten'}" data-label-pause="${en?'Pause automatic rotation':'Automatischen Wechsel pausieren'}">${en?'Play':'Start'}</button></div></div><div class="quote-stage" aria-live="polite" aria-atomic="true">${quotes.map(q=>{
  const source=images.find(i=>i.id===q.image),v=source?.variants[0];
  return `<figure class="quote"><div class="quote-portrait">${v?`<img src="/${v.file}" width="${v.width}" height="${v.height}" loading="lazy" alt="${esc(q.name)}">`:`<span class="quote-initial" aria-hidden="true">${esc(q.name.charAt(0))}</span>`}</div><blockquote class="verbatim" ${q.doc?'lang="en"':`data-original-quote="${esc(q.page+':'+q.source+':'+q.name)}"`}>${q.doc?q.blocks.map(b=>`<p data-drive-source="${q.doc}:${b.index}">${esc(b.text)}</p>`).join(''):esc(q.quote)}</blockquote><figcaption><strong>${esc(q.name)}</strong>${q.doc?`<span class="source-attribution" data-drive-source="${q.doc}:${q.nameBlock}">${esc(docs.find(d=>d.id===q.doc).blocks[q.nameBlock].text)}</span>`:''}<small>${q.page==='services'?'Retreat':esc([...site.retreats,...site.courses].find(r=>r.slug===q.page)?.title||({'yoga-nidra':'Yoga Nidra','11-sessions':'Reading'}[q.page])||'')}</small></figcaption></figure>`;
 }).join('')}</div></div></section>`;
}
// Elena 2026-10-28 (B-11): Teilnehmerstimmen der Startseite – automatisch laufendes Karussell mit „Weiterlesen“.
const elenaQuotes=JSON.parse(fs.readFileSync(new URL('../content/elena-testimonials.json',import.meta.url))).testimonials.filter(q=>q.status==='bereit');
const EXCERPT_WORDS=55;
function homeQuotes(locale){return quoteCarousel(elenaQuotes,locale,locale==='en'?'Voices of my participants.':'Stimmen meiner TeilnehmerInnen.');}
function quoteCarousel(quotes,locale,heading){
 const en=locale==='en',total=String(quotes.length).padStart(2,'0');
 const paras=list=>list.map(p=>`<p>${esc(p)}</p>`).join('');
 return `<section class="testimonials home-testimonials" id="teilnehmerstimmen" data-section="testimonials"><div class="shell testimonial-grid"><div class="testimonial-heading"><div><h2>${heading}</h2></div><div class="quote-controls" hidden><button data-quote-prev aria-label="${en?'Previous testimonial':'Vorherige Teilnehmerstimme'}">←</button><span data-quote-counter aria-hidden="true">01 / ${total}</span><button data-quote-next aria-label="${en?'Next testimonial':'Nächste Teilnehmerstimme'}">→</button><button class="quote-playback" data-quote-playback data-text-play="${en?'Play':'Abspielen'}" data-text-pause="Pause" data-label-play="${en?'Start automatic rotation':'Automatischen Wechsel starten'}" data-label-pause="${en?'Pause automatic rotation':'Automatischen Wechsel pausieren'}">Pause</button></div></div><div class="quote-stage" aria-live="off" aria-atomic="true">${quotes.map((q,i)=>{
  const source=images.find(img=>img.id===q.image),v=source?.variants[0];
  const words=q.paragraphs.join(' ').split(/\s+/);
  let body;
  if(words.length>EXCERPT_WORDS+10){
   const excerpt=words.slice(0,EXCERPT_WORDS).join(' ').replace(/[,;:–-]$/,'')+' …';
   body=`<div class="quote-excerpt"><p>${esc(excerpt)}</p></div><div class="quote-full" hidden>${paras(q.paragraphs)}</div><button type="button" class="quote-more" aria-expanded="false" data-text-more="${en?'Read more':'Weiterlesen'}" data-text-less="${en?'Show less':'Weniger anzeigen'}">${en?'Read more':'Weiterlesen'}</button>`;
  }else body=paras(q.paragraphs);
  return `<figure class="quote" data-testimonial="${esc(q.id)}" ${i?'hidden':''}><div class="quote-portrait">${v?`<img src="/${v.file}" width="${v.width}" height="${v.height}" loading="lazy" alt="${esc(q.name)}">`:`<span class="quote-initial" aria-hidden="true">${esc(q.name.charAt(0))}</span>`}</div><blockquote lang="${q.lang}">${body}</blockquote><figcaption><strong>${esc(q.name)}</strong><small>${esc(q.context)}</small></figcaption></figure>`;
 }).join('')}</div></div></section>`;
}
// Elena 2026-10-29: Seite „1:1 Begleitung“ neu gestaltet (content/sessions.json, content/sessions-photos.json).
const sessions=JSON.parse(fs.readFileSync(new URL('../content/sessions.json',import.meta.url)));
function instaGrid($,en){const ig=[1,2,3,4,5,6,7,8,9].map(n=>sessionPhotos.find(x=>x.id==='ig-'+n)).filter(Boolean);
    $('main').append(`<section class="insta-grid shell" aria-label="Instagram"><div class="insta-head"><p class="eyebrow">${en?'FOLLOW ME ON INSTAGRAM':'FOLGE MIR AUF INSTAGRAM'}</p><a class="insta-handle" href="https://www.instagram.com/aestheticmatters/" target="_blank" rel="noopener">@aestheticmatters</a></div><div class="insta-tiles">${ig.map(p=>`<a href="https://www.instagram.com/aestheticmatters/" target="_blank" rel="noopener" class="insta-tile"><img src="/images/${p.id}-960.webp" srcset="/images/${p.id}-480.webp 480w, /images/${p.id}-960.webp 960w" sizes="(max-width:650px) 33vw, 380px" alt="${(en?p.alt.en:p.alt.de).replace(/"/g,'&quot;')}" loading="lazy" style="object-position:${p.position}"></a>`).join('')}</div></section>`);}
const sessionPhotos=JSON.parse(fs.readFileSync(new URL('../content/sessions-photos.json',import.meta.url))).photos;
export const sessionQuotes=(()=>{
 const toParas=t=>t.split(/\n\s*\n/).map(x=>x.replace(/\s+/g,' ').trim()).filter(Boolean);
 const original=testimonials.filter(q=>q.page==='11-sessions').map(q=>({id:'reading-'+q.name.toLowerCase(),name:q.name,context:'Reading',lang:'de',image:q.image||null,paragraphs:toParas(q.quote)}));
 const drive=readingQuotes.map(q=>({id:'reading-'+q.name.trim().toLowerCase(),name:q.name.trim(),context:'Reading',lang:'en',image:null,paragraphs:q.blocks.map(b=>b.text.replace(/\s+/g,' ').trim()).filter(Boolean)}));
 const mareike=elenaQuotes.find(q=>q.id==='T-33');
 const list=[...original];
 if(mareike)list.splice(1,0,{...mareike,id:'reading-mareike',context:'Reading'});
 return [...list,...drive];
})();
function sessionPhoto(id,locale,extra=''){
 const p=typeof id==='object'?id:sessionPhotos.find(x=>x.id===id);if(!p)throw Error('Foto fehlt: '+id);
 return `<figure class="about-photo about-photo-single shell shape-${p.shape} ${extra}" style="--focus:${p.position||'50% 40%'}" data-effect="source-reveal">${photoImg(p,locale,'(max-width: 700px) 90vw, 520px')}${p.credit?`<figcaption>${locale==='en'?'Photo':'Foto'}: ${esc(p.credit)}</figcaption>`:''}</figure>`;
}
function sessionBlocks(blocks,locale){
 let side=0,html='',text='',pair=null;
 // Elena 2026-10-29: am Computer steht der folgende Text direkt neben dem Foto (kein leerer Platz); am Handy untereinander.
 const flush=()=>{if(pair){html+=`<div class="sessions-pair shell ${pair.side}">${pair.figure}<div class="about-text sessions-text">${text}</div></div>`;pair=null;text='';return;}if(text){html+=`<div class="source-content shell about-text sessions-text">${text}</div>`;text='';}};
 for(const b of blocks){
  if(b.type==='banner'){flush();const ph=typeof b.photo==='object'?b.photo:sessionPhotos.find(x=>x.id===b.id);html+=`<figure class="session-banner shell" style="--focus:${ph.position||'50% 50%'}">${photoImg(ph,locale,'(max-width: 700px) 100vw, 1200px')}</figure>`;continue;}
  if(b.type==='photo'){flush();const sd=side++%2?'is-right':'is-left';pair={side:sd,figure:sessionPhoto(b.photo||b.id,locale,sd).replace('about-photo-single shell','about-photo-single pair-photo')};continue;}
  if(b.type==='heading'&&pair&&text)flush();
  if(b.type==='heading')text+=`<h2 class="sessions-heading">${esc(b.text)}</h2>`;
  else if(b.type==='lead'){const m=b.text.match(/^(.+?[.!?:])(\s.*)?$/);text+=`<p class="about-lead"><span class="lead-sentence">${esc(m?m[1]:b.text)}</span>${m&&m[2]?esc(m[2].trim()):''}</p>`;}
  else if(b.type==='quote')text+=`<p class="about-quote">${esc(b.text)}</p>`;
  else if(b.type==='statement')text+=`<p class="sessions-statement${b.strong?' is-strong':''}">${b.strong?`<strong>${esc(b.text)}</strong>`:esc(b.text)}</p>`;
  else if(b.type==='video'){flush();const en=locale==='en';html+=`<section class="video-block shell"><div class="video-frame"><button type="button" class="video-facade" data-yt="${esc(b.id)}" onclick="var f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+this.dataset.yt+'?autoplay=1&rel=0';f.title=this.getAttribute('aria-label');f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';f.allowFullscreen=true;this.replaceWith(f)" aria-label="${esc(en?b.title_en||b.title:b.title)}"><span class="video-play" aria-hidden="true"></span><span class="video-title">${esc(en?b.title_en||b.title:b.title)}</span><span class="video-note">${en?'Clicking loads the video from YouTube.':'Beim Klick wird das Video von YouTube geladen.'}</span></button></div></section>`;}
  else if(b.type==='carousel'){flush();const list=b.ids.map(id=>typeof id==='object'?id:sessionPhotos.find(x=>x.id===id));const en=locale==='en';html+=`<section class="v2-gallery about-carousel shell" data-gallery data-autoplay data-section="photo-sequence" aria-label="${en?'Photographs':'Fotos'}"><div class="heading-row"><div class="gallery-controls" hidden><button type="button" data-gallery-prev aria-label="${en?'Previous photograph':'Vorheriges Bild'}">←</button><span data-gallery-count aria-live="polite">01 / ${String(list.length).padStart(2,'0')}</span><button type="button" data-gallery-next aria-label="${en?'Next photograph':'Nächstes Bild'}">→</button><button type="button" class="quote-playback" data-gallery-playback data-text-play="${en?'Play':'Abspielen'}" data-text-pause="Pause" data-label-play="${en?'Start automatic rotation':'Automatischen Wechsel starten'}" data-label-pause="${en?'Pause automatic rotation':'Automatischen Wechsel pausieren'}">Pause</button></div></div><div class="gallery-track" tabindex="0" aria-label="${en?'Photo gallery':'Fotogalerie'}">${list.map(p=>`<figure class="gallery-slide">${photoImg(p,locale,'(max-width: 700px) 80vw, 380px')}</figure>`).join('')}</div></section>`;continue;}
  else if(b.type==='link')text+=`<p class="sessions-link"><a class="text-link" href="${locale==='en'?'/en':''}${b.href}">${esc(b.text)}</a></p>`;
  else if(b.type==='pills')text+=`<div class="about-signs">${b.items.map(i=>`<span class="about-sign">${esc(i)}</span>`).join('')}</div>`;
  else if(b.type==='list')text+=`<ul class="sessions-list">${b.items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>`;
  else text+=`<p>${esc(b.text)}</p>`;
 }
 flush();return html;
}
// Elena 2026-10-29: Astrologie und Human Design sollen oben deutlich hervorstechen
function sessionSubtitle(text){
 const de=text.match(/^(mit) (.+) (und) (.+)$/);
 if(de)return `<span class="topic-small">${esc(de[1])}</span> <span class="topic">${esc(de[2])}</span> <span class="topic-small">${esc(de[3])}</span> <span class="topic">${esc(de[4])}</span>`;
 const en=text.match(/^(Astrology) (And) (Human Design) (.+)$/);
 if(en)return `<span class="topic">${esc(en[1])}</span> <span class="topic-small">${esc(en[2])}</span> <span class="topic">${esc(en[3])}</span> <span class="topic-note">${esc(en[4])}</span>`;
 return esc(text);
}
// Elena 2026-10-29: kleine Planeten-Zeichnungen neben den Sitzungen (eigene Linienzeichnungen, keine fremden Bilder)
const PLANET_ICONS={
 // Westliche Astrologie (Elena 2026-10-29, Option A): Horoskop-Rad mit 12 Häusern; erweitert: ein Haus (Lebensbereich) hervorgehoben
 'astro-0':`<svg viewBox="0 0 96 96" aria-hidden="true"><circle cx="48" cy="48" r="42"/><circle cx="48" cy="48" r="32"/><circle cx="48" cy="48" r="12"/><path d="M48.0 36.0L48.0 6.0M54.0 37.6L69.0 11.6M58.4 42.0L84.4 27.0M60.0 48.0L90.0 48.0M58.4 54.0L84.4 69.0M54.0 58.4L69.0 84.4M48.0 60.0L48.0 90.0M42.0 58.4L27.0 84.4M37.6 54.0L11.6 69.0M36.0 48.0L6.0 48.0M37.6 42.0L11.6 27.0M42.0 37.6L27.0 11.6" opacity=".55"/><circle cx="57.6" cy="12.3" r="1.3" fill="currentColor"/><circle cx="74.2" cy="21.8" r="1.3" fill="currentColor"/><circle cx="83.7" cy="38.4" r="1.3" fill="currentColor"/><circle cx="83.7" cy="57.6" r="1.3" fill="currentColor"/><circle cx="74.2" cy="74.2" r="1.3" fill="currentColor"/><circle cx="57.6" cy="83.7" r="1.3" fill="currentColor"/><circle cx="38.4" cy="83.7" r="1.3" fill="currentColor"/><circle cx="21.8" cy="74.2" r="1.3" fill="currentColor"/><circle cx="12.3" cy="57.6" r="1.3" fill="currentColor"/><circle cx="12.3" cy="38.4" r="1.3" fill="currentColor"/><circle cx="21.8" cy="21.8" r="1.3" fill="currentColor"/><circle cx="38.4" cy="12.3" r="1.3" fill="currentColor"/><circle cx="68.7" cy="55.5" r="2.6" fill="currentColor"/><circle cx="31.9" cy="67.2" r="2.6" fill="currentColor"/><circle cx="30.1" cy="41.5" r="2.6" fill="currentColor"/><circle cx="57.2" cy="22.6" r="2.6" fill="currentColor"/><circle cx="40.5" cy="27.3" r="2.6" fill="currentColor"/></svg>`,
 'astro-1':`<svg viewBox="0 0 96 96" aria-hidden="true"><circle cx="48" cy="48" r="42"/><circle cx="48" cy="48" r="32"/><circle cx="48" cy="48" r="12"/><path d="M48.0 6.0A42 42 0 0 1 69.0 11.6L54.0 37.6A12 12 0 0 0 48.0 36.0Z" fill="currentColor" fill-opacity=".35"/><path d="M48.0 36.0L48.0 6.0M54.0 37.6L69.0 11.6M58.4 42.0L84.4 27.0M60.0 48.0L90.0 48.0M58.4 54.0L84.4 69.0M54.0 58.4L69.0 84.4M48.0 60.0L48.0 90.0M42.0 58.4L27.0 84.4M37.6 54.0L11.6 69.0M36.0 48.0L6.0 48.0M37.6 42.0L11.6 27.0M42.0 37.6L27.0 11.6" opacity=".55"/><circle cx="57.6" cy="12.3" r="1.3" fill="currentColor"/><circle cx="74.2" cy="21.8" r="1.3" fill="currentColor"/><circle cx="83.7" cy="38.4" r="1.3" fill="currentColor"/><circle cx="83.7" cy="57.6" r="1.3" fill="currentColor"/><circle cx="74.2" cy="74.2" r="1.3" fill="currentColor"/><circle cx="57.6" cy="83.7" r="1.3" fill="currentColor"/><circle cx="38.4" cy="83.7" r="1.3" fill="currentColor"/><circle cx="21.8" cy="74.2" r="1.3" fill="currentColor"/><circle cx="12.3" cy="57.6" r="1.3" fill="currentColor"/><circle cx="12.3" cy="38.4" r="1.3" fill="currentColor"/><circle cx="21.8" cy="21.8" r="1.3" fill="currentColor"/><circle cx="38.4" cy="12.3" r="1.3" fill="currentColor"/><circle cx="68.7" cy="55.5" r="2.6" fill="currentColor"/><circle cx="31.9" cy="67.2" r="2.6" fill="currentColor"/><circle cx="30.1" cy="41.5" r="2.6" fill="currentColor"/><circle cx="57.2" cy="22.6" r="2.6" fill="currentColor"/><circle cx="40.5" cy="27.3" r="2.6" fill="currentColor"/></svg>`,
 // Human Design: Bodygraph (Grundlagen), Bodygraph mit definierten Zentren und gefetteten Kanälen (erweitert), Doppelhelix (Genschlüssel)
 'hd-0':`<svg viewBox="17 2 62 94" aria-hidden="true"><path d="M48 16v4M48 31v4M48 45v3M48 62v8M48 80v4M43 44 25 65M53 44l18 21M25 78l17 9M71 78l-17 9M32 72l10 2M64 72l-10 2M58 59l-4-2M66 63l3 4M60 57l-6-12M41 55 29 67" opacity=".45"/><g fill="currentColor" fill-opacity=".12"><path d="M48 4 40 16h16Z"/><path d="M40 20h16l-8 11Z"/><rect x="42" y="35" width="12" height="10"/><path d="M48 48l7 7-7 7-7-7Z"/><path d="M59 57l8 4-9 4Z"/><rect x="42" y="70" width="12" height="10"/><rect x="42" y="84" width="12" height="10"/><path d="M20 62v18l12-9Z"/><path d="M76 62v18l-12-9Z"/></g></svg>`,
 'hd-1':`<svg viewBox="17 2 62 94" aria-hidden="true"><path d="M48 16v4M48 31v4M48 45v3M48 62v8M48 80v4M43 44 25 65M53 44l18 21M25 78l17 9M71 78l-17 9M32 72l10 2M64 72l-10 2M58 59l-4-2M66 63l3 4M60 57l-6-12M41 55 29 67" opacity=".45"/><path d="M48 45v3M48 62v8M48 80v4M71 78l-17 9M53 44l18 21" stroke-width="3.2" stroke-linecap="round"/><g fill="currentColor" fill-opacity=".12"><path d="M48 4 40 16h16Z"/><path d="M40 20h16l-8 11Z"/><rect x="42" y="35" width="12" height="10"/><path d="M48 48l7 7-7 7-7-7Z"/><path d="M59 57l8 4-9 4Z"/><rect x="42" y="70" width="12" height="10"/><rect x="42" y="84" width="12" height="10"/><path d="M20 62v18l12-9Z"/><path d="M76 62v18l-12-9Z"/></g><g fill="currentColor" fill-opacity=".55"><path d="M48 48l7 7-7 7-7-7Z"/><rect x="42" y="70" width="12" height="10"/><rect x="42" y="84" width="12" height="10"/><path d="M76 62v18l-12-9Z"/><rect x="42" y="35" width="12" height="10"/></g></svg>`,
 'hd-2':`<svg viewBox="20 2 56 92" aria-hidden="true"><path d="M30 8C66 20 66 36 48 48S30 76 66 88M66 8C30 20 30 36 48 48S66 76 30 88"/><path d="M36 18h24M38 28h20M42 38h12M42 58h12M38 68h20M36 78h24" opacity=".5"/><g fill="currentColor"><circle cx="30" cy="8" r="2.6"/><circle cx="66" cy="8" r="2.6"/><circle cx="30" cy="88" r="2.6"/><circle cx="66" cy="88" r="2.6"/><circle cx="48" cy="48" r="3.2"/></g></svg>`
};
const readingValue=r=>`${r.group}: ${r.name}`;
// Elena 2026-10-29: Übersicht „1:1 Begleitung“ mit allen Einzelangeboten (Texte: content/sessions-overview.json)
const sessionsOverviewData=JSON.parse(fs.readFileSync(new URL('../content/sessions-overview.json',import.meta.url)));
function sessionsOverview(locale){
 const en=locale==='en',c=sessionsOverviewData[en?'en':'de'],t=(de,e)=>en?e:de,p=en?'/en':'';
 const tiles=sessionsOverviewData.tiles.map((tile,i)=>{const x=tile[en?'en':'de'];return `<article class="overview-tile${i%2?' overview-tile-alt':''}"><a class="overview-image" href="${p}${tile.href}" tabindex="-1" aria-hidden="true" style="--focus:${tile.position||'50% 40%'}">${photoImg({id:tile.image,alt:tile.alt},locale,'(max-width: 700px) 100vw, 45vw')}</a><div class="overview-copy"><p class="eyebrow">${esc(x.eyebrow)}</p><h2><a href="${p}${tile.href}">${esc(x.title)}</a></h2><p>${esc(x.text)}</p><a class="text-link" href="${p}${tile.href}">${t('Entdecken','Explore')}</a></div></article>`;}).join('');
 return `<section class="page-intro shell overview-intro"><p class="eyebrow">${esc(c.eyebrow)}</p><h1>${esc(c.title)}</h1><p class="overview-lead">${esc(c.lead)}</p></section><section class="overview-tiles shell">${tiles}</section><section class="overview-help"><div class="shell"><h2>${esc(c.helpTitle)}</h2><p>${esc(c.helpText)}</p><a class="button" href="${p}/contact/">${t('Schreib mir','Write to me')}</a></div></section>`;
}
// Elena 2026-10-29: Yoga-Nidra-Seite (Texte: content/yoga-nidra.json)
const yoga=JSON.parse(fs.readFileSync(new URL('../content/yoga-nidra.json',import.meta.url)));
export const yogaPageQuotes=locale=>{
 const toParas=t=>t.split(/\n\s*\n/).map(x=>x.replace(/\s+/g,' ').trim()).filter(Boolean);
 const original=testimonials.filter(q=>q.page==='yoga-nidra').map(q=>({id:'yoga-'+q.name.toLowerCase()+'-de',name:q.name,context:'Yoga Nidra',lang:'de',image:q.image||null,paragraphs:toParas(q.quote)}));
 const drive=yogaQuotes.map(q=>({id:'yoga-'+q.name.trim().toLowerCase()+'-en',name:q.name.trim(),context:'Yoga Nidra',lang:'en',image:null,paragraphs:q.blocks.map(b=>b.text.replace(/\s+/g,' ').trim()).filter(Boolean)}));
 // Alice steht in beiden Sprachen in den Quellen: auf jeder Seite nur in der passenden Sprache.
 return locale==='en'?[...drive.filter(q=>q.name==='Alice'),...original.filter(q=>q.name!=='Alice'),...drive.filter(q=>q.name!=='Alice')]:[...original,...drive.filter(q=>q.name!=='Alice')];
};
function yogaMain(locale){
 const en=locale==='en',c=yoga[en?'en':'de'],t=(de,e)=>en?e:de;
 const hero=`<section class="page-intro with-image shell sessions-intro yoga-intro"><div><p class="eyebrow">${esc(c.eyebrow)}</p><h1>${esc(c.title)}</h1><p class="kambo-claim yoga-claim">${esc(c.claim)}</p><div class="hero-actions"><a class="button" href="#anfrage">${t('Session anfragen','Request a session')}</a><a class="button button-light" href="#stimmen">${t('Erfahrungen','Experiences')}</a></div></div><figure class="sessions-header" style="--focus:${yoga.hero.position}">${photoImg(yoga.hero,locale,'(max-width: 700px) 100vw, 40vw').replace('loading="lazy"','fetchpriority="high"')}</figure></section>`;
 const gallery='';
 const quotes=quoteCarousel(yogaPageQuotes(locale),locale,t('Stimmen meiner TeilnehmerInnen.','Voices of my participants.')).replace('id="teilnehmerstimmen"','id="stimmen"');
 const form=`<section class="sessions-request shell" id="anfrage"><div class="request-copy"><p class="eyebrow">${t('EINZELSITZUNG ANFRAGEN','REQUEST A ONE-TO-ONE SESSION')}</p><h2>${t('Lass uns reisen.','Let’s journey.')}</h2><p>${t('Schreib mir, wann es dir passen würde und was dich gerade bewegt. Ich melde mich persönlich bei dir.','Tell me when would suit you and what is on your mind. I will get back to you personally.')}</p></div><form id="session-form" data-email="${esc(site.email)}" data-whatsapp="${esc(site.whatsapp)}" data-subject="${t('Anfrage Yoga Nidra Einzelsitzung','Yoga Nidra one-to-one session request')}" novalidate><div class="field-row"><label for="sf-name">${t('Name','Name')}</label><input id="sf-name" name="name" autocomplete="name" required></div><div class="field-row"><label for="sf-contact">${t('Deine E-Mail-Adresse oder Telefonnummer','Your email address or phone number')}</label><input id="sf-contact" name="contact" autocomplete="email" required></div><input type="hidden" name="reading" value="${t('Yoga Nidra Einzelsitzung','Yoga Nidra one-to-one session')}"><div class="field-row"><label for="sf-mode">${t('Online oder vor Ort?','Online or in person?')}</label><select id="sf-mode" name="mode"><option>${t('Online','Online')}</option><option>${t('Vor Ort','In person')}</option><option>${t('Egal','Either')}</option></select></div><div class="field-row"><label for="sf-dates">${t('Wunschtermine (optional)','Preferred dates (optional)')}</label><input id="sf-dates" name="dates"></div><div class="field-row"><label for="sf-msg">${t('Was bewegt dich gerade? (optional)','What is on your mind? (optional)')}</label><textarea id="sf-msg" name="message" rows="4"></textarea></div><div class="form-actions"><button type="submit" class="button">${t('Anfrage senden','Send request')}</button><a class="button button-light" data-session-whatsapp href="${esc(site.whatsapp)}" target="_blank" rel="noopener noreferrer">${t('Per WhatsApp anfragen','Request via WhatsApp')}</a></div><p class="form-note">${t('Deine Nachricht wird in deinem E-Mail-Programm oder in WhatsApp vorbereitet. Du entscheidest dort, wann du sie sendest. Eine Anfrage ist noch keine Buchung.','Your message is prepared in your email app or in WhatsApp. You decide there when to send it. A request is not yet a booking.')}</p></form></section>`;
 const facts=c.highlight?`<section class="yoga-facts"><div class="shell"><div class="yoga-facts-big">${c.highlight.big.map(x=>`<p>${esc(x)}</p>`).join('')}</div><p class="yoga-facts-text">${esc(c.highlight.text)}</p></div></section>`:'';
 return hero+facts+`<section class="sessions-story yoga-story">${sessionBlocks(c.blocks,locale)}</section>`+gallery+quotes+form;
}
// Elena 2026-10-29: Fotografie-Seite (Texte und aktueller Ort: content/photography.json)
const photography=JSON.parse(fs.readFileSync(new URL('../content/photography.json',import.meta.url)));
function photographyMain(locale){
 const en=locale==='en',c=photography[en?'en':'de'],t=(de,e)=>en?e:de,where=photography.location[en?'en':'de'];
 const hero=`<section class="page-intro with-image shell sessions-intro yoga-intro photo-intro"><div><p class="eyebrow">${esc(c.eyebrow)}</p><h1>${esc(c.title)}</h1><p class="photo-where"><span>${t('Gerade bin ich in','Right now I am in')}</span> ${esc(where)}</p><div class="hero-actions"><a class="button" href="#anfrage">${t('Shooting anfragen','Request a shoot')}</a></div></div><figure class="sessions-header" style="--focus:${photography.hero.position}">${photoImg(photography.hero,locale,'(max-width: 700px) 100vw, 40vw').replace('loading="lazy"','fetchpriority="high"')}</figure></section>`;
 const carousels=photography.carousels.map(cr=>sessionBlocks([{type:'carousel',ids:cr.ids}],locale)).join('').replace(/about-carousel/g,'about-carousel photo-carousel');
 const form=`<section class="sessions-request shell" id="anfrage"><div class="request-copy"><p class="eyebrow">${t('SHOOTING ANFRAGEN','REQUEST A SHOOT')}</p><h2>${t('Lass uns Momente einfangen.','Let’s capture moments.')}</h2><p>${t('Erzähl mir von deiner Idee. Ich melde mich persönlich bei dir.','Tell me about your idea. I will get back to you personally.')}</p><div class="photo-where-box"><p class="eyebrow">${t('WO ICH GERADE BIN','WHERE I AM RIGHT NOW')}</p><p class="photo-where-place">${esc(where)}</p><p>${t('Ich biete Fotoshootings dort an, wo ich gerade bin.','I offer photo shoots wherever I happen to be.')}</p></div></div><form id="session-form" data-email="${esc(site.email)}" data-whatsapp="${esc(site.whatsapp)}" data-subject="${t('Anfrage Fotoshooting','Photo shoot request')}" novalidate><input type="hidden" name="reading" value="${t('Fotoshooting','Photo shoot')}"><div class="field-row"><label for="sf-name">${t('Name','Name')}</label><input id="sf-name" name="name" autocomplete="name" required></div><div class="field-row"><label for="sf-contact">${t('Deine E-Mail-Adresse oder Telefonnummer','Your email address or phone number')}</label><input id="sf-contact" name="contact" autocomplete="email" required></div><div class="field-row"><label for="sf-place">${t('Wo soll das Shooting stattfinden?','Where should the shoot take place?')}</label><input id="sf-place" name="birthplace"></div><div class="field-row"><label for="sf-dates">${t('Wunschtermine (optional)','Preferred dates (optional)')}</label><input id="sf-dates" name="dates"></div><div class="field-row"><label for="sf-msg">${t('Was möchtest du festhalten? (optional)','What would you like to capture? (optional)')}</label><textarea id="sf-msg" name="message" rows="4"></textarea></div><div class="form-actions"><button type="submit" class="button">${t('Anfrage senden','Send request')}</button><a class="button button-light" data-session-whatsapp href="${esc(site.whatsapp)}" target="_blank" rel="noopener noreferrer">${t('Per WhatsApp anfragen','Request via WhatsApp')}</a></div><p class="form-note">${t('Deine Nachricht wird in deinem E-Mail-Programm oder in WhatsApp vorbereitet. Du entscheidest dort, wann du sie sendest. Eine Anfrage ist noch keine Buchung.','Your message is prepared in your email app or in WhatsApp. You decide there when to send it. A request is not yet a booking.')}</p></form></section>`;
 return hero+`<section class="sessions-story photo-story">${sessionBlocks(c.blocks,locale)}</section>`+carousels+form;
}
// Elena 2026-10-30: Retreat „Coming Back Home - Inner Child“ (content/inner-child.json)
const innerChild=JSON.parse(fs.readFileSync(new URL('../content/inner-child.json',import.meta.url)));
// Stimmen aller Retreats (keine Readings, keine Onlinekurse); die des jeweiligen Retreats zuerst.
export const retreatQuotes=first=>{const all=elenaQuotes.filter(q=>!/Reading|Onlinekurs|Kambo/i.test(q.context));const re=new RegExp(first,'i');return [...all.filter(q=>re.test(q.context)),...all.filter(q=>!re.test(q.context))];};
function waitlistForm(locale,subject,retreat,note){
 const t=(de,e)=>locale==='en'?e:de;
 return `<section class="sessions-request shell" id="anfrage"><div class="request-copy"><p class="eyebrow">${t('WARTELISTE','WAITING LIST')}</p><h2>${t('Hüpf auf die Warteliste.','Join the waiting list.')}</h2><p>${t('Schreib mir, und ich melde mich persönlich bei dir mit allen Infos und den Preisen, sobald der Termin feststeht.','Write to me and I will get back to you personally with all the details and prices as soon as the date is set.')}</p>${note?`<p class="retreat-places">${esc(note)}</p>`:''}</div><form id="session-form" data-email="${esc(site.email)}" data-whatsapp="${esc(site.whatsapp)}" data-subject="${esc(subject)}" novalidate><input type="hidden" name="reading" value="${esc(retreat)}"><div class="field-row"><label for="sf-name">${t('Name','Name')}</label><input id="sf-name" name="name" autocomplete="name" required></div><div class="field-row"><label for="sf-contact">${t('Deine E-Mail-Adresse oder Telefonnummer','Your email address or phone number')}</label><input id="sf-contact" name="contact" autocomplete="email" required></div><div class="field-row"><label for="sf-mode">${t('Was möchtest du?','What would you like?')}</label><select id="sf-mode" name="mode"><option>${t('Auf die Warteliste','Join the waiting list')}</option><option>${t('Erst einmal Infos und Preise','First some details and prices')}</option></select></div><div class="field-row"><label for="sf-msg">${t('Möchtest du mir noch etwas sagen? (optional)','Anything else you would like to tell me? (optional)')}</label><textarea id="sf-msg" name="message" rows="4"></textarea></div><div class="form-actions"><button type="submit" class="button">${t('Anfrage senden','Send request')}</button><a class="button button-light" data-session-whatsapp href="${esc(site.whatsapp)}" target="_blank" rel="noopener noreferrer">${t('Per WhatsApp anfragen','Request via WhatsApp')}</a></div><p class="form-note">${t('Deine Nachricht wird in deinem E-Mail-Programm oder in WhatsApp vorbereitet. Du entscheidest dort, wann du sie sendest. Die Warteliste ist unverbindlich.','Your message is prepared in your email app or in WhatsApp. You decide there when to send it. The waiting list is non-binding.')}</p></form></section>`;
}
function innerChildMain(locale){
 const en=locale==='en',c=innerChild[en?'en':'de'],t=(de,e)=>en?e:de;
 const hero=`<section class="page-intro with-image shell sessions-intro yoga-intro retreat-intro"><div><p class="eyebrow">${esc(c.eyebrow)}</p><h1>${esc(c.title)}<span class="retreat-subtitle">${esc(c.subtitle)}</span></h1><p class="retreat-claim">${esc(c.claim)}</p><div class="retreat-date"><p class="eyebrow">${esc(c.dateLabel)}</p><p class="retreat-date-place">${esc(c.date)}</p></div><div class="hero-actions"><a class="button" href="#anfrage">${t('Auf die Warteliste','Join the waiting list')}</a><a class="button button-light" href="#stimmen">${t('Erfahrungen','Experiences')}</a></div></div><figure class="sessions-header" style="--focus:${innerChild.hero.position}">${photoImg(innerChild.hero,locale,'(max-width: 700px) 100vw, 40vw').replace('loading="lazy"','fetchpriority="high"')}</figure></section>`;
 const questions=`<section class="sessions-questions"><div class="shell"><ul>${c.questions.map(q=>`<li>${esc(q)}</li>`).join('')}</ul></div></section>`;
 const quotes=quoteCarousel(retreatQuotes('Inner Child'),locale,t('Stimmen meiner TeilnehmerInnen.','Voices of my participants.')).replace('id="teilnehmerstimmen"','id="stimmen"');
 const closing=`<section class="retreat-closing"><div class="shell">${c.closing.map((x,i)=>`<p class="retreat-closing-${i}">${esc(x)}</p>`).join('')}</div></section>`;
 return hero+questions+`<section class="sessions-story retreat-story">${sessionBlocks(c.blocks,locale)}</section>`+quotes+closing+waitlistForm(locale,t('Warteliste Inner Child Retreat','Inner Child Retreat waiting list'),'Coming Back Home - Inner Child Retreat',c.places);
}
// Elena 2026-10-30: Retreat „Song of the Soul“ (content/song-of-the-soul.json)
const songSoul=JSON.parse(fs.readFileSync(new URL('../content/song-of-the-soul.json',import.meta.url)));
function songSoulMain(locale){
 const en=locale==='en',c=songSoul[en?'en':'de'],t=(de,e)=>en?e:de;
 const heroPhoto=sessionPhotos.find(x=>x.id===songSoul.hero.id);
 const hero=`<section class="page-intro with-image shell sessions-intro yoga-intro retreat-intro"><div><p class="eyebrow">${esc(c.eyebrow)}</p><h1>${esc(c.title)}<span class="retreat-subtitle">${esc(c.subtitle)}</span></h1><p class="retreat-claim">${esc(c.claim)}</p><div class="retreat-date"><p class="eyebrow">${esc(c.dateLabel)}</p><p class="retreat-date-place">${esc(c.date)}</p></div><div class="hero-actions"><a class="button" href="#anfrage">${t('Auf die Warteliste','Join the waiting list')}</a><a class="button button-light" href="#stimmen">${t('Erfahrungen','Experiences')}</a></div></div><figure class="sessions-header" style="--focus:${heroPhoto.position}">${photoImg(heroPhoto,locale,'(max-width: 700px) 100vw, 40vw').replace('loading="lazy"','fetchpriority="high"')}</figure></section>`;
 const questions=`<section class="sessions-questions"><div class="shell"><p class="questions-intro">${esc(c.questionsIntro)}</p><ul>${c.questions.map(q=>`<li>${esc(q)}</li>`).join('')}</ul></div></section>`;
 const quotes=quoteCarousel(retreatQuotes('Song of the Soul'),locale,t('Stimmen meiner TeilnehmerInnen.','Voices of my participants.')).replace('id="teilnehmerstimmen"','id="stimmen"');
 const closing=`<section class="retreat-closing"><div class="shell"><p class="retreat-closing-0">${esc(c.closing[0])}</p><p class="retreat-closing-text">${esc(c.closing[1])}</p><p class="retreat-closing-text">${esc(c.closing[2])}</p><p class="retreat-closing-3">${esc(c.closing[3])}</p></div></section>`;
 return hero+questions+`<section class="sessions-story retreat-story">${sessionBlocks(c.blocks,locale)}</section>`+quotes+closing+waitlistForm(locale,t('Warteliste Song of the Soul Retreat','Song of the Soul Retreat waiting list'),'Song of the Soul Retreat',c.places)+`<p class="retreat-motto shell">${esc(c.motto)}</p>`;
}
// Elena 2026-10-30: Schweigewochenende / Silent Retreat (content/silent-retreat.json)
const silent=JSON.parse(fs.readFileSync(new URL('../content/silent-retreat.json',import.meta.url)));
export const silentQuotes=()=>{
 const toParas=t=>t.split(/\n\s*\n|\n/).map(x=>x.replace(/\s+/g,' ').trim()).filter(Boolean);
 const have=new Set(elenaQuotes.map(q=>q.name.toLowerCase()));
 const extra=testimonials.filter(q=>q.page==='silent-retreat'&&!have.has(q.name.toLowerCase())).map(q=>({id:'silent-'+q.name.toLowerCase(),name:q.name,context:'Schweigewochenende',lang:'de',image:q.image||null,paragraphs:toParas(q.quote)}));
 const rest=retreatQuotes('Schweigewochenende|Silent');const first=rest.filter(q=>q.name==='Denise');return [...first,...extra,...rest.filter(q=>q.name!=='Denise')];
};
function silentMain(locale){
 const en=locale==='en',c=silent[en?'en':'de'],t=(de,e)=>en?e:de;
 const heroPhoto=sessionPhotos.find(x=>x.id===silent.hero.id);
 const hero=`<section class="page-intro with-image shell sessions-intro yoga-intro retreat-intro"><div><p class="eyebrow">${esc(c.eyebrow)}</p><h1>${esc(c.title)}${c.subtitle?`<span class="retreat-subtitle">${esc(c.subtitle)}</span>`:''}</h1><p class="retreat-claim">${esc(c.claim)}</p><div class="retreat-date"><p class="eyebrow">${esc(c.dateLabel)}</p><p class="retreat-date-place">${esc(c.date)}</p></div><div class="hero-actions"><a class="button" href="#anfrage">${t('Auf die Warteliste','Join the waiting list')}</a><a class="button button-light" href="#stimmen">${t('Erfahrungen','Experiences')}</a></div></div><figure class="sessions-header silent-header" style="--focus:${heroPhoto.position}">${photoImg(heroPhoto,locale,'(max-width: 700px) 100vw, 40vw').replace('loading="lazy"','fetchpriority="high"')}</figure></section>`;
 const quotes=quoteCarousel(silentQuotes(),locale,t('Stimmen meiner TeilnehmerInnen.','Voices of my participants.')).replace('id="teilnehmerstimmen"','id="stimmen"');
 const closing=`<section class="retreat-closing"><div class="shell"><p class="retreat-closing-0">${esc(c.closing[0])}</p><p class="retreat-closing-1">${esc(c.closing[1])}</p><p class="retreat-closing-text">${esc(c.closing[2])}</p></div></section>`;
 return hero+`<section class="sessions-story retreat-story">${sessionBlocks(c.blocks,locale)}</section>`+quotes+closing+waitlistForm(locale,t('Warteliste Schweigewochenende','Silent Retreat waiting list'),t('Schweigewochenende','Silent Retreat'),c.places);
}
// Elena 2026-10-30: Schamanisches Retreat (content/shamanic-retreat.json)
const shamanic=JSON.parse(fs.readFileSync(new URL('../content/shamanic-retreat.json',import.meta.url)));
export const pageQuotes=(slug,label,first)=>{
 const toParas=t=>t.split(/\n\s*\n|\n/).map(x=>x.replace(/\s+/g,' ').trim()).filter(Boolean);
 const have=new Set(elenaQuotes.map(q=>q.name.toLowerCase()));
 const extra=testimonials.filter(q=>q.page===slug&&!have.has(q.name.toLowerCase())).map(q=>({id:slug+'-'+q.name.toLowerCase(),name:q.name,context:label,lang:/^(To |I |The |It )/.test(q.quote.trim())?'en':'de',image:q.image||null,paragraphs:toParas(q.quote)}));
 return [...extra,...retreatQuotes(first)];
};
export const shamanicQuotes=()=>pageQuotes('schamanisches-retreat','Schamanisches Retreat','Schamanisch');
function shamanicMain(locale){
 const en=locale==='en',c=shamanic[en?'en':'de'],t=(de,e)=>en?e:de;
 const hp=shamanic.hero;
 const hero=`<section class="page-intro with-image shell sessions-intro yoga-intro retreat-intro"><div><p class="eyebrow">${esc(c.eyebrow)}</p><h1>${esc(c.title)}<span class="retreat-subtitle">${esc(c.subtitle)}</span></h1><p class="retreat-claim">${esc(c.claim)}</p><div class="retreat-date"><p class="eyebrow">${esc(c.dateLabel)}</p><p class="retreat-date-place">${esc(c.date)}</p></div><div class="hero-actions"><a class="button" href="#anfrage">${t('Auf die Warteliste','Join the waiting list')}</a><a class="button button-light" href="#stimmen">${t('Erfahrungen','Experiences')}</a></div></div><figure class="sessions-header" style="--focus:${hp.position}">${photoImg(hp,locale,'(max-width: 700px) 100vw, 40vw').replace('loading="lazy"','fetchpriority="high"')}</figure></section>`;
 const questions=`<section class="sessions-questions"><div class="shell"><ul>${c.questions.map(q=>`<li>${esc(q)}</li>`).join('')}</ul></div></section>`;
 const quotes=quoteCarousel(shamanicQuotes(),locale,t('Stimmen meiner TeilnehmerInnen.','Voices of my participants.')).replace('id="teilnehmerstimmen"','id="stimmen"');
 const closing=`<section class="retreat-closing"><div class="shell">${c.closing.map((x,i)=>`<p class="retreat-closing-${i}">${esc(x)}</p>`).join('')}</div></section>`;
 return hero+questions+`<section class="sessions-story retreat-story">${sessionBlocks(c.blocks,locale)}</section>`+quotes+closing+waitlistForm(locale,t('Warteliste Schamanisches Retreat','Shamanic Retreat waiting list'),t('Schamanisches Retreat','Shamanic Retreat'),c.places);
}
// Elena 2026-11-03: Kraft meiner Wurzeln (content/kraft.json)
const kraft=JSON.parse(fs.readFileSync(new URL('../content/kraft.json',import.meta.url)));
export const kraftQuotes=()=>pageQuotes('kraft','Kraft meiner Wurzeln','Kraft|Wurzeln');
function kraftMain(locale){
 const en=locale==='en',c=kraft[en?'en':'de'],t=(de,e)=>en?e:de;
 const hp=kraft.hero;
 const hero=`<section class="page-intro with-image shell sessions-intro yoga-intro retreat-intro"><div><p class="eyebrow">${esc(c.eyebrow)}</p><h1>${esc(c.title)}<span class="retreat-subtitle">${esc(c.subtitle)}</span></h1><p class="retreat-claim">${esc(c.claim)}</p><div class="retreat-date"><p class="eyebrow">${esc(c.dateLabel)}</p><p class="retreat-date-place">${esc(c.date)}</p></div><div class="hero-actions"><a class="button" href="#anfrage">${t('Auf die Warteliste','Join the waiting list')}</a><a class="button button-light" href="#stimmen">${t('Erfahrungen','Experiences')}</a></div></div><figure class="sessions-header" style="--focus:${hp.position}">${photoImg(hp,locale,'(max-width: 700px) 100vw, 40vw').replace('loading="lazy"','fetchpriority="high"')}</figure></section>`;
 const questions=`<section class="sessions-questions"><div class="shell"><p class="questions-intro">${esc(c.questionsIntro)}</p>${c.questionsLead?`<p class="questions-lead">${esc(c.questionsLead)}</p>`:''}<ul>${c.questions.map(q=>`<li>${esc(q)}</li>`).join('')}</ul></div></section>`;
 const quotes=quoteCarousel(kraftQuotes(),locale,t('Stimmen meiner TeilnehmerInnen.','Voices of my participants.')).replace('id="teilnehmerstimmen"','id="stimmen"');
 const closing=`<section class="retreat-closing is-long"><div class="shell">${c.closing.map((x,i)=>`<p class="retreat-closing-${i}">${esc(x)}</p>`).join('')}</div></section>`;
 return hero+questions+`<section class="sessions-story retreat-story">${sessionBlocks(c.blocks,locale)}</section>`+quotes+closing+waitlistForm(locale,t('Warteliste Kraft meiner Wurzeln','The Strength of My Roots waiting list'),t('Kraft meiner Wurzeln','The Strength of My Roots'),c.places);
}
// Elena 2026-11-03: Wise In Her Ways (content/wise.json)
const wise=JSON.parse(fs.readFileSync(new URL('../content/wise.json',import.meta.url)));
export const wiseQuotes=()=>pageQuotes('wise-in-her-ways-1','Wise In Her Ways','Wise');
function wiseMain(locale){
 const en=locale==='en',c=wise[en?'en':'de'],t=(de,e)=>en?e:de;
 const hp=wise.hero;
 const hero=`<section class="page-intro with-image shell sessions-intro yoga-intro retreat-intro"><div><p class="eyebrow">${esc(c.eyebrow)}</p><h1>${esc(c.title)}<span class="retreat-subtitle">${esc(c.subtitle)}</span></h1><p class="retreat-claim">${esc(c.claim)}</p><div class="retreat-date"><p class="eyebrow">${esc(c.dateLabel)}</p><p class="retreat-date-place">${esc(c.date)}</p></div><div class="hero-actions"><a class="button" href="#anfrage">${t('Auf die Warteliste','Join the waiting list')}</a><a class="button button-light" href="#stimmen">${t('Erfahrungen','Experiences')}</a></div></div><figure class="sessions-header" style="--focus:${hp.position}">${photoImg(hp,locale,'(max-width: 700px) 100vw, 40vw').replace('loading="lazy"','fetchpriority="high"')}</figure></section>`;
 const questions=`<section class="sessions-questions"><div class="shell"><p class="questions-intro">${esc(c.questionsIntro)}</p>${c.questionsLead?`<p class="questions-lead">${esc(c.questionsLead)}</p>`:''}<ul>${c.questions.map(q=>`<li>${esc(q)}</li>`).join('')}</ul></div></section>`;
 const quotes=quoteCarousel(wiseQuotes(),locale,t('Stimmen meiner TeilnehmerInnen.','Voices of my participants.')).replace('id="teilnehmerstimmen"','id="stimmen"');
 const closing=`<section class="retreat-closing is-long"><div class="shell">${c.closing.map((x,i)=>`<p class="retreat-closing-${i}">${esc(x)}</p>`).join('')}</div></section>`;
 return hero+questions+`<section class="sessions-story retreat-story">${sessionBlocks(c.blocks,locale)}</section>`+quotes+closing+waitlistForm(locale,t('Warteliste Wise In Her Ways','Wise In Her Ways waiting list'),'Wise In Her Ways',c.places);
}
// Elena 2026-11-03: Onlinekurse Dreaming Reality und Archetypen (content/courses.json)
const courses=JSON.parse(fs.readFileSync(new URL('../content/courses.json',import.meta.url)));
export const courseQuotes=slug=>{if(slug==='a')return elenaQuotes.filter(q=>/Archetyp/.test(q.context));if(slug!=='dreaming-reality')return [];const extra=pageQuotes(slug,'Dreaming Reality Onlinekurs','^$').filter(q=>q.id.startsWith(slug+'-'));return [...extra,...elenaQuotes.filter(q=>/Onlinekurs/i.test(q.context)&&!/Archetyp/.test(q.context))];};
function courseMain(slug,locale){
 const en=locale==='en',k=courses[slug],c=k[en?'en':'de'],t=(de,e)=>en?e:de,hp=k.hero,qs=courseQuotes(slug);
 const hero=`<section class="page-intro with-image shell sessions-intro yoga-intro retreat-intro"><div><p class="eyebrow">${esc(c.eyebrow)}</p><h1>${esc(c.title)}<span class="retreat-subtitle">${esc(c.subtitle)}</span></h1><p class="retreat-claim">${esc(c.claim)}</p><div class="retreat-date"><p class="retreat-date-place">${esc(c.tags)}</p></div><div class="hero-actions"><a class="button" href="#anfrage">${t('Kurs anfragen','Ask about the course')}</a>${qs.length?`<a class="button button-light" href="#stimmen">${t('Erfahrungen','Experiences')}</a>`:''}</div></div><figure class="sessions-header" style="--focus:${hp.position}">${photoImg(hp,locale,'(max-width: 700px) 100vw, 40vw').replace('loading="lazy"','fetchpriority="high"')}</figure></section>`;
 const questions=`<section class="sessions-questions"><div class="shell">${c.questionsIntro?`<p class="questions-intro">${esc(c.questionsIntro)}</p>`:''}<ul>${c.questions.map(q=>`<li>${esc(q)}</li>`).join('')}</ul><p class="questions-intro course-after">${esc(c.after)}</p></div></section>`;
 const quotes=qs.length?quoteCarousel(qs,locale,t('Stimmen meiner TeilnehmerInnen.','Voices of my participants.')).replace('id="teilnehmerstimmen"','id="stimmen"'):'';
 const closing=`<section class="retreat-closing"><div class="shell">${c.closing.map((x,i)=>`<p class="retreat-closing-${i}">${esc(x)}</p>`).join('')}</div></section>`;
 const form=waitlistForm(locale,t('Anfrage Onlinekurs ','Online course request: ')+c.title,c.title,c.places).replace(t('WARTELISTE','WAITING LIST'),t('KURS ANFRAGEN','ASK ABOUT THE COURSE')).replace(t('Hüpf auf die Warteliste.','Join the waiting list.'),t('Schreib mir.','Write to me.')).replace(t('Schreib mir, und ich melde mich persönlich bei dir mit allen Infos und den Preisen, sobald der Termin feststeht.','Write to me and I will get back to you personally with all the details and prices as soon as the date is set.'),t('Ich melde mich persönlich bei dir mit allen Infos und den Preisen.','I will get back to you personally with all the details and prices.')).replace(`<option>${t('Auf die Warteliste','Join the waiting list')}</option>`,`<option>${t('Den Kurs kaufen','Buy the course')}</option>`).replace(t('Die Warteliste ist unverbindlich.','The waiting list is non-binding.'),t('Eine Anfrage ist unverbindlich.','A request is non-binding.'));
 return hero+questions+`<section class="sessions-story retreat-story">${sessionBlocks(c.blocks,locale)}</section>`+quotes+closing+form;
}
// Elena 2026-11-03: Übersicht Retreats & Kurse mit Kacheln (content/overview.json)
const overview=JSON.parse(fs.readFileSync(new URL('../content/overview.json',import.meta.url)));
function servicesMain(locale){
 const en=locale==='en',t=(de,e)=>en?e:de,prefix=en?'/en':'';
 const titles={'silent-retreat':t('Schweigewochenende','Silent Retreat'),'kraft':t('Kraft meiner Wurzeln','The Strength of My Roots'),'schamanisches-retreat':t('Schamanisches Retreat','Shamanic Retreat'),'inner-child':'Inner Child','song-of-the-soul':'Song of the Soul','wise-in-her-ways-1':'Wise In Her Ways','dreaming-reality':'Dreaming Reality','a':'The Archetypes of the Goddess'};
 const tile=([slug,id,kde,ken,de,e])=>{const p=sessionPhotos.find(x=>x.id===id)||{id,alt:{de:titles[slug],en:titles[slug]}};return `<a class="overview-tile" href="${prefix}/${slug}/"><figure style="--focus:${p.position||'50% 45%'}">${photoImg({...p,alt:{de:titles[slug],en:titles[slug]}},locale,'(max-width: 700px) 100vw, 33vw')}</figure><div><p class="eyebrow">${esc(en?ken:kde)}</p><h3>${esc(titles[slug])}</h3><p>${esc(en?e:de)}</p><span class="text-link">${t('Mehr erfahren','Find out more')}</span></div></a>`;};
 const hero=`<section class="page-intro shell overview-intro"><h1>${t('Heilung geschieht in Gemeinschaft.','Healing happens in community.')}</h1><p class="overview-lead">${t('Räume, in denen wir uns auf Augenhöhe begegnen und in denen wir so sein dürfen, wie wir sind.','Spaces where we meet as equals and where we are allowed to be just as we are.')}</p></section>`;
 const grid=(title,list,id)=>`<section class="overview-section shell" id="${id}"><h2>${title}</h2><div class="overview-grid">${list.map(tile).join('')}</div></section>`;
 const quotes=quoteCarousel(retreatQuotes('Wise'),locale,t('Stimmen meiner TeilnehmerInnen.','Voices of my participants.')).replace('id="teilnehmerstimmen"','id="stimmen"');
 return hero+grid('Retreats',overview.retreats,'retreats')+grid(t('Onlinekurse','Online courses'),overview.courses,'kurse')+`<div id="einblicke">${quotes}</div>`;
}
// Elena 2026-11-03: Musik-Seite (content/music.json)
const music=JSON.parse(fs.readFileSync(new URL('../content/music.json',import.meta.url)));
const cambiaPlayer=JSON.parse(fs.readFileSync(new URL('../content/draft2.json',import.meta.url))).soundcloud.player;
function scPreview(url,title,locale,link){const t=(de,e)=>locale==='en'?e:de;return `<div class="shell music-player"><div class="soundcloud-preview"><button type="button" data-soundcloud="${esc(url)}" data-player-title="${esc(title)}">${esc(title)} - ${t('Player laden','load player')}<span aria-hidden="true">▷</span></button><p>${t('Mit einem Klick wird der Player von SoundCloud geladen. Die Musik startet erst, wenn du auf Play drückst.','Click to load the player from SoundCloud. Music starts only when you press play.')}</p><noscript><a href="${esc(link)}">SoundCloud</a></noscript></div></div>`;}
function musicMain(locale){
 const en=locale==='en',c=music[en?'en':'de'],t=(de,e)=>en?e:de;
 const hp=sessionPhotos.find(x=>x.id===music.hero);
 const hero=`<section class="page-intro with-image shell sessions-intro yoga-intro retreat-intro"><div><p class="eyebrow">${esc(c.eyebrow)}</p><h1>${esc(c.title)}</h1><p class="retreat-claim">${esc(c.claim)}</p><div class="hero-actions"><a class="button" href="#anfrage">${t('Booking anfragen','Booking request')}</a><a class="button button-light" href="${esc(site.social.soundcloud)}" target="_blank" rel="noopener noreferrer">SoundCloud</a></div></div><figure class="sessions-header" style="--focus:${hp.position}">${photoImg(hp,locale,'(max-width: 700px) 100vw, 40vw').replace('loading="lazy"','fetchpriority="high"')}</figure></section>`;
 let body='',chunk=[];const flush=()=>{if(chunk.length)body+=`<section class="sessions-story retreat-story">${sessionBlocks(chunk,locale)}</section>`;chunk=[];};
 for(const b of c.blocks){if(b.type==='player'){flush();body+=b.which==='cambia'?scPreview(cambiaPlayer,'Cambia',locale,site.social.soundcloud+'/cambia'):scPreview(`https://w.soundcloud.com/player/?url=${encodeURIComponent(music.set)}&color=%2358634c&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&visual=false`,t('DJ-Set · Nowhere 26','DJ set · Nowhere 26'),locale,music.set);}else chunk.push(b);}
 flush();
 const opts=[t('Konzert','Concert'),t('DJ-Set','DJ set'),t('Hybrid-Set (DJ-Set mit Live-Gesang)','Hybrid set (DJ set with live vocals)'),t('Musikalische Begleitung (Zeremonie, Retreat, Fest)','Musical accompaniment (ceremony, retreat, celebration)'),t('Etwas anderes','Something else')];
 const form=`<section class="sessions-request shell" id="anfrage"><div class="request-copy"><p class="eyebrow">BOOKING</p><h2>${t('Lass uns Musik machen.','Let’s make music.')}</h2><p>${t('Erzähl mir von deinem Event: was, wann und wo. Ich melde mich persönlich bei dir.','Tell me about your event: what, when and where. I will get back to you personally.')}</p></div><form id="session-form" data-email="${esc(site.email)}" data-whatsapp="${esc(site.whatsapp)}" data-subject="${t('Booking-Anfrage Musik','Music booking request')}" novalidate><div class="field-row"><label for="sf-name">${t('Name','Name')}</label><input id="sf-name" name="name" autocomplete="name" required></div><div class="field-row"><label for="sf-contact">${t('Deine E-Mail-Adresse oder Telefonnummer','Your email address or phone number')}</label><input id="sf-contact" name="contact" autocomplete="email" required></div><div class="field-row"><label for="sf-reading">${t('Was möchtest du buchen?','What would you like to book?')}</label><select id="sf-reading" name="reading">${opts.map(o=>`<option>${esc(o)}</option>`).join('')}</select></div><div class="field-row"><label for="sf-dates">${t('Datum','Date')}</label><input id="sf-dates" name="dates"></div><div class="field-row"><label for="sf-place">${t('Ort / Location','Place / venue')}</label><input id="sf-place" name="birthplace"></div><div class="field-row"><label for="sf-msg">${t('Erzähl mir mehr (Art des Events, Dauer, Anzahl Gäste)','Tell me more (type of event, length, number of guests)')}</label><textarea id="sf-msg" name="message" rows="4"></textarea></div><div class="form-actions"><button type="submit" class="button">${t('Anfrage senden','Send request')}</button><a class="button button-light" data-session-whatsapp href="${esc(site.whatsapp)}" target="_blank" rel="noopener noreferrer">${t('Per WhatsApp anfragen','Request via WhatsApp')}</a></div><p class="form-note">${t('Deine Nachricht wird in deinem E-Mail-Programm oder in WhatsApp vorbereitet. Du entscheidest dort, wann du sie sendest. Eine Anfrage ist noch keine Buchung.','Your message is prepared in your email app or in WhatsApp. You decide there when to send it. A request is not yet a booking.')}</p></form></section>`;
 return hero+body+form;
}
// Elena 2026-11-03: Datenschutzerklärung (content/datenschutz.json)
const datenschutz=JSON.parse(fs.readFileSync(new URL('../content/datenschutz.json',import.meta.url)));
function datenschutzMain(locale){const c=datenschutz[locale==='en'?'en':'de'];return `<section class="page-intro shell legal-page"><h1>${esc(c.title)}</h1>${c.sections.map(([h,p])=>`<h2>${esc(h)}</h2><p>${esc(p)}</p>`).join('')}</section>`;}
// Elena 2026-10-29: Kambo-Seite (Texte: content/kambo.json)
const kambo=JSON.parse(fs.readFileSync(new URL('../content/kambo.json',import.meta.url)));
function kamboMain(locale){
 const en=locale==='en',c=kambo[en?'en':'de'],t=(de,e)=>en?e:de;
 const frog=sessionPhotos.find(x=>x.id==='sessions-kambo-frosch-cut');
 const hero=`<section class="kambo-hero"><div class="shell kambo-hero-inner"><div class="kambo-hero-copy"><p class="eyebrow">${esc(c.eyebrow)}</p><h1>${esc(c.title)}</h1><p class="kambo-claim">${esc(c.claim)}</p><p class="kambo-claim2">${esc(c.claim2)}</p><div class="hero-actions"><a class="button" href="#anfrage">${t('Zeremonie anfragen','Request a ceremony')}</a><a class="button button-light" href="#was-ist-kambo">${t('Was ist Kambo?','What is Kambo?')}</a></div></div></div><div class="kambo-frog">${photoImg(frog,locale,'(max-width: 700px) 90vw, 760px').replace('loading="lazy"','fetchpriority="high"')}</div></section>`;
 const gallery=`<section class="kambo-gallery shell">${kambo.gallery.map(id=>{const p=sessionPhotos.find(x=>x.id===id)||{id,alt:kambo.galleryAlt[id],position:'50% 35%'};return `<figure style="--focus:${p.position||'50% 50%'}">${photoImg(p,locale,'(max-width: 700px) 100vw, 45vw')}</figure>`;}).join('')}</section>`;
 const form=`<section class="sessions-request shell" id="anfrage"><div class="request-copy"><p class="eyebrow">${t('ZEREMONIE ANFRAGEN','REQUEST A CEREMONY')}</p><h2>${t('Lass uns sprechen.','Let’s talk.')}</h2><p>${t('Schreib mir, wo du bist und wann es dir passen würde. Ich melde mich persönlich bei dir und wir besprechen alles Weitere.','Tell me where you are and when would suit you. I will get back to you personally and we will talk about everything else.')}</p></div><form id="session-form" data-email="${esc(site.email)}" data-whatsapp="${esc(site.whatsapp)}" data-subject="${t('Anfrage Kambo-Zeremonie','Kambo ceremony request')}" novalidate><input type="hidden" name="reading" value="${t('Kambo-Zeremonie','Kambo ceremony')}"><div class="field-row"><label for="sf-name">${t('Name','Name')}</label><input id="sf-name" name="name" autocomplete="name" required></div><div class="field-row"><label for="sf-contact">${t('Deine E-Mail-Adresse oder Telefonnummer','Your email address or phone number')}</label><input id="sf-contact" name="contact" autocomplete="email" required></div><div class="field-row"><label for="sf-place">${t('Wo bist du?','Where are you?')}</label><input id="sf-place" name="birthplace"></div><div class="field-row"><label for="sf-dates">${t('Wunschtermine (optional)','Preferred dates (optional)')}</label><input id="sf-dates" name="dates"></div><div class="field-row"><label for="sf-msg">${t('Was bewegt dich? Gibt es gesundheitliche Themen, die ich wissen sollte? (optional)','What is on your mind? Is there anything about your health I should know? (optional)')}</label><textarea id="sf-msg" name="message" rows="4"></textarea></div><div class="form-actions"><button type="submit" class="button">${t('Anfrage senden','Send request')}</button><a class="button button-light" data-session-whatsapp href="${esc(site.whatsapp)}" target="_blank" rel="noopener noreferrer">${t('Per WhatsApp anfragen','Request via WhatsApp')}</a></div><p class="form-note">${t('Deine Nachricht wird in deinem E-Mail-Programm oder in WhatsApp vorbereitet. Du entscheidest dort, wann du sie sendest. Eine Anfrage ist noch keine Buchung.','Your message is prepared in your email app or in WhatsApp. You decide there when to send it. A request is not yet a booking.')}</p></form></section>`;
 const kq=elenaQuotes.filter(q=>/Kambo/i.test(q.context));const quotes=kq.length?quoteCarousel(kq,locale,t('Stimmen nach einer Zeremonie.','Voices after a ceremony.')):'';
 return hero+`<section class="sessions-story kambo-story" id="was-ist-kambo">${sessionBlocks(c.blocks,locale)}</section>`+gallery+quotes+form;
}
function sessionsMain(locale){
 const en=locale==='en',c=en?sessions.en:sessions.de,prefix=en?'/en':'';
 const header=sessionPhotos.find(p=>p.role==='header');
 const t=(de,e)=>en?e:de;
 const hero=`<section class="page-intro with-image shell sessions-intro"><div><p class="eyebrow">${t('PERSÖNLICHE BEGLEITUNG','PERSONAL GUIDANCE')}</p><h1>${esc(en?c.title:'Finde heraus, wer du immer schon gewesen bist')}</h1><p class="sessions-subtitle">${sessionSubtitle(c.subtitle)}</p><div class="hero-actions"><a class="button" href="#anfrage">${t('Sitzung anfragen','Request a session')}</a><a class="button button-light" href="#sitzungen">${t('Die Sitzungen','The sessions')}</a></div></div><figure class="sessions-header" style="--focus:${header.position}">${photoImg(header,locale,'(max-width: 700px) 100vw, 40vw').replace('loading="lazy"','fetchpriority="high"')}</figure></section>`;
 const questions=en?'':`<section class="sessions-questions"><div class="shell"><ul>${c.questions.map(q=>`<li>${esc(q)}</li>`).join('')}</ul></div></section>`;
 const body=en?sessionBlocks(c.body,locale):sessionBlocks(c.astrology,locale)+sessionBlocks(c.humanDesign,locale);
 const offers=`<section class="sessions-offers" id="sitzungen"><div class="shell"><p class="eyebrow">${t('ASTROLOGIE & HUMAN DESIGN','ASTROLOGY & HUMAN DESIGN')}</p><h2>${t('Die Sitzungen','The sessions')}</h2>${[...new Set(c.readings.map(r=>r.group))].map(group=>{const key=group==='Human Design'?'hd':'astro';const list=c.readings.filter(r=>r.group===group);return `<div class="offer-group offer-group-${key}"><h3 class="offer-group-title">${esc(group)}</h3>${c.groupIntro?.[group]?`<p class="offer-group-intro">${esc(c.groupIntro[group])}</p>`:''}<div class="offer-cards">${list.map((r,i)=>`<article class="offer-card-reading"><span class="offer-planet">${PLANET_ICONS[`${key}-${i}`]||''}</span><h4>${esc(r.name)}</h4>${r.text.map(x=>`<p>${esc(x)}</p>`).join('')}<a class="text-link" href="#anfrage" data-choose-reading="${esc(readingValue(r))}">${t('Diese Sitzung anfragen','Request this session')}</a></article>`).join('')}</div></div>`;}).join('')}<dl class="offer-facts"><div><dt>${t('Dauer','Duration')}</dt><dd>90 – 120 ${t('Minuten','minutes')}</dd></div><div><dt>${t('Ort','Where')}</dt><dd>${t('Online oder vor Ort','Online or in person')}</dd></div><div><dt>${t('Preis','Price')}</dt><dd>${t('ab 150 €','from €150')}</dd></div></dl><p class="offer-note">${c.readingsNote.map(esc).join(' ')}</p></div></section>`;
 const quotes=quoteCarousel(sessionQuotes,locale,t('Stimmen meiner KlientInnen.','Voices of my clients.')).replace('id="teilnehmerstimmen"','id="stimmen"');
 const options=[...new Set(c.readings.map(r=>r.group))].map(g=>`<optgroup label="${esc(g)}">${c.readings.filter(r=>r.group===g).map(r=>`<option value="${esc(readingValue(r))}">${esc(r.name)}</option>`).join('')}</optgroup>`).join('')+`<option>${t('Weiß ich noch nicht – lass uns sprechen','Not sure yet – let’s talk')}</option>`;
 const form=`<section class="sessions-request shell" id="anfrage"><div class="request-copy"><p class="eyebrow">${t('SITZUNG ANFRAGEN','REQUEST A SESSION')}</p><h2>${t('Lass uns beginnen.','Let’s begin.')}</h2><p>${t('Schreib mir, welche Sitzung dich anspricht. Für dein Chart brauche ich dein Geburtsdatum, deine Geburtszeit und deinen Geburtsort. Ich melde mich persönlich bei dir, wir finden einen Termin und sprechen über den Preis.','Tell me which session speaks to you. For your chart I need your date, time and place of birth. I will get back to you personally to find a date and talk about the price.')}</p></div><form id="session-form" data-email="${esc(site.email)}" data-whatsapp="${esc(site.whatsapp)}" data-subject="${t('Anfrage 1:1 Sitzung','1:1 session request')}" novalidate><div class="field-row"><label for="sf-name">${t('Name','Name')}</label><input id="sf-name" name="name" autocomplete="name" required></div><div class="field-row"><label for="sf-contact">${t('Deine E-Mail-Adresse oder Telefonnummer','Your email address or phone number')}</label><input id="sf-contact" name="contact" autocomplete="email" required></div><div class="field-row"><label for="sf-reading">${t('Welche Sitzung?','Which session?')}</label><select id="sf-reading" name="reading">${options}</select></div><div class="field-row"><label for="sf-mode">${t('Online oder vor Ort?','Online or in person?')}</label><select id="sf-mode" name="mode"><option>${t('Online','Online')}</option><option>${t('Vor Ort','In person')}</option><option>${t('Egal','Either')}</option></select></div><fieldset class="birth"><legend>${t('Deine Geburtsdaten','Your birth details')}</legend><div class="field-row"><label for="sf-date">${t('Datum','Date')}</label><input id="sf-date" name="birthdate" type="date"></div><div class="field-row"><label for="sf-time">${t('Uhrzeit (so genau wie möglich)','Time (as exact as possible)')}</label><input id="sf-time" name="birthtime" type="time"></div><div class="field-row"><label for="sf-place">${t('Ort','Place')}</label><input id="sf-place" name="birthplace" placeholder="${t('z. B. Freiburg im Breisgau','e.g. Freiburg im Breisgau')}"></div></fieldset><div class="field-row"><label for="sf-dates">${t('Wunschtermine (optional)','Preferred dates (optional)')}</label><input id="sf-dates" name="dates"></div><div class="field-row"><label for="sf-msg">${t('Was bewegt dich gerade? (optional)','What is on your mind? (optional)')}</label><textarea id="sf-msg" name="message" rows="4"></textarea></div><div class="form-actions"><button type="submit" class="button">${t('Anfrage senden','Send request')}</button><a class="button button-light" data-session-whatsapp href="${esc(site.whatsapp)}" target="_blank" rel="noopener noreferrer">${t('Per WhatsApp anfragen','Request via WhatsApp')}</a></div><p class="form-note">${t('Deine Nachricht wird in deinem E-Mail-Programm oder in WhatsApp vorbereitet. Du entscheidest dort, wann du sie sendest. Eine Anfrage ist noch keine Buchung.','Your message is prepared in your email app or in WhatsApp, and you decide when to send it. A request is not yet a booking.')}</p></form></section>`;
 return hero+questions+`<section class="sessions-story">${body}</section>`+offers+quotes+form; // Elena 2026-10-29: „Was zu dir passt“ (Yoga Nidra, Kambo) entfernt
}
// Elena 2026-10-28: Seite „Über mich“ mit Einzelfotos zwischen den Absätzen und einem Karussell in der Mitte.
const aboutPhotos=JSON.parse(fs.readFileSync(new URL('../content/about-photos.json',import.meta.url))).photos;
// Elena 2026-10-28 (C-01): Keine erfundenen Zwischenüberschriften – Elenas Text folgt bewusst keiner klassischen Gliederung.
// Neue Abschnitte werden stattdessen durch einen größer gesetzten ersten Satz markiert. Der Drive-Text selbst bleibt unverändert.
const ABOUT_HEADINGS={};
const ABOUT_LEADS=new Set([1,8,10,12,15,18,22,25,28,33,43]); // erster Satz größer = Beginn eines neuen Gedankens
const ABOUT_QUOTES=new Set([34,35]); // als großes Zitat
const ABOUT_SUBHEADING=36; // „Ich bin…“ als Überschrift
const ABOUT_SIGNS=[37,38];
const ABOUT_HIGHLIGHT=32; // „Meine Arbeit richtet sich an Menschen …“ hervorgehoben, „I feel you!“ besonders // Sternzeichen, Human Design, Enneagramm – hervorgehoben
const CAROUSEL_AFTER=17; // Karussell nach Absatz 17 („… dass ich Erfüllung finde.“), etwa in der Mitte der Seite
function photoImg(photo,locale,sizes){
 const source=images.find(i=>i.id===photo.id);if(!source)throw Error('Foto fehlt in images.json: '+photo.id+' (npm run images:about)');
 const v=source.variants,m=v.find(x=>x.width===960)||v[v.length-1];
 return `<img src="/${m.file}" srcset="${v.map(x=>`/${x.file} ${x.width}w`).join(', ')}" sizes="${sizes}" width="${m.width}" height="${m.height}" alt="${esc(photo.alt[locale==='en'?'en':'de'])}" loading="lazy" decoding="async">`;
}
function aboutBody(locale){
 const en=locale==='en';
 const singles=new Map(aboutPhotos.filter(p=>p.before!==undefined).map(p=>[p.before,p]));
 const carousel=aboutPhotos.filter(p=>p.role==='carousel');
 let side=0,html='',text='';
 const flush=()=>{if(text){html+=`<div class="source-content shell about-text" lang="de">${text}</div>`;text='';}};
 for(let i=1;i<about.blocks.length;i++){
  const photo=singles.get(i);
  if(photo){
   flush();
   const wide=photo.role==='wide';
   html+=`<figure class="about-photo ${wide?'about-photo-wide shell':`about-photo-single shell shape-${photo.shape||'arch'} ${side++%2?'is-right':'is-left'}`}" data-effect="source-reveal">${photoImg(photo,locale,wide?'(max-width: 700px) 100vw, 90vw':'(max-width: 700px) 90vw, 520px')}${photo.credit?`<figcaption>${en?'Photo':'Foto'}: ${esc(photo.credit)}</figcaption>`:''}</figure>`;
  }
  if(ABOUT_HEADINGS[i])text+=`<h2 class="about-heading" lang="${en?'en':'de'}">${ABOUT_HEADINGS[i][en?1:0]}</h2>`;
  let block=docBlock(about,i);
  if(ABOUT_LEADS.has(i))block=block.replace(/^(<p [^>]*class=")verbatim(">)(.+?[.!?])(?=\s|<)/,(_,a,b,first)=>`${a}verbatim about-lead${b}<span class="lead-sentence">${first}</span>`);
  if(ABOUT_QUOTES.has(i))block=block.replace('class="verbatim"','class="verbatim about-quote"');
  if(i===ABOUT_SUBHEADING)block=block.replace('class="verbatim"','class="verbatim about-subheading" role="heading" aria-level="2"');
  if(i===ABOUT_SIGNS[0])text+='<div class="about-signs">';
  if(i===ABOUT_HIGHLIGHT)block=block.replace('class="verbatim"','class="verbatim about-highlight"').replace('I feel you!','<span class="feel-you">I feel you!</span>').replace(/(Du bist zu weltlich für den Ashram, aber zu spirituell für den Mainstream\?)/,'<strong>$1</strong>');
  if(ABOUT_SIGNS.includes(i))block=block.replace(/(<p [^>]*>)([\s\S]*?)(<\/p>)/,(_,a,inner,c)=>a+inner.split('\n').map(line=>`<span class="about-sign">${line}</span>`).join('\n')+c);
  text+=block;
  if(i===ABOUT_SIGNS[ABOUT_SIGNS.length-1])text+='</div>';
  if(i===CAROUSEL_AFTER){
   flush();
   const total=String(carousel.length).padStart(2,'0');
   html+=`<section class="v2-gallery about-carousel shell" data-gallery data-autoplay data-section="photo-sequence" aria-label="${en?'Photographs of Elena':'Fotos von Elena'}"><div class="heading-row"><div class="gallery-controls" hidden><button type="button" data-gallery-prev aria-label="${en?'Previous photograph':'Vorheriges Bild'}">←</button><span data-gallery-count aria-live="polite">01 / ${total}</span><button type="button" data-gallery-next aria-label="${en?'Next photograph':'Nächstes Bild'}">→</button><button type="button" class="quote-playback" data-gallery-playback data-text-play="${en?'Play':'Abspielen'}" data-text-pause="Pause" data-label-play="${en?'Start automatic rotation':'Automatischen Wechsel starten'}" data-label-pause="${en?'Pause automatic rotation':'Automatischen Wechsel pausieren'}">Pause</button></div></div><div class="gallery-track" tabindex="0" aria-label="${en?'Photo gallery':'Fotogalerie'}">${carousel.map(p=>`<figure class="gallery-slide">${photoImg(p,locale,'(max-width: 700px) 80vw, 380px')}${p.credit?`<figcaption>${en?'Photo':'Foto'}: ${esc(p.credit)}</figcaption>`:''}</figure>`).join('')}</div></section>`;
  }
 }
 flush();
 return html;
}
export function finalize(html,{locale='de',route='/'}){
 const $=load(html),en=locale==='en',prefix=en?'/en':'',slug=route.replace(/^\/+|\/+$/g,'');
 $('html').attr('data-style','linen');$('body').removeClass('draft-two').addClass('final-design').removeAttr('data-draft');
 $('.draft-selector,.style-selector').remove();$('script[src*="styles-select"]').remove();
 $('.wordmark span').remove();
 // Elena 03.11.: Logo „Elena Judith“ (von der alten Website, ohne „astraljourney“) in Kopf- und Fußzeile
 $('.site-header a.wordmark').html('<img class="logo-img" src="/assets/brand/elena-judith-logo-dark.png" width="1011" height="308" alt="Elena Judith">');
 $('footer a.wordmark').html('<img class="logo-img" src="/assets/brand/elena-judith-logo-light.png" width="1011" height="308" alt="Elena Judith">');
 $('a[href],link[rel=alternate]').each((_,el)=>{const h=$(el).attr('href');if(h?.startsWith('/'))$(el).attr('href',h.replace(/^\/(en\/)?draft-2(?=\/|$)/,(_,lang)=>lang?'/en':''));});
 const gallery=$('.v2-gallery').toString(),banner=$('.revolution-banner').toString(),related=$('.related-section').toString();
 const source=originals.find(p=>p.slug===slug);
 const content=sourceBlocks(slug,locale);
 const language=slug==='a'?'en':'de';
 const sourceSection=content?`<section class="source-content shell" lang="${language}">${en&&language==='de'?'<p class="source-language">Original text · Deutsch</p>':''}${content}</section>`:'';
 const historical=site.retreats.some(r=>r.slug===slug);
 const historyNote=historical?`<aside class="final-date-note shell">${en?'Retreat format & past experiences. The descriptions and dates below refer to earlier events. Enquire about future dates.':'Retreat-Format & Rückblick. Die folgenden Beschreibungen und Termine beziehen sich auf frühere Veranstaltungen. Neue Termine bitte anfragen.'}<a class="text-link" href="${prefix}/contact/?intent=retreat#contact-form">${en?'Enquire':'Termine anfragen'}</a></aside>`:'';
 if(slug===''){
  // Elena 2026-10-28 (B-02): Begrüßung mit Untertitel und Satz zur Arbeit.
  $('.v2-hero-copy>p:not(.eyebrow)').remove();
  $('.v2-hero-copy h1').text('Hallo du! Ich bin Elena Judith').attr({lang:'de'})
   .after(`<p class="hero-roles">${en?'Anthropologist, therapist, multidisciplinary artist, journalist and psychospiritual mentor':'Anthropologin, Therapeutin, multidisziplinäre Künstlerin, Journalistin und Wegbegleiterin'}</p><p class="hero-lead">${en?'In my work, I combine classical therapy with spiritual approaches and help people remember who they have always been.':'In meiner Arbeit verbinde ich klassische Therapie mit spirituellen Ansätzen und helfe Menschen dabei, sich zu erinnern, wer sie immer schon gewesen sind.'}</p>`);
  $('.v2-hero-photo figcaption,.v2-hero-copy>.eyebrow,.v2-introduction figcaption,.v2-introduction .eyebrow,.v2-introduction h2,.v2-introduction .v2-lead,.v2-introduction .v2-profession').remove();
  $('.v2-introduction>div').prepend(`<div class="home-about-source" lang="de">${docBlock(about,1)}</div>`);
  $('.v2-path-grid article>p:not(.eyebrow):not(.path-subline),.retreat-card>p').remove();
  // Elena 2026-10-28 (B-09): Retreat-Auswahl der Startseite.
  $('.v2-home-retreats .section-heading h2').html(en?'Experiences that <em>linger.</em>':'Erfahrungen, die <em>nachwirken.</em>');
  $('.v2-home-retreats .section-note').remove();
  $('.v2-home-retreats .retreat-card').each((_,card)=>{const title=$(card).find('h3').text().trim();$(card).find('.card-meta~.text-link, h3~.text-link').each((_,l)=>{$(l).html(en?'Explore':'Entdecken').attr('aria-label',en?`Explore ${title}`:`${title} entdecken`);});});
  // Elena 2026-10-29: keine Nummerierung und keine Pfeile an den Retreat-Karten der Startseite.
  $('.v2-home-retreats .card-meta>span:last-child, .v2-home-retreats .round-arrow').remove();
  $('.testimonials').replaceWith(homeQuotes(locale));
  // Elena 2026-11-04: Zahlen zur Erfahrung, ruhig platziert (Hero-Zeile, Band, Notiz bei den Stimmen).
  $('.v2-hero-copy h1').before(`<p class="eyebrow hero-impact">${en?'15 years · over 30 retreats · over 15 countries · over 3,000 people accompanied':'Seit 15 Jahren · über 30 Retreats · über 15 Länder · über 3.000 Menschen begleitet'}</p>`);
  const stats=en?[['15','years of experience'],['30+','retreats in over 10 years'],['15+','countries'],['500+','people in 1:1 guidance'],['3,000+','participants in courses and workshops']]:[['15','Jahre Erfahrung'],['30+','Retreats in über 10 Jahren'],['15+','Länder'],['500+','Menschen in 1:1‑Begleitung'],['3.000+','Teilnehmende in Kursen und Workshops']];
  $('.v2-paths').before(`<section class="impact-band" aria-label="${en?'Experience':'Erfahrung'}"><div class="shell"><ul class="impact-list">${stats.map(([n,l])=>`<li><span class="impact-number">${n}</span><span class="impact-label">${l}</span></li>`).join('')}</ul><p class="impact-note">${en?'For 15 years I have been allowed to accompany people in more than 15 countries: in individual sessions, in circles, courses and ceremonies, and for more than ten years in retreats as well. Thank you for your trust.':'Seit 15 Jahren darf ich Menschen in über 15 Ländern begleiten: in Einzelsitzungen, in Kreisen, Kursen und Zeremonien, und seit über zehn Jahren auch in Retreats. Danke für euer Vertrauen.'}</p></div></section>`);
  instaGrid($,en);
  $('#teilnehmerstimmen .testimonial-heading h2').after(`<p class="impact-quote-note">${en?'A few of the more than 3,000 people I have been allowed to accompany.':'Ein paar von über 3.000 Menschen, die ich begleiten durfte.'}</p>`);
  // Elena 2026-10-28 (B-05): Abschnitt „Namaste and Shalom,“ mit „Mehr über mich“ entfernt.
 }else if(slug==='about'){
  const intro=$('.page-intro');intro.find('h1').text(corrected(about.blocks[0].text)).attr({'data-drive-source':`${about.id}:0`,lang:'de'});intro.find('div>p:not(.eyebrow)').remove();
  $('main').html(intro.toString()+`<section class="about-story">${aboutBody(locale)}</section>`+banner);
  instaGrid($,locale==='en');
 }else if(slug==='11-sessions'){
  // Elena 2026-10-29: „1:1 Begleitung“ ist jetzt eine Übersicht über alle Einzelangebote.
  $('main').html(sessionsOverview(locale));
 }else if(slug==='astrologie-human-design'){
  // Elena 2026-10-29: die bisherige 1:1-Seite, jetzt unter eigener Adresse.
  $('main').html(sessionsMain(locale));
 }else if(slug==='datenschutz'){
  $('main').html(datenschutzMain(locale));
 }else if(slug==='music'){
  $('main').html(musicMain(locale));
 }else if(slug==='services'){
  $('main').html(servicesMain(locale));
 }else if(slug==='dreaming-reality'||slug==='a'){
  $('main').html(courseMain(slug,locale));
 }else if(slug==='wise-in-her-ways-1'){
  $('main').html(wiseMain(locale));
 }else if(slug==='kraft'){
  $('main').html(kraftMain(locale));
 }else if(slug==='schamanisches-retreat'){
  $('main').html(shamanicMain(locale));
 }else if(slug==='silent-retreat'){
  $('main').html(silentMain(locale));
 }else if(slug==='song-of-the-soul'){
  $('main').html(songSoulMain(locale));
 }else if(slug==='inner-child'){
  $('main').html(innerChildMain(locale));
 }else if(slug==='photography'){
  $('main').html(photographyMain(locale));
 }else if(slug==='yoga-nidra'){
  // Elena 2026-10-29: Yoga-Nidra-Seite im selben Stil wie die anderen 1:1-Seiten.
  $('main').html(yogaMain(locale));
 }else if(slug==='kambo'){
  // Elena 2026-10-29: Kambo-Seite neu nach Elenas Flyer, freigestellter Frosch, Fotos ohne Beschreibung.
  $('main').html(kamboMain(locale));
 }else if(slug==='contact'){
  instaGrid($,locale==='en');
  $('.contact-copy>p:not(.eyebrow)').remove(); // Elena 2026-11-03: doppelter Abschnitt „Schreib mir gerne“ entfernt (E-Mail/WhatsApp stehen schon oben)
  const t=(de,e)=>locale==='en'?e:de,ar='<span aria-hidden="true">↗</span>';
  const card=(name,handle,text,url,cls='')=>`<a class="contact-social-card ${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer"><span class="eyebrow">${esc(handle)}</span><strong>${esc(name)}${ar}</strong><span>${esc(text)}</span></a>`;
  $('.v2-social').replaceWith(`<section class="contact-social shell" id="social"><div class="contact-social-head"><p class="eyebrow">${t('ZWISCHEN UNS','STAY IN TOUCH')}</p><h2>${t('Folge mir und stöbere in meinem Shop.','Follow me and browse my shop.')}</h2><p>${t('Bilder, Gedanken, Musik und Kleidung. Auch zwischen unseren Begegnungen.','Photographs, thoughts, music and clothing. In between our encounters, too.')}</p></div><div class="contact-social-grid">${card('Instagram','@aestheticmatters',t('Bilder und Gedanken aus meinem Alltag','Photographs and thoughts from my everyday life'),site.social.instagram,'is-insta')}${card('Etsy','aestheticmattersshop',t('Meine Kleidung und Kunst','My clothing and art'),site.social.etsy,'is-etsy')}${card('SoundCloud','elena-judith',t('Meine Musik und DJ-Sets','My music and DJ sets'),site.social.soundcloud)}${card('YouTube','Elena Judith',t('Videos','Videos'),site.social.youtube)}</div><!-- Elena 2026-11-03: Platz für die Instagram-Vorschau (Feed-Widget), sobald Elena den Zugang bei Instagram/Meta freigegeben hat --></section>`);
 }else if(source){
  const intro=$('.page-intro');intro.find('div>p:not(.eyebrow),>p:not(.eyebrow)').remove();
  const firstHeading=source.widgets.find(w=>w.type.startsWith('heading')&&w.text.trim());
  if(firstHeading&&slug!=='services')intro.find('h1').text(firstHeading.text);
  if(slug==='schamanisches-retreat')intro.find('h1').text('We´re the ones we´ve been waiting for');
  let extra='';
  if(slug==='11-sessions')extra=`<section class="source-content shell" lang="en" id="astrology-human-design"><p class="eyebrow">ASTROLOGY & HUMAN DESIGN · ENGLISH</p>${reading.blocks.map((b,i)=>docBlock(reading,i)).join('')}</section>`;
  let catalogue='';
  if(slug==='services'){
   const cards=$('.retreat-section,.course-section');cards.find('.retreat-card>p,.section-note').remove();catalogue=cards.toString();
  }
  if(slug==='my-art')catalogue=`<section class="shell final-art-links" id="clothing"><a class="button" href="${esc(site.social.etsy||'https://www.etsy.com/shop/aestheticmattersshop')}">Etsy</a><a class="text-link" href="${prefix}/music/">${en?'Music':'Musik'}</a></section>`;
  const enquiry=['services','my-art'].includes(slug)?'':`<section class="shell final-enquiry"><a class="button" href="${prefix}/contact/?${new URLSearchParams({...(historical?{intent:'retreat'}:site.courses.some(c=>c.slug===slug)?{intent:'course'}:{})})}#contact-form">${en?'Enquire by email or WhatsApp':'Per E-Mail oder WhatsApp anfragen'}</a></section>`;
  $('main').html(intro.toString()+historyNote+sourceSection+extra+catalogue+gallery+quoteSection(slug,locale)+enquiry+related+banner);
 }
 // Keep the client-approved display name wherever navigation or cards refer to this retreat.
 $('a[href$="/schamanisches-retreat/"]').not('.card-image,.overview-tile').each((_,el)=>$(el).text('We´re the ones we´ve been waiting for'));
 $('.retreat-card>p').remove();
 if(slug==='astrologie-human-design')$('.sessions-story').attr('id','readings');
 if(source&&slug&&slug!=='services'&&slug!=='contact'&&slug!=='schamanisches-retreat'){
  const firstHeading=source.widgets.find(w=>w.type.startsWith('heading')&&w.text.trim());
  if(firstHeading&&$('h1').text()===firstHeading.text){
   const key=`${slug}:${firstHeading.id}`;
   $(`[data-original-source="${key}"]`).remove();$('h1').attr('data-original-source',key);
  }
 }
 // Elena 2026-10-28 (B-15): Abschluss-Sätze als fester, linkfreier Teil des Footers auf jeder Seite.
 $('.revolution-banner').remove();
 // Elena 2026-10-28 (B-17): „Lass uns in Verbindung bleiben.“ direkt über den Social-Media-Icons.
 $('.footer-top>p,.footer-top>.social-links').remove();
 $('.footer-top').append(`<div class="footer-connect"><p>${en?'Let’s stay connected.':'Lass uns in Verbindung bleiben.'}</p>${socialIcons('social-icons footer-icons')}</div>`);
 // Elena 2026-10-29: auf den deutschen Seiten steht der Satz auf Deutsch.
 const footerBanner=en?bannerCopy:{opening:'In einer Welt, die dir ständig sagt, dass du zu viel oder nicht genug bist',statement:'ist es ein Akt der Revolution, du selbst zu sein.',action:bannerCopy.action};
 $('.site-footer').prepend(`<div class="footer-revolution shell" id="revolution" lang="${en?'en':'de'}"><p class="revolution-opening">${esc(footerBanner.opening)}</p><span class="revolution-dash" aria-hidden="true">—</span><p class="revolution-statement">${esc(footerBanner.statement)}</p><p class="revolution-question" lang="en">${esc(footerBanner.action)}</p></div>`);
 // Elena 2026-10-29: lange Striche überall durch den normalen Bindestrich ersetzen (Text, Bildbeschreibungen, Metadaten).
 const walk=node=>{for(const child of node.children||[]){if(child.type==='text')child.data=plainDashes(child.data);else if(child.type==='tag'&&!['script','style'].includes(child.name))walk(child);}};
 walk($.root()[0]);
 $('[alt],[title],[aria-label],[placeholder],meta[content],[data-choose-reading],[data-player-title],option[value],input[value]').each((_,el)=>{for(const a of ['alt','title','aria-label','placeholder','content','data-choose-reading','data-player-title','value']){const v=$(el).attr(a);if(v&&/[\u2012-\u2015\u2212]/.test(v))$(el).attr(a,plainDashes(v));}});
 $('.revolution-dash').text('');
 // Elena 2026-11-03: Link zur Datenschutzerklärung neben dem Impressum
 $('.site-footer a[href$="/impressum/"]').each((_,el)=>{if(!$(el).next('a[href$="/datenschutz/"]').length)$(el).after(`<a href="${en?'/en':''}/datenschutz/">${en?'Privacy':'Datenschutz'}</a>`);});
 return $.html();
}
