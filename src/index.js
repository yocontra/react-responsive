/* global window */

'use strict';

var React = require('react');
var assign = require('object-assign');
var omit = require('lodash.omit');
var mediaQuery = require('./mediaQuery');
var toQuery = require('./toQuery');
var matchMedia = window ? window.matchMedia : null;

var defaultTypes = {
  component: React.PropTypes.func,
  query: React.PropTypes.string
};
var mediaKeys = Object.keys(mediaQuery.all);
var types = assign(defaultTypes, mediaQuery.all);
var excludedQueryKeys = Object.keys(types);
var excludedPropKeys = excludedQueryKeys.concat(mediaKeys);

var mq = React.createClass({
  displayName: 'MediaQuery',
  propTypes: types,

  getDefaultProps: function(){
    return {
      component: React.DOM.div
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
    if (props.query) {
      this.query = props.query;
    } else {
      this.query = toQuery(omit(props, excludedQueryKeys));
    }

    if (!this.query) {
      throw new Error('Invalid or missing MediaQuery!');
    }
    this._mql = matchMedia(this.query);
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
    return this.props.component(props, this.props.children);
  }
});

module.exports = mq;