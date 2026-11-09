import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');const port=Number(process.env.PORT||4178);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.woff2':'font/woff2','.png':'image/png','.jpg':'image/jpeg','.ico':'image/x-icon','.webmanifest':'application/manifest+json','.json':'application/json','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');
  if(/^\/(?:en\/)?draft-2(?:\/|$)/.test(url.pathname)){const destination=url.pathname.replace(/^\/(en\/)?draft-2(?=\/|$)/,(_,lang)=>lang?'/en':'')||'/';res.writeHead(308,{Location:destination+url.search});return res.end();}
  let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
  let status=200;
  try{const stat=await fs.stat(file);if(stat.isDirectory()){if(!url.pathname.endsWith('/')){res.writeHead(301,{Location:url.pathname+'/'+url.search});return res.end();}file=path.join(file,'index.html');}await fs.access(file);}catch{status=404;file=path.join(root,url.pathname.startsWith('/en/')?'en':'','404.html');}
  res.writeHead(status,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});res.end(await fs.readFile(file));
 }catch{res.writeHead(500);res.end('Preview error');}
}).listen(port,'127.0.0.1',()=>console.log(`Elena Judith preview: http://127.0.0.1:${port}`));
