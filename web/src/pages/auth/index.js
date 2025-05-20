import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import MainLayout from '../../components/Layout/MainLayout';
import AuthForm from '../../components/Auth/AuthForm';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebase';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Auth() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <MainLayout>
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {user ? 'Chào mừng trở lại!' : 'Đăng nhập hoặc đăng ký'}
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Đăng nhập" />
            <Tab label="Đăng ký" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <AuthForm mode="login" />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <AuthForm mode="register" />
        </TabPanel>
      </Box>
    </MainLayout>
  );
} 