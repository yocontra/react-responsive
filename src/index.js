/* global window */

'use strict';

var ReactCompositeComponent = require('react/lib/ReactCompositeComponent');
var DOM = require('react/lib/ReactDOM');
var mergeInto = require('react/lib/mergeInto');
var PropTypes = require('react/lib/ReactPropTypes');

var mediaQuery = require('./mediaQuery');
var toQuery = require('./toQuery');
var matchMedia = window.matchMedia;

var types = {
  component: PropTypes.func,
  query: PropTypes.string
};
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
    this.query = this.props.query || toQuery(this.props);
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

    // TODO: transfer props but omit mq props
    return this.props.component(null, this.props.children);
  }
});

module.exports = mq;