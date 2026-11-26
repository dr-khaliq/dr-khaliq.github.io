/* Small enhancement only: do not display a broken remote portrait. */
(function () {
  'use strict';
  const portrait = document.getElementById('portrait');
  const hero = document.querySelector('.hero');
  const image = portrait && portrait.querySelector('img');
  if (!portrait || !hero || !image) return;

  function displayIfAvailable() {
    const available = Boolean(image.complete && image.naturalWidth > 0);
    portrait.classList.toggle('is-loaded', available);
    hero.classList.toggle('has-portrait', available);
  }

  image.addEventListener('load', displayIfAvailable);
  image.addEventListener('error', displayIfAvailable);
  if (image.complete) displayIfAvailable();
})();
