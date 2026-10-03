(function () {
  const menuBtn = document.querySelector('[data-menu-btn]');
  const nav = document.querySelector('[data-nav]');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.textContent = open ? 'Close' : 'Menu';
      menuBtn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav && nav.classList.contains('open')) { menuBtn.click(); menuBtn.focus(); }
  });

  const pubButtons = document.querySelectorAll('[data-pubfilter]');
  const pubGroups = document.querySelectorAll('[data-pubgroup]');
  const search = document.getElementById('publication-search');
  function filterPublications() {
    const filter = document.querySelector('[data-pubfilter].active')?.dataset.pubfilter || 'all';
    const query = search ? search.value.trim().toLowerCase() : '';
    let total = 0;
    pubGroups.forEach(function (group) {
      let count = 0;
      group.querySelectorAll('.pub-item').forEach(function (item) {
        const match = (filter === 'all' || group.dataset.pubgroup === filter) && item.textContent.toLowerCase().includes(query);
        item.hidden = !match;
        if (match) count++;
      });
      group.classList.toggle('is-hidden', count === 0);
      total += count;
    });
    const count = document.getElementById('search-count');
    if (count) count.textContent = total + (total === 1 ? ' publication' : ' publications');
    document.getElementById('no-results')?.classList.toggle('is-hidden', total !== 0);
  }
  pubButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      pubButtons.forEach(function (b) {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      filterPublications();
    });
  });
  if (search) {
    search.value = new URLSearchParams(window.location.search).get('q') || '';
    filterPublications();
    search.addEventListener('input', filterPublications);
  }

  const roleButtons = document.querySelectorAll('[data-rolefilter]');
  const courseRows = document.querySelectorAll('[data-course-role]');
  const tableCount = document.getElementById('tableCount');
  roleButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      roleButtons.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      const filter = btn.dataset.rolefilter;
      let shown = 0;
      courseRows.forEach(function (row) {
        const hidden = filter !== 'all' && row.dataset.courseRole !== filter;
        row.classList.toggle('is-hidden', hidden);
        if (!hidden) shown += 1;
      });
      if (tableCount) tableCount.textContent = 'Showing ' + shown + ' of ' + courseRows.length + ' sections';
    });
  });

  const quoteText = document.getElementById('quoteText');
  const quoteCount = document.getElementById('quoteCount');
  const quoteList = document.getElementById('quoteList');
  const showQuotes = document.getElementById('showQuotes');
  const prevQuote = document.getElementById('prevQuote');
  const nextQuote = document.getElementById('nextQuote');
  if (quoteText) {
    const comments = [
      "It's refreshing to see someone that gives a darn.",
      "You have an inspiring story that puts my privilege into perspective and motivates me to use the opportunities I have been given.",
      "It is clearly evident how much you care about our success as your students.",
      "I appreciate the effort you put towards our class, and towards sharing your story with your students.",
      "I deeply appreciated the message you conveyed through your personal experiences.",
      "The most engaged, personal, brilliant and connected-with-students professor I have ever encountered.",
      "The instructor's enthusiasm for the subject and the care for his students' well-being really came through.",
      "Very organized course and offered a very welcoming atmosphere.",
      "Cares the most about his students' success over any other teacher that I have.",
      "He is genuine and has an incredible life story and a great view on hard work.",
      "Does a good job trying to engage all students despite how checked out they may be.",
      "Instructor was incredibly respectful with us students.",
      "His instructions were very clear and concise while also being consistent.",
      "He's a very patient and kind teacher.",
      "I did learn a lot in this course.",
      "The instructor was always very helpful and supportive.",
      "Always had an engaging class.",
      "His presentations were always prepared — it was obvious he knew the material extremely well.",
      "Course was well-structured and well-planned.",
      "If anyone ever asks for a macroeconomics instructor, professor Khaliq will be my go-to!"
    ];
    let quoteIndex = 0;
    function renderQuote() {
      quoteText.textContent = comments[quoteIndex];
      if (quoteCount) quoteCount.textContent = (quoteIndex + 1) + ' / ' + comments.length;
    }
    renderQuote();
    if (prevQuote) prevQuote.addEventListener('click', function () {
      quoteIndex = (quoteIndex - 1 + comments.length) % comments.length;
      renderQuote();
    });
    if (nextQuote) nextQuote.addEventListener('click', function () {
      quoteIndex = (quoteIndex + 1) % comments.length;
      renderQuote();
    });
    if (quoteList) {
      comments.forEach(function (comment) {
        const block = document.createElement('blockquote');
        block.textContent = '“' + comment + '”';
        quoteList.appendChild(block);
      });
    }
    if (showQuotes && quoteList) {
      showQuotes.addEventListener('click', function () {
        const hidden = quoteList.classList.toggle('is-hidden');
        showQuotes.textContent = hidden ? 'Show all student comments' : 'Hide student comments';
        showQuotes.setAttribute('aria-expanded', String(!hidden));
      });
    }
  }

  let toastTimer;
  const toast = document.getElementById('toast');
  document.querySelectorAll('[data-cite]').forEach(function (btn) {
    btn.addEventListener('click', async function () {
      try {
        await navigator.clipboard.writeText(btn.dataset.cite);
        if (toast) {
          toast.textContent = 'Citation copied';
          toast.classList.add('show');
          clearTimeout(toastTimer);
          toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 1800);
        }
      } catch (err) {
        window.prompt('Copy citation:', btn.dataset.cite);
      }
    });
  });
})();
