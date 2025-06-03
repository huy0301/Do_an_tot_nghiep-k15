import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import MainLayout from '../../components/Layout/MainLayout';
import ForgotPasswordForm from '../../components/Auth/ForgotPasswordForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebase';
import { useRouter } from 'next/router';

export default function ForgotPasswordPage() {
  const [user, loadingAuth] = useAuthState(auth);
  const router = useRouter();

  // If user is already logged in, redirect them from forgot password page
  React.useEffect(() => {
    if (!loadingAuth && user) {
      router.push('/dashboard'); // Or your main app page
    }
  }, [user, loadingAuth, router]);

  if (loadingAuth) {
    return (
      <MainLayout hideHeader={true} hideFooter={true}>
        <Box sx={{display: 'flex', justifyContent:'center', alignItems:'center', height: 'calc(100vh - 64px)'}}>
            <Typography sx={{color: 'white'}}>Đang tải...</Typography>
        </Box>
      </MainLayout>
    );
  }
  // If user is logged in, useEffect will handle redirect, so we can return null or a placeholder
  // if (user) return null; 

  return (
    <MainLayout hideHeader={true} hideFooter={true}>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          // Consistent background with the auth page
          // Consider using a shared style or theme value for this background
          backgroundImage: 'url(/images/login_background.png)', // Make sure this path is correct
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
                backgroundColor: 'rgba(40, 40, 40, 0.8)', // Dark, slightly transparent Paper
                backdropFilter: 'blur(5px)', 
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
        >
          <ForgotPasswordForm />
        </Paper>
        
        <Typography variant="caption" sx={{color: 'rgba(255,255,255,0.7)', mt: 3}}>
            Đồ án tốt nghiệp 2025
        </Typography>
      </Box>
    </MainLayout>
  );
} 