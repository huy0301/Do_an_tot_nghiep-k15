import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import MainLayout from '../../components/Layout/MainLayout';
import { db, auth } from '../../services/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { parseISO } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Hàm chuẩn hóa dữ liệu dashboard
const transformDashboardData = (doc) => {
  const data = doc.data();
  const result = data.result || {};

  const diseaseName = result.disease || data.diseaseName || 'N/A';
  let confidenceValue = 0;
  if (result && typeof result.confidence === 'number') {
    confidenceValue = result.confidence;
  } else if (typeof data.confidence === 'number') {
    confidenceValue = data.confidence;
  }
  
  let jsTimestamp = new Date(); 
  if (data.timestamp && typeof data.timestamp.toDate === 'function') {
    jsTimestamp = data.timestamp.toDate();
  } else if (data.timestamp && typeof data.timestamp === 'string') {
    try {
      const parsed = parseISO(data.timestamp);
      if (!isNaN(parsed.getTime())) {
          jsTimestamp = parsed;
      }
    } catch (e) { /* jsTimestamp defaults to new Date() */ }
  } else if (data.timestamp instanceof Date) {
    jsTimestamp = data.timestamp;
  }

  return {
    id: doc.id,
    ...data, 
    result: { 
        disease: diseaseName,
        confidence: confidenceValue,
        treatment: (result && result.treatment) || data.treatment || data.recommendation || 'N/A',
        prevention: (result && result.prevention) || data.prevention || 'N/A',
    },
    timestamp: jsTimestamp, 
  };
};

export default function Dashboard() {
  const [user, loadingAuth, errorAuth] = useAuthState(auth);
  const router = useRouter();
  const [diagnosisData, setDiagnosisData] = useState([]);
  // Single loading state for the page: true until auth is checked and data (if any) is fetched.
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loadingAuth) {
      setIsLoading(true); // Auth state is being checked, so page is loading.
      return;
    }

    if (errorAuth) {
      console.error("Authentication error:", errorAuth);
      router.push('/auth'); // Redirect on auth error.
      return;
    }

    if (!user) {
      router.push('/auth'); // No user, redirect to login.
      return;
    }

    if (!user.emailVerified) {
      alert('Vui lòng xác minh email của bạn để truy cập trang này. Bạn sẽ được chuyển hướng đến trang đăng nhập.');
      router.push('/auth'); // Email not verified, redirect.
      return;
    }

    // At this point, user is authenticated and email is verified.
    // Proceed to fetch dashboard data.
    const fetchData = async () => {
      // setIsLoading(true); // isLoading should already be true if we came from loadingAuth, or it's the first run after auth checks.
      try {
        const diagnosisQuery = query(collection(db, 'users', user.uid, 'diagnosis'), orderBy('timestamp', 'desc'));
        const esp32camQuery = query(collection(db, 'users', user.uid, 'esp32cam'), orderBy('timestamp', 'desc'));

        const [diagnosisSnapshot, esp32camSnapshot] = await Promise.all([
          getDocs(diagnosisQuery),
          getDocs(esp32camQuery)
        ]);

        const webData = diagnosisSnapshot.docs.map(transformDashboardData);
        const esp32Data = esp32camSnapshot.docs.map(transformDashboardData);

        const combinedData = [...webData, ...esp32Data];
        combinedData.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        
        setDiagnosisData(combinedData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setDiagnosisData([]); // Clear data on error
      } finally {
        setIsLoading(false); // Finished fetching data (or error occurred).
      }
    };

    fetchData();

  }, [user, loadingAuth, errorAuth, router]); // Dependencies for the effect
  
  // Display a loading spinner if isLoading is true
  if (isLoading) {
    return (
      // Pass user to MainLayout so it can potentially display user info later
      <MainLayout user={user}> 
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 128px)', textAlign: 'center' }}>
          <CircularProgress />
          <Typography sx={{ml: 2}}>Đang tải dữ liệu trang Dashboard...</Typography>
        </Box>
      </MainLayout>
    );
  }
  
  // If all checks passed and not loading, render the dashboard content.
  // Ensure diagnosisData processing happens only when not loading and data is available.
  const accuracyData = diagnosisData.map(item => {
    const confidence = (item.result && typeof item.result.confidence === 'number')
      ? item.result.confidence
      : (typeof item.confidence === 'number' ? item.confidence : 0);
    const dateStr = item.timestamp && typeof item.timestamp.toLocaleDateString === 'function'
      ? item.timestamp.toLocaleDateString('vi-VN')
      : 'N/A';
    return {
      date: dateStr,
      accuracy: confidence * 100,
    };
  });

  const diseaseDistribution = diagnosisData.reduce((acc, item) => {
    const disease = (item.result && typeof item.result.disease === 'string' && item.result.disease) ||
                    (typeof item.diseaseName === 'string' && item.diseaseName);
    if (disease) {
      acc[disease] = (acc[disease] || 0) + 1;
    }
    return acc;
  }, {});

  const pieChartData = Object.entries(diseaseDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    // Pass user to MainLayout so it can display user info
    <MainLayout user={user}> 
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* Summary Cards */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Tổng số chẩn đoán</Typography>
              <Typography variant="h3">{diagnosisData.length}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Độ chính xác trung bình</Typography>
              <Typography variant="h3">
                {(diagnosisData.reduce((acc, item) => {
                  const confidence = (item.result && typeof item.result.confidence === 'number')
                    ? item.result.confidence
                    : (typeof item.confidence === 'number' ? item.confidence : 0);
                  return acc + confidence;
                }, 0) / (diagnosisData.length || 1) * 100).toFixed(2)}%
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Số loại bệnh phát hiện</Typography>
              <Typography variant="h3">{Object.keys(diseaseDistribution).length}</Typography>
            </Paper>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Độ chính xác theo thời gian
              </Typography>
              <LineChart width={600} height={300} data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="accuracy" stroke="#8884d8" />
              </LineChart>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Phân bố các loại bệnh
              </Typography>
              <PieChart width={400} height={300}>
                <Pie
                  data={pieChartData}
                  cx={200}
                  cy={150}
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
} 