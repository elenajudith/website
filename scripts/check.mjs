import fs from 'node:fs/promises';
import path from 'node:path';
import {load} from 'cheerio';
const root=path.resolve('dist');const files=await fs.readdir(root,{recursive:true});const pages=files.filter(f=>f.endsWith('.html'));let failures=[];let links=0;
const images=JSON.parse(await fs.readFile('content/images.json','utf8'));const allowedImages=new Set(images.flatMap(i=>i.variants.map(v=>'/'+v.file)));
// Logo (Elena 03.11.): Ausschnitt aus web-08 (alte Website, „elena judith logo“), ohne „astraljourney“
for(const f of ['/assets/brand/elena-judith-logo-dark.png','/assets/brand/elena-judith-logo-light.png'])allowedImages.add(f);
const draftContent=JSON.parse(await fs.readFile('content/draft2.json','utf8'));
for(const file of pages){
 const $=load(await fs.readFile(path.join(root,file),'utf8'));const label=m=>failures.push(`${file}: ${m}`);
 if($('h1').length!==1)label('Expected one h1');
 const englishPage=file.startsWith('en/');
 if($('html').attr('lang')!==(englishPage?'en':'de'))label('Incorrect document language');
 if($('.language-switch a').length!==2)label('Expected DE/EN switch');
 if(!file.endsWith('404.html')&&$('link[rel=alternate][hreflang]').length!==3)label('Missing language alternatives');
 const secondDraft=false;
 if(file.includes('draft-2/'))label('Archived draft in production output');
 if($('.draft-selector,.style-selector,[data-style-option]').length)label('Draft/style selector remains');
 if($('html').attr('data-style')!=='linen')label('Final Linen style missing');
 if($('script[src*=styles-select]').length)label('Archived style runtime remains');
 if($('a[href*="/draft-2/"]').length)label('Link to archived draft');
 if($('iframe[src*="soundcloud"]').length)label('SoundCloud loads before visitor action');
 if(englishPage)$('a[href^="/"]').not('.language-switch a').each((_,e)=>{if(!$(e).attr('href').startsWith('/en/'))label(`English navigation leaves locale: ${$(e).attr('href')}`);});
 const footerLinks=$('.site-footer .social-links a,.site-footer .footer-icons a').toArray().map(e=>$(e).attr('href'));
 if(!footerLinks.some(h=>h.includes('instagram.com/aestheticmatters'))||!footerLinks.some(h=>h.includes('soundcloud.com/elena-judith'))||!footerLinks.some(h=>h.includes('youtube.com/channel/UCFYaXrnHty3oEImfCGH6WUw')))label('Missing original social link');

 const ids=new Set();$('[id]').each((_,e)=>{const id=$(e).attr('id');if(ids.has(id))label(`Duplicate id ${id}`);ids.add(id);});
 $('img').each((_,e)=>{if($(e).attr('alt')===undefined)label('Missing alt');if(!allowedImages.has($(e).attr('src')))label(`Image missing provenance: ${$(e).attr('src')}`);});
 for(const e of $('a[href],link[href],script[src],img[src]').toArray()){
  const href=$(e).attr('href')||$(e).attr('src');if(!href||/^(https?:|mailto:|tel:)/.test(href))continue;
  const base='http://local/'+file.replace(/index.html$/,'');const u=new URL(href,base);let target=path.join(root,decodeURIComponent(u.pathname));
  if(u.pathname.endsWith('/'))target=path.join(target,'index.html');
  try{const data=await fs.readFile(target);if(u.hash&&path.extname(target)==='.html'){const dest=load(data.toString());if(!dest('[id]').toArray().some(el=>dest(el).attr('id')===decodeURIComponent(u.hash.slice(1))))label(`Missing anchor ${href}`);}}catch{label(`Missing file ${href}`);}links++;
  if(secondDraft&&u.pathname.includes('/contact/')&&(u.searchParams.has('thema')||u.searchParams.has('intent'))){
   const dest=load(await fs.readFile(target,'utf8'));
   for(const key of ['thema','intent'])if(u.searchParams.has(key)&&!dest(`select[name="${key}"] option`).toArray().some(option=>dest(option).attr('value')===u.searchParams.get(key)))label(`Unrecognized enquiry ${key}: ${href}`);
  }
 }
 for(const button of $('[aria-controls]').toArray())if(!ids.has($(button).attr('aria-controls')))label('Missing disclosure target');
}
if(failures.length){console.error(failures.join('\n'));process.exit(1);}console.log(`PASS: ${pages.length} HTML pages, ${links} local links/assets, headings, IDs, image provenance and disclosure targets.`);
