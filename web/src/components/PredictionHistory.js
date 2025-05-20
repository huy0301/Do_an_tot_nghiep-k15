import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getPredictionHistory } from '../services/predictionService';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  cardMedia: {
    height: 200,
    objectFit: 'cover',
  },
  predictionInfo: {
    marginTop: theme.spacing(1),
  },
  confidence: {
    color: theme.palette.success.main,
    fontWeight: 'bold',
  },
  timestamp: {
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(4),
  },
  deviceChip: {
    marginTop: theme.spacing(1),
  },
  diseaseName: {
    color: theme.palette.error.main,
    fontWeight: 'bold',
  },
  openButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
  },
  diseaseFolder: {
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.5),
  },
}));

const PredictionHistory = () => {
  const classes = useStyles();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getPredictionHistory();
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleOpenImage = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };

  if (loading) {
    return (
      <Box className={classes.loading}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className={classes.container}>
      <Typography variant="h5" className={classes.title}>
        Prediction History
      </Typography>

      <Grid container spacing={3}>
        {history.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card className={classes.card}>
              <Tooltip title="Open full image">
                <IconButton
                  className={classes.openButton}
                  onClick={() => handleOpenImage(item.imageUrl)}
                >
                  <OpenInNewIcon />
                </IconButton>
              </Tooltip>
              <CardMedia
                component="img"
                className={classes.cardMedia}
                image={item.imageUrl}
                alt="Captured leaf"
              />
              <CardContent>
                <Typography variant="h6" component="h2" className={classes.diseaseName}>
                  {item.prediction}
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.confidence}
                >
                  Confidence: {(item.confidence * 100).toFixed(2)}%
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.timestamp}
                >
                  {item.timestamp.toLocaleString()}
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.diseaseFolder}
                >
                  Folder: {item.storagePath.split('/')[1]}
                </Typography>
                {item.device && (
                  <Chip
                    label={item.device}
                    size="small"
                    color="primary"
                    className={classes.deviceChip}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PredictionHistory; 