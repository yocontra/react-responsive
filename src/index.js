/* global window */

'use strict';

var ReactCompositeComponent = require('react/lib/ReactCompositeComponent');
var DOM = require('react/lib/ReactDOM');
var mergeInto = require('react/lib/mergeInto');
var PropTypes = require('react/lib/ReactPropTypes');
var omit = require('lodash.omit');
var mediaQuery = require('./mediaQuery');
var toQuery = require('./toQuery');
var matchMedia = window ? window.matchMedia : null;

var types = {
  component: PropTypes.func,
  query: PropTypes.string
};
var excludedQueryKeys = Object.keys(types);
var mediaKeys = Object.keys(mediaQuery.all);
var excludedPropKeys = excludedQueryKeys.concat(mediaKeys);
mergeInto(types, mediaQuery.all);

var mq = ReactCompositeComponent.createClass({
  displayName: 'MediaQuery',
  propTypes: types,

  getDefaultProps: function(){
    return {
      component: DOM.div
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