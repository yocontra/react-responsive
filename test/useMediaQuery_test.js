import React from 'react'
import useMediaQuery, { Context } from 'useMediaQuery'
import { assert } from 'chai'
import sinon from 'sinon'
import TestUtils from 'react-dom/test-utils'

describe('useMediaQuery', () => {
  beforeEach(() => {
    window.matchMedia.setConfig({ 
      type: 'screen',
      width: 1200,
      height: 800
    })
  })

  it('builds query from props', () => {
    function Component (props) {
      const { matches } = useMediaQuery(props)
      return matches ? <div className="childComponent" /> : null
    }
    class App extends React.Component {
      render() {
        return <Component {...this.props} />
      }
    }

    const tree = TestUtils.renderIntoDocument(<App minWidth={1200} />)
    assert.isNotNull(TestUtils.findRenderedDOMComponentWithClass(tree, 'childComponent'))

    const tree2 = TestUtils.renderIntoDocument(<App minWidth={1201} />)
    assert.throws(() => (TestUtils.findRenderedDOMComponentWithTag(tree2, 'div')), /Did not find exactly one match/)
  })

  it('builds query from values', () => {
    function Component (props) {
      const { matches } = useMediaQuery({
        values: {
          orientation: 'landscape'
        },
        ...props
      })
      return matches ? <div className="childComponent" /> : null
    }
    class App extends React.Component {
      render() {
        return <Component {...this.props} />
      }
    }

    const tree = TestUtils.renderIntoDocument(
      <App orientation="landscape" />
    )
    assert.isNotNull(TestUtils.findRenderedDOMComponentWithClass(tree, 'childComponent'))
      
    const tree2 = TestUtils.renderIntoDocument(
      <App orientation="portrait" />
    )
    assert.throws(() => (TestUtils.findRenderedDOMComponentWithTag(tree2, 'div')), /Did not find exactly one match/)
  })

  it('matches taking values with precedence', () => {
    function Component ({ values }) {
      const { matches } = useMediaQuery({
        minWidth: 1000,
        values
      })
      return matches ? <div className="childComponent"/> : null
    }
    class App extends React.Component {
      render() {
        return <Component {...this.props} />
      }
    }

    const tree = TestUtils.renderIntoDocument(<App values={{ width: 1000 }} />)
    assert.isNotNull(TestUtils.findRenderedDOMComponentWithClass(tree, 'childComponent'))
    
    const tree2 = TestUtils.renderIntoDocument(<App values={{ width: 999 }} />)
    assert.throws(() => (TestUtils.findRenderedDOMComponentWithTag(tree2, 'div')), /Did not find exactly one match/)
  })

  it('throws if theres no query', () => {
    function App () {
      useMediaQuery({})
      return null
    }
    assert.throws(() => TestUtils.renderIntoDocument(<App />), 'Invalid or missing MediaQuery!')
  })

  it('throws if theres a bad query', () => {
    function App () {
      useMediaQuery({})
      return null
    }
    assert.throws(() => TestUtils.renderIntoDocument(<App />), 'Invalid or missing MediaQuery!')
  })
  
  it('calls onChange callback if provided', () => {
    const callback = sinon.spy()

    function App () {
      useMediaQuery({
        all: true,
        onChange: callback,
      })
      return null
    }

    TestUtils.act(() => {
      TestUtils.renderIntoDocument(<App />)
    })
    
    assert.equal(callback.calledOnce, true)
  })

  it('uses query prop if it has one', () => {
    window.matchMedia.setConfig({ 
      orientation: 'landscape',
    })

    function Component ({ query }) {
      const { matches } = useMediaQuery({ query })
      return matches ? <div className="childComponent" /> : null
    }
    class App extends React.Component {
      render() {
        return <Component {...this.props} />
      }
    }
    
    const tree = TestUtils.renderIntoDocument(
      <App query="(orientation: landscape)" />
    )
    assert.isNotNull(TestUtils.findRenderedDOMComponentWithClass(tree, 'childComponent'))

    const tree2 = TestUtils.renderIntoDocument(
      <App query="(orientation: portrait)" />
    )
    assert.throws(() => (TestUtils.findRenderedDOMComponentWithTag(tree2, 'div')), /Did not find exactly one match/)
  })

  it('renders using values from context', () => {
    function Component() {
      const { matches } = useMediaQuery({ maxWidth: 300 })
      return matches ? <div className="childComponent"/> : null
    }
    class App extends React.Component {
      render() {
        return (
          <Context.Provider value={this.props.values}>
            <Component />
          </Context.Provider>
        )
      }
    }

    const tree1 = TestUtils.renderIntoDocument(<App values={{ width: 300 }} />)
    assert.isNotNull(TestUtils.findRenderedDOMComponentWithClass(tree1, 'childComponent'))

    const tree2 = TestUtils.renderIntoDocument(<App values={{ width: 301 }} />)
    assert.throws(() => (TestUtils.findRenderedDOMComponentWithClass(tree2, 'childComponent')), /Did not find exactly one match/)
  })

  it('renders taking direct values prop with precedence to values from context', () => {
    function Component() {
      const { matches } = useMediaQuery({
        maxWidth: 300,
        values: {
          width: 100
        }
      })
      return matches ? <div className="childComponent"/> : null
    }
    class App extends React.Component {
      render() {
        return (
          <Context.Provider value={{ width: 400 }}>
            <Component values={{ width: 100 }} maxWidth={300} />
          </Context.Provider>
        )
      }
    }

    const tree = TestUtils.renderIntoDocument(<App values={{ width: 300 }} />)
    assert.isNotNull(TestUtils.findRenderedDOMComponentWithClass(tree, 'childComponent'))
  })
})