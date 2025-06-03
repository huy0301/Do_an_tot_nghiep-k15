import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert, Link as MuiLink, Divider, CircularProgress } from '@mui/material';
import { auth, db } from '../../services/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, Timestamp, getDoc } from 'firebase/firestore';
import NextLink from 'next/link';

const AuthForm = ({ mode = 'login' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showResendVerificationButton, setShowResendVerificationButton] = useState(false);
  const [resendStatus, setResendStatus] = useState('');

  const isValidName = (name) => /^[a-zA-Z]+$/.test(name);
  const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const isValidPassword = (password) => /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const resetFormState = () => {
    setError('');
    setSuccessMessage('');
    setShowResendVerificationButton(false);
    setResendStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetFormState();
    setLoading(true);

    if (mode === 'register') {
      if (!isValidName(firstName) || !isValidName(lastName)) {
        setError('Tên và Họ chỉ nên chứa các chữ cái.');
        setLoading(false);
        return;
      }
      if (!isValidEmail(email)) {
        setError('Vui lòng nhập một địa chỉ email hợp lệ.');
        setLoading(false);
        return;
      }
      if (!isValidPassword(password)) {
        setError('Mật khẩu phải có ít nhất 8 ký tự, bao gồm 1 chữ hoa, 1 số và 1 ký tự đặc biệt.');
        setLoading(false);
        return;
      }

      try {
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        if (signInMethods.length > 0) {
          setError('Email này đã được sử dụng. Vui lòng thử đăng nhập.');
          setLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await sendEmailVerification(user);

        await setDoc(doc(db, 'users', user.uid), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          createdAt: Timestamp.now(),
          isVerified: false,
          displayName: `${firstName} ${lastName}`.trim(),
          photoURL: user.photoURL
        });
        
        setSuccessMessage('Đăng ký thành công! Vui lòng kiểm tra email của bạn để xác minh tài khoản.');
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');

      } catch (error) {
        console.error('Auth error (register):', error);
        if (error.code === 'auth/email-already-in-use') {
             setError('Email này đã được sử dụng. Vui lòng thử đăng nhập.');
        } else if (error.code === 'auth/weak-password') {
            setError('Mật khẩu quá yếu. Vui lòng sử dụng mật khẩu mạnh hơn.');
        } else {
            setError('Không thể tạo tài khoản. Vui lòng thử lại.');
        }
      } finally {
        setLoading(false);
      }
    } else {
      try {
        if (!isValidEmail(email)) {
          setError('Vui lòng nhập một địa chỉ email hợp lệ.');
          setLoading(false);
          return;
        }
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (!user.emailVerified) {
          setError('Vui lòng xác minh email của bạn trước khi đăng nhập.');
          setShowResendVerificationButton(true);
          setLoading(false);
          return;
        }
        setSuccessMessage('Đăng nhập thành công! Đang chuyển hướng...');
      } catch (error) {
        console.error('Auth error (login):', error);
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential' || error.code === 'auth/invalid-email') {
            setError('Email hoặc mật khẩu không đúng.');
        } else {
            setError('Đăng nhập thất bại. Vui lòng thử lại.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    resetFormState();
    setGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          firstName: user.displayName?.split(' ')[0] || '',
          lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
          email: user.email,
          createdAt: Timestamp.now(),
          isVerified: user.emailVerified,
          displayName: user.displayName || user.email,
          photoURL: user.photoURL
        });
      }
      setSuccessMessage('Đăng nhập với Google thành công! Đang chuyển hướng...');
    } catch (error) {
      console.error('Google Sign-In error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Cửa sổ đăng nhập Google đã bị đóng. Vui lòng thử lại.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        setError('Yêu cầu đăng nhập Google bị hủy. Vui lòng thử lại.');
      }
      else {
        setError('Không thể đăng nhập với Google. Vui lòng thử lại.');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleResendVerificationEmail = async () => {
    setLoading(true);
    setResendStatus('Đang gửi...');
    try {
      const userToVerify = auth.currentUser;

      if (email) {
        if (auth.currentUser && auth.currentUser.email === email && !auth.currentUser.emailVerified) {
            await sendEmailVerification(auth.currentUser);
            setSuccessMessage('Email xác minh đã được gửi lại. Vui lòng kiểm tra hộp thư của bạn.');
            setError('');
            setShowResendVerificationButton(false);
            setResendStatus('Đã gửi!');
        } else {
             setError('Không thể gửi lại email xác minh cho email này. Hãy thử đăng nhập lại để nhận tùy chọn gửi lại.');
             setResendStatus('Lỗi');
        }
      } else {
        setError('Vui lòng nhập email của bạn để gửi lại thư xác minh.');
        setResendStatus('Lỗi');
      }
    } catch (err) {
      console.error('Error resending verification email:', err);
      setError('Không thể gửi lại email xác minh. Vui lòng thử lại sau.');
      setResendStatus('Lỗi');
    } finally {
      setLoading(false);
    }
  };
  
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

  return (
    <Box component={Paper} elevation={0} sx={{ p: 3, backgroundColor: 'transparent' }}>
      <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ color: 'white', fontWeight: 'bold', mb: 3 }}>
        {mode === 'register' ? 'Tạo tài khoản' : 'Đăng nhập'}
        </Typography>

        {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: '8px' }}>
            {error}
          {showResendVerificationButton && (
            <Button 
              onClick={handleResendVerificationEmail} 
              variant="text" 
              size="small" 
              sx={{ ml: 1, textTransform: 'none', color: '#FFCC80' }}
              disabled={loading}
            >
              Gửi lại email xác minh
            </Button>
          )}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2, borderRadius: '8px' }}>
          {successMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
        {mode === 'register' && (
          <>
            <TextField
              label="Tên"
              type="text"
              fullWidth
              margin="normal"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              sx={commonInputStyle}
            />
            <TextField
              label="Họ"
              type="text"
              fullWidth
              margin="normal"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              sx={commonInputStyle}
            />
          </>
        )}
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          sx={commonInputStyle}
          />
          <TextField
            label="Mật khẩu"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          sx={commonInputStyle}
          />

        {mode === 'login' && (
          <Box sx={{ textAlign: 'right', my: 1 }}>
            <NextLink href="/forgot-password" passHref legacyBehavior>
              <MuiLink variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', '&:hover': {color: 'white'} }}>
                Quên mật khẩu?
              </MuiLink>
            </NextLink>
          </Box>
        )}

          <Button
            type="submit"
          variant="outlined"
            fullWidth
            size="large"
          disabled={loading || googleLoading}
          sx={{ ...outlinedWhiteButton, mt: 3, mb: 2 }}
          >
          {loading && mode === 'register' ? <CircularProgress size={24} sx={{color: 'white'}}/> : (mode === 'register' ? 'Đăng ký' : (loading ? <CircularProgress size={24} sx={{color: 'white'}} /> : 'Đăng nhập'))}
          </Button>
        </form>

      <Divider sx={{ my: 2, color: 'rgba(255,255,255,0.7)', '&::before, &::after': { borderColor: 'rgba(255,255,255,0.3)'} }}>
        <Typography variant="caption" sx={{color: 'rgba(255,255,255,0.7)'}}>hoặc</Typography>
      </Divider>

      <Button
        variant="outlined"
        fullWidth
        size="large"
        onClick={handleGoogleSignIn}
        disabled={loading || googleLoading}
        sx={outlinedWhiteButton}
        startIcon={googleLoading ? <CircularProgress size={20} sx={{color: 'white'}} /> : <img src="/images/google_icon.png" alt="Google" style={{ width: 20, height: 20 }} />}
      >
        {googleLoading ? 'Đang xử lý...' : 'Tiếp tục với Google'}
      </Button>
    </Box>
  );
};

export default AuthForm; 