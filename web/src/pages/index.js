import React from 'react';
// Import các component giao diện người dùng từ thư viện Material-UI.
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
// Import layout chính của ứng dụng, giúp đảm bảo giao diện nhất quán giữa các trang.
import MainLayout from '../components/Layout/MainLayout';
// Import hook `useRouter` từ Next.js để có thể điều hướng chương trình.
import { useRouter } from 'next/router';

// Đây là component cho trang chủ của ứng dụng (route "/").
export default function Home() {
  // Khởi tạo router để sử dụng cho việc chuyển trang.
  const router = useRouter();

  return (
    // Sử dụng MainLayout để bao bọc nội dung của trang.
    // MainLayout có thể chứa các thành phần chung như header, footer, thanh điều hướng.
    <MainLayout>
      {/* Box là một component tiện ích của MUI, ở đây dùng để tạo khoảng cách phía trên (margin-top). */}
      <Box sx={{ mt: 4 }}>
        {/* Grid container là nền tảng cho hệ thống lưới của MUI, giúp tạo layout responsive. */}
        <Grid container spacing={4}>
          {/* Grid item, chiếm 12 cột trên màn hình nhỏ (xs) và 6 cột trên màn hình trung bình (md) trở lên. */}
          <Grid item xs={12} md={6}>
            {/* Paper tạo ra một bề mặt giống như tờ giấy, thường dùng để chứa nội dung. */}
            <Paper sx={{ p: 4, height: '100%' }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Chào mừng đến với Agromind
              </Typography>
              <Typography variant="body1" paragraph>
                Hệ thống nhận diện bệnh trên lá cây thông minh, giúp bạn:
              </Typography>
              <ul>
                <li>Phát hiện bệnh trên lá cây nhanh chóng</li>
                <li>Nhận được lời khuyên điều trị phù hợp</li>
                <li>Theo dõi lịch sử chẩn đoán</li>
                <li>Xem thống kê và phân tích chi tiết</li>
              </ul>
              {/* Nút bấm để điều hướng người dùng đến trang chẩn đoán. */}
              <Button
                variant="contained" // Kiểu nút có nền màu.
                color="primary" // Sử dụng màu primary từ theme.
                size="large"
                // Khi người dùng click, chuyển hướng đến trang '/diagnosis'.
                onClick={() => router.push('/diagnosis')}
                sx={{ mt: 2 }}
              >
                Bắt đầu chẩn đoán
              </Button>
            </Paper>
          </Grid>
          {/* Grid item thứ hai, cũng chiếm 6 cột trên màn hình trung bình. */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Hướng dẫn sử dụng
              </Typography>
              <Typography variant="body1" paragraph>
                1. Chụp ảnh lá cây cần chẩn đoán
              </Typography>
              <Typography variant="body1" paragraph>
                2. Tải lên ảnh vào hệ thống
              </Typography>
              <Typography variant="body1" paragraph>
                3. Nhận kết quả chẩn đoán và lời khuyên
              </Typography>
              <Typography variant="body1" paragraph>
                4. Lưu lại kết quả để theo dõi
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
} 