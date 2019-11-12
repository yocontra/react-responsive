import React, { useState, useEffect } from 'react'
import matchMedia from 'matchmediaquery'
import hyphenate from 'hyphenate-style-name'
import areObjectsEqual from 'shallow-equal/objects'
import toQuery from './toQuery'
import Context from './Context'

const makeQuery = (settings) => settings.query || toQuery(settings)

const hyphenateKeys = (obj) => {
  if (!obj) return null
  const keys = Object.keys(obj)
  if (keys.length === 0) return null
  return keys.reduce((result, key) => {
    result[hyphenate(key)] = obj[key]
    return result
  }, {})
}

const useIsUpdate = () => {
  const ref = React.useRef(false)

  React.useEffect(() => {
    ref.current = true
  }, [])

  return ref.current
}

const useDevice = (deviceFromProps) => {
  const deviceFromContext = React.useContext(Context)
  const getDevice = () =>
    hyphenateKeys(deviceFromProps) || hyphenateKeys(deviceFromContext)
  const [ device, setDevice ] = React.useState(getDevice)

  React.useEffect(() => {
    const newDevice = getDevice()
    if (!areObjectsEqual(device, newDevice)) {
      setDevice(newDevice)
    }
  }, [ deviceFromProps, deviceFromContext ])

  return device
}

const useQuery = (settings) => {
  const getQuery = () => makeQuery(settings)
  const [ query, setQuery ] = React.useState(getQuery)

  React.useEffect(() => {
    const newQuery = getQuery()
    if (query !== newQuery) {
      setQuery(newQuery)
    }
  }, [ settings ])

  return query
}

const useMatchMedia = (query, device) => {
  const getMatchMedia = () => matchMedia(query, device || {}, !!device)
  const [ mq, setMq ] = React.useState(getMatchMedia)
  const isUpdate = useIsUpdate()

  React.useEffect(() => {
    if (isUpdate) {
      // skip on mounting, it has already been set
      setMq(getMatchMedia())
    }

    return () => {
      mq.dispose()
    }
  }, [ query, device ])

  return mq
}

const useMatches = (mediaQuery) => {
  const [ matches, setMatches ] = React.useState(mediaQuery.matches)

  React.useEffect(() => {
    const updateMatches = () => {
      setMatches(mediaQuery.matches)
    }
    mediaQuery.addListener(updateMatches)
    updateMatches()

    return () => {
      mediaQuery.removeListener(updateMatches)
    }
  }, [ mediaQuery ])

  return matches
}

const useBasicMediaQuery = (settings, device, onChange) => {
  const deviceSettings = useDevice(device)
  const query = useQuery(settings)
  if (!query) throw new Error('Invalid or missing MediaQuery!')
  const mq = useMatchMedia(query, deviceSettings)
  const matches = useMatches(mq)
  const isUpdate = useIsUpdate()

  React.useEffect(() => {
    if (isUpdate && onChange) {
      onChange(matches)
    }
  }, [ matches ])

  return matches
}

const useSsrMediaQuery = (setting, device, onChange) => {
  const [ matched, setMatched ] = useState(null)
  const newMatched = useBasicMediaQuery(setting, device, onChange)

  useEffect(() => {
    if (matched === null) {
      setMatched(newMatched)
    }
  })

  if (matched === null) {
    return matched
  }

  return newMatched
}

const useMediaQuery = (settings, device, onChange) => {
  if (settings.ssr) {
    return useSsrMediaQuery(settings, device, onChange)
  } else {
    return useBasicMediaQuery(settings, device, onChange)
  }
}

export default useMediaQuery
