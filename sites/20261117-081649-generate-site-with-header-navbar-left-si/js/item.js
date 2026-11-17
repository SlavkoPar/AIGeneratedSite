(function () {
  var main = document.getElementById('main');
  var id = new URLSearchParams(location.search).get('id');
  var found = null, groupName = '';
  ((window.SHOP && window.SHOP.groups) || []).forEach(function (g) {
    g.items.forEach(function (i) { if (i.id === id) { found = i; groupName = g.name; } });
  });

  if (!found) {
    document.title = 'Not found – My Site';
    main.innerHTML = '<h2>Item not found</h2><p>Please choose an item from the navigation.</p>';
    return;
  }

  document.title = found.name + ' – My Site';
  var rows = [
    ['Category', groupName],
    ['Price', '$' + found.price.toFixed(2) + ' / ' + found.unit],
    ['Origin', found.origin],
    ['Calories', found.calories + ' kcal per 100 g'],
    ['Season', found.season],
    ['Colour', found.color]
  ];
  main.innerHTML =
    '<article class="product">' +
    '<div class="product-icon">' + found.icon + '</div>' +
    '<div><h2>' + found.name + '</h2><p>' + found.description + '</p>' +
    '<p class="price">$' + found.price.toFixed(2) + ' <small>/ ' + found.unit + '</small></p>' +
    '<dl class="specs">' + rows.map(function (r) {
      return '<div><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>';
    }).join('') + '</dl></div></article>';
})();
