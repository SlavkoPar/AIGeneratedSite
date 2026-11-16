(function () {
  'use strict';
  var Shop = window.Shop;
  if (!Shop || !Shop.cart) return;
  var cart = Shop.cart;
  var aside = document.querySelector('[data-cart-aside]');
  var actions = document.querySelector('[data-cart-actions]');
  var clearBtn = document.querySelector('[data-cart-clear]');
  var form = document.querySelector('[data-checkout]');
  var view = document.querySelector('[data-cart-view]');
  var confirm = document.querySelector('[data-confirm]');

  function sync() {
    var empty = cart.count() === 0;
    if (aside) aside.hidden = empty;
    if (actions) actions.hidden = empty;
  }
  cart.onChange(sync);
  sync();

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      cart.clear();
      Shop.announce('Cart emptied');
      var lines = document.querySelector('[data-cart-lines]');
      if (lines) lines.focus();
    });
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (cart.count() === 0) return;
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var name = form.elements.name.value.trim().split(/\s+/)[0] || 'there';
      var count = cart.count();
      var total = Shop.money(cart.total());
      var orderNo = 'FK-' + Math.floor(100000 + Math.random() * 900000);
      document.querySelector('[data-confirm-text]').textContent =
        'Thanks, ' + name + '. Your demo order ' + orderNo + ' for ' + count + (count === 1 ? ' item' : ' items') +
        ' totalling ' + total + ' has been recorded. No payment was taken and nothing will be shipped.';
      cart.clear();
      form.reset();
      view.hidden = true;
      confirm.hidden = false;
      document.querySelector('[data-confirm-title]').focus();
      window.scrollTo(0, 0);
    });
  }
})();
