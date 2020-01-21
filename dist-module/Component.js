"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = MediaQuery;

var _useMediaQuery = _interopRequireDefault(require("./useMediaQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function MediaQuery(_ref) {
  var children = _ref.children,
      device = _ref.device,
      onChange = _ref.onChange,
      settings = _objectWithoutProperties(_ref, ["children", "device", "onChange"]);

  var matches = (0, _useMediaQuery["default"])(settings, device, onChange);

  if (typeof children === 'function') {
    return children(matches);
  }

  return matches ? children : null;
}

module.exports = exports.default;
//# sourceMappingURL=Component.js.map