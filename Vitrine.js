<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Empire Design — Agence Digitale</title>
</head>
<body>
<canvas id="bg"></canvas>
<script>
// ============================================================
// EMPIRE DESIGN — 100% JAVASCRIPT PUR
// Sangmélima, Cameroun | WhatsApp: +237 694 786 774
// ============================================================

var WA = '237694786774';

// ===== UTILS =====
function wa(msg){ window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(msg||'Bonjour Empire Design ! Je suis intéressé par vos services, puis-je en savoir plus ?'),'_blank'); }
function el(tag,props,children){
  var e=document.createElement(tag);
  if(props) Object.keys(props).forEach(function(k){
    if(k==='style'&&typeof props[k]==='object') Object.assign(e.style,props[k]);
    else if(k==='html') e.innerHTML=props[k];
    else if(k.startsWith('on')) e.addEventListener(k.slice(2),props[k]);
    else e.setAttribute(k,props[k]);
  });
  if(children) [].concat(children).forEach(function(c){ if(c) e.appendChild(typeof c==='string'?document.createTextNode(c):c); });
  return e;
}
function css(rules){ var s=document.createElement('style'); s.textContent=rules; document.head.appendChild(s); }
function $(sel){ return document.querySelector(sel); }

// ===== THEME TOKENS =====
var T = {
  black:'#080800', dark:'#0f0f00', dark2:'#1a1a00', dark3:'#222210',
  gold:'#D4A017', gold2:'#F5C842', gold3:'#B8860B',
  white:'#FFFFFF', white2:'#E8E8D0', white3:'#A09870',
  green:'#10B981', red:'#EF4444', wa:'#25D366',
  grad:'linear-gradient(135deg,#D4A017,#F5C842,#B8860B)',
  r:'10px', r2:'16px'
};

// ===== GLOBAL CSS =====
css(`
@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Nunito:wght@400;600;700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Nunito',sans-serif;background:${T.black};color:${T.white};overflow-x:hidden;line-height:1.6;cursor:none}
a{text-decoration:none;color:inherit}
::-webkit-scrollbar{width:6px}
::-webkit-scrollbar-track{background:${T.dark}}
::-webkit-scrollbar-thumb{background:${T.gold};border-radius:3px}
#bg{position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none}
.site{position:relative;z-index:2}
.cursor-dot{width:10px;height:10px;background:${T.gold};border-radius:50%;position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:transform .1s}
.cursor-ring{width:34px;height:34px;border:1.5px solid rgba(212,160,23,.55);border-radius:50%;position:fixed;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:all .12s ease}
section{padding:100px 5%}
.reveal{opacity:0;transform:translateY(28px);transition:opacity .6s ease,transform .6s ease}
.reveal.vis{opacity:1;transform:translateY(0)}
.r1{transition-delay:.1s}.r2{transition-delay:.2s}.r3{transition-delay:.3s}
@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes waRing{0%{transform:scale(.9);opacity:1}100%{transform:scale(1.35);opacity:0}}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes gradAnim{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@media(max-width:768px){
  .nav-links-wrap{display:none!important}
  .hamburger{display:flex!important}
  .mob-menu.open{display:block!important}
  .contact-grid{grid-template-columns:1fr!important}
  .footer-grid{grid-template-columns:1fr 1fr!important}
  .form-row{grid-template-columns:1fr!important}
  section{padding:70px 5%}
}
@media(max-width:480px){
  .services-grid{grid-template-columns:1fr!important}
  .portfolio-grid{grid-template-columns:1fr!important}
  .pricing-grid{grid-template-columns:1fr!important}
  .process-steps{grid-template-columns:1fr 1fr!important}
  .footer-grid{grid-template-columns:1fr!important}
}
`);

// ===== CURSOR =====
var dot = el('div',{class:'cursor-dot'});
var ring = el('div',{class:'cursor-ring'});
document.body.appendChild(dot);
document.body.appendChild(ring);
var mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',function(e){
  mx=e.clientX; my=e.clientY;
  dot.style.left=mx+'px'; dot.style.top=my+'px';
});
(function animRing(){
  rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(animRing);
})();
document.addEventListener('mouseover',function(e){
  if(e.target.closest('button,a,.scard,.pcard,.pricing-card')){
    ring.style.transform='translate(-50%,-50%) scale(1.6)';
    ring.style.borderColor='rgba(212,160,23,.85)';
  } else {
    ring.style.transform='translate(-50%,-50%) scale(1)';
    ring.style.borderColor='rgba(212,160,23,.55)';
  }
});

