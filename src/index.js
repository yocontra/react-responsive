'use strict';

var React = require('react');
var omit = require('lodash.omit');
var matchMedia = require('matchmedia');
var hyphenate = require('hyphenate-style-name');
var mediaQuery = require('./mediaQuery');
var toQuery = require('./toQuery');

var defaultTypes = {
  component: React.PropTypes.node,
  query: React.PropTypes.string,
  values: React.PropTypes.shape(mediaQuery.matchers)
};
var mediaKeys = Object.keys(mediaQuery.all);
var excludedQueryKeys = Object.keys(defaultTypes);
var excludedPropKeys = excludedQueryKeys.concat(mediaKeys);

var mq = React.createClass({
  displayName: 'MediaQuery',

  getDefaultProps: function(){
    return {
      component: 'div',
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
    if (this.state.matches === false) {
      return null;
    }
    var props = omit(this.props, excludedPropKeys);
    return React.createElement(this.props.component, props, this.props.children);
  }
});

module.exports = mq;
