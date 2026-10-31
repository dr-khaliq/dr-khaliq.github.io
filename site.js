/* Small progressive enhancements only: photo fallback and publication filter. */
document.addEventListener('DOMContentLoaded', () => {
  const portrait = document.querySelector('.portrait');
  if (portrait) {
    const showFallback = () => portrait.classList.add('is-missing');
    portrait.addEventListener('error', showFallback);
    if (portrait.complete && portrait.naturalWidth === 0) showFallback();
  }
  const search = document.getElementById('publication-search');
  if (!search) return;
  const rows = [...document.querySelectorAll('#journal-articles .biblio > li')];
  const status = document.getElementById('search-status');
  const filter = () => {
    const term = search.value.trim().toLocaleLowerCase();
    let count = 0;
    rows.forEach(row => {
      row.hidden = !row.textContent.toLocaleLowerCase().includes(term);
      if (!row.hidden) count++;
    });
    if (status) status.textContent = term ? `${count} publication${count === 1 ? '' : 's'} found` : `${rows.length} journal articles`;
  };
  search.addEventListener('input', filter);
  filter();
});
