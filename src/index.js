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
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onChange: PropTypes.func,
}

const excludedQueryKeys = Object.keys(defaultTypes)

const omit = (object, keys) => {
  const newObject = { ...object }
  keys.forEach(key => delete newObject[key])
  return newObject
}

const getValues = ({ values = {} }) =>
  Object.keys(values).reduce((result, key) => {
    result[hyphenate(key)] = values[key]
    return result
  }, {})

const getQuery = props => props.query || toQuery(omit(props, excludedQueryKeys))

const createMatchMedia = (props, query) => {
  const values = getValues(props)
  const forceStatic = Object.keys(values).length !== 0
  return matchMedia(query, values, forceStatic)
}

class MediaQuery extends React.Component {
  static displayName = 'MediaQuery'
  static defaultProps = {
    values: {},
  }

  static getDerivedStateFromProps(props, state) {
    const query = getQuery(props)
    if (!query) throw new Error('Invalid or missing MediaQuery!')
    const forceStatic = Object.keys(props.values).length !== 0
    if (query === state.query && forceStatic === state.forceStatic) return null

    const mq = createMatchMedia(props, query)
    return {
      matches: mq.matches,
      mq,
      query,
      forceStatic,
    }
  }

  state = {
    matches: false,
    mq: null,
    query: '',
    forceStatic: false,
  }

  componentDidMount() {
    this.state.mq.addListener(this.updateMatches)
    // make sure match is correct since status could have since first render and now
    this.updateMatches()
  }

  componentDidUpdate(prevProps, prevState) {
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

  componentWillUnmount() {
    this._unmounted = true
    this.cleanupMediaQuery(this.state.mq)
  }

  cleanupMediaQuery = mq => {
    if (!mq) return
    mq.removeListener(this.updateMatches)
    mq.dispose()
  }

  updateMatches = () => {
    if (this._unmounted) return
    if (this.state.mq.matches === this.state.matches) return
    this.setState({ matches: this.state.mq.matches })
  }

  render() {
    if (typeof this.props.children === 'function') {
      return this.props.children(this.state.matches)
    }
    return this.state.matches ? this.props.children : null
  }
}

export { MediaQuery as default, toQuery }
