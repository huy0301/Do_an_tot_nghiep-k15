import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
// import Script from 'next/script'; // Đã comment vì không còn sử dụng
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../theme';
import createEmotionCache from '../createEmotionCache';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; // Thử đường dẫn chuẩn hơn

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>AgroMind</title> {/* Bạn có thể thay đổi tiêu đề ở đây */}
      </Head>
      {/* Tải các tệp JavaScript định nghĩa font cho jsPDF */}
      {/* <Script src="/fonts/Roboto-Regular-normal.js" strategy="beforeInteractive" /> */}
      {/* <Script src="/fonts/Roboto-Regular-bold.js" strategy="beforeInteractive" /> */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
}; 