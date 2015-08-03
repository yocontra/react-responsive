var PropTypes = require('react').PropTypes;
var assign = require('object-assign');

var stringOrNumber = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
]);

// properties that match media queries
var matchers = {
  orientation: PropTypes.oneOf([
    'portrait',
    'landscape'
  ]),

  scan: PropTypes.oneOf([
    'progressive',
    'interlace'
  ]),

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
var features = {
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
};

assign(features, matchers);

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

var all = {};
assign(all, types);
assign(all, features);

// add the type property
assign(matchers, { type: Object.keys(types) });

module.exports = {
  all: all,
  types: types,
  matchers: matchers,
  features: features
};
