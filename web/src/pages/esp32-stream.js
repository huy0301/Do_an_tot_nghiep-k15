import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, CircularProgress, Button } from '@mui/material';
import MainLayout from '../components/Layout/MainLayout';
import ESP32StreamComponent from '../components/ESP32Stream';
import { storage, db, auth } from '../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { mlService } from '../services/ml';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';

export default function ESP32StreamPage() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [predictionError, setPredictionError] = useState('');

  const handleImageCapturedFromStream = async (imageBlob) => {
    if (!user) {
      alert('Bạn cần đăng nhập để thực hiện chẩn đoán.');
      router.push('/auth');
      return;
    }
    if (!imageBlob) {
      setPredictionError('Không nhận được ảnh từ camera.');
      return;
    }

    setLoadingPrediction(true);
    setPredictionResult(null);
    setPredictionError('');

    try {
      // Tạo HTMLImageElement từ Blob để mlService có thể xử lý
      const img = new Image();
      img.src = URL.createObjectURL(imageBlob);
      await new Promise((resolve, reject) => {
        img.onload = () => {
          URL.revokeObjectURL(img.src); // Giải phóng object URL sau khi ảnh đã tải
          resolve();
        };
        img.onerror = (err) => {
          URL.revokeObjectURL(img.src);
          reject(err);
        };
      });

      // 1. Get prediction
      const prediction = await mlService.predict(img);
      if (!prediction || !prediction.disease) {
        throw new Error('Không thể lấy được kết quả dự đoán hoặc tên bệnh.');
      }

      // 2. Upload image to Firebase Storage
      const predictedClassName = prediction.disease.replace(/\s+/g, '_');
      const timestamp = Date.now();
      const imageName = `capture_${timestamp}.jpg`;
      const storagePath = `esp32_captures/${user.uid}/${predictedClassName}/${imageName}`;
      const storageRef = ref(storage, storagePath);
      await uploadBytes(storageRef, imageBlob); // Tải lên Blob trực tiếp
      const imageUrl = await getDownloadURL(storageRef);

      // 3. Save to Firestore (ví dụ collection: 'esp32_predictions')
      await addDoc(collection(db, 'esp32_predictions'), {
        userId: user.uid,
        imageUrl,
        storagePath,
        prediction,
        timestamp: new Date(timestamp),
        source: 'ESP32-CAM'
      });

      setPredictionResult(prediction);
    } catch (error) {
      console.error('Error during ESP32 CAM diagnosis:', error);
      setPredictionError(`Lỗi chẩn đoán: ${error.message || 'Vui lòng thử lại.'}`);
      // Không alert ở đây để không làm gián đoạn, hiển thị lỗi trên UI
    } finally {
      setLoadingPrediction(false);
    }
  };

  return (
    <MainLayout>
      <ESP32StreamComponent onImageCaptured={handleImageCapturedFromStream} />
      
      {/* Hiển thị kết quả dự đoán */} 
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Kết quả chẩn đoán từ ESP32-CAM
        </Typography>
        {loadingPrediction && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress />
            <Typography sx={{ml: 2}}>Đang chẩn đoán...</Typography>
          </Box>
        )}
        {predictionError && (
          <Typography color="error" sx={{my: 2}}>{predictionError}</Typography>
        )}
        {predictionResult && !loadingPrediction && (
          <Box>
            <Typography variant="body1" paragraph>
              <strong>Bệnh:</strong> {predictionResult.disease}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Độ chính xác:</strong> {(predictionResult.confidence * 100).toFixed(2)}%
            </Typography>
            {predictionResult.treatment && (
              <>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Hướng dẫn điều trị
                </Typography>
                <Typography variant="body1" paragraph>
                  {predictionResult.treatment}
                </Typography>
              </>
            )}
            {predictionResult.prevention && (
              <>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Biện pháp phòng ngừa
                </Typography>
                <Typography variant="body1" paragraph>
                  {predictionResult.prevention}
                </Typography>
              </>
            )}
             <Button 
                variant="outlined"
                onClick={() => setPredictionResult(null)} 
                sx={{mt: 2}}
            >
                Chẩn đoán ảnh khác
            </Button>
          </Box>
        )}
        {!predictionResult && !loadingPrediction && !predictionError && (
          <Typography variant="body1" color="textSecondary">
            Nhấn "Capture Image" trên stream của ESP32-CAM để bắt đầu chẩn đoán.
          </Typography>
        )}
      </Paper>
    </MainLayout>
  );
} 