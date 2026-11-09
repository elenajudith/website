import fs from 'node:fs';
import {load} from 'cheerio';
import {site,esc} from './render.mjs';

const content=JSON.parse(fs.readFileSync(new URL('../content/draft2.json',import.meta.url),'utf8'));
const manifest=JSON.parse(fs.readFileSync(new URL('../content/images.json',import.meta.url),'utf8'));
const arrow='<span aria-hidden="true">↗</span>';
const renamed="We’re the ones we’ve been waiting for";
const sources=new Map(manifest.map(p=>[p.id,p]));
// Elena 2026-10-28 (B-13/B-14): einheitliche Social-Media-Icons.
const icons={
  instagram:'<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" stroke-width="1.4"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor"/></svg>',
  soundcloud:'<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M10 8.5v8M7.5 10.5v6M5 12v4.5M2.5 13.5v3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M12.5 16.5V7.6A5 5 0 0 1 21 11a3 3 0 0 1-.5 5.5h-8Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
  youtube:'<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" stroke-width="1.4"/><path d="m10 9.2 5 2.8-5 2.8V9.2Z" fill="currentColor"/></svg>'
};
export const socialIcons=(cls='social-icons')=>`<span class="${cls}">${[['instagram','Instagram'],['soundcloud','SoundCloud'],['youtube','YouTube']].map(([k,label])=>`<a href="${site.social[k]}" target="_blank" rel="noopener noreferrer" aria-label="${label}">${icons[k]}</a>`).join('')}</span>`;

