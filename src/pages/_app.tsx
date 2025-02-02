import { Fragment } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import Router from 'next/router';
import { AppProps } from 'next/app';
import NProgress from 'nprogress';
import { ThemeProvider } from 'styled-components';
import GoogleAnalytics from '@component/GoogleAnalytics';
import { AppProvider } from '@context/AppContext';
// import '../__server__';
import GlobalStyles from 'theme/globalStyles';
import theme from '../theme';

// Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

NProgress.configure({ showSpinner: false });

// ============================================================
interface MyAppProps extends AppProps {
  Component: NextPage & { layout?: () => JSX.Element };
}
// ============================================================

const App = ({ Component, pageProps }: MyAppProps) => {
  const Layout = Component.layout || Fragment;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta property="og:url" content="https://bonik-react.vercel.app" />
        {/* thumbnail And title for social media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Creative ColorLabs - Atelier" />
        <meta
          property="og:description"
          content="Minimal, clean and Fast Next js ecommerce template. Build Super store, Grocery delivery app, Multivendor store and niche market"
        />
        <meta property="og:image" content="/assets/images/landing/preview.png" />

        {/* Google analytics */}
        <GoogleAnalytics />
      </Head>

      <AppProvider>
        <ThemeProvider theme={theme()}>
          <GlobalStyles />
          {Component.layout ? (
            <Layout {...pageProps}>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Component {...pageProps} />
          )}
        </ThemeProvider>
      </AppProvider>
    </>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default App;
