import fs from 'node:fs/promises';
import path from 'node:path';
import * as render from '../src/render.mjs';
import {localize} from '../src/localize.mjs';
import {draft2} from '../src/design.mjs';
import {finalize} from '../src/final.mjs';
import {load} from 'cheerio';
import {finishMetadata} from '../src/seo.mjs';
await fs.rm('dist',{recursive:true,force:true});
await fs.cp('public','dist',{recursive:true});
await fs.mkdir('dist/assets/fonts',{recursive:true});
await fs.copyFile('src/main.js','dist/assets/main.js');
for(const [family,variants] of [['cormorant-garamond',['400-normal','400-italic','600-normal']],['dm-sans',['400-normal','500-normal']]])for(const variant of variants){const file=`${family}-latin-${variant}.woff2`;await fs.copyFile(`node_modules/@fontsource/${family}/files/${file}`,`dist/assets/fonts/${file}`);}
const pages=[['',render.home],['about',render.about],['11-sessions',render.sessions],['services',render.services],['yoga-nidra',render.yoga],['kambo',render.kambo],['my-art',render.art],['contact',render.contact],['impressum',render.impressum],...[...render.site.retreats,...render.site.courses].map(r=>[r.slug,()=>render.detail(r)])];
const newPages=[...pages,['music',render.art],['datenschutz',render.impressum],['photography',render.art],['stimmen',render.impressum],['astrologie-human-design',()=>render.sessions('/astrologie-human-design/','Astrologie & Human Design')]];
const quotes=Object.fromEntries(['de','en'].map(locale=>[locale,load(localize(render.home(),{locale}))('.testimonials').toString()]));
for(const [route,fn] of newPages){
 const pageRoute=route?`/${route}/`:'/';
 for(const locale of ['de','en']){
  const dir=path.join('dist',locale==='en'?'en':'',route);
  await fs.mkdir(dir,{recursive:true});
  const base=draft2(localize(fn(),{locale,route:pageRoute}),{locale,route:pageRoute,testimonials:quotes[locale]});
  await fs.writeFile(path.join(dir,'index.html'),finalize(base,{locale,route:pageRoute}));
 }
}
for(const locale of ['de','en']){
 const page=finalize(localize(render.notFound(),{locale,route:'/404.html'}),{locale,route:'/404.html'});
 await fs.writeFile(path.join('dist',locale==='en'?'en':'','404.html'),page);
}
await import('./brand-assets.mjs');
await finishMetadata();
console.log(`Built ${newPages.length*2} final pages plus two localized 404 pages. Previous drafts are archived and excluded.`);
