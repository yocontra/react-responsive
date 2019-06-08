const React = require('react')
const { default: MediaQuery, Context } = require('index')
const mm = { default: require('matchmediaquery') }
const assert = require('chai').assert
const sinon = require('sinon')
const ReactDOM = require('react-dom')
const TestUtils = require('react-dom/test-utils')

describe('MediaQuery', function () {
  let container

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })
  
  afterEach(() => {
    document.body.removeChild(container)
    container = null
  })
  
  describe('when query matches', function () {
    before(function () {
      this.mmStub = sinon.stub(mm, 'default').returns({
        matches: true,
        addListener: function () {},
        removeListener: function () {}
      })
    })
    after(function () {
      this.mmStub.restore()
    })
    it('renders with output of callback', function () {
      class App extends React.Component {
        render() {
          return (
            <MediaQuery query="all">
              {matches => <div className={matches ? 'matched': ''} />}
            </MediaQuery>    
          )
        }
      }
    
      const e = TestUtils.renderIntoDocument(<App />)
      assert.isNotFalse(TestUtils.findRenderedDOMComponentWithClass(e, 'matched'))
    })
    it('renders children', function () {
      class App extends React.Component {
        render() {
          return (
            <MediaQuery query="all">
              <div className="childComponent"/>
            </MediaQuery>
          )
        }
      }
    
      const e = TestUtils.renderIntoDocument(<App />)
      assert.isNotFalse(TestUtils.findRenderedDOMComponentWithClass(e, 'childComponent'))
    })
    it('renders text node', function () {
      const mq = (
        <MediaQuery query="all">
          1231
        </MediaQuery>
      )
      const e = TestUtils.renderIntoDocument(mq)
      assert.isNotFalse(TestUtils.findAllInRenderedTree(e, function () {return true}))
    })
    it('does not wrap text node', function () {
      const mq = (
        <MediaQuery query="all">
          1231
        </MediaQuery>
      )
      const e = TestUtils.renderIntoDocument(mq)
      assert.throws(() => (TestUtils.findRenderedDOMComponentWithTag(e, 'div')), /Did not find exactly one match/)
    })
    it('uses query prop if it has one', function () {
      class App extends React.Component {
        render() {
          const { query } = this.props
          return (
            <MediaQuery values={{ orientation: 'landscape' }} query={query}>
              <div className="childComponent" />
            </MediaQuery>    
          )
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
    it('builds query from props', function () {
      class App extends React.Component {
        render() {
          return (
            <MediaQuery all>
              <div className="childComponent" />
            </MediaQuery>
          )
        }
      }
      const tree = TestUtils.renderIntoDocument(<App />)
      assert.isNotNull(TestUtils.findRenderedDOMComponentWithClass(tree, 'childComponent'))
    })
    it('builds query from values', function () {
      class App extends React.Component {
        render() {
          return (
            <MediaQuery values={{ orientation: 'landscape' }} {...this.props}>
              <div className="childComponent" />
            </MediaQuery>    
          )
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
    it('throws if theres no query', function () {
      const mq = (
        <MediaQuery>
          <div className="childComponent"></div>
        </MediaQuery>
      )
      assert.throws(() => (TestUtils.renderIntoDocument(mq)), 'Invalid or missing MediaQuery!')
    })
    it('throws if theres a bad query', function () {
      const mq = (
        <MediaQuery doesntExist="test">
          <div className="childComponent"></div>
        </MediaQuery>
      )
      assert.throws(() => (TestUtils.renderIntoDocument(mq)), 'Invalid or missing MediaQuery!')
    })
  })
  it('renders nothing when no matches', function () {
    const mq = (
      <MediaQuery maxWidth={300}>
        <div className="childComponent"/>
      </MediaQuery>
    )
    const e = TestUtils.renderIntoDocument(mq)
    assert.throws(() => (TestUtils.findRenderedDOMComponentWithClass(e, 'childComponent')), /Did not find exactly one match/)
  })
  it('renders taking values with precedence', function () {
    class App extends React.Component {
      render() {
        return (
          <MediaQuery values={{ width: 150 }} maxWidth={300}>
            <div className="childComponent"/>
          </MediaQuery>
        )
      }
    }
    const e = TestUtils.renderIntoDocument(<App />)
    assert.isNotFalse(TestUtils.findRenderedDOMComponentWithClass(e, 'childComponent'))
  })
  it('doesnt render taking values with precedence', function () {
    const mq = (
      <MediaQuery values={{ width: 350 }} maxWidth={300}>
        <div className="childComponent"/>
      </MediaQuery>
    )
    const e = TestUtils.renderIntoDocument(mq)
    assert.throws(() => (TestUtils.findRenderedDOMComponentWithClass(e, 'childComponent')), /Did not find exactly one match/)
  })
  it('renders using values from context', () => {
    class App extends React.Component {
      render() {
        return (
          <Context.Provider value={this.props.values}>
            <MediaQuery maxWidth={300}>
              <div className="childComponent"/>
            </MediaQuery>
          </Context.Provider>
        )
      }
    }

    const mq = <App values={{ width: 300 }} />
    const e = TestUtils.renderIntoDocument(mq)
    assert.isNotFalse(TestUtils.findRenderedDOMComponentWithClass(e, 'childComponent'))

    const mq2 = <App values={{ width: 301 }} />
    const e2 = TestUtils.renderIntoDocument(mq2)
    assert.throws(() => (TestUtils.findRenderedDOMComponentWithClass(e2, 'childComponent')), /Did not find exactly one match/)
  })
  it('renders taking direct values prop with precedence to values from context', () => {
    class App extends React.Component {
      render() {
        return (
          <Context.Provider value={{ width: 400 }}>
            <MediaQuery values={{ width: 100 }} maxWidth={300}>
              <div className="childComponent"/>
            </MediaQuery>
          </Context.Provider>
        )
      }
    }

    const mq = <App values={{ width: 300 }} />
    const e = TestUtils.renderIntoDocument(mq)
    assert.isNotFalse(TestUtils.findRenderedDOMComponentWithClass(e, 'childComponent'))
  })
  it('renders with output of callback', function () {
    class App extends React.Component {
      render() {
        return (
          <MediaQuery maxWidth={300}>
            {matches => <div className={matches ? 'matched': 'no-match'} />}
          </MediaQuery>
        )
      }
    }

    const e = TestUtils.renderIntoDocument(<App />)
    assert.isNotFalse(TestUtils.findRenderedDOMComponentWithClass(e, 'no-match'))
  })
  it('calls onChange callback if provided', function () {
    const callback = sinon.spy()

    TestUtils.act(() => {
      ReactDOM.render(
        <MediaQuery onChange={callback} query="all">
          <div className="childComponent"/>
        </MediaQuery>, 
        container
      )
    })
    
    assert.equal(callback.calledOnce, true)
  })
  it('handles unmount', function () {
    const container = document.createElement('div')
    const mq = (
      <MediaQuery query="all">
        <div className="childComponent"/>
      </MediaQuery>
    )
    ReactDOM.render(mq, container)
    assert.doesNotThrow(() => ReactDOM.unmountComponentAtNode(container))
  })
})
