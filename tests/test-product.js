const test = require('tape');
const product = require('../index').product;
test('product works', t => {
  let protocols = [ 'http:/', 'https:/' ];
  let cdns = [ 'cdn1.com', 'cdn2.org', 'cdn3.net' ];
  let versions = [ 1, 2, 3, 4 ];

  let iter = product(protocols, cdns, versions);
  let all = Array.from(iter, pieces => pieces.join('/'));

  t.equal(all.length, protocols.length * cdns.length * versions.length);
  t.ok(all.indexOf('https://cdn2.org/3') >= 0);
  t.ok(all.indexOf('http://cdn3.net/1') >= 0);
  t.ok(all.indexOf('http://cdn1.com/4') >= 0);

  t.end();
});
