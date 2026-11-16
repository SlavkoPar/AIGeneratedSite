(function () {
  'use strict';
  var Shop = window.Shop;
  var grid = document.querySelector('[data-products]');
  if (!grid || !Shop) return;

  grid.innerHTML = Shop.products.map(function (p) {
    return '<li class="card">' + Shop.art(p) +
      '<div class="card-body"><h3>' + p.name + '</h3><p>' + p.desc + '</p>' +
      '<div class="card-foot"><span class="price">' + Shop.money(p.price) + '</span>' +
      '<button type="button" class="btn" data-add="' + p.id + '" aria-label="Add ' + p.name + ' to cart">Add to cart</button></div></div></li>';
  }).join('');

  grid.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-add]');
    if (!btn) return;
    var p = Shop.findProduct(btn.dataset.add);
    if (!p) return;
    Shop.cart.add(p.id, 1);
    Shop.announce(p.name + ' added to cart (' + Shop.cart.count() + ' in cart)');
    btn.textContent = 'Added ✓';
    clearTimeout(btn._t);
    btn._t = setTimeout(function () { btn.textContent = 'Add to cart'; }, 1500);
  });
})();
