var PropTypes = require('react/lib/ReactPropTypes');
var mergeInto = require('react/lib/mergeInto');

var stringOrNumber = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
]);

var features = {
  // media features
  orientation: PropTypes.oneOf([
    'portrait',
    'landscape'
  ]),

  scan: PropTypes.oneOf([
    'progressive',
    'interlace'
  ]),

  aspectRatio: PropTypes.string,
  minAspectRatio: PropTypes.string,
  maxAspectRatio: PropTypes.string,
  deviceAspectRatio: PropTypes.string,
  minDeviceAspectRatio: PropTypes.string,
  maxDeviceAspectRatio: PropTypes.string,

  height: stringOrNumber,
  minHeight: stringOrNumber,
  maxHeight: stringOrNumber,
  deviceHeight: stringOrNumber,
  minDeviceHeight: stringOrNumber,
  maxDeviceHeight: stringOrNumber,

  width: stringOrNumber,
  minWidth: stringOrNumber,
  maxWidth: stringOrNumber,
  deviceWidth: stringOrNumber,
  minDeviceWidth: stringOrNumber,
  maxDeviceWidth: stringOrNumber,

  color: PropTypes.bool,
  minColor: PropTypes.number,
  maxColor: PropTypes.number,

  colorIndex: PropTypes.bool,
  minColorIndex: PropTypes.number,
  maxColorIndex: PropTypes.number,

  monochrome: PropTypes.bool,
  minMonochrome: PropTypes.number,
  maxMonochrome: PropTypes.number,

  resolution: stringOrNumber,
  minResolution: stringOrNumber,
  maxResolution: stringOrNumber
};

// media types
var types = {
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

var all = {};
mergeInto(all, types);
mergeInto(all, features);

module.exports = {
  all: all,
  types: types,
  features: features
};