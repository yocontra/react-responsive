/** @jsx React.DOM */
/* global document, window */

'use strict';

var mq = require('../../../src');
var React = require('react');
window.React = React; // for dev

var App = React.createClass({
  displayName: 'demo',
  render: function(){
    return (
      <div>
        <div>Device Test!</div>
        <mq minDeviceWidth={1224}>
          <div>You are a desktop or laptop</div>
          <mq minDeviceWidth={1824}>
            <div>You also have a huge screen</div>
          </mq>
          <mq maxWidth={1224}>
            <div>You are sized like a tablet or mobile phone though</div>
          </mq>
        </mq>
        <mq maxDeviceWidth={1224}>
          <div>You are a tablet or mobile phone</div>
        </mq>

        <mq orientation='portrait'>
          <div>You are portrait</div>
        </mq>
         <mq orientation='landscape'>
          <div>You are landscape</div>
        </mq>
        <mq minResolution='2dppx'>
          <div>You are retina</div>
        </mq>
      </div>
    );
  }
});

React.renderComponent(App(), document.body);