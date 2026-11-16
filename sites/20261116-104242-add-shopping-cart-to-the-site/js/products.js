(function () {
  'use strict';
  var Shop = window.Shop = window.Shop || {};

  Shop.products = [
    { id: 'mug-moss', name: 'Moss Mug', price: 2800, shape: 'mug', color: '#5f7f63', bg: '#e6ecdf', desc: 'A 12 oz mug with a matte green glaze.' },
    { id: 'mug-clay', name: 'Terracotta Mug', price: 2600, shape: 'mug', color: '#b9603a', bg: '#f3e3d3', desc: 'Warm, earthy and comfortable to hold.' },
    { id: 'vase-dusk', name: 'Dusk Vase', price: 5400, shape: 'vase', color: '#4c5f7a', bg: '#e2e7ee', desc: 'A rounded bud vase in deep blue.' },
    { id: 'vase-sand', name: 'Sand Vase', price: 4800, shape: 'vase', color: '#c2a878', bg: '#f2ecdf', desc: 'Speckled sand glaze, 8 inches tall.' },
    { id: 'bowl-oat', name: 'Oat Bowl', price: 3200, shape: 'bowl', color: '#a58d6b', bg: '#efe8db', desc: 'Just right for breakfast or ramen.' },
    { id: 'bowl-fern', name: 'Fern Bowl', price: 3400, shape: 'bowl', color: '#2f5d50', bg: '#dfeae5', desc: 'A deep serving bowl in forest green.' },
    { id: 'plate-ash', name: 'Ash Plate', price: 2400, shape: 'plate', color: '#6f7672', bg: '#e8ebe9', desc: 'A 10 inch dinner plate, soft grey.' },
    { id: 'plate-rose', name: 'Rose Plate', price: 2400, shape: 'plate', color: '#b5727a', bg: '#f4e4e5', desc: 'A dusty pink plate for everyday meals.' }
  ];

  Shop.findProduct = function (id) {
    return Shop.products.find(function (p) { return p.id === id; });
  };

  var shapes = {
    mug: function (c) {
      return '<path d="M130 62h12a20 20 0 0 1 0 40h-12" fill="none" stroke="' + c + '" stroke-width="10"/><rect x="60" y="45" width="72" height="82" rx="10" fill="' + c + '"/><rect x="70" y="55" width="8" height="50" rx="4" fill="#fff" opacity=".25"/>';
    },
    vase: function (c) {
      return '<path d="M85 28h30v18c0 14 28 26 28 54 0 24-18 34-43 34s-43-10-43-34c0-28 28-40 28-54z" fill="' + c + '"/><path d="M74 92c2-12 10-20 16-26" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".25"/>';
    },
    bowl: function (c) {
      return '<path d="M40 68h120c0 38-26 60-60 60s-60-22-60-60z" fill="' + c + '"/><rect x="40" y="64" width="120" height="8" rx="4" fill="#fff" opacity=".3"/>';
    },
    plate: function (c) {
      return '<ellipse cx="100" cy="92" rx="72" ry="26" fill="' + c + '"/><ellipse cx="100" cy="90" rx="50" ry="16" fill="#fff" opacity=".22"/>';
    }
  };

  Shop.art = function (p) {
    return '<svg viewBox="0 0 200 160" aria-hidden="true" focusable="false"><rect width="200" height="160" fill="' + p.bg + '"/><ellipse cx="100" cy="136" rx="62" ry="7" fill="#000" opacity=".1"/>' + shapes[p.shape](p.color) + '</svg>';
  };
})();
