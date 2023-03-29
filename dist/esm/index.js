import { createContext, useRef, useEffect, useContext, useState } from 'react';
import matchMedia from 'matchmediaquery';
import hyphenate from 'hyphenate-style-name';
import { shallowEqualObjects } from 'shallow-equal';
import PropTypes from 'prop-types';

const stringOrNumber = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
// media types
const types = {
    all: PropTypes.bool,
    grid: PropTypes.bool,
    aural: PropTypes.bool,
    braille: PropTypes.bool,
    handheld: PropTypes.bool,
    print: PropTypes.bool,
    projection: PropTypes.bool,
    screen: PropTypes.bool,
    tty: PropTypes.bool,
    tv: PropTypes.bool,
    embossed: PropTypes.bool
};
// properties that match media queries
const matchers = {
    orientation: PropTypes.oneOf(['portrait', 'landscape']),
    scan: PropTypes.oneOf(['progressive', 'interlace']),
    aspectRatio: PropTypes.string,
    deviceAspectRatio: PropTypes.string,
    height: stringOrNumber,
    deviceHeight: stringOrNumber,
    width: stringOrNumber,
    deviceWidth: stringOrNumber,
    color: PropTypes.bool,
    colorIndex: PropTypes.bool,
    monochrome: PropTypes.bool,
    resolution: stringOrNumber,
    type: Object.keys(types)
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { type, ...featureMatchers } = matchers;
// media features
const features = {
    minAspectRatio: PropTypes.string,
    maxAspectRatio: PropTypes.string,
    minDeviceAspectRatio: PropTypes.string,
    maxDeviceAspectRatio: PropTypes.string,
    minHeight: stringOrNumber,
    maxHeight: stringOrNumber,
    minDeviceHeight: stringOrNumber,
    maxDeviceHeight: stringOrNumber,
    minWidth: stringOrNumber,
    maxWidth: stringOrNumber,
    minDeviceWidth: stringOrNumber,
    maxDeviceWidth: stringOrNumber,
    minColor: PropTypes.number,
    maxColor: PropTypes.number,
    minColorIndex: PropTypes.number,
    maxColorIndex: PropTypes.number,
    minMonochrome: PropTypes.number,
    maxMonochrome: PropTypes.number,
    minResolution: stringOrNumber,
    maxResolution: stringOrNumber,
    ...featureMatchers
};
const all = { ...types, ...features };
var mq = {
    all: all,
    types: types,
    matchers: matchers,
    features: features
};

const negate = (cond) => `not ${cond}`;
const keyVal = (k, v) => {
    const realKey = hyphenate(k);
    // px shorthand
    if (typeof v === 'number') {
        v = `${v}px`;
    }
    if (v === true) {
        return realKey;
    }
    if (v === false) {
        return negate(realKey);
    }
    return `(${realKey}: ${v})`;
};
const join = (conds) => conds.join(' and ');
const toQuery = (obj) => {
    const rules = [];
    Object.keys(mq.all).forEach((k) => {
        const v = obj[k];
        if (v != null) {
            rules.push(keyVal(k, v));
        }
    });
    return join(rules);
};

const Context = createContext(undefined);

const makeQuery = (settings) => settings.query || toQuery(settings);
const hyphenateKeys = (obj) => {
    if (!obj)
        return undefined;
    const keys = Object.keys(obj);
    return keys.reduce((result, key) => {
        result[hyphenate(key)] = obj[key];
        return result;
    }, {});
};
const useIsUpdate = () => {
    const ref = useRef(false);
    useEffect(() => {
        ref.current = true;
    }, []);
    return ref.current;
};
const useDevice = (deviceFromProps) => {
    const deviceFromContext = useContext(Context);
    const getDevice = () => hyphenateKeys(deviceFromProps) || hyphenateKeys(deviceFromContext);
    const [device, setDevice] = useState(getDevice);
    useEffect(() => {
        const newDevice = getDevice();
        if (!shallowEqualObjects(device, newDevice)) {
            setDevice(newDevice);
        }
    }, [deviceFromProps, deviceFromContext]);
    return device;
};
const useQuery = (settings) => {
    const getQuery = () => makeQuery(settings);
    const [query, setQuery] = useState(getQuery);
    useEffect(() => {
        const newQuery = getQuery();
        if (query !== newQuery) {
            setQuery(newQuery);
        }
    }, [settings]);
    return query;
};
const useMatchMedia = (query, device) => {
    const getMatchMedia = () => matchMedia(query, device || {}, !!device);
    const [mq, setMq] = useState(getMatchMedia);
    const isUpdate = useIsUpdate();
    useEffect(() => {
        if (isUpdate) {
            // skip on mounting, it has already been set
            const newMq = getMatchMedia();
            setMq(newMq);
            return () => {
                if (newMq) {
                    newMq.dispose();
                }
            };
        }
    }, [query, device]);
    return mq;
};
const useMatches = (mediaQuery) => {
    const [matches, setMatches] = useState(mediaQuery.matches);
    useEffect(() => {
        const updateMatches = (ev) => {
            setMatches(ev.matches);
        };
        mediaQuery.addListener(updateMatches);
        setMatches(mediaQuery.matches);
        return () => {
            mediaQuery.removeListener(updateMatches);
        };
    }, [mediaQuery]);
    return matches;
};
const useMediaQuery = (settings, device, onChange) => {
    const deviceSettings = useDevice(device);
    const query = useQuery(settings);
    if (!query)
        throw new Error('Invalid or missing MediaQuery!');
    const mq = useMatchMedia(query, deviceSettings);
    const matches = useMatches(mq);
    const isUpdate = useIsUpdate();
    useEffect(() => {
        if (isUpdate && onChange) {
            onChange(matches);
        }
    }, [matches]);
    useEffect(() => () => {
        if (mq) {
            mq.dispose();
        }
    }, []);
    return matches;
};

// ReactNode and ReactElement typings are a little funky for functional components, so the ReactElement cast is needed on the return
const MediaQuery = ({ children, device, onChange, ...settings }) => {
    const matches = useMediaQuery(settings, device, onChange);
    if (typeof children === 'function') {
        return children(matches);
    }
    return matches ? children : null;
};

export { Context, MediaQuery as default, toQuery, useMediaQuery };
//# sourceMappingURL=index.js.map
