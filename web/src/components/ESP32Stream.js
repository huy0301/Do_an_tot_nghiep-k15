import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Container, Typography, Paper, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const StreamContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const VideoContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '800px',
  height: '600px',
  backgroundColor: theme.palette.grey[200],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

const ESP32Stream = ({ onImageCaptured }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [esp32Ip, setEsp32Ip] = useState('');
  const wsRef = useRef(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    // Load saved IP from localStorage
    const savedIp = localStorage.getItem('esp32_ip');
    if (savedIp) {
      setEsp32Ip(savedIp);
      connectWebSocket(savedIp);
    } else {
      setLoading(false);
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const connectWebSocket = (ip) => {
    try {
      const ws = new WebSocket(`ws://${ip}:81`);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        setError('');
        setLoading(false);
      };

      ws.onmessage = (event) => {
        if (event.data instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            if (imgRef.current) {
              imgRef.current.src = reader.result;
            }
          };
          reader.readAsDataURL(event.data);
        }
      };

      ws.onerror = (error) => {
        setError('Connection error. Please check the ESP32-CAM IP address.');
        setIsConnected(false);
        setLoading(false);
      };

      ws.onclose = () => {
        setIsConnected(false);
        setLoading(false);
      };
    } catch (err) {
      setError('Failed to connect to ESP32-CAM');
      setIsConnected(false);
      setLoading(false);
    }
  };

  const handleIpChange = (event) => {
    setEsp32Ip(event.target.value);
  };

  const handleConnect = () => {
    if (esp32Ip) {
      localStorage.setItem('esp32_ip', esp32Ip);
      setLoading(true);
      connectWebSocket(esp32Ip);
    }
  };

  const handleCapture = () => {
    if (imgRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = imgRef.current.naturalWidth;
      canvas.height = imgRef.current.naturalHeight;
      ctx.drawImage(imgRef.current, 0, 0);

      canvas.toBlob((blob) => {
        if (onImageCaptured) {
          onImageCaptured(blob);
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `esp32_capture_${new Date().toISOString()}.jpg`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      }, 'image/jpeg');
    }
  };

  return (
    <Container maxWidth="lg">
      <StreamContainer elevation={3}>
        <Typography variant="h5" component="h2" gutterBottom>
          ESP32-CAM Stream
        </Typography>

        <Box sx={{ width: '100%', maxWidth: '800px' }}>
          <input
            type="text"
            value={esp32Ip}
            onChange={handleIpChange}
            placeholder="Enter ESP32-CAM IP address"
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleConnect}
            disabled={!esp32Ip || loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : 'Connect'}
          </Button>
        </Box>

        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}

        <VideoContainer>
          {isConnected ? (
            <>
              <img
                ref={imgRef}
                alt="ESP32-CAM Stream"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </>
          ) : (
            <Typography variant="body1" color="textSecondary">
              {loading ? 'Connecting...' : 'Not connected'}
            </Typography>
          )}
        </VideoContainer>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleCapture}
          disabled={!isConnected}
          startIcon={<span>📸</span>}
        >
          Capture Image
        </Button>
      </StreamContainer>
    </Container>
  );
};

export default ESP32Stream; 