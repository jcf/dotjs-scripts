(function () {
  'use strict';

  function parsePrice(s) {
    var parts = s
          .replace(',', '')
          .replace('$', '')
          .split('.', 2);
    if (parts && parts.length === 2) {
      var dollars = parseInt(parts[0], 10) * 100;
      var cents = parseInt(parts[1], 10);
      return dollars + cents;
    } else {
      throw('Failed to parse ' + price);
    }
  }

  function getApp(node) {
    var $node = $(node);
    var price = $node.find('.app-total').text();
    return {
      title: $node.find('.title').text(),
      price: price,
      cents: parsePrice(price)
    };
  }

  function main () {
    var report = $('.app-title').map(function (i) {
      var app = getApp(this);
      return app.title + "\t" + app.price;
    }).get().join("\n");

    $('body').append(
      '<div class="wrapper"><pre style="font-family: monospace;"><code>' +
        report +
        '</code></pre></div>'
    );
  }

  var pattern = new RegExp('/orgs/\\w+/invoices/\\d{4}/\\d{2}');
  if (location.pathname.match(pattern)) {
    main();
  }
})();
