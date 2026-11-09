import fs from 'node:fs';
import {load} from 'cheerio';
const english=JSON.parse(fs.readFileSync(new URL('../content/locales/en.json',import.meta.url),'utf8'));
function translate(value){
 const key=value.trim();
 if(!key||/^[\d\s©—/←→▷↓]+$/.test(key)||/^© \d{4} Elena Judith$/.test(key))return value;
 if(!Object.hasOwn(english,key))throw new Error(`Missing English translation: ${key}`);
 return value.slice(0,value.indexOf(key))+english[key]+value.slice(value.indexOf(key)+key.length);
}
// Build-time localisation keeps the shared templates and client script independent of language.
export function localize(html,{locale='de',route='/'}){
 const $=load(html);const isEnglish=locale==='en';
 $('html').attr('lang',locale);
 // Stable option values preserve the selected enquiry topic across languages.
 $('option').each((_,e)=>$(e).attr('value',$(e).text()));
 if(isEnglish){
  function visit(node){if(node.type==='text')node.data=translate(node.data);for(const child of node.children||[])visit(child);}
  visit($.root()[0]);
  $('[aria-label],[alt],[placeholder],meta[name=description]').each((_,e)=>{
   for(const attr of ['aria-label','alt','placeholder','content']){const value=$(e).attr(attr);if(value)$(e).attr(attr,translate(value));}
  });
  // Only page links are localised. Media and external/social URLs stay identical.
  $('a[href]').each((_,e)=>{const href=$(e).attr('href');if(href.startsWith('/')&&!href.startsWith('//'))$(e).attr('href','/en'+href);});
  $('.quote figcaption small').append(' · translated from German');
 }
 const enRoute='/en'+route;
 $('head').append(`<link rel="alternate" hreflang="de" href="${route}"><link rel="alternate" hreflang="en" href="${enRoute}">`);
 $('.header-inner').append(`<div class="language-switch" role="group" aria-label="${isEnglish?'Language':'Sprache'}"><a href="${route}" lang="de" hreflang="de" aria-label="Deutsch" ${!isEnglish?'aria-current="true"':'data-language-link'}>DE</a><span aria-hidden="true">/</span><a href="${enRoute}" lang="en" hreflang="en" aria-label="English" ${isEnglish?'aria-current="true"':'data-language-link'}>EN</a></div>`);
 $('.menu-toggle').attr('data-label-open',isEnglish?'Open menu':'Menü öffnen').attr('data-label-close',isEnglish?'Close menu':'Menü schließen');
 $('#contact-form').attr('data-subject-prefix',isEnglish?'Enquiry':'Anfrage');
 $('[data-quote-playback]').attr('data-label-pause',isEnglish?'Pause automatic rotation':'Automatischen Wechsel pausieren').attr('data-label-play',isEnglish?'Start automatic rotation':'Automatischen Wechsel starten').attr('data-text-pause',isEnglish?'Pause':'Pause').attr('data-text-play',isEnglish?'Play':'Abspielen');

 return $.html();
}
