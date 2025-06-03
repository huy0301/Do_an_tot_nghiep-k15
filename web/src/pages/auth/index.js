import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Paper } from '@mui/material';
import MainLayout from '../../components/Layout/MainLayout';
import AuthForm from '../../components/Auth/AuthForm';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebase';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 0 }}>{children}</Box>}
    </div>
  );
}

export default function Auth() {
  const [user, loadingAuth] = useAuthState(auth);
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);

  React.useEffect(() => {
    if (!loadingAuth && user && user.emailVerified) {
      router.push('/dashboard');
    }
  }, [user, loadingAuth, router]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loadingAuth) {
    return <MainLayout><Box sx={{display: 'flex', justifyContent:'center', alignItems:'center', height: 'calc(100vh - 64px)'}}><Typography>Đang tải...</Typography></Box></MainLayout>;
  }

  return (
    <MainLayout hideHeader={true} hideFooter={true}>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: 'url(/images/login_background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          p: 2,
        }}
      >
        <Paper 
            elevation={3} 
            sx={{
                maxWidth: 450, 
                width: '100%', 
                p: { xs: 2, sm: 3 }, 
                backgroundColor: 'rgba(40, 40, 40, 0.8)',
                backdropFilter: 'blur(5px)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'rgba(255, 255, 255, 0.2)', mb: 2 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              centered 
              textColor="inherit"
              TabIndicatorProps={{ sx: { backgroundColor: 'white' } }} 
              sx={{ color: 'white'}}
            >
              <Tab label="Đăng nhập" sx={{color: 'white', textTransform: 'none', fontSize: '1rem'}} />
              <Tab label="Đăng ký" sx={{color: 'white', textTransform: 'none', fontSize: '1rem'}} />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <AuthForm mode="login" />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <AuthForm mode="register" />
          </TabPanel>
        </Paper>
        
        <Typography variant="caption" sx={{color: 'rgba(255,255,255,0.7)', mt: 3}}>
            Đồ án tốt nghiệp 2025
        </Typography>

      </Box>
    </MainLayout>
  );
} 