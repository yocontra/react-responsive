const React = require('react')
const MediaQuery = require('index').default
const mm = { default: require('matchmediaquery') }
const assert = require('chai').assert
const sinon = require('sinon')
const ReactDOM = require('react-dom')
const TestUtils = require('react-dom/test-utils')

describe('MediaQuery', function () {
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
      const mq = (
        <MediaQuery query="all">
          {matches => <div className={matches ? 'matched': ''} />}
        </MediaQuery>
      )
      const e = TestUtils.renderIntoDocument(mq)
      assert.isNotFalse(TestUtils.findRenderedDOMComponentWithClass(e, 'matched'))
    })
    it('renders children', function () {
      const mq = (
        <MediaQuery query="all">
          <div className="childComponent"/>
        </MediaQuery>
      )
      const e = TestUtils.renderIntoDocument(mq)
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
    it('renders the wrapper', function () {
      const mq = (
        <MediaQuery query="all" component="section">
          <div className="childComponent"/>
        </MediaQuery>
      )
      const e = TestUtils.renderIntoDocument(mq)
      assert.isNotFalse(TestUtils.findRenderedDOMComponentWithTag(e, 'section'))
    })
    it('does not render a div when there are multiple children', function () {
      const mq = (
        <MediaQuery query="all">
          <span className="childComponent"/>
          <span className="childComponent"/>
        </MediaQuery>
      )
      const e = TestUtils.renderIntoDocument(mq)
      assert.throws(() => (TestUtils.findRenderedDOMComponentWithTag(e, 'div')), /Did not find exactly one match/)
    })
    it('render a div when there are extra props and multiple children', function () {
      const mq = (
        <MediaQuery query="all" className="wrapper">
          <span className="childComponent"/>
          <span className="childComponent"/>
        </MediaQuery>
      )
      const e = TestUtils.renderIntoDocument(mq)
      assert.isNotFalse(TestUtils.findRenderedDOMComponentWithTag(e, 'div'))
    })
    it('renders the first child when children is a single-element array', function () {
      const mq = (
        <MediaQuery query="all">
          {[ 'single element' ].map((content, index) => <span key={index}>{content}</span>)}
        </MediaQuery>
      )
      const e = TestUtils.renderIntoDocument(mq)
      assert.isNotFalse(TestUtils.findRenderedDOMComponentWithTag(e, 'span'))
      assert.throws(() => (TestUtils.findRenderedDOMComponentWithTag(e, 'div')), /Did not find exactly one match/)
    })
    it('passes extra props', function () {
      const mq = (
        <MediaQuery query="all" className="passedProp">
          <div/>
        </MediaQuery>
      )
      const e = TestUtils.renderIntoDocument(mq)
      assert.isNotFalse(TestUtils.findRenderedDOMComponentWithClass(e, 'passedProp'))
    })
    it('uses query prop if it has one', function () {
      const mq = (
        <MediaQuery query="all" className="passedProp">
          <div/>
        </MediaQuery>
      )
      const e = TestUtils.renderIntoDocument(mq)
      assert.equal(e.query, 'all')
    })
    it('builds query from props', function () {
      const mq = (
        <MediaQuery all className="passedProp">
          <div/>
        </MediaQuery>
      )
      const e = TestUtils.renderIntoDocument(mq)
      assert.equal(e.query, 'all')
    })
    it('builds query from values', function () {
      const mq = (
        <MediaQuery orientation="portrait" className="passedProp">
          <div/>
        </MediaQuery>
      )
      const e = TestUtils.renderIntoDocument(mq)
      assert.equal(e.query, '(orientation: portrait)')
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
    it('renders nothing when children is an empty array', function () {
      const mq = (
        <MediaQuery query="all">
          {[].map((content, index) => {
            return <div key={index}>{content}</div>
          })}
        </MediaQuery>
      )
      const e = TestUtils.renderIntoDocument(mq)
      assert.equal(e.render(), null)
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
    const mq = (
      <MediaQuery values={{ width: 150 }} maxWidth={300}>
        <div className="childComponent"/>
      </MediaQuery>
    )
    const e = TestUtils.renderIntoDocument(mq)
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
  it('doesnt throw error when unspecificed component with empty children', function () {
    const mq = (
      <MediaQuery all className="parentBox" />
    )
    const e = TestUtils.renderIntoDocument(mq)
    assert.isNotFalse(TestUtils.findRenderedDOMComponentWithClass(e, 'parentBox'))
  })
  it('doesnt throw error when component with null children', function () {
    const mq = (
      <MediaQuery all className="parentBox">{null}</MediaQuery>
    )
    const e = TestUtils.renderIntoDocument(mq)
    assert.isNotFalse(TestUtils.findRenderedDOMComponentWithClass(e, 'parentBox'))
  })

  it('renders with output of callback', function () {
    const mq = (
      <MediaQuery maxWidth={300}>
        {matches => <div className={matches ? 'matched': 'no-match'} />}
      </MediaQuery>
    )
    const e = TestUtils.renderIntoDocument(mq)
    assert.isNotFalse(TestUtils.findRenderedDOMComponentWithClass(e, 'no-match'))
  })
  it('calls onChange callback if provided', function () {
    const callback = sinon.spy()
    const mq = (
      <MediaQuery onChange={callback} query="all">
        <div className="childComponent"/>
      </MediaQuery>
    )
    const e = TestUtils.renderIntoDocument(mq)
    e.setState({ matches: false })
    assert.isNotFalse(callback.calledOnce)
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
