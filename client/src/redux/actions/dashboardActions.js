// redux/actions/dashboardActions.js
import axiosInstance from "../../helper/axiosInstance";
import { showErrorDialog } from './errorActions';
import { toast } from 'react-toastify';

export const FETCH_OVERVIEW = 'FETCH_OVERVIEW';
export const FETCH_REVENUE_BY_TIME = 'FETCH_REVENUE_BY_TIME';
export const FETCH_REVENUE_BY_BRANCH = 'FETCH_REVENUE_BY_BRANCH';
export const FETCH_APPOINTMENTS_BY_TIME = 'FETCH_APPOINTMENTS_BY_TIME';
export const FETCH_HOURLY_TRAFFIC = 'FETCH_HOURLY_TRAFFIC';
export const FETCH_TOP_SERVICES = 'FETCH_TOP_SERVICES';
export const FETCH_LEAST_SERVICES = 'FETCH_LEAST_SERVICES';
export const FETCH_TOP_EMPLOYEES = 'FETCH_TOP_EMPLOYEES';
export const FETCH_APPOINTMENT_LIST = 'FETCH_APPOINTMENT_LIST';
export const FETCH_EMPLOYEE_STATS = 'FETCH_EMPLOYEE_STATS';
export const FETCH_PEAK_HOURS = 'FETCH_PEAK_HOURS';

export const fetchOverview = (timeUnit = 'today', startDate, endDate) => async (dispatch) => {
    try {
        const response = await axiosInstance.get('/dashboard/overview', { params: { timeUnit, startDate, endDate } });
        dispatch({
            type: FETCH_OVERVIEW,
            payload: response.data,
        });
    } catch (error) {
        dispatch(showErrorDialog(error));
    }
};

export const fetchRevenueByTime = (timeUnit = 'month', branchId, startDate, endDate) => async (dispatch) => {
    try {
        const response = await axiosInstance.get('/dashboard/revenue/time', { params: { timeUnit, branchId, startDate, endDate } });
        dispatch({
            type: FETCH_REVENUE_BY_TIME,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch(showErrorDialog(error));
    }
};

export const fetchRevenueByBranch = (startDate, endDate) => async (dispatch) => {
    try {
        const response = await axiosInstance.get('/dashboard/revenue/branch', { params: { startDate, endDate } });
        dispatch({
            type: FETCH_REVENUE_BY_BRANCH,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch(showErrorDialog(error));
    }
};

export const fetchAppointmentsByTime = (timeUnit = 'month', startDate, endDate) => async (dispatch) => {
    try {
        const response = await axiosInstance.get('/dashboard/appointments/time', { params: { timeUnit, startDate, endDate } });
        dispatch({
            type: FETCH_APPOINTMENTS_BY_TIME,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch(showErrorDialog(error));
    }
};

export const fetchHourlyTraffic = (startDate, endDate) => async (dispatch) => {
    try {
        const response = await axiosInstance.get('/dashboard/hourly-traffic', { params: { startDate, endDate } });
        dispatch({
            type: FETCH_HOURLY_TRAFFIC,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch(showErrorDialog(error));
    }
};

export const fetchTopServices = (startDate, endDate) => async (dispatch) => {
    try {
        const response = await axiosInstance.get('/dashboard/top-services', { params: { startDate, endDate } });
        dispatch({
            type: FETCH_TOP_SERVICES,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch(showErrorDialog(error));
    }
};

export const fetchLeastServices = (startDate, endDate) => async (dispatch) => {
    try {
        const response = await axiosInstance.get('/dashboard/least-services', { params: { startDate, endDate } });
        dispatch({
            type: FETCH_LEAST_SERVICES,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch(showErrorDialog(error));
    }
};

export const fetchTopEmployees = (startDate, endDate) => async (dispatch) => {
    try {
        const response = await axiosInstance.get('/dashboard/top-employees', { params: { startDate, endDate } });
        dispatch({
            type: FETCH_TOP_EMPLOYEES,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch(showErrorDialog(error));
    }
};

export const fetchAppointmentList = (filters) => async (dispatch) => {
    try {
        const response = await axiosInstance.get('/dashboard/appointments', { params: filters });
        dispatch({
            type: FETCH_APPOINTMENT_LIST,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch(showErrorDialog(error));
    }
};

export const fetchEmployeeStats = (branchId) => async (dispatch) => {
    try {
        const response = await axiosInstance.get('/dashboard/employees', { params: { branchId } });
        dispatch({
            type: FETCH_EMPLOYEE_STATS,
            payload: response.data,
        });
    } catch (error) {
        dispatch(showErrorDialog(error));
    }
};

export const fetchPeakHours = (startDate, endDate) => async (dispatch) => {
    try {
        const response = await axiosInstance.get('/dashboard/peak-hours', { params: { startDate, endDate } });
        dispatch({
            type: FETCH_PEAK_HOURS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch(showErrorDialog(error));
    }
};