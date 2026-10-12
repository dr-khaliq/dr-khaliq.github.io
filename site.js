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
      themeButton.innerHTML = '<span class="theme-glyph" aria-hidden="true">' + (dark ? '☼' : '◐') + '</span>' + (dark ? 'Light' : 'Dark');
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
