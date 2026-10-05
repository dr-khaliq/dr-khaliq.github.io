
(function () {
  const root = document.documentElement;
  const storageKey = 'site-theme';
  const menuButton = document.querySelector('[data-menu-btn]');
  const nav = document.querySelector('[data-nav]');
  const themeButton = document.querySelector('[data-theme-toggle]');
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  function updateThemeMeta() {
    if (!themeMeta) return;
    themeMeta.setAttribute('content', getComputedStyle(root).getPropertyValue('--paper').trim());
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeButton) {
      const dark = theme === 'dark';
      themeButton.setAttribute('aria-pressed', String(dark));
      themeButton.textContent = dark ? 'Light mode' : 'Dark mode';
    }
    updateThemeMeta();
  }

  let savedTheme = null;
  try { savedTheme = localStorage.getItem(storageKey); } catch (e) {}
  const requestedTheme = new URLSearchParams(window.location.search).get('theme');
  const preferredDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(requestedTheme || savedTheme || (preferredDark ? 'dark' : 'light'));

  if (themeButton) {
    themeButton.addEventListener('click', function () {
      const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      try { localStorage.setItem(storageKey, nextTheme); } catch (e) {}
    });
  }

  if (menuButton && nav) {
    menuButton.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? 'Close' : 'Menu';
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.textContent = 'Menu';
        menuButton.focus();
      }
    });
  }
})();
