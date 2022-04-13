import useMediaQuery from './useMediaQuery'
import * as React from 'react'
import { MediaQueryAllQueryable, MediaQueryMatchers } from './types'

interface MediaQueryProps extends MediaQueryAllQueryable {
  component?: string | React.FC<any> | React.ClassType<any, any, any> | React.ComponentClass<any>;
  query?: string;
  style?: React.CSSProperties;
  className?: string;
  device?: MediaQueryMatchers;
  values?: Partial<MediaQueryMatchers>;
  onBeforeChange?: (_matches: boolean) => void;
  onChange?: (_matches: boolean) => void;
  children?: React.ReactNode | undefined | Function;
}

const MediaQuery: React.FC<MediaQueryProps> = ({ children, device, onChange, ...settings }: MediaQueryProps) => {
  const matches = useMediaQuery(settings, device, onChange)

  if (typeof children === 'function') {
    return children(matches)
  }
  return matches ? children : null
}

export default MediaQuery
