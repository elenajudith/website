// Source-derived motion mappings are documented in content/effects.json.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const nav = document.querySelector('#navigation');
const menu = document.querySelector('.menu-toggle');
const toggles = [...document.querySelectorAll('.submenu-toggle')];
function closeSubmenus(except) {
  toggles.forEach(button => { if(button === except) return; button.setAttribute('aria-expanded','false'); document.getElementById(button.getAttribute('aria-controls')).hidden=true; });
}
menu?.addEventListener('click',()=>{
  const expanded=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(expanded));menu.setAttribute('aria-label',expanded?menu.dataset.labelClose:menu.dataset.labelOpen);nav.classList.toggle('is-open',expanded);if(!expanded)closeSubmenus();
});
toggles.forEach(button=>button.addEventListener('click',()=>{
  const expanded=button.getAttribute('aria-expanded')!=='true';closeSubmenus(button);button.setAttribute('aria-expanded',String(expanded));document.getElementById(button.getAttribute('aria-controls')).hidden=!expanded;
}));
document.addEventListener('click',event=>{if(!event.target.closest('.nav-item'))closeSubmenus();});
document.addEventListener('keydown',event=>{
  if(event.key!=='Escape')return;
  const open=toggles.find(b=>b.getAttribute('aria-expanded')==='true');
  if(open){closeSubmenus();open.focus();}else if(menu?.getAttribute('aria-expanded')==='true'){menu.click();menu.focus();}
});
nav?.addEventListener('click',event=>{if(event.target.closest('a') && menu.getAttribute('aria-expanded')==='true')menu.click();});
window.matchMedia('(min-width: 1151px)').addEventListener('change',e=>{if(e.matches){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label',menu.dataset.labelOpen);closeSubmenus();}});
// Visible by default; a failed or disabled script never hides page content.
if(!reducedMotion.matches && 'IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  entry.target.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:450,easing:'ease',fill:'none'});observer.unobserve(entry.target);
 }),{threshold:.12});
 document.querySelectorAll('[data-effect="source-reveal"]').forEach(el=>observer.observe(el));
 reducedMotion.addEventListener('change',event=>{if(event.matches){observer.disconnect();document.getAnimations().forEach(a=>a.finish());}});
}
// Crossfade the whole testimonial so each portrait stays with its own name and quote.
const testimonialSection=document.querySelector('.testimonials');
if(testimonialSection){
 const stage=testimonialSection.querySelector('.quote-stage');
 const quotes=[...stage.querySelectorAll('.quote')];
 const playback=testimonialSection.querySelector('[data-quote-playback]');
 const counter=testimonialSection.querySelector('[data-quote-counter]');
 let index=0,timer=null,inView=false,hovered=false,focused=false,touching=false,expanded=false;
 let paused=reducedMotion.matches||testimonialSection.classList.contains('full-testimonials');
 const interval=9000;
 stage.classList.add('is-enhanced');
 quotes.forEach((quote,i)=>{
  quote.hidden=false;quote.classList.toggle('is-active',i===0);
  quote.setAttribute('aria-hidden',String(i!==0));quote.inert=i!==0;
 });
 testimonialSection.querySelector('.quote-controls').hidden=quotes.length<2;
 function canRotate(){return quotes.length>1&&!paused&&!reducedMotion.matches&&inView&&!hovered&&!focused&&!touching&&!expanded&&!document.hidden;}
 // Elena 2026-10-28 (B-11): Auf der Startseite liegen alle Karten in derselben Grid-Zelle, dadurch sind sie automatisch gleich hoch und die Seite springt beim Wechsel nicht.
 const equalHeights=testimonialSection.classList.contains('home-testimonials');
 function stageHeight(){return equalHeights?0:quotes[index].offsetHeight;}
 function schedule(){
  clearTimeout(timer);timer=null;
  stage.setAttribute('aria-live',canRotate()?'off':'polite');
  playback.textContent=paused?playback.dataset.textPlay:playback.dataset.textPause;
  playback.setAttribute('aria-label',paused?playback.dataset.labelPlay:playback.dataset.labelPause);
  playback.hidden=reducedMotion.matches;
  if(canRotate())timer=setTimeout(()=>show(index+1),interval);
 }
 function show(next){
  index=(next+quotes.length)%quotes.length;
  quotes.forEach((quote,i)=>{quote.classList.toggle('is-active',i===index);quote.setAttribute('aria-hidden',String(i!==index));quote.inert=i!==index;});
  counter.textContent=`${String(index+1).padStart(2,'0')} / ${String(quotes.length).padStart(2,'0')}`;
  collapseAll();
  stage.style.minHeight=stageHeight()+'px';
  schedule();
 }
 // „Weiterlesen“: langer Text klappt in der Karte auf; solange er offen ist, hält das Karussell an.
 function collapseAll(){
  testimonialSection.querySelectorAll('.quote-more[aria-expanded="true"]').forEach(button=>toggleMore(button,false));
 }
 function toggleMore(button,open){
  const quote=button.closest('.quote');
  quote.querySelector('.quote-excerpt').hidden=open;quote.querySelector('.quote-full').hidden=!open;
  button.setAttribute('aria-expanded',String(open));button.textContent=open?button.dataset.textLess:button.dataset.textMore;
  expanded=!!testimonialSection.querySelector('.quote-more[aria-expanded="true"]');
  stage.style.minHeight=stageHeight()+'px';schedule();
 }
 testimonialSection.querySelectorAll('.quote-more').forEach(button=>button.addEventListener('click',()=>toggleMore(button,button.getAttribute('aria-expanded')!=='true')));
 // Touch: anhalten, solange der Finger auf der Karte liegt; Wischen blättert.
 let startX=null;
 stage.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse')return;touching=true;startX=event.clientX;schedule();});
 const release=event=>{if(event.pointerType==='mouse'||startX===null)return;const dx=event.clientX-startX;startX=null;touching=false;if(Math.abs(dx)>50)show(index+(dx<0?1:-1));else schedule();};
 stage.addEventListener('pointerup',release);stage.addEventListener('pointercancel',release);
 new ResizeObserver(()=>{stage.style.minHeight=stageHeight()+'px';}).observe(stage);
 testimonialSection.querySelector('[data-quote-prev]').addEventListener('click',()=>show(index-1));
 testimonialSection.querySelector('[data-quote-next]').addEventListener('click',()=>show(index+1));
 playback.addEventListener('click',()=>{paused=!paused;schedule();});
 stage.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){hovered=true;schedule();}});
 stage.addEventListener('pointerleave',()=>{hovered=false;schedule();});
 testimonialSection.addEventListener('focusin',()=>{focused=true;schedule();});
 testimonialSection.addEventListener('focusout',event=>{focused=testimonialSection.contains(event.relatedTarget);schedule();});
 document.addEventListener('visibilitychange',schedule);
 reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)paused=true;schedule();});
 if('IntersectionObserver' in window){
  new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;schedule();},{threshold:.2}).observe(testimonialSection);
 }else{inView=true;}
 schedule();
}
const form=document.querySelector('#contact-form');
if(form){
 const params=new URLSearchParams(location.search);
 const requested=params.get('thema'),topic=form.elements.thema,intent=form.elements.intent;
 if([...topic.options].some(o=>o.value===requested))topic.value=requested;
 if(intent&&[...intent.options].some(o=>o.value===params.get('intent')))intent.value=params.get('intent');
 const subject=()=>`${form.dataset.subjectPrefix}: ${topic.selectedOptions[0].textContent}`;
 const body=()=>`${intent?intent.selectedOptions[0].textContent+'\n\n':''}${form.elements.nachricht.value}`;
 const whatsapp=form.querySelector('[data-whatsapp-compose]');
 const updateWhatsapp=()=>{if(whatsapp)whatsapp.href=`https://wa.me/4917697672396?text=${encodeURIComponent(subject()+'\n\n'+body())}`;};
 form.addEventListener('input',updateWhatsapp);form.addEventListener('change',updateWhatsapp);updateWhatsapp();
 whatsapp?.addEventListener('click',event=>{if(!form.reportValidity())event.preventDefault();});
 form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;location.href=`mailto:elena.fritsch1991@googlemail.com?subject=${encodeURIComponent(subject())}&body=${encodeURIComponent(body())}`;});
}

