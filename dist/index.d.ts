import * as React from "react";
interface MediaQueryProps extends MediaQueryAllQueryable {
    component?: ReactNode;
    children?: ReactNode | Function;
    query?: string;
    style?: React.CSSProperties;
    className?: string;
    device?: MediaQueryMatchers;
    values?: Partial<MediaQueryMatchers>;
    onBeforeChange?: (_matches: boolean) => void;
    onChange?: (_matches: boolean) => void;
}
export declare const MediaQuery: React.FC<MediaQueryProps>;
export default MediaQuery;

export declare const Context: React.Context<Partial<MediaQueryAllQueryable> | undefined>;
export default Context;

export { MediaQuery as default, useMediaQuery, toQuery, Context };
export type { MediaQueryTypes, MediaQueryType, MediaQueryFeatures, MediaQueryAllQueryable } from './types';

export declare const _default: {
    all: {
        orientation: PropTypes.Requireable<string>;
        scan: PropTypes.Requireable<string>;
        aspectRatio: PropTypes.Requireable<string>;
        deviceAspectRatio: PropTypes.Requireable<string>;
        height: PropTypes.Requireable<string | number>;
        deviceHeight: PropTypes.Requireable<string | number>;
        width: PropTypes.Requireable<string | number>;
        deviceWidth: PropTypes.Requireable<string | number>;
        color: PropTypes.Requireable<boolean>;
        colorIndex: PropTypes.Requireable<boolean>;
        monochrome: PropTypes.Requireable<boolean>;
        resolution: PropTypes.Requireable<string | number>;
        minAspectRatio: PropTypes.Requireable<string>;
        maxAspectRatio: PropTypes.Requireable<string>;
        minDeviceAspectRatio: PropTypes.Requireable<string>;
        maxDeviceAspectRatio: PropTypes.Requireable<string>;
        minHeight: PropTypes.Requireable<string | number>;
        maxHeight: PropTypes.Requireable<string | number>;
        minDeviceHeight: PropTypes.Requireable<string | number>;
        maxDeviceHeight: PropTypes.Requireable<string | number>;
        minWidth: PropTypes.Requireable<string | number>;
        maxWidth: PropTypes.Requireable<string | number>;
        minDeviceWidth: PropTypes.Requireable<string | number>;
        maxDeviceWidth: PropTypes.Requireable<string | number>;
        minColor: PropTypes.Requireable<number>;
        maxColor: PropTypes.Requireable<number>;
        minColorIndex: PropTypes.Requireable<number>;
        maxColorIndex: PropTypes.Requireable<number>;
        minMonochrome: PropTypes.Requireable<number>;
        maxMonochrome: PropTypes.Requireable<number>;
        minResolution: PropTypes.Requireable<string | number>;
        maxResolution: PropTypes.Requireable<string | number>;
        all: PropTypes.Requireable<boolean>;
        grid: PropTypes.Requireable<boolean>;
        aural: PropTypes.Requireable<boolean>;
        braille: PropTypes.Requireable<boolean>;
        handheld: PropTypes.Requireable<boolean>;
        print: PropTypes.Requireable<boolean>;
        projection: PropTypes.Requireable<boolean>;
        screen: PropTypes.Requireable<boolean>;
        tty: PropTypes.Requireable<boolean>;
        tv: PropTypes.Requireable<boolean>;
        embossed: PropTypes.Requireable<boolean>;
    };
    types: {
        all: PropTypes.Requireable<boolean>;
        grid: PropTypes.Requireable<boolean>;
        aural: PropTypes.Requireable<boolean>;
        braille: PropTypes.Requireable<boolean>;
        handheld: PropTypes.Requireable<boolean>;
        print: PropTypes.Requireable<boolean>;
        projection: PropTypes.Requireable<boolean>;
        screen: PropTypes.Requireable<boolean>;
        tty: PropTypes.Requireable<boolean>;
        tv: PropTypes.Requireable<boolean>;
        embossed: PropTypes.Requireable<boolean>;
    };
    matchers: {
        orientation: PropTypes.Requireable<string>;
        scan: PropTypes.Requireable<string>;
        aspectRatio: PropTypes.Requireable<string>;
        deviceAspectRatio: PropTypes.Requireable<string>;
        height: PropTypes.Requireable<string | number>;
        deviceHeight: PropTypes.Requireable<string | number>;
        width: PropTypes.Requireable<string | number>;
        deviceWidth: PropTypes.Requireable<string | number>;
        color: PropTypes.Requireable<boolean>;
        colorIndex: PropTypes.Requireable<boolean>;
        monochrome: PropTypes.Requireable<boolean>;
        resolution: PropTypes.Requireable<string | number>;
        type: string[];
    };
    features: {
        orientation: PropTypes.Requireable<string>;
        scan: PropTypes.Requireable<string>;
        aspectRatio: PropTypes.Requireable<string>;
        deviceAspectRatio: PropTypes.Requireable<string>;
        height: PropTypes.Requireable<string | number>;
        deviceHeight: PropTypes.Requireable<string | number>;
        width: PropTypes.Requireable<string | number>;
        deviceWidth: PropTypes.Requireable<string | number>;
        color: PropTypes.Requireable<boolean>;
        colorIndex: PropTypes.Requireable<boolean>;
        monochrome: PropTypes.Requireable<boolean>;
        resolution: PropTypes.Requireable<string | number>;
        minAspectRatio: PropTypes.Requireable<string>;
        maxAspectRatio: PropTypes.Requireable<string>;
        minDeviceAspectRatio: PropTypes.Requireable<string>;
        maxDeviceAspectRatio: PropTypes.Requireable<string>;
        minHeight: PropTypes.Requireable<string | number>;
        maxHeight: PropTypes.Requireable<string | number>;
        minDeviceHeight: PropTypes.Requireable<string | number>;
        maxDeviceHeight: PropTypes.Requireable<string | number>;
        minWidth: PropTypes.Requireable<string | number>;
        maxWidth: PropTypes.Requireable<string | number>;
        minDeviceWidth: PropTypes.Requireable<string | number>;
        maxDeviceWidth: PropTypes.Requireable<string | number>;
        minColor: PropTypes.Requireable<number>;
        maxColor: PropTypes.Requireable<number>;
        minColorIndex: PropTypes.Requireable<number>;
        maxColorIndex: PropTypes.Requireable<number>;
        minMonochrome: PropTypes.Requireable<number>;
        maxMonochrome: PropTypes.Requireable<number>;
        minResolution: PropTypes.Requireable<string | number>;
        maxResolution: PropTypes.Requireable<string | number>;
    };
};
export default _default;

