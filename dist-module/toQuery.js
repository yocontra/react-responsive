"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _hyphenateStyleName = _interopRequireDefault(require("hyphenate-style-name"));

var _mediaQuery = _interopRequireDefault(require("./mediaQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var negate = function negate(cond) {
  return "not ".concat(cond);
};

var keyVal = function keyVal(k, v) {
  var realKey = (0, _hyphenateStyleName["default"])(k); // px shorthand

  if (typeof v === 'number') {
    v = "".concat(v, "px");
  }

  if (v === true) {
    return realKey;
  }

  if (v === false) {
    return negate(realKey);
  }

  return "(".concat(realKey, ": ").concat(v, ")");
};

var join = function join(conds) {
  return conds.join(' and ');
};

var _default = function _default(obj) {
  var rules = [];
  Object.keys(_mediaQuery["default"].all).forEach(function (k) {
    var v = obj[k];

    if (v != null) {
      rules.push(keyVal(k, v));
    }
  });
  return join(rules);
};

exports["default"] = _default;
module.exports = exports.default;
//# sourceMappingURL=toQuery.js.map