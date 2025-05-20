import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Paper, Grid, CircularProgress, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import MainLayout from '../../components/Layout/MainLayout';
import { db, auth } from '../../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function DiagnosisDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [diagnosis, setDiagnosis] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      if (!id || !user) return;

      try {
        const docRef = doc(db, 'diagnosis', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // Kiểm tra quyền truy cập
          if (data.userId !== user.uid) {
            setError('Bạn không có quyền xem kết quả này');
            return;
          }
          setDiagnosis({ id: docSnap.id, ...data });
        } else {
          setError('Không tìm thấy kết quả chẩn đoán');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnosis();
  }, [id, user]);

  if (loading) {
    return (
      <MainLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <Box sx={{ mt: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => router.back()}
            sx={{ mb: 2 }}
          >
            Quay lại
          </Button>
          <Typography color="error">{error}</Typography>
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Box sx={{ mt: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.back()}
          sx={{ mb: 2 }}
        >
          Quay lại
        </Button>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <img
                src={diagnosis.imageUrl}
                alt="Leaf diagnosis"
                style={{ width: '100%', height: 'auto' }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Kết quả chẩn đoán
              </Typography>
              
              <Typography variant="body1" paragraph>
                <strong>Thời gian:</strong>{' '}
                {new Date(diagnosis.timestamp.toDate()).toLocaleString()}
              </Typography>

              <Typography variant="body1" paragraph>
                <strong>Bệnh:</strong> {diagnosis.result.disease}
              </Typography>

              <Typography variant="body1" paragraph>
                <strong>Độ chính xác:</strong>{' '}
                {(diagnosis.result.confidence * 100).toFixed(2)}%
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Hướng dẫn điều trị
              </Typography>
              <Typography variant="body1" paragraph>
                {diagnosis.result.treatment}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Biện pháp phòng ngừa
              </Typography>
              <Typography variant="body1" paragraph>
                {diagnosis.result.prevention}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
} 