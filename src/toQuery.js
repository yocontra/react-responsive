'use strict';

var hyphenate = require('hyphenate-style-name');
var mq = require('./mediaQuery');

function negate(cond) {
  return 'not ' + cond;
}

function keyVal(k, v) {
  var realKey = hyphenate(k);

  // px shorthand
  if (typeof v === 'number') {
    v = v+'px';
  }
  if (v === true) {
    return k;
  }
  if (v === false) {
    return negate(k);
  }
  return '('+realKey+': '+v+')';
}

function join(conds) {
  return conds.join(' and ');
}

module.exports = function(obj){
  var rules = [];
  Object.keys(mq.all).forEach(function(k){
    var v = obj[k];
    if (v != null) {
      rules.push(keyVal(k, v));
    }
  });
  return join(rules);
};
