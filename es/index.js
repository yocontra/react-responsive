import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _extends from 'babel-runtime/helpers/extends';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import React from 'react';
import matchMedia from 'matchmedia';
import hyphenate from 'hyphenate-style-name';
import mediaQuery from './mediaQuery';
import toQuery from './toQuery';

var defaultTypes = {
  component: React.PropTypes.node,
  query: React.PropTypes.string,
  values: React.PropTypes.shape(mediaQuery.matchers),
  children: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.function])
};
var mediaKeys = _Object$keys(mediaQuery.all);
var excludedQueryKeys = _Object$keys(defaultTypes);
var excludedPropKeys = excludedQueryKeys.concat(mediaKeys);

function omit(object, keys) {
  var newObject = _extends({}, object);
  keys.forEach(function (key) {
    return delete newObject[key];
  });
  return newObject;
}

var MediaQuery = function (_React$Component) {
  _inherits(MediaQuery, _React$Component);

  function MediaQuery() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MediaQuery);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MediaQuery.__proto__ || _Object$getPrototypeOf(MediaQuery)).call.apply(_ref, [this].concat(args))), _this), _this.state = { matches: false }, _this.updateMatches = function () {
      if (_this._mql.matches === _this.state.matches) {
        return;
      }
      _this.setState({
        matches: _this._mql.matches
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MediaQuery, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.updateQuery(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.updateQuery(nextProps);
    }
  }, {
    key: 'updateQuery',
    value: function updateQuery(props) {
      var values = void 0;
      if (props.query) {
        this.query = props.query;
      } else {
        this.query = toQuery(omit(props, excludedQueryKeys));
      }

      if (!this.query) {
        throw new Error('Invalid or missing MediaQuery!');
      }

      if (props.values) {
        values = _Object$keys(props.values).reduce(function (result, key) {
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
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._mql.removeListener(this.updateMatches);
    }
  }, {
    key: 'render',
    value: function render() {
      if (typeof this.props.children === 'function') {
        return this.props.children(this.state.matches);
      }

      if (this.state.matches === false) {
        return null;
      }
      var props = omit(this.props, excludedPropKeys);
      var hasMergeProps = _Object$keys(props).length > 0;
      var childrenCount = React.Children.count(this.props.children);
      var wrapChildren = this.props.component || childrenCount > 1 || typeof this.props.children === 'string' || Array.isArray(this.props.children) && childrenCount == 1 || this.props.children === undefined;
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
  }]);

  return MediaQuery;
}(React.Component);

MediaQuery.displayName = 'MediaQuery';
MediaQuery.defaultProps = {
  values: {}
};
export default MediaQuery;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map