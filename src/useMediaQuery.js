import React from 'react'
import matchMedia from 'matchmediaquery'
import hyphenate from 'hyphenate-style-name'
import areObjectsEqual from "shallow-equal/objects"
import toQuery from './toQuery'
import Context from './Context'

const getQuery = settings => settings.query || toQuery(settings)

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

function useQuery(settings) {
  const newQuery = getQuery(settings)
  const [query, setQuery] = React.useState(newQuery)

  React.useEffect(() => {
    if(query !== newQuery) {
      setQuery(newQuery)
    }
  }, [settings])

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

function useMediaQuery({ onChange, ...settings }, values) {
  const hyphenatedValues = useHyphenatedValues(values)
  const query = useQuery(settings)
  if (!query) throw new Error('Invalid or missing MediaQuery!')
  const mq = useMatchMedia(query, hyphenatedValues)
  const matches = useMatches(mq)
  const isUpdate = useIsUpdate()

  React.useEffect(() => {
    if (isUpdate && onChange) {
      onChange(matches)
    }
  }, [matches])

  return matches
}

export default useMediaQuery