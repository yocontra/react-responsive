import React from 'react'
import PropTypes from 'prop-types'
import matchMedia from 'matchmediaquery'
import hyphenate  from 'hyphenate-style-name'
import mediaQuery from './mediaQuery'
import toQuery  from './toQuery'

const defaultTypes = {
  component: PropTypes.node,
  query: PropTypes.string,
  values: PropTypes.shape(mediaQuery.matchers),
  children: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ]),
  onChange: PropTypes.func,
  onBeforeChange: PropTypes.func
}

const excludedQueryKeys = Object.keys(defaultTypes)

function omit(object, keys) {
  const newObject = { ...object }
  keys.forEach(key => delete newObject[key])
  return newObject
}

class MediaQuery extends React.Component {
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
    let forceStatic = false
    if (props.query) {
      this.query = props.query
    } else {
      this.query = toQuery(omit(props, excludedQueryKeys))
    }

    if (!this.query) {
      throw new Error('Invalid or missing MediaQuery!')
    }

    if (props.values) {
      values = Object.keys(props.values)
        .reduce(function (result, key) {
          result[hyphenate(key)] = props.values[key]
          return result
        }, {})
      if (Object.keys(values).length !== 0) forceStatic = true
    }

    this.removeMql()

    this._mql = matchMedia(this.query, values, forceStatic)
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
    this.removeMql()
  }

  updateMatches = () => {
    if (this._mql.matches === this.state.matches) {
      return
    }
    this.setState({
      matches: this._mql.matches
    })
  }

  removeMql = () => {
    if (this._mql) {
      this._mql.removeListener(this.updateMatches)
      this._mql.dispose()
    }
  }

  render() {
    if(typeof this.props.children === 'function') {
      return this.props.children(this.state.matches)
    }

    if (this.state.matches === false) {
      return null
    }

    return this.props.children
  }
}

export {
  MediaQuery as default,
  toQuery
}
