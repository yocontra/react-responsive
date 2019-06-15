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

const getState = (props, state) => {
  const query = getQuery(props)
  if (!query) throw new Error('Invalid or missing MediaQuery!')
  if (query === state.query) return // nothing changed
  return {
    query
  }
}

const getValues = values => {
  if (!values) return null
  const keys = Object.keys(values)
  if (keys.length === 0) return null
  return keys.reduce((result, key) => {
    result[hyphenate(key)] = values[key]
    return result
  }, {})
}

function useValues (props) {
  const contextValues = React.useContext(Context)
  const newValues = getValues(props.values) || getValues(contextValues)
  const [values, setValues] = React.useState(newValues)

  React.useEffect(() => {
    if(!areObjectsEqual(values, newValues)) {
      setValues(newValues)
    }
  })

  return values
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
      mediaQuery.dispose()
    }
  }, [mediaQuery])

  return matches
}

function useMediaQuery(props) {
  const values = useValues(props)
  const [state, setState] = React.useState(
    getState(
      props, 
      {
        query: ''
      }
    )
  )

  const mq = useMatchMedia(state.query, values)

  React.useEffect(() => {
    const nextState = getState(props, state)
    if (nextState) {
      setState(nextState)
    }
  })

  const matches = useMatches(mq)

  React.useEffect(() => {
    if (props.onChange) {
      props.onChange(matches)
    }
  }, [matches])

  return matches
}

export default useMediaQuery