import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getStatistics } from '../services/predictionService';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  card: {
    height: '100%',
  },
  diseaseName: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  confidence: {
    color: theme.palette.success.main,
    fontWeight: 'bold',
  },
  count: {
    color: theme.palette.text.secondary,
  },
  progressBar: {
    marginTop: theme.spacing(1),
  },
  overallStats: {
    marginBottom: theme.spacing(3),
  },
}));

const Statistics = () => {
  const classes = useStyles();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStatistics();
        setStats(data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box className={classes.container} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!stats || stats.totalPredictions === 0) {
    return (
      <Box className={classes.container}>
        <Typography variant="h5" className={classes.title}>
          Statistics
        </Typography>
        <Typography>No predictions yet</Typography>
      </Box>
    );
  }

  return (
    <Box className={classes.container}>
      <Typography variant="h5" className={classes.title}>
        Statistics
      </Typography>

      <Paper className={classes.overallStats}>
        <Box p={2}>
          <Typography variant="h6" gutterBottom>
            Overall Statistics
          </Typography>
          <Typography>
            Total Predictions: {stats.totalPredictions}
          </Typography>
          <Typography className={classes.confidence}>
            Overall Average Confidence: {(stats.overallAverageConfidence * 100).toFixed(2)}%
          </Typography>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {Object.entries(stats.diseases).map(([disease, data]) => (
          <Grid item xs={12} sm={6} md={4} key={disease}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" className={classes.diseaseName}>
                  {disease.replace(/_/g, ' ').toUpperCase()}
                </Typography>
                <Typography className={classes.count}>
                  Count: {data.count}
                </Typography>
                <Typography className={classes.confidence}>
                  Average Confidence: {(data.averageConfidence * 100).toFixed(2)}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={data.averageConfidence * 100}
                  className={classes.progressBar}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Statistics; 