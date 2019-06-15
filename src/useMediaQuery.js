import React from 'react'
import PropTypes from 'prop-types'
import matchMedia from 'matchmediaquery'
import hyphenate from 'hyphenate-style-name'
import areObjectsEqual from "shallow-equal/objects"
import mediaQuery from './mediaQuery'
import toQuery from './toQuery'
import Context from './Context'

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

const getQuery = (props) =>
  props.query || toQuery(omit(props, excludedQueryKeys))

const getValues = values => {
  if (!values) return null
  const keys = Object.keys(values)
  if (keys.length === 0) return null
  return keys.reduce((result, key) => {
    result[hyphenate(key)] = values[key]
    return result
  }, {})
}

function useHyphenatedValues (values) {
  const contextValues = React.useContext(Context)
  const getHyphenatedValues = () => getValues(values) || getValues(contextValues)
  const [hyphenatedValues, setHyphenatedValues] = React.useState(getHyphenatedValues)

  React.useEffect(() => {
    const newHyphenatedValues = getHyphenatedValues()
    if(!areObjectsEqual(hyphenatedValues, newHyphenatedValues)) {
      setHyphenatedValues(newHyphenatedValues)
    }
  }, [values, contextValues])

  return hyphenatedValues
}

function useQuery(props) {
  const newQuery = getQuery(props)
  const [query, setQuery] = React.useState(newQuery)

  React.useEffect(() => {
    if(query !== newQuery) {
      setQuery(newQuery)
    }
  }, [props])

  return query
}

function useIsUpdate() {
  const ref = React.useRef(false)

  React.useEffect(() => {
    ref.current = true
  }, [])

  return ref.current
}

function useMatchMedia (query, values) {
  const getMatchMedia = () => matchMedia(query, values || {}, !!values)
  const [mq, setMq] = React.useState(getMatchMedia)
  const isUpdate = useIsUpdate()

  React.useEffect(() => {
    if(isUpdate) {
      // skip on mounting, it has already been set
      setMq(getMatchMedia())
    }

    return () => {
      mq.dispose()
    }
  }, [query, values])

  return mq
}

function useMatches (mediaQuery) {
  const [matches, setMatches] = React.useState(mediaQuery.matches)

  React.useEffect(() => {
    const updateMatches = () => {
      setMatches(mediaQuery.matches)
    }
    mediaQuery.addListener(updateMatches)

    // make sure match is correct since status could have since first render and now
    updateMatches()

    return () => {
      mediaQuery.removeListener(updateMatches)
    }
  }, [mediaQuery])

  return matches
}

function useMediaQuery(props) {
  const hyphenatedValues = useHyphenatedValues(props.values)
  const query = useQuery(props)
  if (!query) throw new Error('Invalid or missing MediaQuery!')
  const mq = useMatchMedia(query, hyphenatedValues)
  const matches = useMatches(mq)

  React.useEffect(() => {
    if (props.onChange) {
      props.onChange(matches)
    }
  }, [matches])

  return matches
}

export default useMediaQuery