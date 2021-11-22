import React from 'react'
import matchMedia from 'matchmediaquery'
import hyphenate from 'hyphenate-style-name'
import { shallowEqualObjects } from 'shallow-equal'
import toQuery from './toQuery'
import Context from './Context'
import { MediaQueryAllQueryable, MediaQueryMatchers } from './types'

type MediaQuerySettings = Partial<MediaQueryAllQueryable & { query?: string }>

const makeQuery = (settings: Record<string, any>) => settings.query || toQuery(settings)

const hyphenateKeys = (obj?: Record<string, any>): Record<string, any> | null => {
  if (!obj) return null
  const keys = Object.keys(obj)
  if (keys.length === 0) return null

  return keys.reduce((result, key) => {
    result[hyphenate(key)] = obj[key]
    return result
  }, {} as Record<string, any>)
}

const useIsUpdate = () => {
  const ref = React.useRef(false)

  React.useEffect(() => {
    ref.current = true
  }, [])

  return ref.current
}

const useDevice = (deviceFromProps?: MediaQueryMatchers): Partial<MediaQueryAllQueryable> => {
  const deviceFromContext = React.useContext(Context)
  const getDevice = () =>
    hyphenateKeys(deviceFromProps) || hyphenateKeys(deviceFromContext) || {}
  const [ device, setDevice ] = React.useState(getDevice)

  React.useEffect(() => {
    const newDevice = getDevice()
    if (!shallowEqualObjects(device, newDevice)) {
      setDevice(newDevice)
    }
  }, [ deviceFromProps, deviceFromContext ])

  return device
}

const useQuery = (settings: MediaQuerySettings) => {
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

const useMatchMedia = (query: string, device: MediaQueryMatchers) => {
  const getMatchMedia = () => matchMedia(query, device)
  const [ mq, setMq ] = React.useState(getMatchMedia)
  const isUpdate = useIsUpdate()

  React.useEffect(() => {
    if (isUpdate) {
      // skip on mounting, it has already been set
      const newMq = getMatchMedia()
      setMq(newMq)

      return () => {
        if (newMq) {
          newMq.dispose()
        }
      }
    }
  }, [ query, device ])

  return mq
}

const useMatches = (mediaQuery: MediaQueryList): boolean => {
  const [ matches, setMatches ] = React.useState<boolean>(mediaQuery.matches)

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

const useMediaQuery = (settings: MediaQuerySettings, device?: MediaQueryMatchers, onChange?: (_: boolean) => void) => {
  const deviceSettings = useDevice(device)
  const query = useQuery(settings)
  if (!query) throw new Error('Invalid or missing MediaQuery!')
  const mq = useMatchMedia(query, deviceSettings)
  const matches = useMatches(mq as unknown as MediaQueryList)
  const isUpdate = useIsUpdate()

  React.useEffect(() => {
    if (isUpdate && onChange) {
      onChange(matches)
    }
  }, [ matches ])

  React.useEffect(() => () => {
    if (mq) {
      mq.dispose()
    }
  }, [])

  return matches
}

export default useMediaQuery
