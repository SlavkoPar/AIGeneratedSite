(function () {
  'use strict';

  var root = document.documentElement;
  var body = document.body;
  var navToggle = document.getElementById('navToggle');
  var sidebar = document.getElementById('sidebar');
  var backdrop = document.getElementById('backdrop');
  var themeToggle = document.getElementById('themeToggle');

  /* ---------- Theme ---------- */
  function readTheme() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
  }
  var saved = readTheme();
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  themeToggle.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
  });

  /* ---------- Mobile navigation drawer ---------- */
  function setNav(open) {
    body.classList.toggle('nav-open', open);
    backdrop.hidden = !open;
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  }
  navToggle.addEventListener('click', function () {
    var open = !body.classList.contains('nav-open');
    setNav(open);
    if (open) {
      var first = sidebar.querySelector('a');
      if (first) { window.setTimeout(function () { first.focus(); }, 60); }
    }
  });
  backdrop.addEventListener('click', function () { setNav(false); });
  sidebar.addEventListener('click', function (e) {
    if (e.target.closest('a')) { setNav(false); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && body.classList.contains('nav-open')) {
      setNav(false);
      navToggle.focus();
    }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 860 && body.classList.contains('nav-open')) { setNav(false); }
  });

  /* ---------- Highlight current section in the sidebar ---------- */
  var links = Array.prototype.slice.call(sidebar.querySelectorAll('a[href^=\'#\']'));
  function setCurrent(id) {
    links.forEach(function (link) {
      if (link.getAttribute('href') === '#' + id) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }
  var sections = links.map(function (link) {
    return document.getElementById(link.getAttribute('href').slice(1));
  }).filter(Boolean);

  if (sections.length) { setCurrent(sections[0].id); }
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { setCurrent(entry.target.id); }
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- Contact form (demo only) ---------- */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstInvalid = null;
      Array.prototype.forEach.call(form.querySelectorAll('input, textarea'), function (field) {
        var ok = field.value.trim() !== '' && field.checkValidity();
        if (ok) { field.removeAttribute('aria-invalid'); } else {
          field.setAttribute('aria-invalid', 'true');
          if (!firstInvalid) { firstInvalid = field; }
        }
      });
      if (firstInvalid) {
        status.textContent = 'Please fill in every field with valid details.';
        firstInvalid.focus();
        return;
      }
      status.textContent = 'Thanks! This is a demo form, so nothing was actually sent.';
      form.reset();
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) { year.textContent = String(new Date().getFullYear()); }
})();
