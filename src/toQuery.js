'use strict';

var mq = require('./mediaQuery');

function negate(cond) {
  return 'not ' + cond;
}

function keyVal(k, v) {
  // px shorthand
  if (typeof v === 'number') {
    return v+'px';
  }
  return '('+k+': '+v+')';
}

function join(conds) {
  return conds.join(' and ');
}

module.exports = function(obj){
  var out = '';

  // media types
  var types = Object.keys(mq.types).map(function(type){
    var val = obj[type];
    if (val === true) {
      return type;
    }
    if (val === false) {
      return negate(type);
    }
  });

  // TODO: features

  out += join(types);
  return out;
};