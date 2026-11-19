(function () {
  const links = [
    ['index.html', 'Home'],
    ['about.html', 'About'],
    ['contact.html', 'Contact']
  ];
  const current = document.body.dataset.page;

  const skip = document.createElement('a');
  skip.href = '#main';
  skip.className = 'skip';
  skip.textContent = 'Skip to content';
  document.body.prepend(skip);

  document.getElementById('site-header').outerHTML =
    '<header class="site-header"><button class="menu-btn" aria-expanded="false" aria-controls="site-nav">☰ Menu</button><a class="brand" href="index.html">My Site</a><span class="tag">Simple &amp; clean</span></header>';

  const nav = document.getElementById('site-nav');
  nav.innerHTML = '<nav aria-label="Main"><ul>' + links.map(function (l) {
    return '<li><a href="' + l[0] + '"' + (l[0] === current ? ' aria-current="page"' : '') + '>' + l[1] + '</a></li>';
  }).join('') + '</ul></nav>';

  document.getElementById('site-footer').outerHTML =
    '<footer class="site-footer"><p>© ' + new Date().getFullYear() + ' My Site. All rights reserved.</p></footer>';

  const btn = document.querySelector('.menu-btn');
  btn.addEventListener('click', function () {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
})();