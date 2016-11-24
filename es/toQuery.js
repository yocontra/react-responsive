import _Object$keys from 'babel-runtime/core-js/object/keys';
import hyphenate from 'hyphenate-style-name';
import mq from './mediaQuery';

var negate = function negate(cond) {
  return 'not ' + cond;
};

function keyVal(k, v) {
  var realKey = hyphenate(k);

  // px shorthand
  if (typeof v === 'number') {
    v = v + 'px';
  }
  if (v === true) {
    return k;
  }
  if (v === false) {
    return negate(k);
  }
  return '(' + realKey + ': ' + v + ')';
}

function join(conds) {
  return conds.join(' and ');
}

export default function (obj) {
  var rules = [];
  _Object$keys(mq.all).forEach(function (k) {
    var v = obj[k];
    if (v != null) {
      rules.push(keyVal(k, v));
    }
  });
  return join(rules);
}
module.exports = exports['default'];
//# sourceMappingURL=toQuery.js.map