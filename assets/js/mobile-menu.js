// Accessible Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const panel = document.getElementById('mobileMenuPanel');
  if(!toggleBtn || !panel) return;

  const focusableSelectors = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let lastFocusedBeforeOpen = null;

  function openMenu(){
    lastFocusedBeforeOpen = document.activeElement;
    panel.classList.add('open');
    toggleBtn.setAttribute('aria-expanded','true');
    panel.removeAttribute('aria-hidden');
    document.body.style.overflow='hidden';
    trapFocus();
  }
  function closeMenu(){
    panel.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded','false');
    panel.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    releaseFocus();
    if(lastFocusedBeforeOpen) lastFocusedBeforeOpen.focus();
  }

  toggleBtn.addEventListener('click', () => {
    const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    expanded ? closeMenu() : openMenu();
  });

  panel.addEventListener('click', (e) => {
    if(e.target === panel) closeMenu(); // click backdrop
  });

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && panel.classList.contains('open')) closeMenu();
  });

  function trapFocus(){
    const focusables = panel.querySelectorAll(focusableSelectors);
    if(focusables.length) focusables[0].focus();
    function handleTrap(e){
      if(!panel.classList.contains('open')) return;
      if(e.key !== 'Tab') return;
      const list = Array.from(panel.querySelectorAll(focusableSelectors));
      if(!list.length) return;
      const first = list[0];
      const last = list[list.length -1];
      if(e.shiftKey && document.activeElement === first){
        e.preventDefault(); last.focus();
      } else if(!e.shiftKey && document.activeElement === last){
        e.preventDefault(); first.focus();
      }
    }
    document.addEventListener('keydown', handleTrap);
  }
  function releaseFocus(){ /* currently trap added each open with closure - minimal */ }

  // Close on nav link click
  panel.addEventListener('click', (e)=>{
    const target = e.target.closest('a');
    if(target) closeMenu();
  });

  /* Language dropdown (desktop) click toggle */
  const langDropdown = document.querySelector('.language-dropdown');
  if(langDropdown){
    const trigger = langDropdown.querySelector('.lang-toggle');
    const submenu = langDropdown.querySelector('.language-submenu');
    if(trigger && submenu){
      function toggleLang(e){
        e.preventDefault();
        const open = langDropdown.classList.contains('open');
        if(open){
          langDropdown.classList.remove('open');
          trigger.setAttribute('aria-expanded','false');
          submenu.setAttribute('hidden','');
        } else {
          langDropdown.classList.add('open');
          trigger.setAttribute('aria-expanded','true');
          submenu.removeAttribute('hidden');
        }
      }
      trigger.addEventListener('click', toggleLang);
      trigger.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' '){ toggleLang(e); }});
      document.addEventListener('click', (e)=>{ if(!langDropdown.contains(e.target)){ langDropdown.classList.remove('open'); trigger.setAttribute('aria-expanded','false'); submenu.setAttribute('hidden',''); }});
      document.addEventListener('keydown', (e)=>{ if(e.key==='Escape'){ langDropdown.classList.remove('open'); trigger.setAttribute('aria-expanded','false'); submenu.setAttribute('hidden',''); trigger.focus(); }});
    }
  }
});