// Galleries remain horizontally scrollable without JavaScript; buttons add precise navigation.
document.querySelectorAll('[data-gallery]').forEach(gallery=>{
 const track=gallery.querySelector('.gallery-track'),slides=[...track.children];
 const prev=gallery.querySelector('[data-gallery-prev]'),next=gallery.querySelector('[data-gallery-next]');
 const counter=gallery.querySelector('[data-gallery-count]');
 gallery.querySelector('.gallery-controls').hidden=slides.length<2;
 let index=0,frame=null;
 function update(){
  const left=track.getBoundingClientRect().left;
  index=slides.reduce((best,slide,i)=>Math.abs(slide.getBoundingClientRect().left-left)<Math.abs(slides[best].getBoundingClientRect().left-left)?i:best,0);
  prev.disabled=track.scrollLeft<2;
  next.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-2;
  counter.textContent=`${String(index+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
 }
 function move(direction){
  const slide=slides[Math.max(0,Math.min(slides.length-1,index+direction))];
  track.scrollTo({left:track.scrollLeft+slide.getBoundingClientRect().left-track.getBoundingClientRect().left,behavior:reducedMotion.matches?'instant':'smooth'});
 }
 prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
 track.addEventListener('keydown',event=>{if(event.target===track&&['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();move(event.key==='ArrowLeft'?-1:1);}});
 track.addEventListener('scroll',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(update);},{passive:true});
 new ResizeObserver(update).observe(track);update();
 // Elena 2026-10-28: Das Karussell auf „Über mich“ läuft langsam von selbst und hält an bei Maus darüber, Berührung, Tastaturfokus oder „Bewegung reduzieren“.
 if(!gallery.hasAttribute('data-autoplay'))return;
 const playback=gallery.querySelector('[data-gallery-playback]');
 let paused=reducedMotion.matches,hovered=false,focused=false,touching=false,inView=false,timer=null;
 const canRotate=()=>slides.length>1&&!paused&&!hovered&&!focused&&!touching&&inView&&!document.hidden&&!reducedMotion.matches;
 function schedule(){
  clearTimeout(timer);timer=null;
  playback.textContent=paused?playback.dataset.textPlay:playback.dataset.textPause;
  playback.setAttribute('aria-label',paused?playback.dataset.labelPlay:playback.dataset.labelPause);
  playback.hidden=reducedMotion.matches;
  if(canRotate())timer=setTimeout(advance,4500);
 }
 function advance(){
  if(next.disabled)track.scrollTo({left:0,behavior:'smooth'});else move(1);
  schedule();
 }
 playback.addEventListener('click',()=>{paused=!paused;schedule();});
 track.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hovered=true;schedule();}});
 track.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'){hovered=false;schedule();}});
 track.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'){touching=true;schedule();}});
 const release=e=>{if(e.pointerType!=='mouse'){setTimeout(()=>{touching=false;schedule();},3000);}};
 track.addEventListener('pointerup',release);track.addEventListener('pointercancel',release);
 track.addEventListener('focus',()=>{focused=true;schedule();});
 track.addEventListener('blur',()=>{focused=false;schedule();});
 document.addEventListener('visibilitychange',schedule);
 reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)paused=true;schedule();});
 if('IntersectionObserver' in window)new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;schedule();},{threshold:.3}).observe(gallery);else inView=true;
 schedule();
});

// No external player request until a visitor chooses to load it. Never autoplay.
document.querySelectorAll('[data-soundcloud]').forEach(button=>button.addEventListener('click',()=>{
 const frame=document.createElement('iframe');
 frame.src=button.dataset.soundcloud;frame.title=button.dataset.playerTitle;
 frame.width='100%';frame.height='166';frame.setAttribute('scrolling','no');
 frame.className='soundcloud-frame';
 frame.addEventListener('load',()=>frame.focus({preventScroll:true}),{once:true});
 button.replaceWith(frame);
}));

// Keep stable section anchors and enquiry topics when switching languages.
document.querySelectorAll('[data-language-link]').forEach(link=>{
 const target=new URL(link.href);target.search=location.search;target.hash=location.hash;link.href=target.href;
});

// Elena 2026-10-29: Anfrageformular für 1:1 Sitzungen. Bereitet E-Mail oder WhatsApp-Nachricht vor; es wird nichts automatisch gesendet.
const sessionForm=document.querySelector('#session-form');
if(sessionForm){
 const f=sessionForm.elements,wa=sessionForm.querySelector('[data-session-whatsapp]');
 const label=name=>sessionForm.querySelector(`label[for="${f[name].id}"]`)?.textContent||name;
 const message=()=>['name','reading','mode','birthdate','birthtime','birthplace','dates','message'].filter(n=>f[n]&&f[n].type!=='hidden'&&f[n].value.trim()).map(n=>`${label(n)}: ${f[n].value.trim()}`).join('\n');
 const update=()=>{wa.href=`${sessionForm.dataset.whatsapp}?text=${encodeURIComponent(sessionForm.dataset.subject+'\n\n'+message())}`;};
 sessionForm.addEventListener('input',update);sessionForm.addEventListener('change',update);update();
 const valid=()=>{if(!f.name.value.trim()){f.name.focus();f.name.setAttribute('aria-invalid','true');return false;}f.name.removeAttribute('aria-invalid');return true;};
 wa.addEventListener('click',e=>{if(!valid())e.preventDefault();});
 sessionForm.addEventListener('submit',e=>{e.preventDefault();if(!valid())return;location.href=`mailto:${sessionForm.dataset.email}?subject=${encodeURIComponent(sessionForm.dataset.subject+': '+f.reading.value)}&body=${encodeURIComponent(message())}`;});
 document.querySelectorAll('[data-choose-reading]').forEach(a=>a.addEventListener('click',()=>{f.reading.value=a.dataset.chooseReading;update();}));
}
