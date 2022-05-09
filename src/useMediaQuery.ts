import React from 'react'
import matchMedia from 'matchmediaquery'
import hyphenate from 'hyphenate-style-name'
import { shallowEqualObjects } from 'shallow-equal'
import toQuery from './toQuery'
import Context from './Context'
import { MediaQueryAllQueryable, MediaQueryMatchers } from './types'

type MediaQuerySettings = Partial<MediaQueryAllQueryable & { query?: string }>
type HyphenateKeyTypes = MediaQueryMatchers | MediaQueryAllQueryable;

const makeQuery = (settings: MediaQuerySettings) => settings.query || toQuery(settings)

const hyphenateKeys = (obj?: HyphenateKeyTypes)  => {
  type K = keyof HyphenateKeyTypes;

  if (!obj) return undefined
  const keys = Object.keys(obj) as K[]

  return keys.reduce((result, key) => {
    result[hyphenate(key)] = obj[key]
    return result
  }, {} as Record<string, typeof obj[K]>)
}

const useIsUpdate = () => {
  const ref = React.useRef(false)

  React.useEffect(() => {
    ref.current = true
  }, [])

  return ref.current
}

const useDevice = (deviceFromProps?: MediaQueryMatchers): Partial<MediaQueryAllQueryable> | undefined => {
  const deviceFromContext = React.useContext(Context)
  const getDevice = () =>
    hyphenateKeys(deviceFromProps) || hyphenateKeys(deviceFromContext)
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

const useMatchMedia = (query: string, device?: MediaQueryMatchers) => {
  const getMatchMedia = () => matchMedia(query, device || {}, !!device)
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
    const updateMatches = (ev: MediaQueryListEvent) => {
      setMatches(ev.matches)
    }
    mediaQuery.addListener(updateMatches)
    setMatches(mediaQuery.matches)

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
