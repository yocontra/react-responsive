/* global window */

'use strict';

var ReactCompositeComponent = require('react/lib/ReactCompositeComponent');
var DOM = require('react/lib/ReactDOM');
var PropTypes = require('react/lib/ReactPropTypes');

var matchMedia = window.matchMedia;

var mq = ReactCompositeComponent.createClass({
  displayName: 'MediaQuery',
  propTypes: {
    // misc
    component: PropTypes.func,

    // raw query
    query: PropTypes.string,

    // media features
    orientation: PropTypes.oneOf([
      'portrait',
      'landscape'
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
    maxResolution: PropTypes.number,

    // pseudo-media types
    grid: PropTypes.bool,
    scan: PropTypes.oneOf([
      'progressive',
      'interlace'
    ]),

    // media types
    aural: PropTypes.bool,
    braille: PropTypes.bool,
    handheld: PropTypes.bool,
    print: PropTypes.bool,
    projection: PropTypes.bool,
    screen: PropTypes.bool,
    tty: PropTypes.bool,
    tv: PropTypes.bool,
    embossed: PropTypes.bool
  },

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
    // TODO: form media query from props
    this._mql = matchMedia(this.props.query);
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