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
      if (!id || !user) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      setDiagnosis(null);

      try {
        let docSnap = null;
        // Thử lấy từ 'users/{user.uid}/diagnosis/{id}' trước
        const diagnosisPath1 = doc(db, 'users', user.uid, 'diagnosis', id);
        docSnap = await getDoc(diagnosisPath1);

        if (!docSnap.exists()) {
          // Nếu không tìm thấy, thử lấy từ 'users/{user.uid}/esp32cam/{id}'
          const diagnosisPath2 = doc(db, 'users', user.uid, 'esp32cam', id);
          docSnap = await getDoc(diagnosisPath2);
        }

        if (docSnap.exists()) {
          const data = docSnap.data();
          // Kiểm tra lại userId (dù đã query trong path của user, đây là double check)
          if (data.userId !== user.uid) {
            setError('Bạn không có quyền xem kết quả này.');
          } else {
            setDiagnosis({ id: docSnap.id, ...data });
          }
        } else {
          setError('Không tìm thấy kết quả chẩn đoán.');
        }
      } catch (err) {
        console.error('Lỗi khi tải chi tiết chẩn đoán:', err);
        setError('Có lỗi xảy ra khi tải dữ liệu.');
      } finally {
        setLoading(false);
      }
    };

    if (id && user) {
      fetchDiagnosis();
    } else {
      setLoading(false); // Nếu không có id hoặc user, không cần loading
    }
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
                {diagnosis.timestamp && diagnosis.timestamp.toDate ? new Date(diagnosis.timestamp.toDate()).toLocaleString('vi-VN') : (diagnosis.timestamp ? new Date(diagnosis.timestamp).toLocaleString('vi-VN') : 'N/A')}
              </Typography>

              <Typography variant="body1" paragraph>
                <strong>Bệnh:</strong> {diagnosis.diseaseName || (diagnosis.result && diagnosis.result.disease) || 'N/A'}
              </Typography>

              <Typography variant="body1" paragraph>
                <strong>Độ chính xác:</strong>{' '}
                {typeof diagnosis.confidence === 'number' ? (diagnosis.confidence * 100).toFixed(2) : (diagnosis.result && typeof diagnosis.result.confidence === 'number' ? (diagnosis.result.confidence * 100).toFixed(2) : '0.00')}%
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Hướng dẫn điều trị
              </Typography>
              <Typography variant="body1" paragraph>
                {diagnosis.treatment || diagnosis.recommendation || (diagnosis.result && diagnosis.result.treatment) || 'Chưa có thông tin'}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Biện pháp phòng ngừa
              </Typography>
              <Typography variant="body1" paragraph>
                {diagnosis.prevention || (diagnosis.result && diagnosis.result.prevention) || 'Chưa có thông tin'}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
} 