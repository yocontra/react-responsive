import useMediaQuery from './useMediaQuery'

export default function MediaQuery ({ children, ...rest }) {
  const matches = useMediaQuery(rest)

  if (typeof children === 'function') {
    return children(matches)
  }
  return matches ? children : null
}
