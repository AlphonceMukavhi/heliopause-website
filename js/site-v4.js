(function(){
  'use strict';

  var burger=document.querySelector('.burger');
  var menu=document.querySelector('.menu');
  var mobileBreakpoint=767;

  function closeMenu(returnFocus){
    if(!burger||!menu)return;
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded','false');
    if(returnFocus)burger.focus();
  }

  if(burger&&menu){
    burger.addEventListener('click',function(){
      var open=!menu.classList.contains('open');
      menu.classList.toggle('open',open);
      burger.setAttribute('aria-expanded',String(open));
    });

    menu.addEventListener('click',function(e){
      if(e.target.closest('a'))closeMenu(false);
    });

    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&menu.classList.contains('open'))closeMenu(true);
    });

    document.addEventListener('click',function(e){
      if(menu.classList.contains('open')&&!menu.contains(e.target)&&!burger.contains(e.target))closeMenu(false);
    });

    window.addEventListener('resize',function(){
      if(window.innerWidth>mobileBreakpoint)closeMenu(false);
    },{passive:true});
  }

  document.querySelectorAll('form[data-wa]').forEach(function(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      if(!form.reportValidity())return;

      var lines=[form.dataset.title||'Website enquiry'];
      var message='';

      Array.prototype.forEach.call(form.elements,function(el){
        if(!el.name)return;
        var raw=typeof el.value==='string'?el.value:'';
        var value=raw.trim();
        if(!value)return;
        if(el.name==='message')message=value;
        else lines.push((el.dataset.l||el.name)+': '+value);
      });

      if(message)lines.push('',message);
      var url='https://wa.me/'+encodeURIComponent(form.dataset.wa)+'?text='+encodeURIComponent(lines.join('\n'));
      var note=form.querySelector('.note');
      var submit=form.querySelector('[type="submit"]');

      if(note)note.textContent='Opening WhatsApp with your message…';
      if(submit){submit.disabled=true;submit.setAttribute('aria-busy','true');}

      /* Same-tab navigation is the most reliable path across desktop, Android and iOS,
         and avoids popup-blocker/COOP duplicate-tab edge cases. */
      window.location.assign(url);

      /* If a mobile OS hands the URL to the WhatsApp app and leaves this page open,
         restore the button so the form remains usable. */
      window.setTimeout(function(){
        if(submit){submit.disabled=false;submit.removeAttribute('aria-busy');}
      },1800);
    });
  });
})();
