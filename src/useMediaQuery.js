import React from 'react'
import PropTypes from 'prop-types'
import matchMedia from 'matchmediaquery'
import hyphenate from 'hyphenate-style-name'
import areObjectsEqual from "shallow-equal/objects"
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

const getState = (props, state, contextValues) => {
  const query = getQuery(props)
  if (!query) throw new Error('Invalid or missing MediaQuery!')
  const values = getValues(props) || getValues({ values: contextValues })
  if (query === state.query && areObjectsEqual(values, state.values)) return // nothing changed
  const mq = matchMedia(query, values || {}, !!values)
  return {
    matches: mq.matches,
    mq,
    query,
    values
  }
}

function useIsMounted() {
  const isMounted = React.useRef(true)

  React.useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  return isMounted
}

function usePrevious(value) {
  const ref = React.useRef({})
  React.useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const Context = React.createContext()

function useMediaQuery(props) {
  const contextValues = React.useContext(Context)
  const [state, setState] = React.useState(
    getState(
      props, 
      {
        matches: false,
        mq: null,
        query: '',
        values: null
      },
      contextValues
    )
  )
  const prevState = usePrevious(state)
  const isMounted = useIsMounted()

  const updateMatches = React.useCallback(() => {
    if (!isMounted.current) return
    if (state.mq.matches === state.matches) return

    setState(state => ({ 
      ...state, 
      matches: state.mq.matches 
    }))
  }, [state])

  React.useEffect(() => {
    const nextState = getState(props, state, contextValues)
    if (nextState) {
      setState(nextState)
    }
  })

  React.useEffect(() => {
    state.mq.addListener(updateMatches)
    return () => {
      if (state.mq) {
        state.mq.removeListener(updateMatches)
        state.mq.dispose()
      }
    }
  }, [state.mq])

  React.useEffect(() => {
    // make sure match is correct since status could have since first render and now
    updateMatches()
  }, [])

  React.useEffect(() => {
    if (props.onChange && prevState.matches !== state.matches) {
      props.onChange(state.matches)
    }
  })
  

  return state.matches
}

export {
  useMediaQuery as default,
  Context,
}