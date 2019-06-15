import useMediaQuery from './useMediaQuery'

export default function MediaQuery ({ children, onChange, values, ...settings }) {
  const matches = useMediaQuery(settings, onChange, values)

  if (typeof children === 'function') {
    return children(matches)
  }
  return matches ? children : null
}
