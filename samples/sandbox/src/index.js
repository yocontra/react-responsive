import MediaQuery from 'index'
import React from 'react'
import ReactDOM from 'react-dom'

window.React = React // for dev

const App = () =>
  <div>
    <div className="header">Device Test! Below are some guesses.</div>
    <MediaQuery minDeviceWidth={1224}>
      <div>You are a desktop or laptop (min-device-width: 1224px)</div>
      <MediaQuery minDeviceWidth={1824}>
        <div>You also have a huge screen (min-device-width: 1824px)</div>
      </MediaQuery>
      <MediaQuery maxWidth={1224}>
        <div>You are sized like a tablet or mobile phone (max-width: 1224px)</div>
      </MediaQuery>
    </MediaQuery>
    <MediaQuery maxDeviceWidth={1224}>
      <div>You are a tablet or mobile phone (max-device-width: 1224px)</div>
    </MediaQuery>

    <MediaQuery orientation="portrait">
      <div>You are portrait (orientation: portrait)</div>
    </MediaQuery>
    <MediaQuery orientation="landscape">
      <div>You are landscape (orientation: landscape)</div>
    </MediaQuery>
    <MediaQuery minResolution="2dppx">
      <div>You are retina (min-resolution: 2dppx)</div>
    </MediaQuery>
  </div>

ReactDOM.render(<App />, document.getElementById('main'))
