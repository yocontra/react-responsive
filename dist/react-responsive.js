(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["MediaQuery"] = factory(require("react"));
	else
		root["MediaQuery"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_13__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _keys = __webpack_require__(1);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(13);
	var matchMedia = __webpack_require__(42);
	var hyphenate = __webpack_require__(11);
	var mediaQuery = __webpack_require__(7);
	var toQuery = __webpack_require__(14);
	var assign = __webpack_require__(12);

	var defaultTypes = {
	  component: React.PropTypes.node,
	  query: React.PropTypes.string,
	  values: React.PropTypes.shape(mediaQuery.matchers),
	  children: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.function])
	};
	var mediaKeys = (0, _keys2.default)(mediaQuery.all);
	var excludedQueryKeys = (0, _keys2.default)(defaultTypes);
	var excludedPropKeys = excludedQueryKeys.concat(mediaKeys);

	function omit(object, keys) {
	  var newObject = assign({}, object);
	  keys.forEach(function (key) {
	    delete newObject[key];
	  });
	  return newObject;
	}

	var mq = React.createClass({
	  displayName: 'MediaQuery',

	  getDefaultProps: function getDefaultProps() {
	    return {
	      values: {}
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      matches: false
	    };
	  },

	  componentWillMount: function componentWillMount() {
	    this.updateQuery(this.props);
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(props) {
	    this.updateQuery(props);
	  },

	  updateQuery: function updateQuery(props) {
	    var values;
	    if (props.query) {
	      this.query = props.query;
	    } else {
	      this.query = toQuery(omit(props, excludedQueryKeys));
	    }

	    if (!this.query) {
	      throw new Error('Invalid or missing MediaQuery!');
	    }

	    if (props.values) {
	      values = (0, _keys2.default)(props.values).reduce(function (result, key) {
	        result[hyphenate(key)] = props.values[key];
	        return result;
	      }, {});
	    }

	    if (this._mql) {
	      this._mql.removeListener(this.updateMatches);
	    }

	    this._mql = matchMedia(this.query, values);
	    this._mql.addListener(this.updateMatches);
	    this.updateMatches();
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this._mql.removeListener(this.updateMatches);
	  },

	  updateMatches: function updateMatches() {
	    if (this._mql.matches === this.state.matches) {
	      return;
	    }
	    this.setState({
	      matches: this._mql.matches
	    });
	  },

	  render: function render() {
	    if (typeof this.props.children === 'function') {
	      return this.props.children(this.state.matches);
	    }

	    if (this.state.matches === false) {
	      return null;
	    }
	    var props = omit(this.props, excludedPropKeys);
	    var hasMergeProps = (0, _keys2.default)(props).length > 0;
	    var childrenCount = React.Children.count(this.props.children);
	    var wrapChildren = this.props.component || childrenCount > 1 || typeof this.props.children === 'string' || this.props.children === undefined;
	    if (wrapChildren) {
	      return React.createElement(this.props.component || 'div', props, this.props.children);
	    } else if (hasMergeProps) {
	      return React.cloneElement(this.props.children, props);
	    } else if (childrenCount) {
	      return this.props.children;
	    } else {
	      return null;
	    }
	  }
	});

	module.exports = mq;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(15), __esModule: true };

