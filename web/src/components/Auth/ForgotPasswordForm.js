import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert, CircularProgress, Link as MuiLink } from '@mui/material';
import { auth } from '../../services/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import NextLink from 'next/link'; // For the "Back to Login" link

// Reusing the common styles from AuthForm for consistency
const commonInputStyle = {
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiOutlinedInput-root': {
    color: 'white',
    borderRadius: '20px',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.7)',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
  '& .MuiInputBase-input': {
      color: 'white',
  }
};

const outlinedWhiteButton = {
  border: '1.5px solid white',
  color: 'white',
  borderRadius: '25px',
  padding: '10px 0',
  width: '100%',
  textTransform: 'none',
  fontSize: '16px',
   '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'white',
  },
};

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!isValidEmail(email)) {
      setError('Vui lòng nhập một địa chỉ email hợp lệ.');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('Nếu email của bạn tồn tại trong hệ thống, một liên kết đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn (bao gồm cả thư mục spam).');
      setEmail(''); // Clear email field on success
    } catch (err) {
      console.error('Forgot password error:', err);
      // Firebase often doesn't reveal if an email exists for security reasons with sendPasswordResetEmail
      // So, a generic message is usually better than reflecting specific Firebase errors like 'auth/user-not-found'
      setError('Đã xảy ra lỗi khi cố gắng gửi email đặt lại mật khẩu. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%' /* Form takes full width of its container */ }}>
      <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ color: 'white', fontWeight: 'bold', mb: 3 }}>
        Quên Mật Khẩu
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: '8px' }}>
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2, borderRadius: '8px' }}>
          {successMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={commonInputStyle}
          helperText={<Typography variant="caption" sx={{color: 'rgba(255,255,255,0.6)'}}>Nhập email đã đăng ký của bạn để nhận liên kết đặt lại mật khẩu.</Typography>}
        />
        <Button
          type="submit"
          variant="outlined"
          fullWidth
          size="large"
          disabled={loading}
          sx={{ ...outlinedWhiteButton, mt: 3, mb: 2 }}
        >
          {loading ? <CircularProgress size={24} sx={{color: 'white'}} /> : 'Gửi Email Đặt Lại'}
        </Button>
      </form>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <NextLink href="/auth" passHref legacyBehavior>
          <MuiLink variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', '&:hover': {color: 'white'} }}>
            Quay lại Đăng nhập
          </MuiLink>
        </NextLink>
      </Box>
    </Box>
  );
};

export default ForgotPasswordForm; 