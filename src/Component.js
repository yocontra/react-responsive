import useMediaQuery from './useMediaQuery'

export default function MediaQuery ({ children, values, onChange, ...settings }) {
  const matches = useMediaQuery(settings, values, onChange)

  if (typeof children === 'function') {
    return children(matches)
  }
  return matches ? children : null
}
