import fs from 'node:fs/promises';
import {load} from 'cheerio';
const routes=['','11-sessions','yoga-nidra','kambo','services','wise-in-her-ways-1','song-of-the-soul','inner-child','silent-retreat','kraft','schamanisches-retreat','dreaming-reality','a','my-art','contact'];
const output=[];
for(let i=0;i<routes.length;i+=4)await Promise.all(routes.slice(i,i+4).map(async slug=>{
 const url=`https://www.elenajudith.de/${slug?slug+'/':''}`;
 const response=await fetch(url);if(!response.ok)throw new Error(`${url}: ${response.status}`);
 const raw=await response.text();await fs.writeFile(`content/sources/website/${slug||'home'}.html`,raw);
 const $=load(raw),root=$('[data-elementor-type="wp-page"]').first();
 const widgets=root.find('.elementor-widget').map((_,el)=>({id:$(el).attr('data-id'),type:$(el).attr('data-widget_type'),classes:$(el).attr('class'),html:$(el).find('.elementor-widget-container').first().html(),text:$(el).text().trim()})).get();
 const links=root.find('a[href]').map((_,el)=>({text:$(el).text().trim(),href:$(el).attr('href')})).get();
 output.push({slug,url,title:$('title').text(),lang:$('html').attr('lang'),widgets,links});
 console.log(slug||'home',JSON.stringify(widgets.map(w=>({type:w.type,id:w.id,text:w.text.slice(0,110)}))));
}));
await fs.writeFile('content/original-2026-10-27.json',JSON.stringify(output,null,2)+'\n');
