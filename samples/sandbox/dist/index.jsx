/** @jsx React.DOM */
/* global document, window */

'use strict';

var mq = require('../../../src');
var React = require('react');
window.React = React; // for dev

var DOM = React.DOM;

var App = React.createClass({
  displayName: 'demo',
  render: function(){
    return (
      <div>
        <div>Device Test!</div>
        <mq query='(min-device-width: 1224px)'>
          <div>You are a desktop or laptop</div>
          <mq query='(min-device-width: 1824px)'>
            <div>You also have a huge screen</div>
          </mq>
          <mq query='(max-width: 1224px)'>
            <div>You are sized like a tablet or mobile phone though</div>
          </mq>
        </mq>
        <mq query='(max-device-width: 1224px)'>
          <div>You are a tablet or mobile phone</div>
        </mq>

        <mq query='(orientation: portrait)'>
          <div>You are portrait</div>
        </mq>
         <mq query='(orientation: landscape)'>
          <div>You are landscape</div>
        </mq>
        <mq query='(min-resolution: 2dppx)'>
          <div>You are retina</div>
        </mq>
      </div>
    );
  }
});

React.renderComponent(App(), document.body);