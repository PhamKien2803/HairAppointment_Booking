// src/components/DashboardChart.jsx
import React from 'react';
import { Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

const DashboardChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales',
        data: [300000, 400000, 350000, 500000, 600000, 800000, 1200000, 1100000, 1300000, 1400000, 1500000, 1450000],
        borderColor: '#FFD700',
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <Box sx={{ backgroundColor: '#1A2C38', p: 2, borderRadius: 2 }}>
      <Line data={data} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
    </Box>
  );
};

export default DashboardChart;