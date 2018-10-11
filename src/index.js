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
  onChange: PropTypes.func
}
const mediaKeys = Object.keys(mediaQuery.all)
const excludedQueryKeys = Object.keys(defaultTypes)
const excludedPropKeys = excludedQueryKeys.concat(mediaKeys)

function omit(object, keys) {
  const newObject = { ...object }
  keys.forEach(key => delete newObject[key])
  return newObject
}

function getValues({values}) {
  return  Object.keys(values || {}).reduce(function (result, key) {
    result[hyphenate(key)] = values[key]
    return result
  }, {})
}

function getQuery(props) {
  return props.query || toQuery(omit(props, excludedQueryKeys))
}

function buildMatcher(props, query) {
  const values = getValues(props)
  const forceStatic = values.length === 0
  return matchMedia(query, values, forceStatic)
}

class MediaQuery extends React.Component {
  static displayName = 'MediaQuery'
  static defaultProps = {
    values: {}
  }

  static getDerivedStateFromProps(props, state) {
    const query = getQuery(props)
    if (!query) {
      throw new Error('Invalid or missing MediaQuery!')
    }

    if(query !== state.query){
      const mq = buildMatcher(props, query)
      return {
        matches: mq.matches,
        mq,
        query
      }
    }
    return null
  }

  state = {
    matches: false,
    mq: null,
    query: ''
  }

  componentDidMount() {
    this.state.mq.addListener(this.updateMatches)
    // make sure match is correct since status could have since first render and now
    this.updateMatches()
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.mq !== prevState.mq) {
      this.removeMq(prevState.mq)
      this.state.mq.addListener(this.updateMatches)
      // we don't need to call updateMatches here because even if the old mq fired before
      // we could safely remove it, updateMatches refers to the new one mq instance
      // and it will be accurate.
    }
    if(this.props.onChange && prevState.matches !== this.state.matches) {
      this.props.onChange(this.state.matches)
    }
  }

  componentWillUnmount() {
    this.removeMq(this.state.mq)
  }

  removeMq = (mq) => {
    if (mq) {
      mq.removeListener(this.updateMatches)
      mq.dispose()
    }
  }

  updateMatches = () => {
    if (this.state.mq.matches === this.state.matches) {
      return
    }
    this.setState({
      matches: this.state.mq.matches
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
    const wrapChildren = this.props.component || this.props.children == null || (hasMergeProps && childrenCount > 1)
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

export {
  MediaQuery as default,
  toQuery
}
