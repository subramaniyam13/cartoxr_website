(function(){
  var d=document,root=d.documentElement;
  // theme toggle
  d.querySelectorAll('[data-theme-toggle]').forEach(function(b){
    function sync(){var t=root.dataset.theme==='dark';b.setAttribute('aria-label',t?'Switch to light mode':'Switch to dark mode');b.setAttribute('title',t?'Light mode':'Dark mode');}
    sync();
    b.addEventListener('click',function(){var n=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=n;try{localStorage.setItem('cx-theme',n);}catch(e){}sync();});
  });
  // mobile menu
  d.querySelectorAll('[data-menu]').forEach(function(b){
    var nav=d.getElementById(b.getAttribute('aria-controls'));
    b.addEventListener('click',function(){var o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',String(!o));nav.classList.toggle('open',!o);});
  });
  // company age since founding (17 Feb 2025)
  function age(now){
    var f=new Date(2025,1,17),y=now.getFullYear()-f.getFullYear(),m=now.getMonth()-f.getMonth(),dd=now.getDate()-f.getDate();
    if(dd<0){m--;dd+=new Date(now.getFullYear(),now.getMonth(),0).getDate();}
    if(m<0){y--;m+=12;}
    return {y:y,m:m,d:dd,days:Math.floor((now-f)/864e5)};
  }
  var a=age(new Date());
  function pl(n,w){return n+' '+w+(n===1?'':'s');}
  d.querySelectorAll('[data-age]').forEach(function(e){e.textContent=pl(a.y,'year')+', '+pl(a.m,'month')+', '+pl(a.d,'day');});
  d.querySelectorAll('[data-age-years]').forEach(function(e){e.textContent=(a.days/365.25).toFixed(1);});
  d.querySelectorAll('[data-age-days]').forEach(function(e){e.textContent=a.days.toLocaleString('en-IN');});
  // work filters
  var fb=d.querySelectorAll('[data-filter]');
  function applyFilter(f){
    fb.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.filter===f));});
    var n=0;d.querySelectorAll('[data-cat]').forEach(function(it){var show=f==='all'||it.dataset.cat===f;it.hidden=!show;if(show)n++;});
    var c=d.getElementById('count');if(c)c.textContent=n+(n===1?' project':' projects');
  }
  fb.forEach(function(b){b.addEventListener('click',function(){applyFilter(b.dataset.filter);try{history.replaceState(null,'','#'+b.dataset.filter);}catch(e){}});});
  if(fb.length){var h=(location.hash||'').slice(1);var ok=[].some.call(fb,function(b){return b.dataset.filter===h;});applyFilter(ok?h:'all');}
  // copy buttons
  d.querySelectorAll('[data-copy]').forEach(function(b){
    b.addEventListener('click',function(){var t=b.getAttribute('data-copy'),lbl=b.textContent;
      function done(m){b.textContent=m;setTimeout(function(){b.textContent=lbl;},1800);}
      if(navigator.clipboard){navigator.clipboard.writeText(t).then(function(){done('Copied');},function(){done('Select and copy');});}else done('Select and copy');});
  });
  // contact brief -> mail draft
  var f=d.getElementById('brief');
  if(f){var pre=new URLSearchParams(location.search).get('interest');var sel=d.getElementById('f-svc');if(pre&&sel){[].forEach.call(sel.options,function(o){if(o.value===pre)sel.value=pre;});}
    f.addEventListener('submit',function(ev){ev.preventDefault();
    var em=d.getElementById('f-email'),wrap=em.closest('.field'),ok=/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em.value.trim());
    wrap.classList.toggle('err',!ok);d.getElementById('f-email-h').textContent=ok?'We reply from shylesh@cartoxr.com.':'Enter a full email address, like name@company.com.';
    if(!ok){em.focus();return;}
    var v=function(id){var x=d.getElementById(id);return x?x.value.trim():'';};
    var txt='Project brief for CARTOXR\n\nName: '+v('f-name')+'\nEmail: '+v('f-email')+'\nOrganisation: '+v('f-org')+'\nInterest: '+v('f-svc')+'\n\n'+v('f-msg');
    var out=d.getElementById('brief-out');d.getElementById('brief-text').textContent=txt;out.hidden=false;
    var m=d.getElementById('brief-mail');if(m)m.href='mailto:shylesh@cartoxr.com?subject='+encodeURIComponent('Project brief: '+(v('f-svc')||'CARTOXR'))+'&body='+encodeURIComponent(txt);
    out.scrollIntoView({block:'nearest',behavior:'smooth'});
  });}
  // hover preview following the cursor
  var pv=d.getElementById('peek');
  if(pv&&matchMedia('(hover: hover)').matches){var img=pv.querySelector('img');
    d.querySelectorAll('[data-peek]').forEach(function(r){
      r.addEventListener('mouseenter',function(){var s=r.dataset.peek;if(!s){pv.classList.remove('on');return;}img.src=s;pv.classList.add('on');});
      r.addEventListener('mouseleave',function(){pv.classList.remove('on');});
      r.addEventListener('mousemove',function(ev){pv.style.transform='translate('+(ev.clientX+24)+'px,'+(ev.clientY-90)+'px)';});
    });}
})();
