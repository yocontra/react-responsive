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
        <h2>Device Test!</h2>
        <mq minDeviceWidth={1224}>
          <div>You are a desktop or laptop</div>
          <mq minDeviceWidth={1824}>
            <div>You also have a huge screen</div>
          </mq>
        </mq>
        <mq minWidth={480} maxDeviceWidth={1224}>
          <div>You are a tablet or mobile phone</div>
        </mq>
        <mq maxDeviceWidth={480}>
          <div>You are a mobile phone</div>
        </mq>

        <h2>Viewport Test!</h2>
        <mq minWidth={1224}>
          <div>Your viewport is sized like a desktop or laptop</div>
          <mq minWidth={1824}>
            <div>You also have a huge screen</div>
          </mq>
        </mq>
        <mq minWidth={480} maxWidth={1224}>
          <div>Your viewport is sized like a tablet</div>
        </mq>
        <mq maxWidth={480}>
          <div>Your viewport is sized like a a mobile phone</div>
        </mq>

        <h2>Orientation Test!</h2>
        <mq orientation='portrait'>
          <div>You are portrait</div>
        </mq>
         <mq orientation='landscape'>
          <div>You are landscape</div>
        </mq>

        <h2>Retina Test!</h2>
        <mq minResolution='1.5dppx'>
          <div>You are retina</div>
        </mq>
        <mq maxResolution='1.5dppx'>
          <div>You are not retina</div>
        </mq>
      </div>
    );
  }
});

React.renderComponent(App(), document.body);