export declare const toQuery: (obj: Partial<MediaQueryAllQueryable>) => string;
export default toQuery;

export interface MediaQueryTypes {
    all?: boolean;
    grid?: boolean;
    aural?: boolean;
    braille?: boolean;
    handheld?: boolean;
    print?: boolean;
    projection?: boolean;
    screen?: boolean;
    tty?: boolean;
    tv?: boolean;
    embossed?: boolean;
}
export declare type MediaQueryType = keyof MediaQueryTypes;
export interface MediaQueryMatchers {
    aspectRatio?: string;
    deviceAspectRatio?: string;
    height?: number | string;
    deviceHeight?: number | string;
    width?: number | string;
    deviceWidth?: number | string;
    color?: boolean;
    colorIndex?: boolean;
    monochrome?: boolean;
    resolution?: number | string;
    orientation?: 'portrait' | 'landscape';
    scan?: 'progressive' | 'interlace';
    type?: MediaQueryType;
}
export interface MediaQueryFeatures extends MediaQueryMatchers {
    minAspectRatio?: string;
    maxAspectRatio?: string;
    minDeviceAspectRatio?: string;
    maxDeviceAspectRatio?: string;
    minHeight?: number | string;
    maxHeight?: number | string;
    minDeviceHeight?: number | string;
    maxDeviceHeight?: number | string;
    minWidth?: number | string;
    maxWidth?: number | string;
    minDeviceWidth?: number | string;
    maxDeviceWidth?: number | string;
    minColor?: number;
    maxColor?: number;
    minColorIndex?: number;
    maxColorIndex?: number;
    minMonochrome?: number;
    maxMonochrome?: number;
    minResolution?: number | string;
    maxResolution?: number | string;
}
export interface MediaQueryAllQueryable extends MediaQueryFeatures, MediaQueryTypes {
}

export declare type MediaQuerySettings = Partial<MediaQueryAllQueryable & {
    query?: string;
}>;
export declare const useMediaQuery: (settings: MediaQuerySettings, device?: MediaQueryMatchers | undefined, onChange?: ((_: boolean) => void) | undefined) => boolean;
export default useMediaQuery;
