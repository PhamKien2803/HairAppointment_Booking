// src/components/DashboardPieChart.jsx
import React from 'react';
import { Box } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardPieChart = () => {
  const data = {
    labels: ['Shoes', 'Clothing', 'Accessories', 'Misc'],
    datasets: [
      {
        label: 'Sales by Category',
        data: [65115, 16288, 19456, 22003],
        backgroundColor: ['#FFD700', '#FFCA28', '#FFB300', '#FF8F00'],
      },
    ],
  };

  return (
    <Box sx={{ backgroundColor: '#1A2C38', p: 2, borderRadius: 2 }}>
      <Pie data={data} options={{ responsive: true }} />
    </Box>
  );
};

export default DashboardPieChart;