import useMediaQuery from './useMediaQuery'

export default function MediaQuery ({ children, values, ...settings }) {
  const matches = useMediaQuery(settings, values)

  if (typeof children === 'function') {
    return children(matches)
  }
  return matches ? children : null
}
