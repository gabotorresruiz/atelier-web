import { deviceSize } from './constants';
import { colors } from './themeColors';
import shadows from './themeShadows';

export interface ThemeProps {
  theme: {
    space: number[];
    fontSizes: number[];
    colors: {
      blue: string;
      navy: string;
      black: string;
      white: string;
      primary: string;
    };
  };
}

const [sm, md, lg, xl]: any = Object.keys(deviceSize).map((key) => `${deviceSize[key]}px`);
const breakpoints: string[] = [sm, md, lg, xl];

export const theme = { colors, shadows, breakpoints };
