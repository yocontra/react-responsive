var assert = require('chai').assert
var isValidQuery = require('isValidQuery')

describe('isValidQuery', function() {
  it('validates all', function(){
    var q = 'all'
    var v = isValidQuery(q)
    assert.isTrue(v, q)
  })

  it('validates min-device-width', function(){
    var q = '(min-device-width: 1224px)'
    var v = isValidQuery(q)
    assert.isTrue(v, q)
  })

  it('validates max-device-width', function(){
    var q = '(max-device-width: 1224px)'
    var v = isValidQuery(q)
    assert.isTrue(v, q)
  })

  it('validates min-width', function(){
    var q = '(min-width: 768px)'
    var v = isValidQuery(q)
    assert.isTrue(v, q)
  })

  it('validates max-width', function(){
    var q = '(max-width: 768px)'
    var v = isValidQuery(q)
    assert.isTrue(v, q)
  })

  it('validates min-resolution', function(){
    var q = '(min-resolution: 2dppx)'
    var v = isValidQuery(q)
    assert.isTrue(v, q)
  })

  it('validates max-resolution', function(){
    var q = '(max-resolution: 2dppx)'
    var v = isValidQuery(q)
    assert.isTrue(v, q)
  })

  it('validates landscape orientation', function(){
    var q = '(orientation: landscape)'
    var v = isValidQuery(q)
    assert.isTrue(v, q)
  })

  it('validates landscape portrait', function(){
    var q = '(orientation: portrait)'
    var v = isValidQuery(q)
    assert.isTrue(v, q)
  })
})
