import React from 'react'
import PropTypes from 'prop-types'
import matchMedia from 'matchmedia'
import hyphenate  from 'hyphenate-style-name'
import mediaQuery from './mediaQuery'
import toQuery  from './toQuery'
import isValidQuery from './isValidQuery'

const defaultTypes = {
  component: PropTypes.node,
  query: PropTypes.string,
  values: PropTypes.shape(mediaQuery.matchers),
  children: PropTypes.oneOfType([ PropTypes.node, PropTypes.function ]),
  onChange: PropTypes.function,
  onBeforeChange: PropTypes.function,
}
const mediaKeys = Object.keys(mediaQuery.all)
const excludedQueryKeys = Object.keys(defaultTypes)
const excludedPropKeys = excludedQueryKeys.concat(mediaKeys)

const invalidOrMissingError = 'Invalid or missing MediaQuery!'

function omit(object, keys) {
  const newObject = { ...object }
  keys.forEach(key => delete newObject[key])
  return newObject
}

export default class MediaQuery extends React.Component {
  static displayName = 'MediaQuery'
  static defaultProps = {
    values: {}
  }

  state = { matches: false }

  componentWillMount() {
    this.updateQuery(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.updateQuery(nextProps)
  }

  updateQuery(props) {
    let values
    if (props.query) {
      if (!isValidQuery(props.query)) {
        throw new Error(invalidOrMissingError)
      }
      this.query = props.query
    } else {
      this.query = toQuery(omit(props, excludedQueryKeys))
    }

    if (!this.query) {
      throw new Error(invalidOrMissingError)
    }

    if (props.values) {
      values = Object.keys(props.values)
        .reduce(function (result, key) {
          result[hyphenate(key)] = props.values[key]
          return result
        }, {})
    }

    if (this._mql) {
      this._mql.removeListener(this.updateMatches)
    }

    this._mql = matchMedia(this.query, values)
    this._mql.addListener(this.updateMatches)
    this.updateMatches()
  }

  componentWillUpdate(_, nextState) {
    if(this.props.onBeforeChange && this.state.matches !== nextState.matches) {
      this.props.onBeforeChange(this.state.matches)
    }
  }
  
  componentDidUpdate(_, prevState) {
   if(this.props.onChange && prevState.matches !== this.state.matches) {
     this.props.onChange(this.state.matches)
   }
  }

  componentWillUnmount() {
    this._mql.removeListener(this.updateMatches)
  }

  updateMatches = () => {
    if (this._mql.matches === this.state.matches) {
      return
    }
    this.setState({
      matches: this._mql.matches
    })
  }

  render() {
    if(typeof this.props.children === 'function') {
      return this.props.children(this.state.matches)
    }

    if (this.state.matches === false) {
      return null
    }
    const props = omit(this.props, excludedPropKeys)
    const hasMergeProps = Object.keys(props).length > 0
    const childrenCount = React.Children.count(this.props.children)
    const wrapChildren = this.props.component ||
      childrenCount > 1 ||
      typeof this.props.children === 'string' ||
      Array.isArray(this.props.children) && childrenCount == 1 ||
      this.props.children === undefined
    if (wrapChildren) {
      return React.createElement(
        this.props.component || 'div',
        props,
        this.props.children
      )
    } else if (hasMergeProps) {
      return React.cloneElement(
        this.props.children,
        props
      )
    } else if (childrenCount) {
      return this.props.children
    }
    else {
      return null
    }
  }
}
