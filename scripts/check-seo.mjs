import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import {load} from 'cheerio';
import {finishMetadata} from '../src/seo.mjs';
const config=JSON.parse(await fs.readFile('content/seo.json','utf8'));
const pages=(await fs.readdir('dist',{recursive:true})).filter(f=>f.endsWith('.html'));
for(const file of pages){
 const $=load(await fs.readFile(path.join('dist',file),'utf8'));
 const missing=file.endsWith('404.html');
 const expected=new URL('/'+file.replace(/index\.html$/,''),config.origin).href;
 assert.equal($('meta[charset]').length,1,file);
 assert.ok($('head').children().first().is('meta[charset]'),file);
 for(const rel of ['manifest','apple-touch-icon'])assert.equal($(`link[rel="${rel}"]`).length,1,file);
 assert.equal($('link[rel=canonical]').length,missing?0:1,file);
 assert.equal($('script[type="application/ld+json"]').length,missing?0:1,file);
 const draft=file.includes('draft-2/')?2:1;
 assert.equal($('meta[name=robots]').attr('content').startsWith('index,'),config.indexable&&draft===config.publishedDraft&&!missing,file);
 if(missing)continue;
 assert.equal($('link[rel=canonical]').attr('href'),expected,file);
 assert.equal($('meta[property="og:url"]').attr('content'),expected,file);
 assert.equal($('meta[property="og:title"]').attr('content'),$('title').text(),file);
 assert.equal($('meta[property="og:description"]').attr('content'),$('meta[name=description]').attr('content'),file);
 assert.ok($('meta[name=description]').attr('content').length>20,file);
 const graph=JSON.parse($('script[type="application/ld+json"]').text())['@graph'];
 assert.ok(graph.some(n=>n['@type']==='Person'&&n.name==='Elena Judith'),file);
 assert.ok(graph.some(n=>n['@id']===expected+'#webpage'&&n.inLanguage===$('html').attr('lang')),file);
 assert.ok(!graph.some(n=>['Event','Review','AggregateRating'].includes(n['@type'])),file);
 for(const el of $('link[rel=alternate]').toArray()){
  const u=new URL($(el).attr('href'));assert.equal(u.origin,config.origin,file);
  const target=path.join('dist',u.pathname,'index.html');
  const alt=load(await fs.readFile(target,'utf8'));
  assert.ok(alt(`link[rel=alternate][href="${expected}"]`).length,file+' reciprocal alternate');
 }
 const imageUrl=new URL($('meta[property="og:image"]').attr('content'));
 const image=await sharp(path.join('dist',imageUrl.pathname)).metadata();
 assert.equal(image.width,Number($('meta[property="og:image:width"]').attr('content')),file);
}
const manifest=JSON.parse(await fs.readFile('dist/site.webmanifest','utf8'));
for(const icon of manifest.icons){const image=await sharp(path.join('dist',icon.src)).metadata();assert.equal(`${image.width}x${image.height}`,icon.sizes);}
assert.equal((await fs.readFile('dist/favicon.ico')).readUInt16LE(2),1);
if(!config.indexable){assert.match(await fs.readFile('dist/robots.txt','utf8'),/Disallow: \/\n/);await assert.rejects(fs.access('dist/sitemap.xml'));}
// Exercise the launch configuration in an isolated copy; never change the review build.
const temp=await fs.mkdtemp(path.join(os.tmpdir(),'elena-seo-check-'));
try{
 await fs.cp('dist',temp,{recursive:true});
 await finishMetadata(temp,{...config,indexable:true,publishedDraft:1});
 const sitemap=load(await fs.readFile(path.join(temp,'sitemap.xml'),'utf8'),{xmlMode:true});
 assert.equal(sitemap('url').length,44); // Elena 2026-11-03: +Datenschutz (de/en)
 for(const el of sitemap('loc').toArray()){
  const url=new URL(sitemap(el).text());assert.ok(!url.pathname.includes('/draft-2/'));assert.ok(!url.pathname.includes('404'));
 }
 const first=load(await fs.readFile(path.join(temp,'index.html'),'utf8'));
 const second=load(await fs.readFile(path.join(temp,'en/index.html'),'utf8'));
 assert.match(first('meta[name=robots]').attr('content'),/^index,follow/);
 assert.match(second('meta[name=robots]').attr('content'),/^index,follow/);
 assert.equal(second('script[type="application/ld+json"]').length,1);
 await finishMetadata(temp,{...config,indexable:false});
 await assert.rejects(fs.access(path.join(temp,'sitemap.xml')));
}finally{await fs.rm(temp,{recursive:true,force:true});}
console.log(`PASS: SEO metadata for ${pages.length} pages, JSON-LD, reciprocal language URLs, icons, social image, and isolated 42-URL launch sitemap.`);
