import fs from 'node:fs/promises';
import {load} from 'cheerio';
const routes=['','about','11-sessions','yoga-nidra','kambo','services','wise-in-her-ways-1','song-of-the-soul','inner-child','silent-retreat','kraft','schamanisches-retreat','dreaming-reality','a','my-art','contact'];
const out=[];
for(let i=0;i<routes.length;i+=4){
 await Promise.all(routes.slice(i,i+4).map(async slug=>{
 const url=`https://www.elenajudith.de/${slug?slug+'/':''}`;
 const html=await (await fetch(url)).text();const $=load(html);const root=$('[data-elementor-type="wp-page"]').first();
 const scope=root.length?root:$('main');
 const blocks=scope.find('h1,h2,h3,p,li').map((_,el)=>({tag:el.tagName,text:$(el).text().replace(/\s+/g,' ').trim()})).get().filter(x=>x.text);
 const images=scope.find('img').map((_,el)=>({src:$(el).attr('src'),alt:$(el).attr('alt'),srcset:$(el).attr('srcset')})).get().filter(x=>x.src?.startsWith('https://www.elenajudith.de/wp-content/uploads/'));
 const cssURLs=$('link[rel="stylesheet"]').map((_,e)=>$(e).attr('href')).get().filter(s=>s.includes('/uploads/elementor/css/post-'));
 const backgrounds=[];for(const cssURL of cssURLs){const css=await(await fetch(cssURL)).text();for(const m of css.matchAll(/url\(["']?([^)'"\s]+)["']?\)/g))if(/\.(jpe?g|png|webp)/i.test(m[1]))backgrounds.push(m[1]);}
 const links=scope.find('a[href]').map((_,el)=>({text:$(el).text().trim(),href:$(el).attr('href')})).get();
 out.push({slug,url,title:$('title').text(),blocks,images,backgrounds:[...new Set(backgrounds)],links});console.log(slug||'home',blocks.length,images.length);
 }));
}
await fs.writeFile('content/source-pages.json',JSON.stringify(out,null,2));
