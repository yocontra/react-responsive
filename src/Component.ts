import useMediaQuery from './useMediaQuery';
import { ReactNode, FC, CSSProperties } from 'react';
import { MediaQueryAllQueryable, MediaQueryMatchers } from './types';

interface MediaQueryProps extends MediaQueryAllQueryable {
  component?: ReactNode
  // eslint-disable-next-line @typescript-eslint/ban-types
  children?: ReactNode | Function;
  query?: string;
  style?: CSSProperties;
  className?: string;
  device?: MediaQueryMatchers;
  values?: Partial<MediaQueryMatchers>;
  onBeforeChange?: (_matches: boolean) => void;
  onChange?: (_matches: boolean) => void;
}

const MediaQuery: FC<MediaQueryProps> = ({
  children,
  device,
  onChange,
  ...settings
}) => {
  const matches = useMediaQuery(settings, device, onChange);

  if (typeof children === 'function') {
    return children(matches);
  }
  return matches ? children : null;
};

export default MediaQuery;
