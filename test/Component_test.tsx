import React, { Component } from 'react'
import MediaQuery from '../src/Component'
import { assert } from 'chai'
import ReactDOM from 'react-dom/client'
import sinon from 'sinon'
import TestUtils from 'react-dom/test-utils'
import { MatchMediaMock } from 'match-media-mock'

interface MockWindow extends Window { matchMedia: MatchMediaMock; }

describe('Component', () => {
  beforeEach(() => {
    (window as unknown as MockWindow).matchMedia.setConfig({
      type: 'screen',
      width: 1200,
      height: 800
    })
  })

  it('renders when media query matches', () => {
    class App extends React.Component {
      render = () =>
        <MediaQuery minWidth={1000}>
          <div className="childComponent" />
        </MediaQuery>
        ;
    }

    const tree = TestUtils.renderIntoDocument(<App />)
    assert.isNotNull(TestUtils.findRenderedDOMComponentWithClass(tree as unknown as Component, 'childComponent'))
  })

  it('doesnt render when media query doesnt match', () => {
    class App extends React.Component {
      render = () =>
        <MediaQuery minWidth={1201}>
          <div className="childComponent" />
        </MediaQuery>
        ;
    }

    const tree = TestUtils.renderIntoDocument(<App />)
    assert.throws(() => TestUtils.findRenderedDOMComponentWithTag(tree as unknown as Component, 'div'), /Did not find exactly one match/)
  })

  it('works with render prop', () => {
    const renderFunc = sinon.stub().returns(null)
    TestUtils.renderIntoDocument(
      <MediaQuery minWidth={1000}>
        {renderFunc}
      </MediaQuery>
    )
    assert.isTrue(renderFunc.calledOnce)
    assert.isTrue(renderFunc.calledWith(true))

    const renderFunc2 = sinon.stub().returns(null)
    TestUtils.renderIntoDocument(
      <MediaQuery minWidth={1201}>
        {renderFunc2}
      </MediaQuery>
    )
    assert.isTrue(renderFunc2.calledOnce)
    assert.isTrue(renderFunc2.calledWith(false))
  })

  it('does not throw on unmount', () => {
    const container = document.createElement('div')
    const root = ReactDOM.createRoot(container);

    root.render(
      <MediaQuery query="all">
        <div className="childComponent" />
      </MediaQuery>
    )
    assert.doesNotThrow(() => root.unmount())
  })
})
