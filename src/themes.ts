import { MantineThemeOverride } from '@mantine/core';



export const lightTheme = {
  colors: {
    primary: {
      green: '#71C64D',
      black: '#1A242D',
      dark: '#2c2c2c',
      midGrey: '#7A7C7C',
      darkgrey: '#4F4F4F',
      grey: '#828282',
      lightgrey: '#FAFAFA',
      white: '#FFFFFF',
      blue: '#307AD5',
      purple: '#6F5CC9',
      yellow: '#C89720',
    },
    secondary: {
      red: '#EC3D08',
      blue: '#233984',
      lightgreen: '#CAEF45',
      yellow: '#F5C14F',
      lightgrey: '#F5F5F5',
      secondaryGrey: '#F8F8F8',
      grey: '#E3E2E2',
      darkgreen: '#015E5F',
    },
  },
};

export const mantineThemeOverrides: MantineThemeOverride = {
  colors: {
    green: [
      '#DAE1E0',
      '#C2D0CF',
      '#ABC3C1',
      '#94B9B5',
      '#7CB2AD',
      '#63B0A8',
      '#4AB0A6',
      '#4C958E',
      '#4B807B',
      '#486E6A',
    ],
    red: ['#E2D3CF', '#D6BBB3', '#D0A395', '#CF8B76', '#D47153', '#E1562C', '#EC3D08', '#C0421C', '#9E4328', '#83422E'],
  },
  primaryColor: 'green',
};
