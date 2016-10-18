var React = require('react');
var MediaQuery = require('index');
var mm = { default: require('matchmedia') };
var assert = require('chai').assert;
var sinon = require('sinon');
var TestUtils = require('react-addons-test-utils');

describe('MediaQuery', function() {
  describe('when query matches', function() {
    before(function() {
      this.mmStub = sinon.stub(mm, 'default').returns({
        matches: true,
        addListener: function() {},
        removeListener: function() {}
      });
    });
    after(function() {
      this.mmStub.restore();
    });
    it('renders with output of callback', function() {
      const mq = (
        <MediaQuery query="all">
          {matches => <div className={matches ? 'matched': ''} />}
        </MediaQuery>
      );
      const e = TestUtils.renderIntoDocument(mq);
      assert.isNotFalse(TestUtils.findRenderedDOMComponentWithClass(e, 'matched'));
    });
    it('renders children', function() {
      const mq = (
        <MediaQuery query="all">
          <div className="childComponent"/>
        </MediaQuery>
      );
      const e = TestUtils.renderIntoDocument(mq);
      assert.isNotFalse(TestUtils.findRenderedDOMComponentWithClass(e, 'childComponent'));
    });
    it('renders text node', function() {
      const mq = (
        <MediaQuery query="all">
          1231
        </MediaQuery>
      );
      const e = TestUtils.renderIntoDocument(mq);
      assert.isNotFalse(TestUtils.findAllInRenderedTree(e, function(c) {return true;}));
    });
    it('renders the wrapper', function() {
      const mq = (
        <MediaQuery query="all" component="section">
          <div className="childComponent"/>
        </MediaQuery>
      );
      const e = TestUtils.renderIntoDocument(mq);
      assert.isNotFalse(TestUtils.findRenderedDOMComponentWithTag(e, 'section'));
    });
    it('renders a div when theres multiple children', function() {
      const mq = (
        <MediaQuery query="all">
          <span className="childComponent"/>
          <span className="childComponent"/>
        </MediaQuery>
      );
      const e = TestUtils.renderIntoDocument(mq);
      assert.isNotFalse(TestUtils.findRenderedDOMComponentWithTag(e, 'div'));
    });
    it('passes extra props', function() {
      const mq = (
        <MediaQuery query="all" className="passedProp">
          <div/>
        </MediaQuery>
      );
      const e = TestUtils.renderIntoDocument(mq);
      assert.isNotFalse(TestUtils.findRenderedDOMComponentWithClass(e, 'passedProp'));
    });
    it('uses query prop if it has one', function() {
      const mq = (
        <MediaQuery query="all" className="passedProp">
          <div/>
        </MediaQuery>
      );
      const e = TestUtils.renderIntoDocument(mq);
      assert.equal(e.query, 'all');
    });
    it('builds query from props', function() {
      const mq = (
        <MediaQuery all className="passedProp">
          <div/>
        </MediaQuery>
      );
      const e = TestUtils.renderIntoDocument(mq);
      assert.equal(e.query, 'all');
    });
    it('builds query from values', function() {
      const mq = (
        <MediaQuery orientation="portrait" className="passedProp">
          <div/>
        </MediaQuery>
      );
      const e = TestUtils.renderIntoDocument(mq);
      assert.equal(e.query, '(orientation: portrait)');
    });
    it('throws if theres no query', function() {
      const mq = (
        <MediaQuery>
          <div className="childComponent"></div>
        </MediaQuery>
      );
      assert.throws(() => (TestUtils.renderIntoDocument(mq)), 'Invalid or missing MediaQuery!');
    });
    it('throws if theres a bad query', function() {
      const mq = (
        <MediaQuery doesntExist='test'>
          <div className="childComponent"></div>
        </MediaQuery>
      );
      assert.throws(() => (TestUtils.renderIntoDocument(mq)), 'Invalid or missing MediaQuery!');
    });
    it('renders nothing when children is an empty array', function() {
      const mq = (
        <MediaQuery query="all">
          {[].map((content, index) => {
            return <div key={index}>{content}</div>
          })}
        </MediaQuery>
      );
      const e = TestUtils.renderIntoDocument(mq);
      assert.equal(e.render(), null);
    });
  });
  it('renders nothing when no matches', function() {
    const mq = (
      <MediaQuery maxWidth={300}>
        <div className="childComponent"/>
      </MediaQuery>
    );
    const e = TestUtils.renderIntoDocument(mq);
    assert.throws(() => (TestUtils.findRenderedDOMComponentWithClass(e, 'childComponent')), /Did not find exactly one match/);
  });
  it('doesnt throw error when unspecificed component with empty children', function() {
    const mq = (
      <MediaQuery all className='parentBox' />
    );
    const e = TestUtils.renderIntoDocument(mq);
    assert.isNotFalse(TestUtils.findRenderedDOMComponentWithClass(e, 'parentBox'));
  });
  it('renders with output of callback', function() {
    const mq = (
      <MediaQuery maxWidth={300}>
        {matches => <div className={matches ? 'matched': 'no-match'} />}
      </MediaQuery>
    );
    const e = TestUtils.renderIntoDocument(mq);
    assert.isNotFalse(TestUtils.findRenderedDOMComponentWithClass(e, 'no-match'));
  });
});
