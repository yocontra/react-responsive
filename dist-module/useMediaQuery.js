"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _matchmediaquery = _interopRequireDefault(require("matchmediaquery"));

var _hyphenateStyleName = _interopRequireDefault(require("hyphenate-style-name"));

var _objects = _interopRequireDefault(require("shallow-equal/objects"));

var _toQuery = _interopRequireDefault(require("./toQuery"));

var _Context = _interopRequireDefault(require("./Context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var makeQuery = function makeQuery(settings) {
  return settings.query || (0, _toQuery["default"])(settings);
};

var hyphenateKeys = function hyphenateKeys(obj) {
  if (!obj) return null;
  var keys = Object.keys(obj);
  if (keys.length === 0) return null;
  return keys.reduce(function (result, key) {
    result[(0, _hyphenateStyleName["default"])(key)] = obj[key];
    return result;
  }, {});
};

var useIsUpdate = function useIsUpdate() {
  var ref = _react["default"].useRef(false);

  _react["default"].useEffect(function () {
    ref.current = true;
  }, []);

  return ref.current;
};

var useDevice = function useDevice(deviceFromProps) {
  var deviceFromContext = _react["default"].useContext(_Context["default"]);

  var getDevice = function getDevice() {
    return hyphenateKeys(deviceFromProps) || hyphenateKeys(deviceFromContext);
  };

  var _React$useState = _react["default"].useState(getDevice),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      device = _React$useState2[0],
      setDevice = _React$useState2[1];

  _react["default"].useEffect(function () {
    var newDevice = getDevice();

    if (!(0, _objects["default"])(device, newDevice)) {
      setDevice(newDevice);
    }
  }, [deviceFromProps, deviceFromContext]);

  return device;
};

var useQuery = function useQuery(settings) {
  var getQuery = function getQuery() {
    return makeQuery(settings);
  };

  var _React$useState3 = _react["default"].useState(getQuery),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      query = _React$useState4[0],
      setQuery = _React$useState4[1];

  _react["default"].useEffect(function () {
    var newQuery = getQuery();

    if (query !== newQuery) {
      setQuery(newQuery);
    }
  }, [settings]);

  return query;
};

var useMatchMedia = function useMatchMedia(query, device) {
  var getMatchMedia = function getMatchMedia() {
    return (0, _matchmediaquery["default"])(query, device || {}, !!device);
  };

  var _React$useState5 = _react["default"].useState(getMatchMedia),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      mq = _React$useState6[0],
      setMq = _React$useState6[1];

  var isUpdate = useIsUpdate();

  _react["default"].useEffect(function () {
    if (isUpdate) {
      // skip on mounting, it has already been set
      setMq(getMatchMedia());
    }

    return function () {
      mq.dispose();
    };
  }, [query, device]);

  return mq;
};

var useMatches = function useMatches(mediaQuery) {
  var _React$useState7 = _react["default"].useState(mediaQuery.matches),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      matches = _React$useState8[0],
      setMatches = _React$useState8[1];

  _react["default"].useEffect(function () {
    var updateMatches = function updateMatches() {
      setMatches(mediaQuery.matches);
    };

    mediaQuery.addListener(updateMatches);
    updateMatches();
    return function () {
      mediaQuery.removeListener(updateMatches);
    };
  }, [mediaQuery]);

  return matches;
};

var useMediaQuery = function useMediaQuery(settings, device, onChange) {
  var deviceSettings = useDevice(device);
  var query = useQuery(settings);
  if (!query) throw new Error('Invalid or missing MediaQuery!');
  var mq = useMatchMedia(query, deviceSettings);
  var matches = useMatches(mq);
  var isUpdate = useIsUpdate();

  _react["default"].useEffect(function () {
    if (isUpdate && onChange) {
      onChange(matches);
    }
  }, [matches]);

  return matches;
};

var _default = useMediaQuery;
exports["default"] = _default;
module.exports = exports.default;
//# sourceMappingURL=useMediaQuery.js.map