import MediaQuery from 'index'
import React from 'react'
import ReactDOM from 'react-dom'

window.React = React // for dev

const App = () =>
  <div>
    <div className="header">Device Test! Below are some guesses.</div>
    <MediaQuery minWidth={1224}>{(matches) =>
      matches
        ? <div className="item">You are a desktop or laptop (min-width: 1224px)</div>
        : <div className="item">You are sized like a tablet or mobile phone (max-width: 1224px)</div>
    }</MediaQuery>

    <MediaQuery orientation="portrait">
      <div className="item">You are portrait (orientation: portrait)</div>
    </MediaQuery>
    <MediaQuery orientation="landscape">
      <div className="item">You are landscape (orientation: landscape)</div>
    </MediaQuery>
    <MediaQuery minResolution="2dppx">
      <div className="item">You are retina (min-resolution: 2dppx)</div>
    </MediaQuery>
  </div>

ReactDOM.render(<App />, document.getElementById('main'))
