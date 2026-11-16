(function () {
  'use strict';
  var Shop = window.Shop = window.Shop || {};
  var KEY = 'fern-kiln-cart-v1';
  var FREE_SHIPPING_AT = 7500;
  var SHIPPING = 600;
  var MAX_QTY = 99;
  var items = {};
  var listeners = [];
  var fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  Shop.money = function (cents) { return fmt.format(cents / 100); };

  function load() {
    items = {};
    try {
      var raw = JSON.parse(localStorage.getItem(KEY) || '{}') || {};
      Shop.products.forEach(function (p) {
        var q = parseInt(raw[p.id], 10);
        if (q > 0) items[p.id] = Math.min(q, MAX_QTY);
      });
    } catch (e) { items = {}; }
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) { /* storage unavailable */ }
  }

  function notify() { listeners.forEach(function (fn) { fn(); }); }
  function changed() { save(); notify(); }

  var cart = Shop.cart = {
    add: function (id, qty) {
      if (!Shop.findProduct(id)) return;
      items[id] = Math.min((items[id] || 0) + (qty || 1), MAX_QTY);
      changed();
    },
    setQty: function (id, qty) {
      if (qty <= 0) delete items[id];
      else items[id] = Math.min(qty, MAX_QTY);
      changed();
    },
    remove: function (id) { delete items[id]; changed(); },
    clear: function () { items = {}; changed(); },
    qty: function (id) { return items[id] || 0; },
    lines: function () {
      return Shop.products.filter(function (p) { return items[p.id]; }).map(function (p) {
        return { product: p, qty: items[p.id], total: p.price * items[p.id] };
      });
    },
    count: function () {
      return Object.keys(items).reduce(function (n, id) { return n + items[id]; }, 0);
    },
    subtotal: function () {
      return cart.lines().reduce(function (n, l) { return n + l.total; }, 0);
    },
    shipping: function () {
      var s = cart.subtotal();
      return s === 0 || s >= FREE_SHIPPING_AT ? 0 : SHIPPING;
    },
    total: function () { return cart.subtotal() + cart.shipping(); },
    onChange: function (fn) { listeners.push(fn); }
  };

  var toastTimer;
  Shop.announce = function (msg) {
    var t = document.querySelector('[data-toast]');
    if (!t) return;
    t.textContent = '';
    clearTimeout(toastTimer);
    setTimeout(function () {
      t.textContent = msg;
      t.classList.add('show');
      toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2600);
    }, 30);
  };

  function setText(sel, text) {
    document.querySelectorAll(sel).forEach(function (el) { el.textContent = text; });
  }

  function renderSummary() {
    var count = cart.count();
    var sub = cart.subtotal();
    setText('[data-cart-count]', String(count));
    document.querySelectorAll('.cart-btn').forEach(function (el) {
      el.setAttribute('aria-label', 'Cart, ' + count + (count === 1 ? ' item' : ' items'));
    });
    setText('[data-cart-subtotal]', Shop.money(sub));
    setText('[data-cart-shipping]', cart.shipping() === 0 ? (sub ? 'Free' : Shop.money(0)) : Shop.money(cart.shipping()));
    setText('[data-cart-total]', Shop.money(cart.total()));
    var note = '';
    if (sub > 0 && sub < FREE_SHIPPING_AT) note = 'Add ' + Shop.money(FREE_SHIPPING_AT - sub) + ' more for free shipping.';
    else if (sub >= FREE_SHIPPING_AT) note = 'You qualify for free shipping.';
    setText('[data-cart-shipnote]', note);
  }

  function renderLines(container) {
    var active = document.activeElement;
    var key = active && container.contains(active) && active.dataset.act ? [active.dataset.act, active.dataset.id] : null;
    var lines = cart.lines();
    if (!lines.length) {
      container.innerHTML = '<p class="empty">Your cart is empty. <a href="index.html">Browse the shop</a>.</p>';
    } else {
      container.innerHTML = '<ul class="lines">' + lines.map(function (l) {
        var p = l.product;
        return '<li class="line"><div class="line-art">' + Shop.art(p) + '</div>' +
          '<div><h3>' + p.name + '</h3><p class="line-price">' + Shop.money(p.price) + ' each</p>' +
          '<div class="qty"><button type="button" data-act="dec" data-id="' + p.id + '" aria-label="Decrease quantity of ' + p.name + '">−</button>' +
          '<span class="qty-n"><span class="sr" hidden>Quantity </span>' + l.qty + '</span>' +
          '<button type="button" data-act="inc" data-id="' + p.id + '" aria-label="Increase quantity of ' + p.name + '">+</button></div></div>' +
          '<div class="line-end"><strong>' + Shop.money(l.total) + '</strong>' +
          '<button type="button" class="link" data-act="remove" data-id="' + p.id + '" aria-label="Remove ' + p.name + ' from cart">Remove</button></div></li>';
      }).join('') + '</ul>';
    }
    if (key) {
      var el = container.querySelector('[data-act="' + key[0] + '"][data-id="' + key[1] + '"]');
      (el || container).focus();
    }
  }

  function mountLines(container) {
    container.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-act]');
      if (!btn) return;
      var id = btn.dataset.id;
      var p = Shop.findProduct(id);
      if (!p) return;
      var q = cart.qty(id);
      if (btn.dataset.act === 'inc') {
        cart.setQty(id, q + 1);
        Shop.announce(p.name + ' quantity: ' + cart.qty(id));
      } else if (btn.dataset.act === 'dec') {
        cart.setQty(id, q - 1);
        Shop.announce(q - 1 > 0 ? p.name + ' quantity: ' + (q - 1) : p.name + ' removed from cart');
      } else if (btn.dataset.act === 'remove') {
        cart.remove(id);
        Shop.announce(p.name + ' removed from cart');
      }
    });
    cart.onChange(function () { renderLines(container); });
    renderLines(container);
  }

  function initDrawer() {
    var drawer = document.getElementById('cart-drawer');
    if (!drawer || typeof drawer.showModal !== 'function') return;
    Shop.openCart = function () { if (!drawer.open) drawer.showModal(); };
    document.querySelectorAll('[data-cart-open]').forEach(function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); Shop.openCart(); });
    });
    drawer.querySelectorAll('[data-cart-close]').forEach(function (el) {
      el.addEventListener('click', function () { drawer.close(); });
    });
    drawer.addEventListener('click', function (e) { if (e.target === drawer) drawer.close(); });
  }

  load();
  document.querySelectorAll('[data-cart-lines]').forEach(mountLines);
  cart.onChange(renderSummary);
  renderSummary();
  initDrawer();

  window.addEventListener('storage', function (e) {
    if (e.key === KEY || e.key === null) { load(); notify(); }
  });
})();
