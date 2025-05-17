// src/components/DashboardTable.jsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DashboardTable = () => {
  const rows = [
    { id: '63701e74f03...', userId: '63701e74f03...', createdAt: '2024-03-11T16:03:34.710Z', products: 1, cost: '$872.78' },
    { id: '63701e74f03...', userId: '63701e74f03...', createdAt: '2024-03-11T16:03:34.710Z', products: 2, cost: '$839.18' },
    { id: '63701e74f03...', userId: '63701e74f03...', createdAt: '2024-03-11T16:03:34.710Z', products: 3, cost: '$826.05' },
    { id: '63701e74f03...', userId: '63701e74f03...', createdAt: '2024-03-11T16:03:34.710Z', products: 5, cost: '$826.17' },
  ];

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: '#1A2C38', color: '#fff' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#fff' }}>ID</TableCell>
            <TableCell sx={{ color: '#fff' }}>User ID</TableCell>
            <TableCell sx={{ color: '#fff' }}>Created At</TableCell>
            <TableCell sx={{ color: '#fff' }}># of Products</TableCell>
            <TableCell sx={{ color: '#fff' }}>Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell sx={{ color: '#fff' }}>{row.id}</TableCell>
              <TableCell sx={{ color: '#fff' }}>{row.userId}</TableCell>
              <TableCell sx={{ color: '#fff' }}>{row.createdAt}</TableCell>
              <TableCell sx={{ color: '#fff' }}>{row.products}</TableCell>
              <TableCell sx={{ color: '#fff' }}>{row.cost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DashboardTable;