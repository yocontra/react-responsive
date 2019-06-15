import React from 'react'
import ReactDOM from 'react-dom'
import useMediaQuery from 'useMediaQuery'
import Context from 'Context'
import { assert } from 'chai'
import sinon from 'sinon'
import TestUtils from 'react-dom/test-utils'

const sleep = (timeOut) => new Promise(resolve => setTimeout(resolve, timeOut)) 

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
      const matches = useMediaQuery(props)
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
      const matches = useMediaQuery(props, null, {
        orientation: 'landscape'
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
      const matches = useMediaQuery({ minWidth: 1000 }, null, values)
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

  it('calls onChange callback on updates', () => {
    const container = document.createElement('div')
    function App ({ onChange, ...settings }) {
      useMediaQuery(settings, onChange)
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
    window.matchMedia.setConfig({ 
      orientation: 'landscape',
    })

    function Component ({ query }) {
      const matches = useMediaQuery({ query })
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
      const matches = useMediaQuery({ maxWidth: 300 })
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
      const matches = useMediaQuery({ maxWidth: 300 }, null, {
        width: 100
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