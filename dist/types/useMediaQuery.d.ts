import { MediaQueryAllQueryable, MediaQueryMatchers } from './types';
type MediaQuerySettings = Partial<MediaQueryAllQueryable & {
    query?: string;
}>;
declare const useMediaQuery: (settings: MediaQuerySettings, device?: MediaQueryMatchers, onChange?: (_: boolean) => void) => boolean;
export default useMediaQuery;
