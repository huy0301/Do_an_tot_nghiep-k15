import React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import MainLayout from '../components/Layout/MainLayout';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <MainLayout>
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
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
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => router.push('/diagnosis')}
                sx={{ mt: 2 }}
              >
                Bắt đầu chẩn đoán
              </Button>
            </Paper>
          </Grid>
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