import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    // Bạn có thể thêm các màu khác hoặc tùy chỉnh ở đây
    // Ví dụ:
    // background: {
    //   default: '#fff',
    // },
  },
  typography: {
    // Tùy chỉnh typography ở đây
    // Ví dụ:
    // fontFamily: 'Roboto, sans-serif',
  },
  // Bạn có thể thêm các tùy chỉnh khác cho theme ở đây
});

export default theme; 