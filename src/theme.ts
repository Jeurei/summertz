import { DefaultTheme } from "styled-components";

const customMediaQuery = (maxWidth: number) => `${maxWidth}px`;

const breakPointsMap = {
  xl: customMediaQuery(922),
  md: customMediaQuery(768),
  sm: customMediaQuery(576),
};

export const theme: DefaultTheme = {
  breakPoints: breakPointsMap,
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
