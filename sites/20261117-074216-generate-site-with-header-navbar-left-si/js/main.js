(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('sidenav');
  var backdrop = document.querySelector('.backdrop');
  var mobile = window.matchMedia('(max-width: 799px)');

  /* Navigation groups: remember which ones are expanded or collapsed */
  function readState(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function writeState(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* storage unavailable */ }
  }

  document.querySelectorAll('.nav-group').forEach(function (group) {
    var key = 'nav-group-' + (group.getAttribute('data-group') || '');
    var stored = readState(key);
    var hasCurrent = !!group.querySelector('[aria-current="page"]');

    if (hasCurrent) {
      group.open = true;
    } else if (stored === 'closed') {
      group.open = false;
    } else if (stored === 'open') {
      group.open = true;
    }

    group.addEventListener('toggle', function () {
      writeState(key, group.open ? 'open' : 'closed');
    });
  });

  /* Mobile drawer */
  function setOpen(open) {
    if (!toggle || !nav) { return; }
    nav.classList.toggle('open', open);
    if (backdrop) { backdrop.classList.toggle('show', open); }
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }

  function isOpen() {
    return !!nav && nav.classList.contains('open');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = !isOpen();
      setOpen(open);
      if (open) {
        var first = nav.querySelector('a');
        if (first) { first.focus(); }
      }
    });

    if (backdrop) {
      backdrop.addEventListener('click', function () { setOpen(false); });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { setOpen(false); }
    });

    var onChange = function () {
      if (!mobile.matches) { setOpen(false); }
    };
    if (mobile.addEventListener) {
      mobile.addEventListener('change', onChange);
    } else if (mobile.addListener) {
      mobile.addListener(onChange);
    }
  }

  var year = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = year;
  });
})();
