# react-responsive [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Support us][gittip-image]][gittip-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url]


## Information

<table>
<tr>
<td>Package</td><td>react-responsive</td>
</tr>
<tr>
<td>Description</td>
<td>Media queries in react for responsive design</td>
</tr>
<tr>
<td>Browser Version</td>
<td>>= IE6*</td>
</tr>
</table>

## Usage

A mq element functions like any other React component, which means you can nest them and do all the normal jazz.

### Using CSS Media Queries

```js
var mq = require('react-responsive');

var A = React.createClass({
  render: function(){
    return (
      <div>
        <div>Device Test!</div>
        <mq query='(min-width: 1224px)'>
          <div>You are a desktop or laptop</div>
          <mq query='(min-width: 1824px)'>
            <div>You also have a huge screen</div>
          </mq>
        </mq>
        <mq query='(max-width: 1224px)'>
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
```

### Using Properties

We include a few shortcuts for common queries.

```js
var mq = require('react-responsive');

var A = React.createClass({
  render: function(){
    return (
      <div>
        <div>Device Test!</div>
        <mq minWidth={1224}>
          <div>You are a desktop or laptop</div>
          <mq minWidth={1824}>
            <div>You also have a huge screen</div>
          </mq>
        </mq>
        <mq maxWidth={1224}>
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
```

## Browser Support

### Out of the box

<table>
<tr>
<td>Chrome</td>
<td>9</td>
</tr>
<tr>
<td>Firefox (Gecko)</td>
<td>6</td>
</tr>
<tr>
<td>Internet Explorer</td>
<td>10</td>
</tr>
<tr>
<td>Opera</td>
<td>12.1</td>
</tr>
<tr>
<td>Safari</td>
<td>5.1</td>
</tr>
</table>

### With Polyfills

Pretty much everything. Check out these polyfills:

- [matchMedia.js by Paul Irish](https://github.com/paulirish/matchMedia.js/)
- [media-match (faster, but larger and lacking some features)](https://github.com/weblinc/media-match)

## Like what we do?

[gittip-url]: https://www.gittip.com/WeAreFractal/
[gittip-image]: http://img.shields.io/gittip/WeAreFractal.svg

[downloads-image]: http://img.shields.io/npm/dm/react-responsive.svg
[npm-url]: https://npmjs.org/package/react-responsive
[npm-image]: http://img.shields.io/npm/v/react-responsive.svg

[travis-url]: https://travis-ci.org/wearefractal/react-responsive
[travis-image]: http://img.shields.io/travis/wearefractal/react-responsive.svg

[coveralls-url]: https://coveralls.io/r/wearefractal/react-responsive
[coveralls-image]: http://img.shields.io/coveralls/wearefractal/react-responsive/master.svg