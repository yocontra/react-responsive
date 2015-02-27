'use strict';

var Mq = require('../../../src');
var React = require('react');

var App = React.createClass({
  displayName: 'demo',
  render: function(){
    return (
      <div>
        <div>Device Test!</div>
        <Mq minDeviceWidth={1224} values={{deviceWidth: 1230}}>
          <div>You are a desktop or laptop</div>
          <Mq minDeviceWidth={1824}>
            <div>You also have a huge screen</div>
          </Mq>
          <Mq maxWidth={1224}>
            <div>You are sized like a tablet or mobile phone though</div>
          </Mq>
        </Mq>
        <Mq maxDeviceWidth={1224}>
          <div>You are a tablet or mobile phone</div>
        </Mq>

        <Mq orientation='portrait'>
          <div>You are portrait</div>
        </Mq>
         <Mq orientation='landscape'>
          <div>You are landscape</div>
        </Mq>
        <Mq minResolution='2dppx'>
          <div>You are retina</div>
        </Mq>
      </div>
    );
  }
});

console.log(React.renderToString(<App />));
