import fs from 'node:fs/promises';
import sharp from 'sharp';
// Extend the existing project-native monogram, without introducing third-party imagery.
const svg=await fs.readFile('public/assets/favicon.svg');
for(const size of [32,96,180,192,512])await sharp(svg,{density:600}).resize(size,size).png().toFile(`dist/assets/icon-${size}.png`);
const png=await fs.readFile('dist/assets/icon-32.png');
const ico=Buffer.alloc(22);ico.writeUInt16LE(1,2);ico.writeUInt16LE(1,4);ico[6]=32;ico[7]=32;ico.writeUInt16LE(1,10);ico.writeUInt16LE(32,12);ico.writeUInt32LE(png.length,14);ico.writeUInt32LE(22,18);
await fs.writeFile('dist/favicon.ico',Buffer.concat([ico,png]));
await sharp('public/images/v2-garden-960.webp').jpeg({quality:85}).toFile('dist/assets/social-portrait.jpg');
await fs.writeFile('dist/site.webmanifest',JSON.stringify({id:'/',name:'Elena Judith',short_name:'Elena Judith',start_url:'/',scope:'/',display:'browser',background_color:'#f5f2ea',theme_color:'#536047',icons:[192,512].map(size=>({src:`/assets/icon-${size}.png`,sizes:`${size}x${size}`,type:'image/png',purpose:'any'}))},null,2)+'\n');
