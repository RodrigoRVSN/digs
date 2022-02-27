import { createTheme } from '@nextui-org/react';

export const darkMode = createTheme({
  type: 'dark',
  theme: {
    colors: {
      background: '#1A1A40',
      text: '#FFFFFF',
      gray_1: '#B3B0B8',
      gray_2: '#7C7A80',
      primary_1: '#270082',
      primary_2: '#313156',
      secondary: '#7A0BC0',
      terciary: '#EB2F93',
    },
    space: {
      xxs: '4px',
      xs: '8px',
      md: '16px',
      xmd: '24px',
      lg: '32px',
      xlg: '40px',
      xxlg: '64px',
      xxxlg: '96px',
    },
    fontSizes: {},
    fonts: {},
    fontWeights: {
      regular: 400,
      semiBold: 500,
      bold: 700,
    },
    lineHeights: {},
    letterSpacings: {},
    sizes: {},
    borderWidths: {},
    borderStyles: {},
    radii: {},
    shadows: {},
    zIndices: {},
    transitions: {},
  },
});
