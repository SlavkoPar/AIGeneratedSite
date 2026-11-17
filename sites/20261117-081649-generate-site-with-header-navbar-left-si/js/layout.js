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

  document.getElementById('site-header').innerHTML =
    '<h1>My Site</h1><p>Fresh fruit and vegetables</p>';

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
