import fs from 'node:fs/promises';
import sharp from 'sharp';
const sources=JSON.parse(await fs.readFile('content/assets-source.json','utf8'));
const draftSources=JSON.parse(await fs.readFile('content/draft2-assets.json','utf8'));
sources.push(...draftSources);
const folder='https://drive.google.com/drive/folders/1ibLKXgpSr02mq2wDcasMz3zwULslZN2Y';
sources.push(...[
 ['elena-garden','1mCvvj2Ub3F0xQxdH7z2UFwXL3t2Zp1a5','29780080-B1AE-49E7-92C9-1643149290D5.JPG'],
 ['elena-studio','1lCIzcPb4MI2A_u0MoKPYcWZb1hbYpkmQ','Inspiredby_being-244.jpeg']
].map(([id,driveId,name])=>({id,file:`assets/originals/${id}.jpg`,url:`https://drive.google.com/file/d/${driveId}/view`,page:folder,name})));
// Elena 2026-11-03: auch Fotos aus den neu aufgebauten Seiten (content/wise.json, content/courses.json) einbeziehen
const text=await fs.readFile('src/render.mjs','utf8')+await fs.readFile('content/site.json','utf8')+await fs.readFile('content/wise.json','utf8')+await fs.readFile('content/courses.json','utf8').catch(()=>'');
const used=new Set([...text.matchAll(/web-\d{2}|elena-garden|elena-studio/g)].map(m=>m[0]));
draftSources.forEach(source=>used.add(source.id));
await fs.mkdir('public/images',{recursive:true});
const manifest=[];
// Retain source-attributed portraits imported for the complete testimonials.
const existing=JSON.parse(await fs.readFile('content/images.json','utf8'));
for(const source of existing.filter(s=>s.id.startsWith('portrait-'))){sources.push(source);used.add(source.id);}
// Elena 2026-10-28: Fotos für „Über mich“ werden von scripts/import-about-photos.mjs gepflegt und hier beibehalten.
for(const source of existing.filter(s=>s.id.startsWith('about-')||s.id.startsWith('sessions-'))){sources.push(source);used.add(source.id);}
for(const id of used){
 const source=sources.find(s=>s.id===id);if(!source)throw new Error(`Missing source: ${id}`);
 const variants=[];
 for(const width of [480,960,1600]){
  const file=`images/${id}-${width}.webp`;
  const info=await sharp(source.file).rotate().resize({width,withoutEnlargement:true}).webp({quality:82}).toFile(`public/${file}`);
  variants.push({file,width:info.width,height:info.height,bytes:info.size});
 }
 manifest.push({...source,variants});
}
await fs.writeFile('content/images.json',JSON.stringify(manifest,null,2)+'\n');
console.log(`Optimized ${manifest.length} approved images, 3 sizes each.`);