// ===== CANVAS PARTICLES =====
(function(){
  var c=document.getElementById('bg');
  var ctx=c.getContext('2d');
  var W,H,pts=[];
  function resize(){ W=c.width=innerWidth; H=c.height=innerHeight; }
  resize(); window.addEventListener('resize',resize);
  for(var i=0;i<80;i++) pts.push({
    x:Math.random()*innerWidth, y:Math.random()*innerHeight,
    vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3,
    r:Math.random()*1.4+.5, a:Math.random()*.5+.1
  });
  function draw(){
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<pts.length;i++){
      var p=pts[i];
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>W) p.vx*=-1;
      if(p.y<0||p.y>H) p.vy*=-1;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle='rgba(212,160,23,'+p.a+')'; ctx.fill();
      for(var j=i+1;j<pts.length;j++){
        var q=pts[j], dx=p.x-q.x, dy=p.y-q.y, d=Math.sqrt(dx*dx+dy*dy);
        if(d<110){
          ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y);
          ctx.strokeStyle='rgba(212,160,23,'+(0.1*(1-d/110))+')';
          ctx.lineWidth=.5; ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ===== SITE WRAPPER =====
var site = el('div',{class:'site'});
document.body.appendChild(site);

// ===== HELPERS =====
function gradText(text){
  var s=document.createElement('span');
  s.textContent=text;
  Object.assign(s.style,{background:T.grad,WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'});
  return s;
}
function btn(label,onClick,style){
  var b=el('button',{onclick:onClick});
  b.innerHTML=label;
  Object.assign(b.style,{
    padding:'13px 28px', borderRadius:T.r, border:'none',
    background:T.grad, color:T.black, fontFamily:"'Nunito',sans-serif",
    fontSize:'15px', fontWeight:'700', cursor:'pointer',
    transition:'all .2s', display:'inline-flex', alignItems:'center', gap:'8px',
    letterSpacing:'.3px'
  }, style||{});
  b.addEventListener('mouseenter',function(){ this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 28px rgba(212,160,23,.35)'; });
  b.addEventListener('mouseleave',function(){ this.style.transform=''; this.style.boxShadow=''; });
  return b;
}
function outlineBtn(label,onClick){
  var b=el('button',{onclick:onClick});
  b.innerHTML=label;
  Object.assign(b.style,{
    padding:'13px 28px', borderRadius:T.r, border:'1.5px solid rgba(255,255,255,.22)',
    background:'transparent', color:T.white, fontFamily:"'Nunito',sans-serif",
    fontSize:'15px', fontWeight:'700', cursor:'pointer', transition:'all .2s'
  });
  b.addEventListener('mouseenter',function(){ this.style.borderColor='rgba(212,160,23,.6)'; this.style.background='rgba(212,160,23,.08)'; this.style.transform='translateY(-2px)'; });
  b.addEventListener('mouseleave',function(){ this.style.borderColor='rgba(255,255,255,.22)'; this.style.background='transparent'; this.style.transform=''; });
  return b;
}
function sectionTag(text){
  var t=el('div');
  t.textContent=text;
  Object.assign(t.style,{
    display:'inline-block', fontSize:'12px', fontWeight:'700', letterSpacing:'2px',
    textTransform:'uppercase', color:T.gold, background:'rgba(212,160,23,.1)',
    border:'1px solid rgba(212,160,23,.25)', padding:'5px 14px', borderRadius:'20px', marginBottom:'1rem'
  });
  return t;
}
function card(style){
  var c=el('div');
  Object.assign(c.style,{
    background:T.dark2, border:'1px solid rgba(255,255,255,.07)',
    borderRadius:T.r2, padding:'2rem', transition:'all .3s'
  },style||{});
  c.addEventListener('mouseenter',function(){ this.style.borderColor='rgba(212,160,23,.35)'; this.style.transform='translateY(-4px)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,.3)'; });
  c.addEventListener('mouseleave',function(){ this.style.borderColor='rgba(255,255,255,.07)'; this.style.transform=''; this.style.boxShadow=''; });
  return c;
}
function input(type,id,placeholder){
  var i=type==='textarea'?document.createElement('textarea'):el('input',{type:type||'text'});
  i.id=id; i.placeholder=placeholder;
  Object.assign(i.style,{
    background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.1)',
    borderRadius:T.r, padding:'11px 14px', fontFamily:"'Nunito',sans-serif",
    fontSize:'14px', color:T.white, width:'100%', outline:'none',
    transition:'border-color .2s'
  });
  if(type==='textarea'){ i.style.height='100px'; i.style.resize='vertical'; i.style.lineHeight='1.5'; }
  i.addEventListener('focus',function(){ this.style.borderColor='rgba(212,160,23,.5)'; this.style.boxShadow='0 0 0 3px rgba(212,160,23,.1)'; });
  i.addEventListener('blur',function(){ this.style.borderColor='rgba(255,255,255,.1)'; this.style.boxShadow=''; });
  return i;
}
function select(id,options){
  var s=document.createElement('select');
  s.id=id;
  Object.assign(s.style,{
    background:T.dark3, border:'1px solid rgba(255,255,255,.1)',
    borderRadius:T.r, padding:'11px 14px', fontFamily:"'Nunito',sans-serif",
    fontSize:'14px', color:T.white, width:'100%', outline:'none', transition:'border-color .2s'
  });
  [['','— Choisissez un service —']].concat(options).forEach(function(o){
    var opt=el('option',{value:o[0]});
    opt.textContent=o[1]; opt.style.background=T.dark3;
    s.appendChild(opt);
  });
  s.addEventListener('focus',function(){ this.style.borderColor='rgba(212,160,23,.5)'; });
  s.addEventListener('blur',function(){ this.style.borderColor='rgba(255,255,255,.1)'; });
  return s;
}
function label(text){
  var l=el('label');
  l.textContent=text;
  Object.assign(l.style,{fontSize:'13px',fontWeight:'600',color:T.white2});
  return l;
}

// ===== NAVBAR =====
(function buildNav(){
  var nav=el('nav');
  Object.assign(nav.style,{
    position:'fixed', top:'0', left:'0', right:'0', zIndex:'100',
    padding:'0 5%', height:'70px', display:'flex', alignItems:'center',
    justifyContent:'space-between', transition:'all .3s',
    borderBottom:'1px solid transparent'
  });

  // Logo
  var logoWrap=el('div',{style:{display:'flex',alignItems:'center',gap:'10px',cursor:'pointer'}},
    [el('div',{style:{width:'36px',height:'36px',borderRadius:'8px',background:T.grad,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px',color:T.black,fontWeight:'900'}},['E']),
     el('span',{style:{background:T.grad,WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent',fontSize:'20px',fontWeight:'700',letterSpacing:'-.5px'}},['Empire Design'])]
  );
  logoWrap.onclick=function(){ window.scrollTo({top:0,behavior:'smooth'}); };

  // Links
  var links=[['#services','Services'],['#processus','Processus'],['#portfolio','Portfolio'],['#tarifs','Tarifs'],['#contact','Contact']];
  var linksWrap=el('ul',{class:'nav-links-wrap',style:{display:'flex',gap:'28px',alignItems:'center',listStyle:'none'}});
  links.forEach(function(l){
    var a=el('a',{href:l[0]},l[1]);
    Object.assign(a.style,{fontSize:'14px',color:T.white2,fontWeight:'600',position:'relative',transition:'color .2s'});
    a.addEventListener('mouseenter',function(){ this.style.color=T.white; });
    a.addEventListener('mouseleave',function(){ this.style.color=T.white2; });
    linksWrap.appendChild(el('li',null,a));
  });

  var ctaBtn=btn('💬 Démarrer un projet',function(){ wa('Bonjour Empire Design ! Je souhaite démarrer un projet avec vous.'); },{
    padding:'9px 18px', fontSize:'13px', borderRadius:T.r
  });

  // Hamburger
  var ham=el('div',{class:'hamburger',style:{display:'none',flexDirection:'column',gap:'5px',cursor:'pointer',padding:'4px'}});
  for(var i=0;i<3;i++){
    var sp=el('span');
    Object.assign(sp.style,{display:'block',width:'22px',height:'2px',background:T.white2,borderRadius:'2px',transition:'all .3s'});
    ham.appendChild(sp);
  }

  nav.appendChild(logoWrap);
  nav.appendChild(linksWrap);
  nav.appendChild(ctaBtn);
  nav.appendChild(ham);
  site.appendChild(nav);

  // Mobile menu
  var mob=el('div',{class:'mob-menu',style:{display:'none',position:'fixed',top:'70px',left:'0',right:'0',background:'rgba(8,8,0,.97)',backdropFilter:'blur(20px)',padding:'1.5rem 5%',borderBottom:'1px solid rgba(212,160,23,.2)',zIndex:'99'}});
  links.forEach(function(l){
    var a=el('a',{href:l[0]},l[1]);
    Object.assign(a.style,{display:'block',padding:'12px 0',fontSize:'15px',color:T.white2,borderBottom:'1px solid rgba(255,255,255,.06)',transition:'color .2s'});
    a.addEventListener('click',function(){ mob.classList.remove('open'); mob.style.display='none'; });
    mob.appendChild(a);
  });
  var waLink=el('a',{href:'#'},['💬 WhatsApp']);
  Object.assign(waLink.style,{display:'block',padding:'12px 0',fontSize:'15px',color:T.wa});
  waLink.onclick=function(e){ e.preventDefault(); wa('Bonjour Empire Design !'); mob.classList.remove('open'); mob.style.display='none'; };
  mob.appendChild(waLink);
  site.appendChild(mob);

  ham.onclick=function(){
    var open=mob.classList.toggle('open');
    mob.style.display=open?'block':'none';
  };

  // Scroll effect
  window.addEventListener('scroll',function(){
    if(window.scrollY>50){
      nav.style.background='rgba(8,8,0,.92)';
      nav.style.backdropFilter='blur(20px)';
      nav.style.borderBottomColor='rgba(212,160,23,.2)';
    } else {
      nav.style.background='';
      nav.style.backdropFilter='';
      nav.style.borderBottomColor='transparent';
    }
  });
})();

// ===== HERO =====
(function buildHero(){
  var hero=el('section',{style:{
    minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
    textAlign:'center', padding:'130px 5% 80px'
  }});

  var badge=el('div');
  badge.innerHTML='<span style="width:7px;height:7px;border-radius:50%;background:'+T.gold+';display:inline-block;animation:blink 2s infinite;margin-right:8px;vertical-align:middle"></span>Agence digitale à Sangmélima, Cameroun';
  Object.assign(badge.style,{
    display:'inline-flex', alignItems:'center', background:'rgba(212,160,23,.1)',
    border:'1px solid rgba(212,160,23,.3)', borderRadius:'30px', padding:'7px 16px',
    fontSize:'13px', color:T.gold2, marginBottom:'1.5rem',
    animation:'fadeUp .6s ease forwards'
  });

  var h1=el('h1');
  h1.style.cssText='font-family:"Bangers",cursive;font-size:clamp(2.8rem,7vw,5.5rem);letter-spacing:-1px;line-height:1.05;margin-bottom:1.5rem;animation:fadeUp .7s .1s ease both';
  h1.appendChild(document.createTextNode('Nous construisons\n'));
  var gradSpan=el('span');
  gradSpan.textContent="l'avenir digital";
  Object.assign(gradSpan.style,{display:'block',background:T.grad,WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'});
  h1.appendChild(gradSpan);

  var p=el('p');
  p.textContent="Empire Design crée des expériences numériques exceptionnelles — sites web, applications, identité visuelle et bien plus. Votre vision, notre expertise.";
  Object.assign(p.style,{fontSize:'clamp(1rem,2vw,1.2rem)',color:T.white2,maxWidth:'580px',margin:'0 auto 2.5rem',lineHeight:'1.7',animation:'fadeUp .7s .2s ease both'});

  var btns=el('div',{style:{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap',animation:'fadeUp .7s .3s ease both'}});
  btns.appendChild(btn('💬 Discutons de votre projet',function(){ wa("Bonjour Empire Design ! Je voudrais discuter d'un projet."); }));
  btns.appendChild(outlineBtn('Voir nos réalisations →',function(){ document.getElementById('portfolio').scrollIntoView({behavior:'smooth'}); }));

  var wrap=el('div');
  [badge,h1,p,btns].forEach(function(c){ wrap.appendChild(c); });

  hero.appendChild(wrap);
  site.appendChild(hero);
})();

// ===== SERVICES =====
(function buildServices(){
  var sec=el('section',{id:'services'});

  var hdr=el('div',{class:'reveal',style:{textAlign:'center',marginBottom:'3.5rem'}});
  hdr.appendChild(sectionTag('Nos services'));
  var h2=el('h2');
  h2.appendChild(document.createTextNode('Ce que nous créons '));
  h2.appendChild(gradText('pour vous'));
  h2.style.cssText='font-family:"Bangers",cursive;font-size:clamp(2rem,4vw,3rem);letter-spacing:.5px;margin-bottom:1rem';
  var sub=el('p',null,'Des solutions numériques sur mesure, conçues pour propulser votre activité');
  Object.assign(sub.style,{fontSize:'16px',color:T.white2,maxWidth:'500px',margin:'0 auto'});
  hdr.appendChild(h2); hdr.appendChild(sub);
  sec.appendChild(hdr);

  var services=[
    {icon:'🌐',title:'Développement Web',desc:'Sites vitrine, e-commerce, plateformes web. Des interfaces modernes, rapides et responsive qui convertissent vos visiteurs en clients.',tag:'HTML · CSS · JavaScript',msg:"Bonjour ! Je suis intéressé par la création d'un site web."},
    {icon:'🖥️',title:'Applications Mobiles',desc:'Applications Android et iOS performantes. Interface intuitive et expérience utilisateur optimisée pour fidéliser vos utilisateurs.',tag:'React Native · Flutter',msg:"Bonjour ! Je suis intéressé par le développement d'une application mobile."},
    {icon:'🎨',title:'Identité Visuelle',desc:'Logo, charte graphique, brand book. Construisons ensemble une identité de marque forte et mémorable qui vous démarque.',tag:'Illustrator · Figma',msg:"Bonjour ! Je suis intéressé par la création d'une identité visuelle."},
    {icon:'🖼️',title:'Design Print & Affiches',desc:'Flyers, affiches, bannières, cartes de visite. Des visuels percutants qui marquent les esprits.',tag:'Photoshop · InDesign',msg:"Bonjour ! Je suis intéressé par la création d'affiches et supports print."},
    {icon:'📊',title:'Marketing Digital',desc:'Stratégie de contenu, gestion des réseaux sociaux, SEO. Augmentez votre visibilité et atteignez votre audience cible.',tag:'SEO · Social Media',msg:"Bonjour ! Je suis intéressé par le marketing digital."},
    {icon:'⚙️',title:'Logiciels sur Mesure',desc:"Systèmes de gestion, CRM, ERP, outils internes. Des solutions adaptées à vos processus métier.",tag:'Node.js · Python · React',msg:"Bonjour ! Je suis intéressé par un logiciel sur mesure."}
  ];

  var grid=el('div',{style:{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'20px'}});
  services.forEach(function(s,i){
    var c=card();
    c.className='scard reveal'+(i%3===1?' r1':i%3===2?' r2':'');
    c.style.cursor='pointer';
    c.onclick=function(){ wa(s.msg); };

    var iconBox=el('div',{html:s.icon});
    Object.assign(iconBox.style,{
      width:'52px',height:'52px',borderRadius:T.r,
      background:'rgba(212,160,23,.12)',border:'1px solid rgba(212,160,23,.2)',
      display:'flex',alignItems:'center',justifyContent:'center',
      fontSize:'24px',marginBottom:'1.2rem',transition:'all .3s'
    });

    var title=el('h3',null,s.title);
    Object.assign(title.style,{fontSize:'18px',fontWeight:'700',marginBottom:'10px'});

    var desc=el('p',null,s.desc);
    Object.assign(desc.style,{fontSize:'14px',color:T.white2,lineHeight:'1.6'});

    var tag=el('span',null,s.tag);
    Object.assign(tag.style,{
      display:'inline-block',marginTop:'14px',fontSize:'12px',color:T.gold,
      background:'rgba(212,160,23,.1)',border:'1px solid rgba(212,160,23,.2)',
      padding:'3px 10px',borderRadius:'20px'
    });

    [iconBox,title,desc,tag].forEach(function(e){ c.appendChild(e); });
    c.addEventListener('mouseenter',function(){ iconBox.style.background='rgba(212,160,23,.25)'; iconBox.style.borderColor='rgba(212,160,23,.5)'; });
    c.addEventListener('mouseleave',function(){ iconBox.style.background='rgba(212,160,23,.12)'; iconBox.style.borderColor='rgba(212,160,23,.2)'; });
    grid.appendChild(c);
  });

  sec.appendChild(grid);
  site.appendChild(sec);
})();

// ===== PROCESSUS =====
(function buildProcess(){
  var sec=el('section',{id:'processus',style:{background:T.dark}});

  var hdr=el('div',{class:'reveal',style:{textAlign:'center',marginBottom:'3.5rem'}});
  hdr.appendChild(sectionTag('Notre méthode'));
  var h2=el('h2');
  h2.appendChild(document.createTextNode('Comment nous '));
  h2.appendChild(gradText('travaillons'));
  h2.style.cssText='font-family:"Bangers",cursive;font-size:clamp(2rem,4vw,3rem);letter-spacing:.5px;margin-bottom:1rem';
  hdr.appendChild(h2);
  hdr.appendChild(el('p',{style:{fontSize:'16px',color:T.white2,maxWidth:'500px',margin:'0 auto'}},'Un processus clair et collaboratif pour garantir le succès de votre projet'));
  sec.appendChild(hdr);

  var steps=[
    {n:'01',title:'Découverte',desc:'Nous analysons vos besoins, votre marché et vos objectifs pour définir la meilleure stratégie'},
    {n:'02',title:'Conception',desc:'Maquettes, wireframes et prototypes. Vous validez chaque étape avant le développement'},
    {n:'03',title:'Développement',desc:'Code propre, optimisé et maintenable. Développement agile avec mises à jour régulières'},
    {n:'04',title:'Livraison',desc:'Tests rigoureux, lancement et formation. Nous assurons le suivi post-livraison'}
  ];

  var grid=el('div',{class:'process-steps',style:{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'0',position:'relative'}});

  // connector line
  var line=el('div');
  Object.assign(line.style,{
    position:'absolute',top:'35px',left:'12%',right:'12%',height:'1px',
    background:'linear-gradient(90deg,transparent,rgba(212,160,23,.4),transparent)',zIndex:'0'
  });
  grid.appendChild(line);

  steps.forEach(function(s,i){
    var step=el('div',{class:'reveal r'+i,style:{textAlign:'center',padding:'2rem 1.5rem',position:'relative',zIndex:'1'}});

    var num=el('div',null,s.n);
    Object.assign(num.style,{
      width:'70px',height:'70px',borderRadius:'50%',background:T.dark2,
      border:'2px solid rgba(212,160,23,.3)',display:'flex',alignItems:'center',
      justifyContent:'center',fontFamily:'"Bangers",cursive',fontSize:'22px',
      color:T.gold,margin:'0 auto 1.2rem',transition:'all .3s'
    });
    step.appendChild(num);

    var t=el('h3',null,s.title);
    t.style.cssText='font-size:16px;font-weight:700;margin-bottom:8px';
    step.appendChild(t);

    var d=el('p',null,s.desc);
    d.style.cssText='font-size:13px;color:'+T.white3+';line-height:1.5';
    step.appendChild(d);

    step.addEventListener('mouseenter',function(){ num.style.background='rgba(212,160,23,.15)'; num.style.borderColor=T.gold; num.style.boxShadow='0 0 28px rgba(212,160,23,.2)'; });
    step.addEventListener('mouseleave',function(){ num.style.background=T.dark2; num.style.borderColor='rgba(212,160,23,.3)'; num.style.boxShadow=''; });
    grid.appendChild(step);
  });

  sec.appendChild(grid);
  site.appendChild(sec);
})();

// ===== PORTFOLIO =====
(function buildPortfolio(){
  var sec=el('section',{id:'portfolio'});

  var hdr=el('div',{class:'reveal',style:{textAlign:'center',marginBottom:'3.5rem'}});
  hdr.appendChild(sectionTag('Portfolio'));
  var h2=el('h2');
  h2.appendChild(document.createTextNode('Nos '));
  h2.appendChild(gradText('dernières réalisations'));
  h2.style.cssText='font-family:"Bangers",cursive;font-size:clamp(2rem,4vw,3rem);letter-spacing:.5px;margin-bottom:1rem';
  hdr.appendChild(h2);
  hdr.appendChild(el('p',{style:{fontSize:'16px',color:T.white2,maxWidth:'500px',margin:'0 auto'}},'Quelques projets qui illustrent notre savoir-faire'));
  sec.appendChild(hdr);

  var projects=[
    {emoji:'🛒',bg:'linear-gradient(135deg,#0a0a00,#1a1500)',label:'Site E-commerce',type:'Web',title:'ShopCamer Pro',sub:'Boutique en ligne · Paiement Mobile Money',msg:"Bonjour ! J'ai vu votre portfolio et je suis intéressé par un projet similaire."},
    {emoji:'🖥️',bg:'linear-gradient(135deg,#1a1500,#0a0800)',label:'App Mobile',type:'Application',title:'RideCam',sub:'Application de covoiturage · Android & iOS',msg:"Bonjour ! J'aimerais une application mobile comme dans votre portfolio."},
    {emoji:'✦',bg:'linear-gradient(135deg,#1a1200,#2a1e00)',label:'Identité Visuelle',type:'Logo',title:'GoldRush Finance',sub:'Logo + Charte graphique complète',msg:"Bonjour ! Je voudrais une identité visuelle."},
    {emoji:'📊',bg:'linear-gradient(135deg,#0a0900,#181500)',label:'Logiciel Métier',type:'Web App',title:'GestStock Pro',sub:'Gestion inventaire · ERP simplifié',msg:"Bonjour ! Je suis intéressé par un système de gestion."},
    {emoji:'🍽️',bg:'linear-gradient(135deg,#0d0d00,#1a1700)',label:'Site Restaurant',type:'Web',title:'Chez Mamy',sub:'Site + Réservation en ligne · Menu digital',msg:"Bonjour ! Je voudrais un site pour un restaurant."},
    {emoji:'🎯',bg:'linear-gradient(135deg,#121000,#1e1b00)',label:'Design Print',type:'Design',title:'CampagneYDE 2024',sub:'Affiches + Flyers + Bannières publicitaires',msg:"Bonjour ! Je voudrais une campagne d'affiches."}
  ];

  var grid=el('div',{style:{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'20px'}});
  grid.className='portfolio-grid';

  projects.forEach(function(p,i){
    var c=el('div',{class:'pcard reveal'+(i%3===1?' r1':i%3===2?' r2':'')});
    Object.assign(c.style,{
      borderRadius:T.r2, overflow:'hidden', position:'relative', cursor:'pointer',
      background:T.dark2, border:'1px solid rgba(255,255,255,.07)',
      transition:'all .3s', aspectRatio:'16/10', minHeight:'180px'
    });

    var bg=el('div',{html:p.emoji});
    Object.assign(bg.style,{
      position:'absolute',inset:'0',display:'flex',alignItems:'center',
      justifyContent:'center',fontSize:'64px',background:p.bg,transition:'transform .4s'
    });

    var labelEl=el('div',null,p.label);
    Object.assign(labelEl.style,{
      position:'absolute',top:'1rem',left:'1rem',fontSize:'11px',fontWeight:'700',
      textTransform:'uppercase',letterSpacing:'1px',padding:'4px 12px',borderRadius:'20px',
      background:'rgba(8,8,0,.8)',backdropFilter:'blur(10px)',
      border:'1px solid rgba(212,160,23,.25)',color:T.gold
    });

    var overlay=el('div');
    Object.assign(overlay.style,{
      position:'absolute',inset:'0',
      background:'linear-gradient(to top,rgba(8,8,0,.95) 0%,rgba(8,8,0,.4) 60%,transparent 100%)',
      opacity:'0',transition:'opacity .3s',padding:'1.5rem',
      display:'flex',flexDirection:'column',justifyContent:'flex-end'
    });

    var typeTag=el('span',null,p.type);
    Object.assign(typeTag.style,{
      display:'inline-block',fontSize:'11px',fontWeight:'700',textTransform:'uppercase',
      letterSpacing:'1px',padding:'3px 10px',borderRadius:'20px',marginBottom:'8px',
      background:'rgba(212,160,23,.2)',color:T.gold2,border:'1px solid rgba(212,160,23,.35)'
    });
    var title=el('div',null,p.title);
    Object.assign(title.style,{fontSize:'18px',fontWeight:'700',marginBottom:'4px'});
    var sub=el('div',null,p.sub);
    Object.assign(sub.style,{fontSize:'13px',color:T.white2});

    overlay.appendChild(typeTag); overlay.appendChild(title); overlay.appendChild(sub);
    c.appendChild(bg); c.appendChild(labelEl); c.appendChild(overlay);

    c.addEventListener('mouseenter',function(){ overlay.style.opacity='1'; bg.style.transform='scale(1.05)'; c.style.borderColor='rgba(212,160,23,.3)'; c.style.transform='translateY(-4px)'; c.style.boxShadow='0 20px 40px rgba(0,0,0,.4)'; });
    c.addEventListener('mouseleave',function(){ overlay.style.opacity='0'; bg.style.transform=''; c.style.borderColor='rgba(255,255,255,.07)'; c.style.transform=''; c.style.boxShadow=''; });
    c.onclick=function(){ wa(p.msg); };
    grid.appendChild(c);
  });

  sec.appendChild(grid);
  site.appendChild(sec);
})();

// ===== TARIFS =====
(function buildPricing(){
  var sec=el('section',{id:'tarifs',style:{background:T.dark}});

  var hdr=el('div',{class:'reveal',style:{textAlign:'center',marginBottom:'3.5rem'}});
  hdr.appendChild(sectionTag('Tarifs'));
  var h2=el('h2');
  h2.appendChild(document.createTextNode('Des offres '));
  h2.appendChild(gradText('adaptées à vos besoins'));
  h2.style.cssText='font-family:"Bangers",cursive;font-size:clamp(2rem,4vw,3rem);letter-spacing:.5px;margin-bottom:1rem';
  hdr.appendChild(h2);
  hdr.appendChild(el('p',{style:{fontSize:'16px',color:T.white2,maxWidth:'500px',margin:'0 auto'}},'Des prix transparents, sans surprises'));
  sec.appendChild(hdr);

  var plans=[
    {name:'Starter',desc:'Pour les petites structures et startups',features:['Site vitrine (5 pages)','Design responsive','Logo simple','Formulaire de contact','1 mois de support'],no:['E-commerce','Application mobile'],msg:"Bonjour ! Je suis intéressé par l'offre Starter. Pouvez-vous me donner un devis ?",featured:false},
    {name:'Business',desc:'Pour les entreprises en croissance',features:['Site web complet','Design premium','Logo + charte graphique','E-commerce intégré','SEO de base','3 mois de support'],no:['Application mobile'],msg:"Bonjour ! Je suis intéressé par l'offre Business. Pouvez-vous me donner un devis ?",featured:true},
    {name:'Premium',desc:'Solution digitale complète',features:['Site web + App mobile','Design UI/UX premium','Identité visuelle complète','E-commerce avancé','SEO + Marketing digital','Logiciel sur mesure','Support illimité 1 an'],no:[],msg:"Bonjour ! Je suis intéressé par l'offre Premium. Pouvez-vous me donner un devis ?",featured:false}
  ];

  var grid=el('div',{style:{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'20px',maxWidth:'960px',margin:'0 auto'}});
  grid.className='pricing-grid';

  plans.forEach(function(p,i){
    var c=el('div',{class:'pricing-card reveal r'+i});
    Object.assign(c.style,{
      background:p.featured?'linear-gradient(135deg,rgba(212,160,23,.08),rgba(184,134,11,.05))':T.dark2,
      border:'1px solid '+(p.featured?'rgba(212,160,23,.5)':'rgba(255,255,255,.07)'),
      borderRadius:T.r2, padding:'2rem', position:'relative', transition:'all .3s'
    });
    c.addEventListener('mouseenter',function(){ this.style.transform='translateY(-4px)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,.3)'; });
    c.addEventListener('mouseleave',function(){ this.style.transform=''; this.style.boxShadow=''; });

    if(p.featured){
      var badge=el('div',null,'POPULAIRE');
      Object.assign(badge.style,{
        position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)',
        background:T.grad,color:T.black,fontSize:'11px',fontWeight:'800',
        letterSpacing:'2px',padding:'4px 16px',borderRadius:'20px'
      });
      c.appendChild(badge);
    }

    var name=el('div',null,p.name);
    Object.assign(name.style,{fontSize:'14px',fontWeight:'700',textTransform:'uppercase',letterSpacing:'1px',color:T.white2,marginBottom:'.5rem'});

    var price=el('div',null,'Sur devis');
    Object.assign(price.style,{fontFamily:'"Bangers",cursive',fontSize:'2.4rem',letterSpacing:'-1px',lineHeight:'1',color:T.gold});

    var desc=el('p',null,p.desc);
    Object.assign(desc.style,{fontSize:'13px',color:T.white3,margin:'8px 0 1.5rem'});

    var ul=el('ul',{style:{listStyle:'none',marginBottom:'1.5rem'}});
    p.features.forEach(function(f){
      var li=el('li');
      Object.assign(li.style,{display:'flex',alignItems:'center',gap:'9px',fontSize:'14px',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,.05)',color:T.white2});
      var check=el('span',null,'✓');
      Object.assign(check.style,{width:'18px',height:'18px',borderRadius:'50%',background:'rgba(16,185,129,.15)',color:T.green,fontSize:'11px',fontWeight:'800',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:'0'});
      li.appendChild(check); li.appendChild(document.createTextNode(f));
      ul.appendChild(li);
    });
    p.no.forEach(function(f){
      var li=el('li',{style:{display:'flex',alignItems:'center',gap:'9px',fontSize:'14px',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,.05)',color:T.white2,opacity:'.4'}});
      var x=el('span',null,'✗');
      Object.assign(x.style,{width:'18px',height:'18px',borderRadius:'50%',background:'rgba(239,68,68,.1)',color:T.red,fontSize:'11px',fontWeight:'800',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:'0'});
      li.appendChild(x); li.appendChild(document.createTextNode(f));
      ul.appendChild(li);
    });

    var pBtn=el('button',null,'Demander un devis');
    Object.assign(pBtn.style,{
      width:'100%',padding:'12px',borderRadius:T.r,cursor:'pointer',
      border:'1.5px solid rgba(212,160,23,.4)',background:p.featured?T.grad:'transparent',
      color:p.featured?T.black:T.white,fontFamily:"'Nunito',sans-serif",fontSize:'14px',fontWeight:'600',transition:'all .2s'
    });
    pBtn.addEventListener('mouseenter',function(){ this.style.background=T.grad; this.style.borderColor='transparent'; this.style.color=T.black; });
    pBtn.addEventListener('mouseleave',function(){ if(!p.featured){ this.style.background='transparent'; this.style.borderColor='rgba(212,160,23,.4)'; this.style.color=T.white; } });
    pBtn.onclick=function(){ wa(p.msg); };

    [name,price,desc,ul,pBtn].forEach(function(e){ c.appendChild(e); });
    grid.appendChild(c);
  });

  sec.appendChild(grid);
  site.appendChild(sec);
})();

// ===== CONTACT =====
(function buildContact(){
  var sec=el('section',{id:'contact'});

  var wrap=el('div',{class:'contact-grid',style:{maxWidth:'1000px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'60px',alignItems:'center'}});

  // LEFT
  var left=el('div',{class:'reveal'});
  left.appendChild(sectionTag('Contact'));
  var h2=el('h2');
  h2.appendChild(document.createTextNode('Parlons de votre '));
  h2.appendChild(gradText('projet'));
  h2.style.cssText='font-family:"Bangers",cursive;font-size:clamp(1.8rem,3vw,2.5rem);letter-spacing:.5px;margin-bottom:1rem';
  left.appendChild(h2);

  var desc=el('p',null,"Vous avez une idée, un projet ou une question ? Notre équipe est disponible pour vous accompagner. Contactez-nous dès maintenant !");
  Object.assign(desc.style,{fontSize:'15px',color:T.white2,lineHeight:'1.7',marginBottom:'2rem'});
  left.appendChild(desc);

  var infos=[
    {icon:'📍',label:'Notre adresse',val:'Sangmélima, Cameroun'},
    {icon:'📞',label:'Téléphone / WhatsApp',val:'+237 694 786 774'},
    {icon:'🕐',label:'Disponibilité',val:'Lun – Sam, 8h00 – 20h00'}
  ];
  var infoBox=el('div',{style:{display:'flex',flexDirection:'column',gap:'16px',marginBottom:'2rem'}});
  infos.forEach(function(info){
    var row=el('div',{style:{display:'flex',alignItems:'center',gap:'14px'}});
    var icon=el('div',{html:info.icon,style:{width:'42px',height:'42px',borderRadius:T.r,background:'rgba(212,160,23,.1)',border:'1px solid rgba(212,160,23,.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:'0'}});
    var txt=el('div');
    txt.appendChild(el('div',{style:{fontSize:'13px',color:T.white2,lineHeight:'1.4'}},info.label));
    txt.appendChild(el('div',{style:{fontSize:'15px',fontWeight:'600',color:T.white}},info.val));
    row.appendChild(icon); row.appendChild(txt);
    infoBox.appendChild(row);
  });
  left.appendChild(infoBox);

  var waBtn=el('button');
  waBtn.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" style="flex-shrink:0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> Écrire sur WhatsApp';
  Object.assign(waBtn.style,{
    display:'inline-flex',alignItems:'center',gap:'10px',padding:'14px 28px',
    borderRadius:T.r,background:T.wa,color:T.white,fontSize:'15px',fontWeight:'700',
    cursor:'pointer',border:'none',fontFamily:"'Nunito',sans-serif",transition:'all .2s',
    boxShadow:'0 4px 20px rgba(37,211,102,.25)'
  });
  waBtn.addEventListener('mouseenter',function(){ this.style.background='#1ebe57'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 30px rgba(37,211,102,.35)'; });
  waBtn.addEventListener('mouseleave',function(){ this.style.background=T.wa; this.style.transform=''; this.style.boxShadow='0 4px 20px rgba(37,211,102,.25)'; });
  waBtn.onclick=function(){ wa("Bonjour Empire Design ! Je souhaite discuter d'un projet. Pouvez-vous m'en dire plus sur vos services ?"); };
  left.appendChild(waBtn);

  // RIGHT — FORM
  var right=el('div',{class:'reveal r1',style:{background:T.dark3,border:'1px solid rgba(255,255,255,.07)',borderRadius:T.r2,padding:'2rem'}});

  var formTitle=el('h3',null,'Envoyez-nous un message');
  formTitle.style.cssText='font-size:18px;font-weight:700;margin-bottom:1.2rem';
  right.appendChild(formTitle);

  var formInner=el('div',{id:'form-inner'});

  var row1=el('div',{class:'form-row',style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginBottom:'14px'}});
  var g1=el('div',{style:{display:'flex',flexDirection:'column',gap:'5px'}});
  g1.appendChild(label('Votre nom')); var inp1=input('text','f-name','Jean Dupont'); g1.appendChild(inp1);
  var g2=el('div',{style:{display:'flex',flexDirection:'column',gap:'5px'}});
  g2.appendChild(label('Téléphone / WhatsApp')); var inp2=input('tel','f-phone','+237 6XX XXX XXX'); g2.appendChild(inp2);
  row1.appendChild(g1); row1.appendChild(g2);
  formInner.appendChild(row1);

  var g3=el('div',{style:{display:'flex',flexDirection:'column',gap:'5px',marginBottom:'14px'}});
  g3.appendChild(label('Service souhaité'));
  var sel=select('f-service',[
    ['web','Développement Web'],['app','Application Mobile'],
    ['logo','Logo & Identité Visuelle'],['print','Affiches & Design Print'],
    ['marketing','Marketing Digital'],['logiciel','Logiciel sur Mesure'],['pack','Pack Complet']
  ]);
  g3.appendChild(sel); formInner.appendChild(g3);

  var g4=el('div',{style:{display:'flex',flexDirection:'column',gap:'5px',marginBottom:'14px'}});
  g4.appendChild(label('Décrivez votre projet'));
  var ta=input('textarea','f-msg','Dites-nous en plus sur votre projet, vos besoins, votre budget estimé...');
  g4.appendChild(ta); formInner.appendChild(g4);

  var submitBtn=el('button');
  submitBtn.innerHTML='📤 Envoyer via WhatsApp';
  Object.assign(submitBtn.style,{
    width:'100%',padding:'13px',borderRadius:T.r,background:T.grad,color:T.black,
    fontFamily:"'Nunito',sans-serif",fontSize:'15px',fontWeight:'700',cursor:'pointer',
    border:'none',transition:'all .2s',marginTop:'6px',display:'flex',
    alignItems:'center',justifyContent:'center',gap:'8px'
  });
  submitBtn.addEventListener('mouseenter',function(){ this.style.opacity='.9'; this.style.transform='translateY(-1px)'; });
  submitBtn.addEventListener('mouseleave',function(){ this.style.opacity='1'; this.style.transform=''; });
  submitBtn.onclick=function(){
    var name=document.getElementById('f-name').value.trim();
    if(!name){ alert('Veuillez saisir votre nom.'); return; }
    var phone=document.getElementById('f-phone').value.trim();
    var service=document.getElementById('f-service').value;
    var msg=document.getElementById('f-msg').value.trim();
    var txt='Bonjour Empire Design ! 👋\n\n';
    txt+='*Nom :* '+name+'\n';
    if(phone) txt+='*Contact :* '+phone+'\n';
    if(service) txt+='*Service :* '+service+'\n';
    if(msg) txt+='*Message :* '+msg+'\n';
    txt+='\nJ\'attends votre retour. Merci !';
    formInner.style.display='none';
    var ok=el('div',{style:{textAlign:'center',padding:'2rem'}});
    ok.appendChild(el('div',{style:{fontSize:'48px',marginBottom:'1rem',animation:'bounce 1s ease infinite alternate'}},['✅']));
    ok.appendChild(el('h3',{style:{fontSize:'20px',fontWeight:'700',marginBottom:'8px'}},['Message envoyé !']));
    ok.appendChild(el('p',{style:{color:T.white2,fontSize:'14px',marginBottom:'1rem'}},["WhatsApp va s'ouvrir avec votre message. Notre équipe vous répondra rapidement."]));
    var rb=btn('Nouveau message',function(){ ok.remove(); formInner.style.display=''; document.getElementById('f-name').value=''; document.getElementById('f-phone').value=''; document.getElementById('f-service').value=''; document.getElementById('f-msg').value=''; },{display:'inline-flex',margin:'0 auto'});
    ok.appendChild(rb);
    right.appendChild(ok);
    setTimeout(function(){ wa(txt); },600);
  };
  formInner.appendChild(submitBtn);
  right.appendChild(formInner);

  wrap.appendChild(left);
  wrap.appendChild(right);
  sec.appendChild(wrap);
  site.appendChild(sec);
})();

// ===== FOOTER =====
(function buildFooter(){
  var footer=el('footer',{style:{background:T.dark,borderTop:'1px solid rgba(255,255,255,.06)',padding:'60px 5% 30px'}});

  var grid=el('div',{class:'footer-grid',style:{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:'40px',marginBottom:'3rem'}});

  // Brand col
  var brand=el('div',{style:{maxWidth:'300px'}});
  var logoRow=el('div',{style:{display:'flex',alignItems:'center',gap:'10px',marginBottom:'1rem'}});
  logoRow.appendChild(el('div',{style:{width:'36px',height:'36px',borderRadius:'8px',background:T.grad,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px',fontWeight:'900',color:T.black}},['E']));
  var logoTxt=el('span',null,'Empire Design');
  Object.assign(logoTxt.style,{background:T.grad,WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent',fontSize:'20px',fontWeight:'700'});
  logoRow.appendChild(logoTxt);
  brand.appendChild(logoRow);
  brand.appendChild(el('p',{style:{fontSize:'14px',color:T.white3,lineHeight:'1.7',marginBottom:'1.5rem'}},["Votre partenaire digital à Sangmélima. Nous transformons vos idées en expériences numériques mémorables."]));

  var socials=el('div',{style:{display:'flex',gap:'10px'}});
  ['💬','📘','📸','🐦'].forEach(function(s,i){
    var b=el('button',{html:s});
    Object.assign(b.style,{width:'36px',height:'36px',borderRadius:T.r,background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',cursor:'pointer',transition:'all .2s'});
    b.addEventListener('mouseenter',function(){ this.style.background='rgba(212,160,23,.2)'; this.style.borderColor='rgba(212,160,23,.4)'; this.style.transform='translateY(-2px)'; });
    b.addEventListener('mouseleave',function(){ this.style.background='rgba(255,255,255,.05)'; this.style.borderColor='rgba(255,255,255,.1)'; this.style.transform=''; });
    if(i===0) b.onclick=function(){ wa('Bonjour !'); };
    socials.appendChild(b);
  });
  brand.appendChild(socials);
  grid.appendChild(brand);

  // Link cols
  var cols=[
    {title:'Services',links:[['Développement Web',"Bonjour, je suis intéressé par le développement web."],['App Mobile',"Bonjour, je suis intéressé par une application mobile."],['Identité Visuelle',"Bonjour, je suis intéressé par l'identité visuelle."],['Design Print',"Bonjour, je suis intéressé par le design print."],['Marketing Digital',"Bonjour, je suis intéressé par le marketing digital."]]},
    {title:'Entreprise',links:[['Notre méthode','#processus'],['Portfolio','#portfolio'],['Tarifs','#tarifs'],['Contact','#contact']]},
    {title:'Contact',links:[['+237 694 786 774','tel'],[' WhatsApp direct','wa'],['Sangmélima, Cameroun','#contact']]}
  ];
  cols.forEach(function(col){
    var c=el('div');
    var h=el('h4',null,col.title);
    h.style.cssText='font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:'+T.white2+';margin-bottom:1rem';
    c.appendChild(h);
    var ul=el('ul',{style:{listStyle:'none'}});
    col.links.forEach(function(lnk){
      var li=el('li',{style:{marginBottom:'9px'}});
      var a=el('a',null,lnk[0]);
      a.style.cssText='font-size:14px;color:'+T.white3+';transition:color .2s;cursor:pointer';
      a.addEventListener('mouseenter',function(){ this.style.color=T.white; });
      a.addEventListener('mouseleave',function(){ this.style.color=T.white3; });
      if(lnk[1]==='wa') a.onclick=function(){ wa('Bonjour Empire Design !'); };
      else if(lnk[1]==='tel') a.href='tel:+237694786774';
      else if(lnk[1].startsWith('#')) a.href=lnk[1];
      else a.onclick=function(){ wa(lnk[1]); };
      li.appendChild(a); ul.appendChild(li);
    });
    c.appendChild(ul);
    grid.appendChild(c);
  });

  footer.appendChild(grid);

  var bottom=el('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'1.5rem',borderTop:'1px solid rgba(255,255,255,.06)',flexWrap:'wrap',gap:'10px'}});
  bottom.appendChild(el('div',{style:{fontSize:'13px',color:T.white3}},['© 2025 Empire Design. Tous droits réservés. Made with ❤️ à Sangmélima.']));

  var waFooter=el('button');
  waFooter.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> +237 694 786 774';
  Object.assign(waFooter.style,{
    display:'inline-flex',alignItems:'center',gap:'8px',fontSize:'13px',color:T.green,
    background:'rgba(37,211,102,.1)',border:'1px solid rgba(37,211,102,.2)',
    padding:'6px 14px',borderRadius:'20px',cursor:'pointer',transition:'all .2s',fontFamily:"'Nunito',sans-serif"
  });
  waFooter.addEventListener('mouseenter',function(){ this.style.background='rgba(37,211,102,.2)'; });
  waFooter.addEventListener('mouseleave',function(){ this.style.background='rgba(37,211,102,.1)'; });
  waFooter.onclick=function(){ wa("Bonjour Empire Design ! Je souhaite en savoir plus sur vos services."); };
  bottom.appendChild(waFooter);
  footer.appendChild(bottom);

  site.appendChild(footer);
})();

// ===== WA FLOAT BUTTON =====
(function(){
  var wrap=el('div',{style:{position:'fixed',bottom:'28px',right:'28px',zIndex:'500'}});

  var tooltip=el('div',null,'Écrivez-nous sur WhatsApp');
  Object.assign(tooltip.style,{
    position:'absolute',right:'70px',top:'50%',transform:'translateY(-50%)',
    background:'rgba(8,8,0,.9)',backdropFilter:'blur(10px)',
    border:'1px solid rgba(255,255,255,.1)',borderRadius:T.r,
    padding:'8px 14px',fontSize:'13px',fontWeight:'600',
    whiteSpace:'nowrap',color:T.white,opacity:'0',
    pointerEvents:'none',transition:'opacity .2s'
  });

  var pulse=el('div');
  Object.assign(pulse.style,{position:'absolute',inset:'-4px',borderRadius:'50%',border:'2px solid rgba(37,211,102,.4)',animation:'waRing 2s infinite'});

  var fab=el('button');
  fab.innerHTML='<svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
  Object.assign(fab.style,{
    width:'56px',height:'56px',borderRadius:'50%',background:T.wa,border:'none',
    cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',
    boxShadow:'0 4px 20px rgba(37,211,102,.4)',transition:'all .2s',position:'relative'
  });
  fab.appendChild(pulse);
  fab.addEventListener('mouseenter',function(){ this.style.transform='scale(1.1)'; this.style.boxShadow='0 8px 30px rgba(37,211,102,.5)'; tooltip.style.opacity='1'; });
  fab.addEventListener('mouseleave',function(){ this.style.transform=''; this.style.boxShadow='0 4px 20px rgba(37,211,102,.4)'; tooltip.style.opacity='0'; });
  fab.onclick=function(){ wa("Bonjour Empire Design ! Je suis intéressé par vos services, puis-je en savoir plus ?"); };

  wrap.appendChild(tooltip);
  wrap.appendChild(fab);
  document.body.appendChild(wrap);
})();

// ===== SCROLL TO TOP =====
(function(){
  var b=el('button',{html:'↑'});
  Object.assign(b.style,{
    position:'fixed',bottom:'28px',left:'28px',zIndex:'500',
    width:'44px',height:'44px',borderRadius:T.r,
    background:'rgba(212,160,23,.15)',border:'1px solid rgba(212,160,23,.3)',
    color:T.white,fontSize:'20px',cursor:'pointer',display:'flex',
    alignItems:'center',justifyContent:'center',transition:'all .2s',
    opacity:'0',pointerEvents:'none',fontFamily:"'Nunito',sans-serif"
  });
  b.addEventListener('mouseenter',function(){ this.style.background='rgba(212,160,23,.3)'; this.style.transform='translateY(-2px)'; });
  b.addEventListener('mouseleave',function(){ this.style.background='rgba(212,160,23,.15)'; this.style.transform=''; });
  b.onclick=function(){ window.scrollTo({top:0,behavior:'smooth'}); };
  window.addEventListener('scroll',function(){ var v=window.scrollY>400; b.style.opacity=v?'1':'0'; b.style.pointerEvents=v?'all':'none'; });
  document.body.appendChild(b);
})();

// ===== SCROLL REVEAL =====
(function(){
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('vis'); });
  },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  setTimeout(function(){
    document.querySelectorAll('.reveal').forEach(function(el){ obs.observe(el); });
  },100);
})();
</script>
</body>
</html>