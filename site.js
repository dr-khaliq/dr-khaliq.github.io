(function () {
  const root = document.documentElement;
  const storageKey = 'site-theme';
  const menuButton = document.querySelector('[data-menu-btn]');
  const nav = document.querySelector('[data-nav]');
  const themeButton = document.querySelector('[data-theme-toggle]');
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  function updateThemeMeta() {
    if (themeMeta) themeMeta.setAttribute('content', getComputedStyle(root).getPropertyValue('--paper').trim());
  }
  function applyTheme(theme) {
    const dark = theme === 'dark';
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (themeButton) {
      themeButton.setAttribute('aria-pressed', String(dark));
      themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      const label = themeButton.querySelector('.theme-switch-label');
      if (label) label.textContent = dark ? 'Dark' : 'Light';
    }
    updateThemeMeta();
  }
  let savedTheme = null;
  try { savedTheme = localStorage.getItem(storageKey); } catch (e) {}
  const requestedTheme = new URLSearchParams(window.location.search).get('theme');
  const preferredDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme((requestedTheme === 'dark' || requestedTheme === 'light') ? requestedTheme : (savedTheme || (preferredDark ? 'dark' : 'light')));

  if (themeButton) themeButton.addEventListener('click', function () {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem(storageKey, next); } catch (e) {}
  });
  function closeMenu() {
    if (!menuButton || !nav) return;
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰ Menu';
  }
  if (menuButton && nav) {
    menuButton.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.textContent = isOpen ? '× Close' : '☰ Menu';
    });
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menuButton.focus(); }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 720) closeMenu();
    });
  }
})();

(function(){
const search=document.getElementById('publication-search');
if(!search)return;
const rows=Array.from(document.querySelectorAll('#journal-articles .biblio > li'));
const status=document.getElementById('search-status');
function filter(){const q=search.value.trim().toLowerCase();let count=0;rows.forEach(row=>{row.hidden=!row.textContent.toLowerCase().includes(q);if(!row.hidden)count++;});status.textContent=q?(count+' publication'+(count===1?'':'s')+' found'):'Browse all '+rows.length+' journal articles';}
search.addEventListener('input',filter);filter();
})();
