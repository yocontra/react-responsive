'use strict';

var React = require('react');
var matchMedia = require('matchmedia');
var hyphenate = require('hyphenate-style-name');
var mediaQuery = require('./mediaQuery');
var toQuery = require('./toQuery');
var assign = require('object-assign');

var defaultTypes = {
  component: React.PropTypes.node,
  query: React.PropTypes.string,
  values: React.PropTypes.shape(mediaQuery.matchers),
  children: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.function])
};
var mediaKeys = Object.keys(mediaQuery.all);
var excludedQueryKeys = Object.keys(defaultTypes);
var excludedPropKeys = excludedQueryKeys.concat(mediaKeys);

function omit(object, keys){
  var newObject = assign({}, object);
  keys.forEach(function(key){
    delete newObject[key];
  });
  return newObject;
}

var mq = React.createClass({
  displayName: 'MediaQuery',

  getDefaultProps: function(){
    return {
      values: {}
    };
  },

  getInitialState: function(){
    return {
      matches: false
    };
  },

  componentWillMount: function(){
    this.updateQuery(this.props);
  },

  componentWillReceiveProps: function(props){
    this.updateQuery(props);
  },

  updateQuery: function(props){
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
      values = Object.keys(props.values)
        .reduce(function(result, key){
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

  componentWillUnmount: function(){
    this._mql.removeListener(this.updateMatches);
  },

  updateMatches: function(){
    if (this._mql.matches === this.state.matches) {
      return;
    }
    this.setState({
      matches: this._mql.matches
    });
  },

  render: function(){
    if(typeof this.props.children === 'function') {
      return this.props.children(this.state.matches);
    }

    if (this.state.matches === false) {
      return null;
    }
    var props = omit(this.props, excludedPropKeys);
    var hasMergeProps = Object.keys(props).length > 0;
    var childrenCount = React.Children.count(this.props.children);
    var wrapChildren = this.props.component ||
      childrenCount > 1 ||
      typeof this.props.children === 'string' ||
      this.props.children === undefined;
    if (wrapChildren) {
      return React.createElement(
        this.props.component || 'div',
        props,
        this.props.children
      );
    } else if (hasMergeProps) {
      return React.cloneElement(
        this.props.children,
        props
      );
    } else if (childrenCount){
      return this.props.children;
    }
    else {
      return null;
    }
  }
});

module.exports = mq;
