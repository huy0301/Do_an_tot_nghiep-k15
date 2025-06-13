// Import hàm `createTheme` từ thư viện Material-UI, dùng để tạo một đối tượng theme tùy chỉnh.
import { createTheme } from '@mui/material/styles';
// Import đối tượng `red` từ bảng màu của Material-UI để sử dụng các sắc thái màu đỏ.
import { red } from '@mui/material/colors';

// Tạo một thực thể (instance) của theme.
// Đối tượng này sẽ được cung cấp cho toàn bộ ứng dụng thông qua một ThemeProvider của MUI,
// cho phép tất cả các component con truy cập và sử dụng các giá trị theme này.
const theme = createTheme({
  // `palette` định nghĩa bảng màu cho ứng dụng của bạn.
  palette: {
    // `primary` là màu sắc chính, thường được sử dụng cho các thành phần quan trọng
    // như thanh app bar, nút chính, v.v.
    primary: {
      main: '#556cd6', // Màu chính
    },
    // `secondary` là màu sắc phụ, dùng để làm nổi bật hoặc phân biệt các thành phần.
    secondary: {
      main: '#19857b',
    },
    // `error` là màu sắc được sử dụng để chỉ báo lỗi.
    error: {
      main: red.A400, // Sử dụng một sắc thái màu đỏ (A400) từ bảng màu đã import.
    },
    // Bạn có thể thêm các màu khác hoặc tùy chỉnh ở đây
    // Ví dụ:
    // background: {
    //   default: '#fff', // Màu nền mặc định của ứng dụng.
    // },
  },
  // `typography` cho phép bạn định nghĩa và tùy chỉnh các kiểu chữ cho toàn bộ ứng dụng.
  typography: {
    // Bạn có thể đặt font chữ mặc định, kích thước, độ đậm cho các loại văn bản khác nhau (h1, h2, body1, v.v.)
    // Ví dụ:
    // fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    // h1: {
    //   fontSize: '2.5rem',
    // },
  },
  // Bạn có thể thêm các tùy chỉnh khác cho theme ở đây, ví dụ như:
  // - `shape`: để điều chỉnh độ bo tròn của các component (borderRadius).
  // - `spacing`: để định nghĩa đơn vị khoảng cách.
  // - `components`: để ghi đè style mặc định của từng component MUI.
});

// Xuất đối tượng theme để có thể import và sử dụng trong ứng dụng.
export default theme; 