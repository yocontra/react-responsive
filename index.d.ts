import React from "react";

export interface MediaTypes {
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

export type MediaType = keyof MediaTypes;

export interface MediaMatchers {
  orientation?: "portrait" | "landscape";

  scan?: "progressive" | "interlace";

  aspectRatio?: string;
  deviceAspectRatio?: string;

  height?: string | number;
  deviceHeight?: string | number;

  width?: string | number;
  deviceWidth?: string | number;

  color?: boolean;

  colorIndex?: boolean;

  monochrome?: boolean;
  resolution?: string | number;
  type?: MediaType;
}

export interface MediaFeatures extends MediaMatchers {
  minAspectRatio?: string;
  maxAspectRatio?: string;
  minDeviceAspectRatio?: string;
  maxDeviceAspectRatio?: string;

  minHeight?: string | number;
  maxHeight?: string | number;
  minDeviceHeight?: string | number;
  maxDeviceHeight?: string | number;

  minWidth?: string | number;
  maxWidth?: string | number;
  minDeviceWidth?: string | number;
  maxDeviceWidth?: string | number;

  minColor?: number;
  maxColor?: number;

  minColorIndex?: number;
  maxColorIndex?: number;

  minMonochrome?: number;
  maxMonochrome?: number;

  minResolution?: string | number;
  maxResolution?: string | number;
}

export interface MediaAll extends MediaFeatures, MediaTypes {}

type MediaChangeHandler = (matches: boolean) => void;

export interface MediaQueryProps extends MediaAll {
  children?: React.ReactNode | ((matches: boolean) => React.ReactNode);
  device?: MediaMatchers;
  onChange?: MediaChangeHandler;
}

declare class MediaQuery extends React.Component<MediaQueryProps> {}

declare function useMediaQuery(
  settings: MediaAll,
  device: MediaMatchers,
  onChange: MediaChangeHandler
): boolean;

declare const Context: React.Context<any>;

export default MediaQuery;

