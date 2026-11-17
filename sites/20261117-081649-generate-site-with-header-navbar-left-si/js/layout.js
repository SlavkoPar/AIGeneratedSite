(function () {
  var groups = (window.SHOP && window.SHOP.groups) || [];
  var page = location.pathname.split('/').pop() || 'index.html';
  var params = new URLSearchParams(location.search);
  var currentItem = page === 'item.html' ? params.get('id') : null;
  var KEY = 'navGroups';
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) {}

  function link(href, label, active, icon) {
    return '<a href="' + href + '"' + (active ? ' aria-current="page" class="active"' : '') + '>' +
      (icon ? '<span class="nav-icon">' + icon + '</span>' : '') + '<span>' + label + '</span></a>';
  }

  var cartIcon = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 12.4a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L21 7H6"/></svg>';

  document.getElementById('site-header').innerHTML =
    '<div><h1>My Site</h1><p>Fresh fruit and vegetables</p></div>' +
    '<a class="cart-link" href="cart.html"' + (page === 'cart.html' ? ' aria-current="page"' : '') + '>' +
    cartIcon + '<span>Cart</span><span class="badge" id="cart-count">0</span>' +
    '<span class="sr-only" id="cart-count-label"> items</span></a>';

  function updateCount() {
    var n = window.CART ? window.CART.count() : 0;
    var el = document.getElementById('cart-count');
    el.textContent = n;
    el.classList.toggle('empty', n === 0);
    document.getElementById('cart-count-label').textContent = n === 1 ? ' item' : ' items';
  }
  updateCount();
  if (window.CART) window.CART.subscribe(updateCount);

  var html = '<ul class="nav-list">' + '<li>' + link('index.html', 'Home', page === 'index.html') + '</li>';

  groups.forEach(function (g) {
    var hasCurrent = g.items.some(function (i) { return i.id === currentItem; });
    var open = hasCurrent || saved[g.id] !== false;
    html += '<li class="nav-group">' +
      '<button type="button" class="group-toggle" aria-expanded="' + open + '" aria-controls="grp-' + g.id + '" data-group="' + g.id + '">' +
      '<span>' + g.name + '</span><span class="chev" aria-hidden="true"></span></button>' +
      '<ul id="grp-' + g.id + '" class="group-items"' + (open ? '' : ' hidden') + '>' +
      g.items.map(function (i) {
        return '<li>' + link('item.html?id=' + i.id, i.name, i.id === currentItem, i.icon) + '</li>';
      }).join('') + '</ul></li>';
  });

  html += '<li>' + link('cart.html', 'Cart', page === 'cart.html') + '</li>';
  html += '<li>' + link('about.html', 'About', page === 'about.html') + '</li>';
  html += '<li>' + link('contact.html', 'Contact', page === 'contact.html') + '</li></ul>';
  document.getElementById('site-nav').innerHTML = html;

  document.getElementById('site-nav').addEventListener('click', function (e) {
    var btn = e.target.closest('.group-toggle');
    if (!btn) return;
    var open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    document.getElementById(btn.getAttribute('aria-controls')).hidden = open;
    saved[btn.dataset.group] = !open;
    try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (err) {}
  });

  document.getElementById('site-footer').innerHTML =
    '<p>&copy; ' + new Date().getFullYear() + ' My Site. All rights reserved.</p>';
})();
