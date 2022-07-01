// import original module declarations
import 'styled-components';

// and extend it
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        green: string;
        black: string;
        dark: string;
        darkgrey: string;
        midGrey: string;
        grey: string;
        lightgrey: string;
        white: string;
        blue: string;
        purple: string;
        yellow: string;
      };
      secondary: {
        red: string;
        blue: string;
        lightgreen: string;
        yellow: string;
        lightgrey: string;
        grey: string;
        darkgreen: string;
        secondaryGrey: string;
      };
    };
  }
}