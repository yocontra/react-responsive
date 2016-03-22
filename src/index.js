import React from 'react';
import matchMedia from 'matchmedia';
import hyphenate from 'hyphenate-style-name';
import mediaQuery from './mediaQuery';
import toQuery from './toQuery';
import assign from 'object-assign';

const defaultTypes = {
  component: React.PropTypes.node,
  query: React.PropTypes.string,
  values: React.PropTypes.shape(mediaQuery.matchers),
  children: React.PropTypes.array
};
const mediaKeys = Object.keys(mediaQuery.all);
const excludedQueryKeys = Object.keys(defaultTypes);
const excludedPropKeys = excludedQueryKeys.concat(mediaKeys);

function omit(object, keys) {
  const newObject = assign({}, object);
  keys.forEach((key) => {
    delete newObject[key];
  });
  return newObject;
}

const mq = React.createClass({
  displayName: 'MediaQuery',

  getDefaultProps() {
    return {
      values: {}
    };
  },

  getInitialState() {
    return {
      matches: false
    };
  },

  componentWillMount() {
    this.updateQuery(this.props);
  },

  componentWillReceiveProps(props) {
    this.updateQuery(props);
  },

  componentWillUnmount() {
    this._mql.removeListener(this.updateMatches);
  },

  updateQuery(props) {
    let values;
    if (props.query) {
      this.query = props.query;
    } else {
      this.query = toQuery(omit(props, excludedQueryKeys));
    }

    if (!this.query) {
      throw new Error('Invalid or missing MediaQuery!');
    }

    if (props.values) {
      values = Object.keys(props.values)
        .reduce((result, key) => {
          result[hyphenate(key)] = props.values[key];
          return result;
        }, {});
    }

    if (this._mql) {
      this._mql.removeListener(this.updateMatches);
    }

    this._mql = matchMedia(this.query, values);
    this._mql.addListener(this.updateMatches);
    this.updateMatches();
  },

  updateMatches() {
    if (this._mql.matches === this.state.matches) {
      return;
    }
    this.setState({
      matches: this._mql.matches
    });
  },

  render() {
    if (this.state.matches === false) {
      return null;
    }
    const props = omit(this.props, excludedPropKeys);
    if (this.props.component || this.props.children.length > 1) {
      return React.createElement(
        this.props.component || 'div',
        props,
        this.props.children
      );
    } else if (props) {
      return React.cloneElement(
        this.props.children,
        props
      );
    } else {
      return this.props.children;
    }
  }
});

export default mq;
