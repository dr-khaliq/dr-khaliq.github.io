// Show the academic portrait only when its URL returns a real image.
// To replace the Google Drive link, edit the img src in index.html.
// No external libraries, analytics, or trackers are used.
(function () {
  'use strict';
  const portrait = document.getElementById('portrait');
  const hero = document.querySelector('.hero');
  const img = portrait && portrait.querySelector('img');
  if (!portrait || !hero || !img) return;

  function showPortrait() {
    if (!img.naturalWidth) return;
    portrait.classList.add('is-loaded');
    hero.classList.add('has-portrait');
  }
  function hidePortrait() {
    portrait.classList.remove('is-loaded');
    hero.classList.remove('has-portrait');
  }

  img.addEventListener('load', showPortrait);
  img.addEventListener('error', hidePortrait);
  if (img.complete) {
    if (img.naturalWidth) showPortrait();
    else hidePortrait();
  }
})();
