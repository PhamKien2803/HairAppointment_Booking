// redux/reducers/dashboardReducer.js
import {
    FETCH_OVERVIEW,
    FETCH_REVENUE_BY_TIME,
    FETCH_REVENUE_BY_BRANCH,
    FETCH_APPOINTMENTS_BY_TIME,
    FETCH_HOURLY_TRAFFIC,
    FETCH_TOP_SERVICES,
    FETCH_LEAST_SERVICES,
    FETCH_TOP_EMPLOYEES,
    FETCH_APPOINTMENT_LIST,
    FETCH_EMPLOYEE_STATS,
    FETCH_PEAK_HOURS,
} from '../actions/dashboardActions';

const initialState = {
    overview: {
        totalRevenue: 0,
        totalEmployees: 0,
        totalCustomers: 0,
        appointments: 0,
        cancelledBookings: 0,
        pendingBookings: 0,
    },
    revenueByTime: [],
    revenueByBranch: [],
    appointmentsByTime: [],
    hourlyTraffic: [],
    topServices: [],
    leastServices: [], // Thêm state mới
    topEmployees: [],
    appointmentList: [],
    employeeStats: { employees: [], busiestEmployee: {}, leastBusyEmployee: {} },
    peakHours: [],
};

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_OVERVIEW:
            return { ...state, overview: action.payload };
        case FETCH_REVENUE_BY_TIME:
            return { ...state, revenueByTime: action.payload };
        case FETCH_REVENUE_BY_BRANCH:
            return { ...state, revenueByBranch: action.payload };
        case FETCH_APPOINTMENTS_BY_TIME:
            return { ...state, appointmentsByTime: action.payload };
        case FETCH_HOURLY_TRAFFIC:
            return { ...state, hourlyTraffic: action.payload };
        case FETCH_TOP_SERVICES:
            return { ...state, topServices: action.payload };
        case FETCH_LEAST_SERVICES:
            return { ...state, leastServices: action.payload };
        case FETCH_TOP_EMPLOYEES:
            return { ...state, topEmployees: action.payload };
        case FETCH_APPOINTMENT_LIST:
            return { ...state, appointmentList: action.payload };
        case FETCH_EMPLOYEE_STATS:
            return { ...state, employeeStats: action.payload };
        case FETCH_PEAK_HOURS:
            return { ...state, peakHours: action.payload };
        default:
            return state;
    }
};

export default dashboardReducer;