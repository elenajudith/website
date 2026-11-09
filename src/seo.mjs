import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import {load} from 'cheerio';

export async function finishMetadata(root='dist',config){
 config??=JSON.parse(await fs.readFile('content/seo.json','utf8'));
 const site=JSON.parse(await fs.readFile('content/site.json','utf8'));
 const origin=new URL(config.origin);
 if(origin.protocol!=='https:'||origin.pathname!=='/'||origin.search||origin.hash)throw new Error('SEO origin must be an HTTPS origin without a path or query');
 if(typeof config.indexable!=='boolean'||![1,2].includes(config.publishedDraft))throw new Error('Invalid SEO publication configuration');
 const absolute=href=>new URL(href,origin).href;
 const image=await sharp(path.join(root,config.socialImage)).metadata();
 const files=(await fs.readdir(root,{recursive:true})).filter(file=>file.endsWith('.html'));
 const sitemap=[];
 for(const file of files){
  const $=load(await fs.readFile(path.join(root,file),'utf8'));
  const locale=$('html').attr('lang'),en=locale==='en';
  const draft=file.includes('draft-2/')?2:1;
  const missing=file.endsWith('404.html');
  const pathname='/'+file.replace(/index\.html$/,'');
  const url=absolute(pathname);
  const home=`${en?'/en':''}${draft===2?'/draft-2':''}/`;
  const isIndexable=config.indexable&&draft===config.publishedDraft&&!missing;
  const title=$('title').text();
  // Interior summaries come from the rendered, localized introduction, not a generic site-wide description.
  const intro=$('.page-intro>div>p:not(.eyebrow),.page-intro>p:not(.eyebrow),.contact-copy>p:not(.eyebrow)').first().text().trim();
  const description=intro||$('meta[name=description]').attr('content');
  $('meta[name=description]').attr('content',description);
  $('meta[name=robots]').attr('content',isIndexable?'index,follow,max-image-preview:large':'noindex,nofollow');
  $('head').prepend($('meta[charset]'));
  $('link[rel=icon],link[rel=apple-touch-icon],link[rel=manifest],link[rel=canonical],link[hreflang=x-default],meta[property^="og:"],meta[name^="twitter:"],meta[name=referrer],script[type="application/ld+json"]').remove();
  const link=(rel,href,attrs={})=>$('<link>').attr({rel,href,...attrs}).appendTo('head');
  link('icon','/favicon.ico',{sizes:'32x32'});
  link('icon','/assets/icon-96.png',{type:'image/png',sizes:'96x96'});
  link('icon','/assets/favicon.svg',{type:'image/svg+xml',sizes:'any'});
  link('apple-touch-icon','/assets/icon-180.png',{sizes:'180x180'});
  link('manifest','/site.webmanifest');
  const meta=(name,content,property=false)=>$('<meta>').attr({[property?'property':'name']:name,content:String(content)}).appendTo('head');
  meta('referrer','strict-origin-when-cross-origin');
  if(missing){
   $('link[rel=alternate]').remove();
  }else{
   link('canonical',url);
   $('link[rel=alternate][hreflang]').each((_,el)=>$(el).attr('href',absolute($(el).attr('href'))));
   const de=$('link[hreflang=de]').attr('href');
   link('alternate',de,{hreflang:'x-default'});
   for(const [name,value] of Object.entries({'og:type':'website','og:site_name':config.name,'og:title':title,'og:description':description,'og:url':url,'og:locale':en?'en_GB':'de_DE','og:locale:alternate':en?'de_DE':'en_GB','og:image':absolute(config.socialImage),'og:image:type':'image/jpeg','og:image:width':image.width,'og:image:height':image.height,'og:image:alt':config.socialImageAlt[locale]}))meta(name,value,true);
   for(const [name,value] of Object.entries({'twitter:card':'summary_large_image','twitter:title':title,'twitter:description':description,'twitter:image':absolute(config.socialImage),'twitter:image:alt':config.socialImageAlt[locale]}))meta(name,value);
   const personId=absolute('/#elena-judith');
   const websiteId=absolute(home+'#website');
   const pageType=pathname.endsWith('/about/')?'AboutPage':pathname.endsWith('/contact/')?'ContactPage':'WebPage';
   const graph=[{'@type':'Person','@id':personId,name:config.name,alternateName:config.legalName,url:absolute(home+'about/'),image:absolute(config.socialImage),sameAs:[site.social.instagram,site.social.soundcloud,site.social.youtube]},
    {'@type':'WebSite','@id':websiteId,url:absolute(home),name:config.name,inLanguage:locale,publisher:{'@id':personId}},
    {'@type':pageType,'@id':url+'#webpage',url,name:title,description,inLanguage:locale,isPartOf:{'@id':websiteId},about:{'@id':personId},primaryImageOfPage:{'@type':'ImageObject',url:absolute(config.socialImage)}}];
   // Breadcrumbs describe only the navigation that is actually displayed on detail pages.
   if($('.breadcrumb').length){
    const list=$('.breadcrumb a').toArray().map((el,i)=>({'@type':'ListItem',position:i+1,name:$(el).text(),item:absolute($(el).attr('href'))}));
    list.push({'@type':'ListItem',position:list.length+1,name:$('.breadcrumb span').last().text(),item:url});
    graph.push({'@type':'BreadcrumbList','@id':url+'#breadcrumb',itemListElement:list});graph[2].breadcrumb={'@id':url+'#breadcrumb'};
   }
   $('<script type="application/ld+json">').text(JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c')).appendTo('head');
   if(isIndexable)sitemap.push({url,alternates:$('link[rel=alternate]').toArray().map(el=>({lang:$(el).attr('hreflang'),url:$(el).attr('href')}))});
  }
  await fs.writeFile(path.join(root,file),$.html());
 }
 // Keep the existing review-host policy. Do not advertise noindex drafts in a sitemap.
 await fs.writeFile(path.join(root,'robots.txt'),config.indexable?`User-agent: *\nAllow: /\nSitemap: ${absolute('/sitemap.xml')}\n`:'User-agent: *\nDisallow: /\n');
 await fs.rm(path.join(root,'sitemap.xml'),{force:true});
 if(config.indexable){
  const xml=value=>value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
  await fs.writeFile(path.join(root,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${sitemap.map(entry=>`<url><loc>${xml(entry.url)}</loc>${entry.alternates.map(a=>`<xhtml:link rel="alternate" hreflang="${a.lang}" href="${xml(a.url)}"/>`).join('')}</url>`).join('')}</urlset>\n`);
 }
}
