import React from 'react'
import PropTypes from 'prop-types'
import matchMedia from 'matchmediaquery'
import hyphenate from 'hyphenate-style-name'
import mediaQuery from './mediaQuery'
import toQuery from './toQuery'

const defaultTypes = {
  component: PropTypes.node,
  query: PropTypes.string,
  values: PropTypes.shape(mediaQuery.matchers),
  children: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ]),
  onChange: PropTypes.func
}

const excludedQueryKeys = Object.keys(defaultTypes)

const omit = (object, keys) => {
  const newObject = { ...object }
  keys.forEach(key => delete newObject[key])
  return newObject
}

const getValues = ({ values }) => {
  if (!values) return null
  const keys = Object.keys(values)
  if (keys.length === 0) return null
  return keys.reduce((result, key) => {
    result[hyphenate(key)] = values[key]
    return result
  }, {})
}

const getQuery = (props) =>
  props.query || toQuery(omit(props, excludedQueryKeys))

class MediaQuery extends React.Component {
  static displayName = 'MediaQuery'
  static defaultProps = {
    values: null
  }

  static getDerivedStateFromProps(props, state) {
    const query = getQuery(props)
    if (!query) throw new Error('Invalid or missing MediaQuery!')
    const values = getValues(props)
    if (query === state.query && values === state.values) return null // nothing changed
    const mq = matchMedia(query, values || {}, !!values)
    return {
      matches: mq.matches,
      mq,
      query,
      values
    }
  }

  state = {
    matches: false,
    mq: null,
    query: '',
    values: null
  }

  componentDidMount = () => {
    this.state.mq.addListener(this.updateMatches)
    // make sure match is correct since status could have since first render and now
    this.updateMatches()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.mq !== prevState.mq) {
      this.cleanupMediaQuery(prevState.mq)
      this.state.mq.addListener(this.updateMatches)
      // we don't need to call updateMatches here because even if the old mq fired before
      // we could safely remove it, updateMatches refers to the new one mq instance
      // and it will be accurate.
    }
    if (this.props.onChange && prevState.matches !== this.state.matches) {
      this.props.onChange(this.state.matches)
    }
  }

  componentWillUnmount = () => {
    this._unmounted = true
    this.cleanupMediaQuery(this.state.mq)
  }

  cleanupMediaQuery = (mq) => {
    if (!mq) return
    mq.removeListener(this.updateMatches)
    mq.dispose()
  }

  updateMatches = () => {
    if (this._unmounted) return
    if (this.state.mq.matches === this.state.matches) return
    this.setState({ matches: this.state.mq.matches })
  }

  render = () => {
    if (typeof this.props.children === 'function') {
      return this.props.children(this.state.matches)
    }
    return this.state.matches ? this.props.children : null
  }
}

export {
  MediaQuery as default,
  toQuery
}
