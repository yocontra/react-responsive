var PropTypes = require('react/lib/ReactPropTypes');
var merge = require('react/lib/merge');

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

  height: PropTypes.number,
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
  deviceHeight: PropTypes.number,
  minDeviceHeight: PropTypes.number,
  maxDeviceHeight: PropTypes.number,

  width: PropTypes.number,
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number,
  deviceWidth: PropTypes.number,
  minDeviceWidth: PropTypes.number,
  maxDeviceWidth: PropTypes.number,

  color: PropTypes.bool,
  minColor: PropTypes.number,
  maxColor: PropTypes.number,

  colorIndex: PropTypes.bool,
  minColorIndex: PropTypes.number,
  maxColorIndex: PropTypes.number,

  monochrome: PropTypes.bool,
  minMonochrome: PropTypes.number,
  maxMonochrome: PropTypes.number,

  resolution: PropTypes.string,
  minResolution: PropTypes.number,
  maxResolution: PropTypes.number
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
merge(all, types);
merge(all, features);

module.exports = {
  all: all,
  types: types,
  features: features
};