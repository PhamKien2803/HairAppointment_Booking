import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { People as PeopleIcon, MonetizationOn as SalesIcon, CalendarToday, HourglassEmpty, Cancel as CancelIcon } from '@mui/icons-material';
import {
  fetchOverview,
  fetchRevenueByTime,
  fetchRevenueByBranch,
  fetchAppointmentsByTime,
  fetchHourlyTraffic,
  fetchTopServices,
  fetchLeastServices,
  fetchTopEmployees,
  fetchEmployeeStats,
  fetchPeakHours,
} from '../../redux/actions/dashboardActions';

const COLORS = ['#FFD700', '#FFBB28', '#FF8042', '#FF4444', '#00C49F'];

const DashboardPage = () => {
  const dispatch = useDispatch();
  const {
    overview,
    revenueByTime,
    revenueByBranch,
    appointmentsByTime,
    hourlyTraffic,
    topServices,
    leastServices,
    topEmployees,
    employeeStats,
    peakHours,
  } = useSelector((state) => state.dashboard);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [filters, setFilters] = React.useState({
    startDate: getCurrentDate(),
    endDate: getCurrentDate(),
  });

  useEffect(() => {
    handleApplyFilters();
  }, [dispatch]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApplyFilters = () => {
    const { startDate, endDate } = filters;

    const queryParams = {};
    if (startDate && startDate !== getCurrentDate()) queryParams.startDate = startDate;
    if (endDate && endDate !== getCurrentDate()) queryParams.endDate = endDate;

    dispatch(fetchOverview('today', queryParams.startDate, queryParams.endDate));
    dispatch(fetchRevenueByTime('month', queryParams.startDate, queryParams.endDate));
    dispatch(fetchRevenueByBranch(queryParams.startDate, queryParams.endDate));
    dispatch(fetchAppointmentsByTime('month', queryParams.startDate, queryParams.endDate));
    dispatch(fetchHourlyTraffic(queryParams.startDate, queryParams.endDate));
    dispatch(fetchTopServices(queryParams.startDate, queryParams.endDate));
    dispatch(fetchLeastServices(queryParams.startDate, queryParams.endDate));
    dispatch(fetchTopEmployees(queryParams.startDate, queryParams.endDate));
    dispatch(fetchEmployeeStats());
    dispatch(fetchPeakHours(queryParams.startDate, queryParams.endDate));
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Filter Section */}
      <Card sx={{ mb: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>Filters</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Start Date"
                type="date"
                name="startDate"
                value={formatDate(filters.startDate)}
                onChange={handleFilterChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="End Date"
                type="date"
                name="endDate"
                value={formatDate(filters.endDate)}
                onChange={handleFilterChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button variant="contained" color="primary" onClick={handleApplyFilters} fullWidth>
                Apply Filters
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Rest of the component remains the same */}
      {/* Overview Stats */}
      <Typography variant="h5" gutterBottom>Overview</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: '#e3f2fd' }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <SalesIcon sx={{ fontSize: 40, color: '#1a237e', mr: 2 }} />
                <Box>
                  <Typography variant="h6">${overview.totalRevenue.toFixed(2)}</Typography>
                  <Typography variant="body2">Total Revenue</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: '#e3f2fd' }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PeopleIcon sx={{ fontSize: 40, color: '#1a237e', mr: 2 }} />
                <Box>
                  <Typography variant="h6">{overview.totalEmployees}</Typography>
                  <Typography variant="body2">Total Employees</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: '#e3f2fd' }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PeopleIcon sx={{ fontSize: 40, color: '#1a237e', mr: 2 }} />
                <Box>
                  <Typography variant="h6">{overview.totalCustomers}</Typography>
                  <Typography variant="body2">Total Customers</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Revenue Charts */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Revenue Analysis</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Revenue Over Time</Typography>
              <AreaChart width={500} height={300} data={revenueByTime.map(item => ({ name: item._id, revenue: item.total }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="revenue" stroke="#FFD700" fill="#FFD700" fillOpacity={0.3} />
              </AreaChart>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Revenue by Branch</Typography>
              <BarChart width={500} height={300} data={revenueByBranch}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="branchName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalRevenue" fill="#FFBB28" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Appointment Analysis */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Appointment Analysis</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Appointments Over Time</Typography>
              <LineChart width={500} height={300} data={appointmentsByTime.map(item => ({ name: item._id, count: item.count }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#FF8042" />
              </LineChart>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Hourly Traffic</Typography>
              <BarChart width={500} height={300} data={hourlyTraffic.map(item => ({ hour: item._id, count: item.count }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#FF4444" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Service Analysis */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Service Analysis</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Top Services</Typography>
              <PieChart width={400} height={300}>
                <Pie
                  data={topServices}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  label
                >
                  {topServices.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Least Used Services</Typography>
              <PieChart width={400} height={300}>
                <Pie
                  data={leastServices}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  label
                >
                  {leastServices.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Employee Analysis */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Employee Analysis</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Top Employees</Typography>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Name</th>
                    <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Bookings</th>
                  </tr>
                </thead>
                <tbody>
                  {topEmployees.map((employee) => (
                    <tr key={employee.fullName}>
                      <td style={{ padding: '8px' }}>{employee.fullName}</td>
                      <td style={{ padding: '8px' }}>{employee.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Employee Stats</Typography>
              <Typography variant="body1">
                Busiest Employee: {employeeStats.busiestEmployee.fullName || 'N/A'} ({employeeStats.busiestEmployee.bookingCount || 0} bookings)
              </Typography>
              <Typography variant="body1">
                Least Busy Employee: {employeeStats.leastBusyEmployee.fullName || 'N/A'} ({employeeStats.leastBusyEmployee.bookingCount || 0} bookings)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Peak Hours */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Optimization Insights</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Peak Hours</Typography>
              <BarChart width={800} height={300} data={peakHours.map(item => ({ hour: item._id, count: item.count }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#00C49F" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;