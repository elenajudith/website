import {load} from 'cheerio';

// Version selection is independent of language and content navigation.
export function addDraftSelector(html,{locale,route='/',draft=1,v1Routes,v2Routes}){
  const $=load(html);
  const en=locale==='en';
  const target=(version)=>{
    const routes=version===1?v1Routes:v2Routes;
    const equivalent=routes.has(route)?route:'/';
    return `${en?'/en':''}${version===2?'/draft-2':''}${equivalent}`;
  };
  const label=en?'Drafts':'Entwürfe';
  // Apply a validated saved preference before styles paint. Each draft has its own default.
  $('html').attr('data-style',draft===2?'atelier':'linen');
  $('head').prepend('<script src="/assets/styles-select.js"></script>');
  $('#navigation').append(`<div class="nav-item draft-selector"><button class="submenu-toggle draft-toggle" aria-label="${label}" aria-expanded="false" aria-controls="draft-options">${label}<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor"/></svg></button><div class="submenu" id="draft-options" hidden>${[1,2].map(n=>`<a href="${target(n)}" ${n===draft?'aria-current="true"':''}>${en?'Draft':'Entwurf'} ${n}<span aria-hidden="true">${n===draft?'✓':'↗'}</span></a>`).join('')}</div>`);
  $('#navigation').append(`<div class="nav-item style-selector" hidden><button class="submenu-toggle draft-toggle style-toggle" aria-label="${en?'Visual style':'Gestaltungsstil'}" aria-expanded="false" aria-controls="style-options"><span class="style-indicator" aria-hidden="true"></span>${en?'Style':'Stil'}<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor"/></svg></button><div class="submenu style-options" id="style-options" hidden><p>${en?'Choose a visual direction':'Gestaltung auswählen'}</p>${[
    ['linen','Linen',en?'Soft serif · cream & olive':'Sanfte Serifenschrift · Creme & Olive'],
    ['atelier','Atelier',en?'Warm classic · clay & rose':'Warme Klassik · Ton & Rosé'],
    ['gallery','Gallery',en?'Modern sans · chalk & slate':'Moderne Grotesk · Kreide & Schiefer']
  ].map(([id,name,description])=>`<button type="button" data-style-option="${id}" aria-pressed="false"><span class="style-swatches swatch-${id}" aria-hidden="true"><i></i><i></i></span><span><strong>${name}</strong><small>${description}</small></span><span class="style-check" aria-hidden="true">✓</span></button>`).join('')}</div></div>`);
  return $.html();
}
