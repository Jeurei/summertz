import "styled-components";

type BreakpointsMap = {
  xl: string;
  lg: string;
  md: string;
  sm: string;
};

type Sizes = {
  xl: string | number;
  md: string | number;
  sm: string | number;
};

type Weghts = {
  bold: number;
  regular: number;
  medium: number;
};

export interface Breakpoints extends Array<string> {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    breakPoints: BreakpointsMap;
    breakpoints: Breakpoints;
    up: (breakpoint: string) => string;
    down: (breakpoint: string) => string;
    fontSizes: Sizes;
    fontWeights: Weghts;
    lineHeights: Sizes;
    radii: Sizes;
    colors: {
      black: string;
      white: string;
      primary: string;
      secondary: string;
      inactive: string;
      grey: string;
    };
  }
}
