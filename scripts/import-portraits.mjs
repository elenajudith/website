import fs from 'node:fs/promises';
import sharp from 'sharp';
const quotes=JSON.parse(await fs.readFile('content/source-testimonials.json','utf8'));
const manifest=JSON.parse(await fs.readFile('content/images.json','utf8'));
for(const q of quotes){
 if(!q.url)continue;
 let source=manifest.find(p=>p.url===q.url);
 if(!source){
  const id='portrait-'+new URL(q.url).pathname.split('/').at(-1).replace(/\.[^.]+$/,'').toLowerCase();
  const file=`assets/originals/${id}.jpg`;
  let buffer;try{buffer=await fs.readFile(file);}catch{const r=await fetch(q.url);if(!r.ok)throw Error(`${r.status}: ${q.url}`);buffer=Buffer.from(await r.arrayBuffer());await fs.writeFile(file,buffer);}
  source={id,file,url:q.url,page:`https://www.elenajudith.de/${q.page}/`,name:q.name,attribution:'Portrait paired with this testimonial in original page markup; captured 2026-10-27',variants:[]};
  for(const width of [480,960,1600]){const imageFile=`images/${id}-${width}.webp`;const info=await sharp(buffer).rotate().resize({width,withoutEnlargement:true}).webp({quality:85}).toFile(`public/${imageFile}`);source.variants.push({file:imageFile,width:info.width,height:info.height});}
  manifest.push(source);
 }
 q.image=source.id;
}
await fs.writeFile('content/images.json',JSON.stringify(manifest,null,2)+'\n');
await fs.writeFile('content/source-testimonials.json',JSON.stringify(quotes,null,2)+'\n');
console.log(`${quotes.length} original testimonials; portraits grounded in original source markup.`);