export function draft2(html,{locale='de',route='/',testimonials}){
  const $=load(html);
  const en=locale==='en';
  const t=(de,english)=>en?english:de;
  const prefix=en?'/en/draft-2':'/draft-2';
  const a=(label,href,cls='text-link')=>`<a class="${cls}" href="${esc(href)}">${label}${arrow}</a>`;
  const eyebrow=text=>`<p class="eyebrow">${text}</p>`;
  const image=(id,{eager=false,alt,cls=''}={})=>{
    const source=sources.get(id);
    if(!source)throw new Error(`Draft 2 image has no provenance: ${id}`);
    const m=source.variants.find(v=>v.file.includes('-960.'));
    const description=alt||content.photos[id]?.[en?1:0]||t('Einblick in Elenas Arbeit','A glimpse into Elena’s work');
    const unique=[...new Map(source.variants.map(v=>[v.width,v])).values()];
    return `<img class="${cls}" src="/${m.file}" srcset="${unique.map(v=>`/${v.file} ${v.width}w`).join(', ')}" sizes="(max-width: 700px) 100vw, 60vw" width="${m.width}" height="${m.height}" alt="${esc(description)}" ${eager?'fetchpriority="high"':'loading="lazy"'} decoding="async">`;
  };
  const enquiry=(topic='',mode='')=>`/contact/${topic||mode?'?'+new URLSearchParams({...topic&&{thema:topic},...mode&&{intent:mode}}):''}#contact-form`;
  const banner=(topic='',mode='')=>`<section class="revolution-banner" id="revolution" data-section="revolution-cta" lang="en"><div class="shell" data-effect="source-reveal"><p class="revolution-opening">${content.banner.opening}</p><span class="revolution-dash" aria-hidden="true">—</span><h2>${content.banner.statement}</h2>${a(content.banner.action,enquiry(topic,mode),'revolution-action')}</div></section>`;
  const quoteSection=(kind='all')=>{
    const q=load(testimonials);
    q('.quote').each((_,el)=>{
      const name=q(el).find('strong').text();
      if((kind==='retreat'&&name!=='Jasmin')||(kind==='reading'&&name!=='Jonas')||(kind==='course'&&name!=='Mareike'))q(el).remove();
    });
    if(kind==='all'||kind==='retreat')content.testimonials.forEach(person=>{
      q('.quote-stage').append(`<figure class="quote" hidden><div class="quote-portrait"><img src="/images/${person.image}-480.webp" alt="" width="220" height="270" loading="lazy"></div><blockquote>${en?'“':'„'}${esc(person.quote[en?1:0])}“</blockquote><figcaption><strong>${person.name}</strong><small>${t('Teilnehmerin von Wise In Her Ways · Auszug','Wise In Her Ways participant · excerpt · translated from German')}</small></figcaption></figure>`);
    });
    q('.quote').each((i,el)=>{if(i===0)q(el).removeAttr('hidden');else q(el).attr('hidden','');});
    const count=q('.quote').length;
    q('[data-quote-counter]').text(`01 / ${String(count).padStart(2,'0')}`);
    return q('section').toString();
  };
  const gallery=(ids,title,subtitle='')=>`<section class="v2-gallery shell" data-gallery data-section="photo-sequence"><div class="heading-row"><div>${eyebrow(t('IN BILDERN','IN PHOTOGRAPHS'))}<h2>${title}</h2>${subtitle?`<p class="gallery-intro">${subtitle}</p>`:''}</div><div class="gallery-controls" hidden><button type="button" data-gallery-prev aria-label="${t('Vorheriges Bild','Previous photograph')}">←</button><span data-gallery-count aria-live="polite">01 / ${String(ids.length).padStart(2,'0')}</span><button type="button" data-gallery-next aria-label="${t('Nächstes Bild','Next photograph')}">→</button></div></div><div class="gallery-track" tabindex="0" aria-label="${t('Fotogalerie','Photo gallery')}">${ids.map((id,i)=>`<figure class="gallery-slide">${image(id)}<figcaption><span>${String(i+1).padStart(2,'0')}</span>${content.photos[id]?.[en?1:0]||t('Einblicke aus gemeinsamer Zeit','Glimpses of time together')}</figcaption></figure>`).join('')}</div></section>`;
  const social=()=>`<section class="v2-social shell" data-section="social"><div>${eyebrow(t('ZWISCHEN UNS','STAY IN TOUCH'))}<h2>${t('Ein bisschen näher.','A little closer.')}</h2><p>${t('Bilder, Gedanken und Musik. Auch zwischen unseren Begegnungen.','Photographs, thoughts and music. In between our encounters, too.')}</p></div><div class="social-editorial">${a('Instagram',site.social.instagram)}${a('SoundCloud',site.social.soundcloud)}${a('YouTube',site.social.youtube)}</div></section>`;
  const player=()=>`<div class="soundcloud-preview"><button type="button" data-soundcloud="${esc(content.soundcloud.player)}" data-player-title="Cambia — Elena Judith · SoundCloud">${t('SoundCloud-Player hier laden','Load the SoundCloud player here')}<span aria-hidden="true">▷</span></button><p>${t('Mit einem Klick wird der Player von SoundCloud geladen. Die Musik startet erst, wenn du auf Play drückst.','Click to load the player from SoundCloud. Music starts only when you press play.')}</p><noscript>${a(t('Cambia auf SoundCloud hören','Listen to Cambia on SoundCloud'),site.social.soundcloud+'/cambia')}</noscript></div>`;
  // Elena 2026-10-28 (B-12): ein einziges Element; der Klick lädt SoundCloud an dieser Stelle und startet den Song.
  const homePlayer=()=>`<div class="home-player"><button type="button" class="v2-listen" data-soundcloud="${esc(content.soundcloud.player.replace('auto_play=false','auto_play=true'))}" data-player-title="Cambia — Elena Judith · SoundCloud" aria-label="${t('Cambia abspielen (lädt SoundCloud)','Play Cambia (loads SoundCloud)')}"><span class="v2-play" aria-hidden="true">▷</span><span>Cambia<small>ELENA JUDITH · SOUNDCLOUD</small></span></button><p class="player-note">${t('Mit dem Klick wird SoundCloud geladen.','Clicking loads SoundCloud.')}</p><noscript>${a(t('Cambia auf SoundCloud hören','Listen to Cambia on SoundCloud'),site.social.soundcloud+'/cambia')}</noscript></div>`;
  // Elena 2026-10-28 (B-14): Social-Abschnitt der Startseite.
  const homeSocial=()=>`<section class="v2-social home-social shell" data-section="social"><div><h2>${t('Folge mir auf meinen Kanälen.','Follow me on my channels.')}</h2></div><div>${socialIcons('social-icons social-icons-large')}<!-- B-14: Platz für den Instagram-Live-Feed (@aestheticmatters). Erst nach Auswahl des Feed-Tools und nur mit Zwei-Klick-Einwilligung einbauen. --><a class="button" href="${site.social.instagram}" target="_blank" rel="noopener noreferrer">${t('Auf Instagram folgen','Follow on Instagram')}${arrow}</a></div></section>`;
  const introduction=t('Multidisziplinäre Künstlerin, Anthropologin, freie Journalistin, psychospirituelle Mentorin, ganzheitliche Therapeutin, Medizinfrau und Wegbegleiterin.','Multidisciplinary artist, anthropologist, freelance journalist, psychospiritual mentor, holistic therapist, medicine woman and companion on your journey.');
  const originalHomeRetreats=route==='/'?$('.retreat-section').html():'';

  $('body').addClass('draft-two').attr('data-draft','2');
  $('.site-header .wordmark span').text(t('KUNST · BEGEGNUNG · BEGLEITUNG','ART · CONNECTION · GUIDANCE'));
  $('.site-header').after(`<div class="v2-motto"><span class="v2-motto-text">${t('Alles ist Liebe oder der Schrei nach ihr.','All is love or the cry for love.')}</span>${socialIcons('motto-social')}</div>`);
  const sessionsNav=$('.nav-item').filter((_,el)=>$(el).find('.nav-label>a').attr('href')?.endsWith('/11-sessions/'));
  sessionsNav.find('.submenu').append(`<a href="/photography/">${t('Fotoshootings','Photo shoots')}${arrow}</a>`);
  const artNav=$('.nav-item').filter((_,el)=>$(el).find('.nav-label>a').attr('href')?.endsWith('/my-art/'));
  artNav.addClass('has-submenu').find('.nav-label').append(`<button class="submenu-toggle" aria-label="${t('Kunst: Untermenü','Art: submenu')}" aria-expanded="false" aria-controls="art-submenu"><svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor"/></svg></button>`);
  artNav.append(`<div class="submenu" id="art-submenu" hidden><a href="${esc(site.social.etsy)}" target="_blank" rel="noopener noreferrer">${t('Kleidung','Clothing')}${arrow}</a><a href="/music/">${t('Musik','Music')}${arrow}</a></div>`);

  if(route==='/'){
    $('title').text(t('Elena Judith · Kunst, Begegnung und Begleitung','Elena Judith · Art, connection and guidance'));
    $('main').html(`
      <section class="v2-hero shell" data-section="hero">
        <div class="v2-hero-copy">${eyebrow(t('ELENA JUDITH / VIELE FACETTEN. EIN WEG.','ELENA JUDITH / MANY FACETS. ONE JOURNEY.'))}
          <h1>${t('Das Leben.<br>In all seinen<br><em>Facetten.</em>','Life.<br>In all its<br><em>many colours.</em>')}</h1>
          <p>${t('Kunst, Begegnung und persönliche Begleitung. Räume, in denen du deiner eigenen Stimme näherkommen kannst.','Art, connection and personal guidance. Spaces to come closer to your own voice.')}</p>
          <div class="hero-actions">${a(t('Über mich','About me'),'/about/','button')}${a(t('Meine Arbeit','My work'),'#wege','button button-light')}</div>
        </div>
        <figure class="v2-hero-photo">${image('v2-garden',{eager:true})}<figcaption>${t('Mit offenem Herzen. Mit beiden Füßen auf der Erde.','An open heart. Both feet on the ground.')}</figcaption><span class="v2-photo-label">ELENA JUDITH</span></figure>
      </section>
      <section class="v2-introduction shell" id="begegnung" data-section="about-intro">
        <figure data-effect="source-reveal">${image('v2-portrait')}<figcaption>${t('Mensch. Künstlerin. Wegbegleiterin.','A person. An artist. A companion.')}</figcaption></figure>
        <div data-effect="source-reveal">${eyebrow(t('SCHÖN, DASS DU HIER BIST','I’M GLAD YOU’RE HERE'))}<h2>${t('Ich bin Elena.<br>Vieles gehört<br><em>zu mir.</em>','I’m Elena.<br>Many things<br><em>make me, me.</em>')}</h2><p class="v2-lead">${t('Mich bewegt, was uns verbindet. Mit uns selbst, mit anderen Menschen und mit der Welt um uns herum.','I’m drawn to what connects us. To ourselves, to one another and to the world around us.')}</p><p class="v2-profession">${introduction}</p>${a(t('Mehr über mich und meinen Weg','More about me and my path'),'/about/')}</div>
      </section>
      <section class="v2-paths" id="wege" data-section="offerings"><div class="shell"><div class="heading-row">${eyebrow(t('MEINE ARBEIT','MY WORK'))}</div><div class="v2-path-grid">
      ${[
        ['01',t('1:1 Begleitung','1:1 Sessions'),t('Ein Raum für dich.','A space for you.'),'/11-sessions/'],
        ['02',t('Retreats & Kurse','Retreats & Courses'),t('Ein Raum für uns.','A space for us.'),'/services/'],
        ['03',t('Kunst','Art'),t('Ein Raum für Ausdruck.','A space for expression.'),'/my-art/']
      ].map(([n,title,subline,href])=>`<article data-effect="source-reveal"><h2 class="path-title">${title}</h2><p class="path-subline">${subline}</p><a class="text-link" href="${esc(href)}" aria-label="${esc(title)} ${t('entdecken','– explore')}">${t('Entdecken','Explore')}</a></article>`).join('')}</div></div></section>
      <section class="retreat-section shell v2-home-retreats" data-section="retreat-selection">${originalHomeRetreats}</section>
      ${quoteSection()}
      <section class="v2-music shell" data-section="music"><figure data-effect="source-reveal">${image('v2-concert')}</figure><div data-effect="source-reveal">${eyebrow(t('MUSIK IST BEGEGNUNG','MUSIC IS CONNECTION'))}<h2>${t('Manches möchte<br>gesungen <em>werden.</em>','Some things<br>are meant to<br>be <em>sung.</em>')}</h2><p>${t('Meine Mutter sagt, ich habe gesungen, bevor ich gesprochen habe. Meine Stimme ist ein Teil meiner Geschichte. In Liedern, auf der Bühne und in Momenten, die wir miteinander teilen.','My mother says I sang before I spoke. My voice is part of my story. In songs, on stage and in moments we share.')}</p>${a(t('Meine Musik entdecken','Discover my music'),'/music/','button')}${homePlayer()}</div></section>
      ${homeSocial()}${banner()}
    `);
  }else{
    $('.invitation').remove();
    const offering=[...site.retreats,...site.courses].find(r=>route===`/${r.slug}/`);
    if(offering){
      const ids=content.retreatMedia[offering.slug];
      $('.page-intro figure').html(image(ids[0],{eager:true}));
      $('.detail-gallery').replaceWith(gallery(ids,t('Ein Gefühl für diese Zeit.','A feeling for this time.'),t('Fotografische Einblicke in das Format und bisherige Erfahrungen.','Photographic glimpses of the format and past experiences.')));
      const course=site.courses.some(c=>c.slug===offering.slug);
      $('.story-section .button').attr('href',enquiry(offering.title,course?'course':'retreat')).text(t(course?'Kurszugang anfragen':'Für neue Termine vormerken lassen',course?'Enquire about course access':'Ask about the next dates')).append(arrow);
      $('.related-section').before(quoteSection(course?'course':'retreat'));
      $('main').append(banner(offering.title,course?'course':'retreat'));
    }else if(route==='/about/'){
      // Elena 2026-10-28: eigenes Foto oben, weil das bisherige Porträt schon auf der Startseite steht.
      const header=JSON.parse(fs.readFileSync(new URL('../content/about-photos.json',import.meta.url),'utf8')).photos.find(p=>p.role==='header');
      $('.page-intro figure').html(image(header.id,{eager:true,alt:header.alt[en?'en':'de']}));
      $('.page-intro>div>p:not(.eyebrow)').text(introduction);
      $('.wide-photo').replaceWith(gallery(['v2-garden','v2-portrait','elena-studio','v2-concert'],t('Viele Seiten. Eine Geschichte.','Many sides. One story.')));
      $('main').append(quoteSection(),social(),banner());
    }else if(route==='/11-sessions/'||route==='/astrologie-human-design/'){
      $('.page-intro figure').html(image('v2-portrait',{eager:true}));
      $('.testimonials').replaceWith(quoteSection('reading'));
      $('.related-section').after(`<section class="v2-photography-note shell"><div>${eyebrow(t('AUCH EINE FORM VON BEGEGNUNG','ANOTHER WAY TO CONNECT'))}<h2>${t('Vor der <em>Kamera.</em>','In front of<br>the <em>camera.</em>')}</h2></div><div><p>${t('Ich biete Fotoshootings dort an, wo ich gerade bin. Schreib mir, wenn du dir eine gemeinsame Session vorstellen kannst.','I offer photo sessions wherever I am currently based. Get in touch if you would like to explore a session together.')}</p>${a(t('Mehr zur Fotografie','Explore photography'),'/photography/')}</div></section>`);
      $('main').append(banner('Reading'));
    }else if(route==='/services/'){
      $('.memories-section').replaceWith(gallery(['v2-rocks','v2-place','v2-soul','v2-guitar'],t('Orte. Menschen. Erinnerungen.','Places. People. Memories.'),t('Diese Bilder zeigen vergangene Erfahrungen. Neue Termine teile ich mit dir, sobald sie feststehen.','These photographs show past experiences. I’ll share new dates when they are confirmed.')));
      $('.v2-gallery').attr('id','einblicke');
      $('.page-intro').after(`<div class="shell v2-date-note">${eyebrow(t('DIE NÄCHSTE BEGEGNUNG','OUR NEXT ENCOUNTER'))}<p>${t('Welches Format spricht dich an? Melde dein Interesse an und frage nach den nächsten Terminen.','Which format speaks to you? Express your interest and ask about the next dates.')}</p>${a(t('Interesse an einem Retreat','Enquire about a retreat'),enquiry('','retreat'))}</div>`);
      $('main').append(quoteSection('retreat'),banner('','retreat'));
    }else if(route==='/yoga-nidra/'){
      $('.page-intro figure').html(image('v2-forest',{eager:true}));
      $('.wide-photo').replaceWith(gallery(['v2-forest','web-02','web-05'],t('Raum für Ruhe.','Room for stillness.')));
      $('main').append(banner('Yoga Nidra'));
    }else if(route==='/kambo/'){
      $('main').append(gallery(['v2-stilllife','web-15'],t('Einblicke in die Arbeit.','Glimpses of the work.')),banner('Kambo'));
    }else if(route==='/my-art/'){
      $('.page-intro figure').html(image('v2-concert',{eager:true}));
      $('.art-row').first().find('figure').html(image('v2-guitar'));
      $('.art-row').first().find('div').append(a(t('Zur Musikseite','Explore the music page'),'/music/'));
      $('.art-row.reverse').attr('id','clothing');
      $('main').append(gallery(['web-46','v2-artwork'],t('Formen. Farben. Ausdruck.','Form. Colour. Expression.')),social(),banner());
    }else if(route==='/music/'){
      $('title').text(t('Musik · Elena Judith','Music · Elena Judith'));
      $('meta[name=description]').attr('content',t('Lieder, Stimme und gemeinsame Momente. Entdecke die Musik von Elena Judith.','Songs, voice and shared moments. Discover the music of Elena Judith.'));
      $('main').html(`<section class="page-intro with-image shell"><div>${eyebrow(t('STIMME · SAITEN · BEGEGNUNG','VOICE · STRINGS · CONNECTION'))}<h1>${t('Was in mir<br><em>klingt.</em>','What comes<br><em>alive in me.</em>')}</h1><p>${t('Musik gibt dem einen Ausdruck, wofür Worte allein manchmal nicht reichen. Ich singe, schreibe und teile meine Lieder mit dir.','Music expresses what words alone sometimes cannot. I sing, write and share my songs with you.')}</p></div><figure>${image('v2-concert',{eager:true})}</figure></section><section class="v2-music-links shell"><div>${eyebrow(t('HÖR EIN WENIG REIN','TAKE A MOMENT TO LISTEN'))}<h2>${t('Ein Lied.<br>Ein <em>Moment.</em>','A song.<br>A <em>moment.</em>')}</h2></div><div><a class="v2-listen" href="${site.social.soundcloud}/cambia" target="_blank" rel="noopener noreferrer"><span class="v2-play" aria-hidden="true">▷</span><span>Cambia<small>ELENA JUDITH · SOUNDCLOUD</small></span>${arrow}</a>${a(t('Alle Aufnahmen auf SoundCloud','All recordings on SoundCloud'),site.social.soundcloud)}${a(t('Videos auf YouTube','Videos on YouTube'),site.social.youtube)}<p class="v2-external-note">${t('Die Aufnahmen und Videos öffnen sich auf der jeweiligen Plattform.','Recordings and videos open on their respective platforms.')}</p></div></section>${gallery(['v2-concert','v2-guitar','web-03','web-27'],t('Musik in Bildern.','Music in photographs.'))}<section class="v2-date-note shell"><div>${eyebrow(t('LIVE & IM AUSTAUSCH','LIVE & IN CONVERSATION'))}<h2>${t('Eine Einladung<br>zur <em>Begegnung.</em>','An invitation<br>to <em>connect.</em>')}</h2></div><p>${t('Für Konzertanfragen und musikalische Zusammenarbeit kannst du mir direkt schreiben. Neuigkeiten teile ich auch auf Instagram.','For concert enquiries and musical collaborations, you can write to me directly. I also share updates on Instagram.')}</p>${a(t('Eine musikalische Begegnung anfragen','Enquire about a musical collaboration'),enquiry('Musik'),'button')}</section>${social()}${banner('Musik')}`);
    }else if(route==='/photography/'){
      $('title').text(t('Fotoshootings · Elena Judith','Photo shoots · Elena Judith'));
      $('meta[name=description]').attr('content',t('Persönliche Fotoshootings mit Elena Judith, dort, wo sie gerade ist.','Personal photo sessions with Elena Judith, wherever she is currently based.'));
      $('main').html(`<section class="v2-photo-intro shell">${eyebrow(t('FOTOGRAFIE / PERSÖNLICHE SESSIONS','PHOTOGRAPHY / PERSONAL SESSIONS'))}<h1>${t('Raum, dich<br>zu <em>zeigen.</em>','Space to<br>be <em>seen.</em>')}</h1><p>${t('Ich biete Fotoshootings dort an, wo ich gerade bin. Für einen Termin, den aktuellen Ort und weitere Informationen schreib mir gerne.','I offer photo sessions wherever I am currently based. Write to me for availability, my current location and more information.')}</p>${a(t('Eine Fotosession anfragen','Enquire about a photo session'),enquiry('Fotografie'),'button')}</section><section class="v2-photography-note shell"><div>${eyebrow(t('EIN PERSÖNLICHER ANFANG','A PERSONAL BEGINNING'))}<h2>${t('Was möchtest<br>du <em>festhalten?</em>','What would you<br>like to <em>capture?</em>')}</h2></div><p>${t('Erzähl mir von deiner Idee und davon, wo du dir die Session vorstellst. Gemeinsam können wir besprechen, ob Ort und Zeitpunkt passen.','Tell me about your idea and where you imagine the session taking place. Together we can discuss whether the location and timing work.')}</p></section>${banner('Fotografie')}`);
    }else if(route==='/contact/'){
      $('.contact-copy>p:not(.eyebrow)').text(t('Eine Frage, ein Wunsch, eine Idee. Erzähl mir, was dich bewegt — per E-Mail oder WhatsApp.','A question, a wish, an idea. Tell me what’s on your mind — by email or WhatsApp.'));
      $('#contact-form').prepend(`<div class="v2-form-intro">${eyebrow(t('DEINE ANFRAGE','YOUR ENQUIRY'))}<p>${t('Wähle ein Thema und bereite deine Nachricht vor.','Choose a topic and prepare your message.')}</p></div><label for="request-intent">${t('Was möchtest du anfragen?','What would you like to enquire about?')}</label><select id="request-intent" name="intent"><option value="session">${t('Persönliche Anfrage','Personal enquiry')}</option><option value="retreat">${t('Interesse an neuen Retreat-Terminen','Interest in upcoming retreat dates')}</option><option value="course">${t('Kurszugang & Kaufanfrage','Course access & purchase enquiry')}</option></select>`);
      $('#topic').append(`<option value="Fotografie">${t('Fotoshootings','Photo shoots')}</option><option value="Musik">${t('Musik','Music')}</option>`);
      $('#contact-form').append(`<a class="text-link v2-whatsapp-compose" data-whatsapp-compose href="${site.whatsapp}" target="_blank" rel="noopener noreferrer">${t('Nachricht in WhatsApp öffnen','Open message in WhatsApp')}${arrow}</a><p class="form-note">${t('Eine Anfrage ist noch keine Buchung, Zahlung oder Eintragung in eine Warteliste. Elena bestätigt die nächsten Schritte persönlich.','An enquiry is not a booking, payment or waiting-list registration. Elena will confirm the next steps personally.')}</p>`);
      $('main').append(social());
    }else if(route!=='/impressum/'){
      $('main').append(banner());
    }
  }

  if(route==='/music/')$('.v2-music-links .v2-listen').after(player());
  if(route==='/contact/')$('.social-editorial').append(player());
  // Curate the images used by cards wherever they occur.
  $('.retreat-card').each((_,el)=>{
    const href=$(el).find('.card-image').attr('href')||'';
    const slug=href.replace(/^\/en/,'').replaceAll('/','');
    const ids=content.retreatMedia[slug];
    if(ids)$(el).find('.card-image img').replaceWith(image(ids[0]));
  });
  // The updated display name retains the existing route and enquiry topic value.
  if(route==='/schamanisches-retreat/')$('title').text(`${renamed} · Elena Judith`);
  $('h1,h3 a,.breadcrumb span,option').each((_,el)=>{
    const old=en?'Shamanic Retreat':'Schamanisches Retreat';
    const node=$(el);
    if(node.is('option')){if(node.attr('value')==='Schamanisches Retreat')node.text(renamed);return;}
    node.contents().each((_,child)=>{if(child.type==='text'&&child.data.includes(old))child.data=child.data.replaceAll(old,renamed);});
  });
  $('[aria-label]').each((_,el)=>{
    const value=$(el).attr('aria-label');
    $(el).attr('aria-label',value.replaceAll('Schamanisches Retreat',renamed).replaceAll('Shamanic Retreat',renamed));
  });

  // Resolve both reused localized links and new links into this draft.
  $('a[href],link[rel=alternate]').each((_,el)=>{
    const href=$(el).attr('href');
    if(!href?.startsWith('/')||href.startsWith('//'))return;
    if($(el).is('.language-switch a,link[rel=alternate]')){
      const language=$(el).attr('hreflang');
      $(el).attr('href',`${language==='en'?'/en':''}/draft-2${route}`);
    }else $(el).attr('href',prefix+href.replace(/^\/en(?=\/)/,''));
  });
  $('a[href^="https://"]').attr('target','_blank').attr('rel','noopener noreferrer');
  $('.nav-label>a').each((_,el)=>{
    if($(el).attr('href')===prefix+route)$(el).attr('aria-current','page');
    else $(el).removeAttr('aria-current');
  });
  $('.site-footer .wordmark span').text(t('KUNST · BEGEGNUNG · BEGLEITUNG','ART · CONNECTION · GUIDANCE'));
  return $.html();
}
