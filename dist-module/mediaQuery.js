"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var stringOrNumber = _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]); // properties that match media queries


var matchers = {
  orientation: _propTypes["default"].oneOf(['portrait', 'landscape']),
  scan: _propTypes["default"].oneOf(['progressive', 'interlace']),
  aspectRatio: _propTypes["default"].string,
  deviceAspectRatio: _propTypes["default"].string,
  height: stringOrNumber,
  deviceHeight: stringOrNumber,
  width: stringOrNumber,
  deviceWidth: stringOrNumber,
  color: _propTypes["default"].bool,
  colorIndex: _propTypes["default"].bool,
  monochrome: _propTypes["default"].bool,
  resolution: stringOrNumber
}; // media features

var features = _objectSpread({
  minAspectRatio: _propTypes["default"].string,
  maxAspectRatio: _propTypes["default"].string,
  minDeviceAspectRatio: _propTypes["default"].string,
  maxDeviceAspectRatio: _propTypes["default"].string,
  minHeight: stringOrNumber,
  maxHeight: stringOrNumber,
  minDeviceHeight: stringOrNumber,
  maxDeviceHeight: stringOrNumber,
  minWidth: stringOrNumber,
  maxWidth: stringOrNumber,
  minDeviceWidth: stringOrNumber,
  maxDeviceWidth: stringOrNumber,
  minColor: _propTypes["default"].number,
  maxColor: _propTypes["default"].number,
  minColorIndex: _propTypes["default"].number,
  maxColorIndex: _propTypes["default"].number,
  minMonochrome: _propTypes["default"].number,
  maxMonochrome: _propTypes["default"].number,
  minResolution: stringOrNumber,
  maxResolution: stringOrNumber
}, matchers); // media types


var types = {
  all: _propTypes["default"].bool,
  grid: _propTypes["default"].bool,
  aural: _propTypes["default"].bool,
  braille: _propTypes["default"].bool,
  handheld: _propTypes["default"].bool,
  print: _propTypes["default"].bool,
  projection: _propTypes["default"].bool,
  screen: _propTypes["default"].bool,
  tty: _propTypes["default"].bool,
  tv: _propTypes["default"].bool,
  embossed: _propTypes["default"].bool
};

var all = _objectSpread({}, types, {}, features); // add the type property


matchers.type = Object.keys(types);
var _default = {
  all: all,
  types: types,
  matchers: matchers,
  features: features
};
exports["default"] = _default;
module.exports = exports.default;
//# sourceMappingURL=mediaQuery.js.map