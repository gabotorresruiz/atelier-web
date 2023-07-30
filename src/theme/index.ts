import getConfig from 'next/config';
import { useRouter } from 'next/router';
import getThemeOptions from './themeOptions';

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

const theme = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useRouter();
  const { publicRuntimeConfig } = getConfig();

  const getTheme = getThemeOptions(publicRuntimeConfig, pathname);

  return getTheme;
};

export default theme;
