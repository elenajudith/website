// Elena 2026-10-28: erzeugt die WebP-Varianten der Fotos für „Über mich“ und trägt sie in content/images.json ein.
// Quelle der Auswahl: content/about-photos.json. Aufruf: npm run images:about
import fs from 'node:fs/promises';
import sharp from 'sharp';
const photos=[...JSON.parse(await fs.readFile('content/about-photos.json','utf8')).photos,...JSON.parse(await fs.readFile('content/sessions-photos.json','utf8')).photos];
const manifest=JSON.parse(await fs.readFile('content/images.json','utf8')).filter(entry=>!entry.id.startsWith('about-')&&!entry.id.startsWith('sessions-'));
await fs.mkdir('public/images',{recursive:true});
for(const photo of photos){
 const variants=[];
 for(const width of [480,960,1600]){
  const file=`images/${photo.id}-${width}.webp`;
  const info=await sharp(photo.file).rotate().resize({width,withoutEnlargement:true}).webp({quality:82}).toFile(`public/${file}`);
  variants.push({file,width:info.width,height:info.height,bytes:info.size});
 }
 const {id,file,url,page,name}=photo;
 manifest.push({id,file,url,page,name,variants});
}
await fs.writeFile('content/images.json',JSON.stringify(manifest,null,2)+'\n');
console.log(`Optimized ${photos.length} photos for „Über mich“ and „1:1 Begleitung“, 3 sizes each.`);
