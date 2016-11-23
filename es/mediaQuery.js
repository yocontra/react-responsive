import _Object$keys from 'babel-runtime/core-js/object/keys';
import _extends from 'babel-runtime/helpers/extends';
import { PropTypes } from 'react';

var stringOrNumber = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

// properties that match media queries
var matchers = {
  orientation: PropTypes.oneOf(['portrait', 'landscape']),

  scan: PropTypes.oneOf(['progressive', 'interlace']),

  aspectRatio: PropTypes.string,
  deviceAspectRatio: PropTypes.string,

  height: stringOrNumber,
  deviceHeight: stringOrNumber,

  width: stringOrNumber,
  deviceWidth: stringOrNumber,

  color: PropTypes.bool,

  colorIndex: PropTypes.bool,

  monochrome: PropTypes.bool,
  resolution: stringOrNumber
};

// media features
var features = _extends({
  minAspectRatio: PropTypes.string,
  maxAspectRatio: PropTypes.string,
  minDeviceAspectRatio: PropTypes.string,
  maxDeviceAspectRatio: PropTypes.string,

  minHeight: stringOrNumber,
  maxHeight: stringOrNumber,
  minDeviceHeight: stringOrNumber,
  maxDeviceHeight: stringOrNumber,

  minWidth: stringOrNumber,
  maxWidth: stringOrNumber,
  minDeviceWidth: stringOrNumber,
  maxDeviceWidth: stringOrNumber,

  minColor: PropTypes.number,
  maxColor: PropTypes.number,

  minColorIndex: PropTypes.number,
  maxColorIndex: PropTypes.number,

  minMonochrome: PropTypes.number,
  maxMonochrome: PropTypes.number,

  minResolution: stringOrNumber,
  maxResolution: stringOrNumber

}, matchers);

// media types
var types = {
  all: PropTypes.bool,
  grid: PropTypes.bool,
  aural: PropTypes.bool,
  braille: PropTypes.bool,
  handheld: PropTypes.bool,
  print: PropTypes.bool,
  projection: PropTypes.bool,
  screen: PropTypes.bool,
  tty: PropTypes.bool,
  tv: PropTypes.bool,
  embossed: PropTypes.bool
};

var all = _extends({}, types, features);

// add the type property
matchers.type = _Object$keys(types);

export default {
  all: all,
  types: types,
  matchers: matchers,
  features: features
};
module.exports = exports['default'];
//# sourceMappingURL=mediaQuery.js.map