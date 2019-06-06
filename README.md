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

### Forcing device properties with `values` prop

At times you may need to render components with different values than what gets automatically detected. This is especially useful in a Node environment where these settings can't be detected (SSR) or for testing.

#### Possible Values

`orientation`, `scan`, `aspectRatio`, `deviceAspectRatio`,
`height`, `deviceHeight`, `width`, `deviceWidth`, `color`, `colorIndex`, `monochrome`,
`resolution` and `type`

##### Possible Types

`type` can be one of: `all`, `grid`, `aural`, `braille`, `handheld`, `print`, `projection`,
`screen`, `tty`, `tv` or `embossed`

Note: The `values` property always applies, even when values could be detected (where window.matchMedia exists).

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

#### Supplying through Context

You can also pass `values` to all components in the tree through a React [Context](https://reactjs.org/docs/context.html).
This should ease up server-side-rendering and testing in a Node environment, e.g:

##### Server Side Rendering

```javascript
import Responsive, { Context as ResponsiveContext } from 'react-responsive';
import { renderToString } from "react-dom/server";
import App from './App';

...
  // Context is just a regular React Context component, it accepts a `value` prop to be passed to consuming components
  const mobileApp = renderToString(
    <ResponsiveContext.Provider value={{ deviceWidth: 500 }}>
      <App />
    </ResponsiveContext.Provider>
  );
...
```

##### Testing

```javascript
import Responsive, { Context as ResponsiveContext } from 'react-responsive';
import { render } from '@testing-library/react';
import ProductsListing from './ProductsListing';

describe('ProductsListing', () => {
  test('matches the snapshot', () => {
    const { container: mobile } = render(
      <ResponsiveContext.Provider value={{ deviceWidth: 300 }}>
        <ProductsListing />
      </ResponsiveContext>  
    )
    expect(mobile).toMatchSnapshot();

    const { container: desktop } = render(
      <ResponsiveContext.Provider value={{ deviceWidth: 1000 }}>
        <ProductsListing />
      </ResponsiveContext>  
    )
    expect(desktop).toMatchSnapshot();
  })
})
```

Note that if any underlying component already has a `values` prop passed in it will take precedence over the one from context.

If this doesn't fit your needs and you are using [redux](http://redux.js.org/) you might want to take a look
at [react-responsive-redux](https://github.com/modosc/react-responsive-redux) which was made to solve a similar problem.

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