/***/ },
/* 2 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(4)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _keys = __webpack_require__(1);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PropTypes = __webpack_require__(13).PropTypes;
	var assign = __webpack_require__(12);

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
	assign(matchers, { type: (0, _keys2.default)(types) });

	module.exports = {
	  all: all,
	  types: types,
	  matchers: matchers,
	  features: features
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(27)
	  , defined = __webpack_require__(8);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	var uppercasePattern = /[A-Z]/g;
	var msPattern = /^ms-/;

	function hyphenateStyleName(string) {
	    return string
	        .replace(uppercasePattern, '-$&')
	        .toLowerCase()
	        .replace(msPattern, '-ms-');
	}

	module.exports = hyphenateStyleName;


/***/ },
/* 12 */
/***/ function(module, exports) {

	/* eslint-disable no-unused-vars */
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _keys = __webpack_require__(1);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var hyphenate = __webpack_require__(11);
	var mq = __webpack_require__(7);

	function negate(cond) {
	  return 'not ' + cond;
	}

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

	module.exports = function (obj) {
	  var rules = [];
	  (0, _keys2.default)(mq.all).forEach(function (k) {
	    var v = obj[k];
	    if (v != null) {
	      rules.push(keyVal(k, v));
	    }
	  });
	  return join(rules);
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(40);
	module.exports = __webpack_require__(2).Object.keys;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(6);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(10)
	  , toLength  = __webpack_require__(36)
	  , toIndex   = __webpack_require__(35);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(16);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(6)
	  , document = __webpack_require__(5).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(5)
	  , core      = __webpack_require__(2)
	  , ctx       = __webpack_require__(20)
	  , hide      = __webpack_require__(25)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 24 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(28)
	  , createDesc = __webpack_require__(32);
	module.exports = __webpack_require__(3) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(3) && !__webpack_require__(4)(function(){
	  return Object.defineProperty(__webpack_require__(21)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(19);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(17)
	  , IE8_DOM_DEFINE = __webpack_require__(26)
	  , toPrimitive    = __webpack_require__(38)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(3) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(24)
	  , toIObject    = __webpack_require__(10)
	  , arrayIndexOf = __webpack_require__(18)(false)
	  , IE_PROTO     = __webpack_require__(33)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(29)
	  , enumBugKeys = __webpack_require__(22);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(23)
	  , core    = __webpack_require__(2)
	  , fails   = __webpack_require__(4);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(34)('keys')
	  , uid    = __webpack_require__(39);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(5)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(9)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(9)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(8);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(6);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(37)
	  , $keys    = __webpack_require__(30);

	__webpack_require__(31)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 41 */
/***/ function(module, exports) {

	/*
	Copyright (c) 2014, Yahoo! Inc. All rights reserved.
	Copyrights licensed under the New BSD License.
	See the accompanying LICENSE file for terms.
	*/

	'use strict';

	exports.match = matchQuery;
	exports.parse = parseQuery;

	// -----------------------------------------------------------------------------

	var RE_MEDIA_QUERY     = /(?:(only|not)?\s*([^\s\(\)]+)(?:\s*and)?\s*)?(.+)?/i,
	    RE_MQ_EXPRESSION   = /\(\s*([^\s\:\)]+)\s*(?:\:\s*([^\s\)]+))?\s*\)/,
	    RE_MQ_FEATURE      = /^(?:(min|max)-)?(.+)/,
	    RE_LENGTH_UNIT     = /(em|rem|px|cm|mm|in|pt|pc)?$/,
	    RE_RESOLUTION_UNIT = /(dpi|dpcm|dppx)?$/;

	function matchQuery(mediaQuery, values) {
	    return parseQuery(mediaQuery).some(function (query) {
	        var inverse = query.inverse;

	        // Either the parsed or specified `type` is "all", or the types must be
	        // equal for a match.
	        var typeMatch = query.type === 'all' || values.type === query.type;

	        // Quit early when `type` doesn't match, but take "not" into account.
	        if ((typeMatch && inverse) || !(typeMatch || inverse)) {
	            return false;
	        }

	        var expressionsMatch = query.expressions.every(function (expression) {
	            var feature  = expression.feature,
	                modifier = expression.modifier,
	                expValue = expression.value,
	                value    = values[feature];

	            // Missing or falsy values don't match.
	            if (!value) { return false; }

	            switch (feature) {
	                case 'orientation':
	                case 'scan':
	                    return value.toLowerCase() === expValue.toLowerCase();

	                case 'width':
	                case 'height':
	                case 'device-width':
	                case 'device-height':
	                    expValue = toPx(expValue);
	                    value    = toPx(value);
	                    break;

	                case 'resolution':
	                    expValue = toDpi(expValue);
	                    value    = toDpi(value);
	                    break;

	                case 'aspect-ratio':
	                case 'device-aspect-ratio':
	                case /* Deprecated */ 'device-pixel-ratio':
	                    expValue = toDecimal(expValue);
	                    value    = toDecimal(value);
	                    break;

	                case 'grid':
	                case 'color':
	                case 'color-index':
	                case 'monochrome':
	                    expValue = parseInt(expValue, 10) || 1;
	                    value    = parseInt(value, 10) || 0;
	                    break;
	            }

	            switch (modifier) {
	                case 'min': return value >= expValue;
	                case 'max': return value <= expValue;
	                default   : return value === expValue;
	            }
	        });

	        return (expressionsMatch && !inverse) || (!expressionsMatch && inverse);
	    });
	}

	function parseQuery(mediaQuery) {
	    return mediaQuery.split(',').map(function (query) {
	        query = query.trim();

	        var captures    = query.match(RE_MEDIA_QUERY),
	            modifier    = captures[1],
	            type        = captures[2],
	            expressions = captures[3] || '',
	            parsed      = {};

	        parsed.inverse = !!modifier && modifier.toLowerCase() === 'not';
	        parsed.type    = type ? type.toLowerCase() : 'all';

	        // Split expressions into a list.
	        expressions = expressions.match(/\([^\)]+\)/g) || [];

	        parsed.expressions = expressions.map(function (expression) {
	            var captures = expression.match(RE_MQ_EXPRESSION),
	                feature  = captures[1].toLowerCase().match(RE_MQ_FEATURE);

	            return {
	                modifier: feature[1],
	                feature : feature[2],
	                value   : captures[2]
	            };
	        });

	        return parsed;
	    });
	}

	// -- Utilities ----------------------------------------------------------------

	function toDecimal(ratio) {
	    var decimal = Number(ratio),
	        numbers;

	    if (!decimal) {
	        numbers = ratio.match(/^(\d+)\s*\/\s*(\d+)$/);
	        decimal = numbers[1] / numbers[2];
	    }

	    return decimal;
	}

	function toDpi(resolution) {
	    var value = parseFloat(resolution),
	        units = String(resolution).match(RE_RESOLUTION_UNIT)[1];

	    switch (units) {
	        case 'dpcm': return value / 2.54;
	        case 'dppx': return value * 96;
	        default    : return value;
	    }
	}

	function toPx(length) {
	    var value = parseFloat(length),
	        units = String(length).match(RE_LENGTH_UNIT)[1];

	    switch (units) {
	        case 'em' : return value * 16;
	        case 'rem': return value * 16;
	        case 'cm' : return value * 96 / 2.54;
	        case 'mm' : return value * 96 / 2.54 / 10;
	        case 'in' : return value * 96;
	        case 'pt' : return value * 72;
	        case 'pc' : return value * 72 / 12;
	        default   : return value;
	    }
	}


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var staticMatch = __webpack_require__(41).match;
	var dynamicMatch = typeof window !== 'undefined' ? window.matchMedia : null;
	// our fake MediaQueryList
	function Mql(query, values){
	  var self = this;
	  if(dynamicMatch){
	    var mql = dynamicMatch.call(window, query);
	    this.matches = mql.matches;
	    this.media = mql.media;
	    // TODO: is there a time it makes sense to remove this listener?
	    mql.addListener(update);
	  } else {
	    this.matches = staticMatch(query, values);
	    this.media = query;
	  }

	  this.addListener = addListener;
	  this.removeListener = removeListener;

	  function addListener(listener){
	    if(mql){
	      mql.addListener(listener);
	    }
	  }

	  function removeListener(listener){
	    if(mql){
	      mql.removeListener(listener);
	    }
	  }

	  // update ourselves!
	  function update(evt){
	    self.matches = evt.matches;
	    self.media = evt.media;
	  }
	}

	function matchMedia(query, values){
	  return new Mql(query, values);
	}

	module.exports = matchMedia;


/***/ }
/******/ ])
});
;