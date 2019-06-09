import React from 'react'
import MediaQuery from 'Component'
import { assert } from 'chai'
import ReactDOM from 'react-dom'
import sinon from 'sinon'
import TestUtils from 'react-dom/test-utils'

describe('MediaQuery', function () {
  beforeEach(() => {
    window.matchMedia.setConfig({ 
      type: 'screen',
      width: 1200,
      height: 800
    })
  })

  it('renders when media query matches', () => {
    class App extends React.Component {
      render() {
        return (
          <MediaQuery minWidth={1000}>
            <div className="childComponent"/>
          </MediaQuery>
        )
      }
    }
  
    const tree = TestUtils.renderIntoDocument(<App />)
    assert.isNotNull(TestUtils.findRenderedDOMComponentWithClass(tree, 'childComponent'))
  })

  it('doesnt render when media query doesnt match', () => {
    class App extends React.Component {
      render() {
        return (
          <MediaQuery minWidth={1201}>
            <div className="childComponent"/>
          </MediaQuery>
        )
      }
    }
  
    const tree = TestUtils.renderIntoDocument(<App />)
    assert.throws(() => (TestUtils.findRenderedDOMComponentWithTag(tree, 'div')), /Did not find exactly one match/)
  })

  it('works with render prop', () => {
    const renderFunc = sinon.spy(() => null)
    TestUtils.renderIntoDocument(
      <MediaQuery minWidth={1000}>
        {renderFunc}
      </MediaQuery>
    )
    assert.isTrue(renderFunc.calledOnce)
    assert.isTrue(renderFunc.calledWith(true))
    
    const renderFunc2 = sinon.spy(() => null)
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
    ReactDOM.render(
      <MediaQuery query="all">
        <div className="childComponent"/>
      </MediaQuery>, 
      container
    )
    assert.doesNotThrow(() => ReactDOM.unmountComponentAtNode(container))
  })
})
