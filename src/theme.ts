import { Breakpoints } from "./types/styled.d";
import { DefaultTheme } from "styled-components";

const customMediaQuery = (maxWidth: number) => `${maxWidth}px`;

const breakPointsMap = {
  xl: customMediaQuery(1980),
  lg: customMediaQuery(988),
  md: customMediaQuery(768),
  sm: customMediaQuery(320),
};

let breakpoints: Breakpoints = [
  breakPointsMap.sm,
  breakPointsMap.md,
  breakPointsMap.lg,
  breakPointsMap.xl,
];

breakpoints = {
  ...breakpoints,
  ...{
    sm: breakpoints[0],
    md: breakpoints[1],
    lg: breakpoints[2],
    xl: breakpoints[3],
  },
};

export const theme: DefaultTheme = {
  breakPoints: breakPointsMap,
  breakpoints,
  fontSizes: {
    sm: "14px",
    md: "16px",
    xl: "18px",
  },

  fontWeights: {
    regular: 300,
    medium: 500,
    bold: 700,
  },

  lineHeights: {
    sm: 1,
    md: 1.25,
    xl: 1.5,
  },

  radii: {
    sm: "2px",
    md: "4px",
    xl: "8px",
  },

  up: (breakpoint) => `@media (min-width: calc(${breakpoint} + 0.02px))`,
  down: (breakpoint) => `@media (max-width: ${breakpoint})`,

  colors: {
    black: "#333",
    white: "#fff",
    primary: "#333",
    secondary: "#e21a1a",
    inactive: "#eee",
    grey: "#e5e5e5",
  },
};
