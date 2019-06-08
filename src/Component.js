import useMediaQuery from './useMediaQuery'

export default function MediaQuery ({ children, ...rest }) {
  const state = useMediaQuery(rest)

  if (typeof children === 'function') {
    return children(state.matches)
  }
  return state.matches ? children : null
}
