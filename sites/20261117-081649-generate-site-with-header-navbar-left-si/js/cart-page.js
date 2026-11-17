(function () {
  var main = document.getElementById('main');
  function money(n) { return '$' + n.toFixed(2); }

  function render(msg) {
    var items = window.CART.items();
    if (!items.length) {
      main.innerHTML = '<h2>Your cart</h2>' + (msg ? '<p role="status">' + msg + '</p>' : '') +
        '<p>Your cart is empty. Pick something from the navigation on the left.</p>' +
        '<p><a class="btn" href="index.html">Continue shopping</a></p>';
      return;
    }
    var body = items.map(function (l) {
      var i = l.item;
      return '<tr data-id="' + i.id + '">' +
        '<td><a class="cart-item" href="item.html?id=' + i.id + '"><span class="nav-icon big">' + i.icon + '</span><span>' + i.name + '</span></a></td>' +
        '<td>' + money(i.price) + ' <small>/ ' + i.unit + '</small></td>' +
        '<td><div class="qty-ctl">' +
        '<button type="button" class="qbtn" data-action="dec" aria-label="Decrease quantity of ' + i.name + '">\u2212</button>' +
        '<input type="number" min="1" max="99" value="' + l.qty + '" data-action="set" aria-label="Quantity of ' + i.name + '">' +
        '<button type="button" class="qbtn" data-action="inc" aria-label="Increase quantity of ' + i.name + '">+</button></div></td>' +
        '<td class="num">' + money(i.price * l.qty) + '</td>' +
        '<td><button type="button" class="link-btn" data-action="remove" aria-label="Remove ' + i.name + ' from cart">Remove</button></td></tr>';
    }).join('');
    main.innerHTML = '<h2>Your cart</h2>' + (msg ? '<p role="status">' + msg + '</p>' : '') +
      '<div class="table-wrap"><table class="cart-table"><thead><tr><th scope="col">Item</th><th scope="col">Price</th><th scope="col">Quantity</th><th scope="col" class="num">Subtotal</th><th scope="col"><span class="sr-only">Actions</span></th></tr></thead><tbody>' + body + '</tbody></table></div>' +
      '<div class="cart-summary"><p class="cart-total">Total: <strong>' + money(window.CART.total()) + '</strong></p>' +
      '<div class="cart-actions"><button type="button" class="btn secondary" data-action="clear">Empty cart</button>' +
      '<button type="button" class="btn" data-action="checkout">Checkout</button></div></div>';
  }

  function focusRow(id, sel) {
    var el = main.querySelector('tr[data-id="' + id + '"] ' + sel);
    if (el) el.focus();
  }

  main.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-action]');
    if (!btn || btn.tagName === 'INPUT') return;
    var row = btn.closest('tr');
    var id = row && row.dataset.id;
    var act = btn.dataset.action;
    var cur = id ? Number(row.querySelector('input').value) || 1 : 0;
    if (act === 'inc') { window.CART.setQty(id, cur + 1); render(); focusRow(id, '[data-action="inc"]'); }
    else if (act === 'dec') { window.CART.setQty(id, cur - 1); render(); focusRow(id, '[data-action="dec"]'); }
    else if (act === 'remove') { window.CART.remove(id); render('Item removed.'); }
    else if (act === 'clear') { window.CART.clear(); render('Cart emptied.'); }
    else if (act === 'checkout') {
      var total = money(window.CART.total());
      window.CART.clear();
      render('Thank you! This is a demo shop, so no real order was placed (total was ' + total + ').');
    }
  });

  main.addEventListener('change', function (e) {
    var input = e.target;
    if (input.dataset.action !== 'set') return;
    var id = input.closest('tr').dataset.id;
    window.CART.setQty(id, input.value);
    render();
    focusRow(id, 'input');
  });

  render();
  window.addEventListener('storage', function () { render(); });
})();
