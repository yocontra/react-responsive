# react-responsive [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Support us][gittip-image]][gittip-url]


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
</tr>
<tr>
<td colspan="2"><a href="http://contra.io/react-responsive/">Demo</a></td>
</tr>
</table>

The best supported, easiest to use react media query module.


This module is pretty straightforward: You specify a set of requirements, and the children will be rendered if they are met. Also handles changes so if you resize or flip or whatever it all just works.

## Install

```console
$ npm install react-responsive --save
```

## Usage

A MediaQuery element functions like any other React component, which means you can nest them and do all the normal jazz.

### Using CSS Media Queries

```jsx
import MediaQuery from 'react-responsive';

const Example = () => (
  <div>
    <div>Device Test!</div>
    <MediaQuery query="(min-device-width: 1224px)">
      <div>You are a desktop or laptop</div>
      <MediaQuery query="(min-device-width: 1824px)">
        <div>You also have a huge screen</div>
      </MediaQuery>
      <MediaQuery query="(max-width: 1224px)">
        <div>You are sized like a tablet or mobile phone though</div>
      </MediaQuery>
    </MediaQuery>
    <MediaQuery query="(max-device-width: 1224px)">
      <div>You are a tablet or mobile phone</div>
    </MediaQuery>
    <MediaQuery query="(orientation: portrait)">
      <div>You are portrait</div>
    </MediaQuery>
    <MediaQuery query="(orientation: landscape)">
      <div>You are landscape</div>
    </MediaQuery>
    <MediaQuery query="(min-resolution: 2dppx)">
      <div>You are retina</div>
    </MediaQuery>
  </div>
);
```

### Using Properties

To make things more idiomatic to react, you can use camelcased shorthands to construct media queries.


For a list of all possible shorthands and value types see https://github.com/wearefractal/react-responsive/blob/master/src/mediaQuery.js#L9


Any numbers given as a shorthand will be expanded to px (`1234` will become `'1234px'`)


```jsx
import MediaQuery from 'react-responsive';

const Example = () => (
  <div>
    <div>Device Test!</div>
    <MediaQuery minDeviceWidth={1224}>
      <div>You are a desktop or laptop</div>
      <MediaQuery minDeviceWidth={1824}>
        <div>You also have a huge screen</div>
      </MediaQuery>
      <MediaQuery maxWidth={1224}>
        <div>You are sized like a tablet or mobile phone though</div>
      </MediaQuery>
    </MediaQuery>
    <MediaQuery maxDeviceWidth={1224}>
      <div>You are a tablet or mobile phone</div>
    </MediaQuery>
    <MediaQuery orientation="portrait">
      <div>You are portrait</div>
    </MediaQuery>
    <MediaQuery orientation="landscape">
      <div>You are landscape</div>
    </MediaQuery>
    <MediaQuery minResolution="2dppx">
      <div>You are retina</div>
    </MediaQuery>
  </div>
);
```

### Rendering with a child function

You may also specify a function for the child of the MediaQuery component. When the component renders, it is passed whether or not the given media query matches. This function must return a single element or `null`.

```jsx
<MediaQuery minDeviceWidth={700}>
  {(matches) => {
    if (matches) {
      return <div>Media query matches!</div>;
    } else {
      return <div>Media query does not match!</div>;
    }
  }}
</MediaQuery>
```

### Component Property

You may specify an optional `component` property on the `MediaQuery` that indicates what component to wrap children with. Any additional props defined on the `MediaQuery` will be passed through to this "wrapper" component. If the `component` property is not defined and the `MediaQuery` has more than 1 child, a `div` will be used as the "wrapper" component by default. However, if the `component` prop is not defined and there is only 1 child, that child will be rendered alone without a component wrapping it.

**Specifying Wrapper Component**

```jsx
<MediaQuery minDeviceWidth={700} component="ul">
  <li>Item 1</li>
  <li>Item 2</li>
</MediaQuery>

// renders the following when the media query condition is met

<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

**Unwrapped Component**

```jsx
<MediaQuery minDeviceWidth={700}>
  <div>Unwrapped component</div>
</MediaQuery>

// renders the following when the media query condition is met

<div>Unwrapped component</div>
```

**Default div Wrapper Component**

```jsx
<MediaQuery minDeviceWidth={1200} className="some-class">
  <div>Wrapped</div>
  <div>Content</div>
</MediaQuery>

// renders the following when the media query condition is met

<div className="some-class">
  <div>Wrapped</div>
  <div>Content</div>
</div>
```

### Server rendering

Server rendering can be done by passing static values through the `values` property. 

The values property can contain `orientation`, `scan`, `aspectRatio`, `deviceAspectRatio`,
`height`, `deviceHeight`, `width`, `deviceWidth`, `color`, `colorIndex`, `monochrome`,
 `resolution` and `type` to be matched against the media query.

`type` can be one of: `all`, `grid`, `aural`, `braille`, `handheld`, `print`, `projection`,
`screen`, `tty`, `tv` or `embossed`.

Note: The `values` property always takes precedence, even on the client where a `window` object exists and matchMedia can be used.

If you are using [redux](http://redux.js.org/) you can automatically pass `width` / `deviceWidth` values to your components with [react-responsive-redux](https://github.com/modosc/react-responsive-redux). 


```jsx
import MediaQuery from 'react-responsive';

const Example = () => (
  <div>
    <div>Device Test!</div>
    <MediaQuery minDeviceWidth={1224} values={{ deviceWidth: 1600 }}>
      <div>You are a desktop or laptop</div>
      <MediaQuery minDeviceWidth={1824}>
        <div>You also have a huge screen</div>
      </MediaQuery>
      <MediaQuery maxWidth={1224}>
        <div>You are sized like a tablet or mobile phone though</div>
      </MediaQuery>
    </MediaQuery>
    <MediaQuery maxDeviceWidth={1224}>
      <div>You are a tablet or mobile phone</div>
    </MediaQuery>
    <MediaQuery orientation="portrait">
      <div>You are portrait</div>
    </MediaQuery>
    <MediaQuery orientation="landscape">
      <div>You are landscape</div>
    </MediaQuery>
    <MediaQuery minResolution="2dppx">
      <div>You are retina</div>
    </MediaQuery>
  </div>
);
```

### Common use cases

```javascript
import Responsive from 'react-responsive';

const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

const Example = () => (
  <div>
    <Desktop>Desktop or laptop</Desktop>
    <Tablet>Tablet</Tablet>
    <Mobile>Mobile</Mobile>
    <Default>Not mobile (desktop or laptop or tablet)</Default>
  </div>
);

export default Example;
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
<td>MS Edge</td>
<td>All</td>
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

[gittip-url]: https://www.gittip.com/WeAreFractal/
[gittip-image]: http://img.shields.io/gittip/WeAreFractal.svg

[downloads-image]: http://img.shields.io/npm/dm/react-responsive.svg
[npm-url]: https://npmjs.org/package/react-responsive
[npm-image]: http://img.shields.io/npm/v/react-responsive.svg
