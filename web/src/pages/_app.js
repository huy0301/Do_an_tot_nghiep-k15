import * as React from 'react';
import PropTypes from 'prop-types';
// Head là một component của Next.js cho phép bạn chỉnh sửa thẻ <head> của trang.
import Head from 'next/head';
// import Script from 'next/script'; // Đã comment vì không còn sử dụng
// ThemeProvider từ Material-UI (MUI) cung cấp đối tượng theme cho các component con.
import { ThemeProvider } from '@mui/material/styles';
// CssBaseline là một component của MUI giúp chuẩn hóa CSS trên các trình duyệt khác nhau.
import CssBaseline from '@mui/material/CssBaseline';
// CacheProvider từ Emotion (thư viện CSS-in-JS mà MUI sử dụng) để quản lý cache CSS.
import { CacheProvider } from '@emotion/react';
// Import đối tượng theme tùy chỉnh mà chúng ta đã tạo trong `theme.js`.
import theme from '../theme';
// Import hàm tiện ích để tạo cache cho Emotion.
import createEmotionCache from '../createEmotionCache';
// Provider để cung cấp ngữ cảnh (context) cho các component chọn ngày/giờ của MUI.
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// Adapter để tích hợp thư viện `date-fns` với các component chọn ngày/giờ của MUI.
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Tạo một cache CSS phía client. Cache này sẽ được chia sẻ trong suốt phiên làm việc
// của người dùng trên trình duyệt, giúp tối ưu hóa việc render style.
const clientSideEmotionCache = createEmotionCache();

// Component App tùy chỉnh, đây là "root" component của ứng dụng Next.js.
// Mọi trang sẽ được render bên trong component này.
export default function MyApp(props) {
  // `Component` là component của trang hiện tại (ví dụ: trang chủ, trang dashboard).
  // `pageProps` là các props ban đầu được truyền cho component trang đó.
  // `emotionCache` là cache CSS.
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    // CacheProvider cung cấp cache Emotion cho cây component, cần thiết cho Server-Side Rendering (SSR) với MUI.
    <CacheProvider value={emotionCache}>
      <Head>
        {/* Thẻ meta viewport rất quan trọng cho thiết kế responsive,
            đảm bảo trang web hiển thị đúng trên các thiết bị di động. */}
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        {/* Đặt tiêu đề mặc định cho tất cả các trang.
            Tiêu đề này có thể được ghi đè ở từng trang cụ thể. */}
        <title>AgroMind</title>
      </Head>
      {/* Tải các tệp JavaScript định nghĩa font cho jsPDF */}
      {/* <Script src="/fonts/Roboto-Regular-normal.js" strategy="beforeInteractive" /> */}
      {/* <Script src="/fonts/Roboto-Regular-bold.js" strategy="beforeInteractive" /> */}

      {/* LocalizationProvider cung cấp context cần thiết cho các component date/time picker hoạt động. */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {/* ThemeProvider áp dụng theme (màu sắc, font chữ, v.v.) cho toàn bộ ứng dụng. */}
        <ThemeProvider theme={theme}>
          {/* CssBaseline tạo ra một style nền nhất quán, xóa bỏ các khác biệt mặc định của trình duyệt. */}
          <CssBaseline />
          {/* Render component của trang hiện tại với các props của nó. */}
          <Component {...pageProps} />
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
}

// Định nghĩa kiểu dữ liệu cho các props của MyApp bằng PropTypes.
// Giúp bắt lỗi và đảm bảo các component nhận được đúng loại dữ liệu.
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired, // Component phải là một kiểu phần tử React và là bắt buộc.
  emotionCache: PropTypes.object, // emotionCache là một đối tượng và không bắt buộc.
  pageProps: PropTypes.object.isRequired, // pageProps là một đối tượng và là bắt buộc.
}; 