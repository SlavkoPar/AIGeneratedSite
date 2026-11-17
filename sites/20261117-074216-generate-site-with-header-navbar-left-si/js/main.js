(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('sidenav');
  var backdrop = document.querySelector('.backdrop');
  var mobile = window.matchMedia('(max-width: 799px)');

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
