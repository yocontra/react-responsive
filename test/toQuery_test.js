var assert = require('chai').assert;
var toQuery = require('toQuery');

describe('toQuery', function() {
  it('makes number rules', function() {
    const q = toQuery({minWidth: 760});
    assert.equal(q, '(min-width: 760px)');
  });
  it('makes true rules', function() {
    const q = toQuery({all: true});
    assert.equal(q, 'all');
  });
  it('makes negative rules', function() {
    const q = toQuery({all: false});
    assert.equal(q, 'not all');
  });
  it('makes regular rules', function() {
    const q = toQuery({orientation: 'portrait'});
    assert.equal(q, '(orientation: portrait)');
  });
  it('handles multiple rules', function() {
    const q = toQuery({orientation: 'portrait', minWidth: 760});
    assert.equal(q, '(min-width: 760px) and (orientation: portrait)');
  });
});
