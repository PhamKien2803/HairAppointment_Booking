// src/components/DashboardStats.jsx
import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

const DashboardStats = ({ title, value, change, period }) => (
  <Card sx={{ backgroundColor: '#1A2C38', color: '#fff', minWidth: 200 }}>
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4">{value}</Typography>
      <Typography variant="body2" color={change.startsWith('+') ? 'success.main' : 'error.main'}>
        {change} <span style={{ color: '#888' }}>{period}</span>
      </Typography>
    </CardContent>
  </Card>
);

export default DashboardStats;