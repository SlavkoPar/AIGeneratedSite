(function () {
  var KEY = 'cartItems';
  var lines = [];
  var listeners = [];
  try { lines = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { lines = []; }
  if (!Array.isArray(lines)) lines = [];

  function product(id) {
    var found = null;
    ((window.SHOP && window.SHOP.groups) || []).forEach(function (g) {
      g.items.forEach(function (i) { if (i.id === id) found = i; });
    });
    return found;
  }
  lines = lines.filter(function (l) { return l && product(l.id) && l.qty > 0; });

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch (e) {}
    listeners.forEach(function (fn) { fn(); });
  }
  function clamp(q) { q = Math.round(Number(q)); if (!q || q < 1) return 1; return Math.min(q, 99); }
  function line(id) { return lines.filter(function (l) { return l.id === id; })[0]; }

  window.CART = {
    product: product,
    add: function (id, qty) {
      if (!product(id)) return;
      var l = line(id);
      if (l) l.qty = Math.min(99, l.qty + clamp(qty)); else lines.push({ id: id, qty: clamp(qty) });
      save();
    },
    setQty: function (id, qty) { var l = line(id); if (l) { l.qty = clamp(qty); save(); } },
    remove: function (id) { lines = lines.filter(function (l) { return l.id !== id; }); save(); },
    clear: function () { lines = []; save(); },
    items: function () {
      return lines.map(function (l) { return { item: product(l.id), qty: l.qty }; });
    },
    count: function () { return lines.reduce(function (s, l) { return s + l.qty; }, 0); },
    total: function () {
      return lines.reduce(function (s, l) { return s + product(l.id).price * l.qty; }, 0);
    },
    subscribe: function (fn) { listeners.push(fn); }
  };

  window.addEventListener('storage', function (e) {
    if (e.key !== KEY) return;
    try { lines = JSON.parse(e.newValue || '[]'); } catch (err) { lines = []; }
    listeners.forEach(function (fn) { fn(); });
  });
})();
