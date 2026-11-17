(function () {
  var links = [
    { href: 'index.html', label: 'Home' },
    { href: 'about.html', label: 'About' },
    { href: 'contact.html', label: 'Contact' }
  ];
  var current = location.pathname.split('/').pop() || 'index.html';

  document.getElementById('site-header').innerHTML =
    '<h1>My Site</h1><p>A simple, clean layout</p>';

  var items = links.map(function (l) {
    var active = l.href === current;
    return '<li><a href="' + l.href + '"' + (active ? ' aria-current="page" class="active"' : '') + '>' + l.label + '</a></li>';
  }).join('');
  document.getElementById('site-nav').innerHTML = '<ul>' + items + '</ul>';

  document.getElementById('site-footer').innerHTML =
    '<p>&copy; ' + new Date().getFullYear() + ' My Site. All rights reserved.</p>';
})();
