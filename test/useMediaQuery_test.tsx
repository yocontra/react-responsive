/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import useMediaQuery from '../src/useMediaQuery'
import Context from '../src/Context'
import { assert } from 'chai'
import sinon from 'sinon'
import TestUtils from 'react-dom/test-utils'
import { MatchMediaMock } from 'match-media-mock'

interface MockWindow extends Window { matchMedia: MatchMediaMock; }

const sleep = (timeOut: number) => new Promise((resolve) => setTimeout(resolve, timeOut))

describe('useMediaQuery', () => {
  beforeEach(() => {
    (window as unknown as MockWindow).matchMedia.setConfig({
      type: 'screen',
      width: 1200,
      height: 800
    })
  })

  it('builds query from props', () => {
    function Component(props: any) {
      const matches = useMediaQuery(props)
      return matches ? <div className="childComponent" /> : null
    }
    class App extends React.Component<any> {
      render = () => <Component {...this.props} />;
    }

    const tree = TestUtils.renderIntoDocument(<App minWidth={1200} />)
    assert.isNotNull(TestUtils.findRenderedDOMComponentWithClass(tree as unknown as React.Component, 'childComponent'))

    const tree2 = TestUtils.renderIntoDocument(<App minWidth={1201} />)
    assert.throws(() => TestUtils.findRenderedDOMComponentWithTag(tree2 as unknown as React.Component, 'div'), /Did not find exactly one match/)
  })

  it('builds query from device prop', () => {
    function Component(props: any) {
      const matches = useMediaQuery(props, { orientation: 'landscape' })
      return matches ? <div className="childComponent" /> : null
    }
    class App extends React.Component<any> {
      render = () => <Component {...this.props} />;
    }

    const tree = TestUtils.renderIntoDocument(
      <App orientation="landscape" />
    )
    assert.isNotNull(TestUtils.findRenderedDOMComponentWithClass(tree as unknown as Component, 'childComponent'))

    const tree2 = TestUtils.renderIntoDocument(
      <App orientation="portrait" />
    )
    assert.throws(() => TestUtils.findRenderedDOMComponentWithTag(tree2 as unknown as Component, 'div'), /Did not find exactly one match/)
  })

  it('matches taking device prop with precedence', () => {
    function Component({ device }: any) {
      const matches = useMediaQuery({ minWidth: 1000 }, device)
      return matches ? <div className="childComponent" /> : null
    }
    class App extends React.Component<any> {
      render = () => <Component {...this.props} />;
    }

    const tree = TestUtils.renderIntoDocument(<App device={{ width: 1000 }} />)
    assert.isNotNull(TestUtils.findRenderedDOMComponentWithClass(tree as unknown as React.Component, 'childComponent'))

    const tree2 = TestUtils.renderIntoDocument(<App device={{ width: 999 }} />)
    assert.throws(() => TestUtils.findRenderedDOMComponentWithTag(tree2 as unknown as React.Component, 'div'), /Did not find exactly one match/)
  })

  it('throws if theres no query', () => {
    function App() {
      useMediaQuery({})
      return null
    }
    assert.throws(() => TestUtils.renderIntoDocument(<App />), 'Invalid or missing MediaQuery!')
  })

  it('throws if theres a bad query', () => {
    function App() {
      useMediaQuery({})
      return null
    }
    assert.throws(() => TestUtils.renderIntoDocument(<App />), 'Invalid or missing MediaQuery!')
  })

  it('calls onChange callback on updates', () => {
    const container = document.createElement('div')
    function App({ onChange, ...settings }: any) {
      useMediaQuery(settings, undefined, onChange)
      return null
    }
    const callback = sinon.spy(() => null)

    TestUtils.act(() => {
      ReactDOM.render(<App minWidth="100" onChange={callback} />, container)
    })

    // should still match so nothing has changed
    TestUtils.act(() => {
      ReactDOM.render(<App minWidth="200" onChange={callback} />, container)
    })

    TestUtils.act(() => {
      ReactDOM.render(<App minWidth="1201" onChange={callback} />, container)
    })

    return sleep(0).then(() => {
      assert.isTrue(callback.calledOnce)
    })
  })

  it('uses query prop if it has one', () => {
    (window as unknown as MockWindow).matchMedia.setConfig({
      orientation: 'landscape'
    })

    function Component({ query }: any) {
      const matches = useMediaQuery({ query })
      return matches ? <div className="childComponent" /> : null
    }
    class App extends React.Component<any> {
      render = () => <Component {...this.props} />;
    }

    const tree = TestUtils.renderIntoDocument(
      <App query="(orientation: landscape)" />
    )
    assert.isNotNull(TestUtils.findRenderedDOMComponentWithClass(tree as unknown as Component, 'childComponent'))

    const tree2 = TestUtils.renderIntoDocument(
      <App query="(orientation: portrait)" />
    )
    assert.throws(() => TestUtils.findRenderedDOMComponentWithTag(tree2 as unknown as Component, 'div'), /Did not find exactly one match/)
  })

  it('renders using device prop from context', () => {
    function Component() {
      const matches = useMediaQuery({ maxWidth: 300 })
      return matches ? <div className="childComponent" /> : null
    }
    class App extends React.Component<any> {
      render = () =>
        <Context.Provider value={this.props.device}>
          <Component />
        </Context.Provider>
        ;
    }

    const tree1 = TestUtils.renderIntoDocument(<App device={{ width: 300 }} />)
    assert.isNotNull(TestUtils.findRenderedDOMComponentWithClass(tree1 as unknown as Component, 'childComponent'))

    const tree2 = TestUtils.renderIntoDocument(<App device={{ width: 301 }} />)
    assert.throws(() => TestUtils.findRenderedDOMComponentWithClass(tree2 as unknown as React.Component, 'childComponent'), /Did not find exactly one match/)
  })

  it('renders taking direct device prop with precedence to device prop from context', () => {
    function Component() {
      const matches = useMediaQuery({ maxWidth: 300 }, { width: 100 })
      return matches ? <div className="childComponent" /> : null
    }
    class App extends React.Component {
      render = () =>
        <Context.Provider value={{ width: 400 }}>
          <Component />
        </Context.Provider>
        ;
    }

    const tree = TestUtils.renderIntoDocument(<App />)
    assert.isNotNull(TestUtils.findRenderedDOMComponentWithClass(tree as unknown as React.Component, 'childComponent'))
  })

  it('should render only once when mounted', () => {
    let renderCount = 0
    function App() {
      useMediaQuery({ maxWidth: 300 })
      renderCount += 1

      return null
    }

    TestUtils.act(() => {
      TestUtils.renderIntoDocument(<App />)
    })

    assert.equal(renderCount, 1)
  })
})
