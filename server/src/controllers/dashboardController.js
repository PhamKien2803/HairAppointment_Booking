const mongoose = require('mongoose');
const Appointment = require('../models/Appointment');
const Customer = require('../models/Customer');
const Employee = require('../models/Employee');
const Invoice = require('../models/Invoice');
const Service = require('../models/Service');
const Branch = require('../models/Branches');

const getDateRange = (startDate, endDate) => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    if (end) end.setHours(23, 59, 59, 999);
    return { start, end };
};

const applyDateFilters = (query, startDate, endDate) => {
    const { start, end } = getDateRange(startDate, endDate);
    if (start && end) query.createdAt = { $gte: start, $lte: end };
    return query;
};

const applyAppointmentDateFilters = (query, startDate, endDate) => {
    const { start, end } = getDateRange(startDate, endDate);
    if (start && end) query.appointmentTime = { $gte: start, $lte: end };
    return query;
};

const getOverviewStats = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        let invoiceMatch = { paymentStatus: 'paid' };
        invoiceMatch = applyDateFilters(invoiceMatch, startDate, endDate);

        let appointmentMatch = {};
        appointmentMatch = applyAppointmentDateFilters(appointmentMatch, startDate, endDate);

        const [revenueStats, totalEmployees, totalCustomers, appointments, cancelledBookings, pendingBookings] = await Promise.all([
            Invoice.aggregate([
                { $match: invoiceMatch },
                { $group: { _id: null, total: { $sum: '$totalAmount' } } },
            ]),
            Employee.countDocuments(),
            Customer.countDocuments(),
            Appointment.countDocuments(appointmentMatch),
            Appointment.countDocuments({ ...appointmentMatch, status: 'cancelled' }),
            Appointment.countDocuments({ ...appointmentMatch, status: 'pending' }),
        ]);

        res.status(200).json({
            totalRevenue: revenueStats[0]?.total || 0,
            totalEmployees,
            totalCustomers,
            appointments,
            cancelledBookings,
            pendingBookings,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching overview stats', error: error.message });
    }
};

const getRevenueByTime = async (req, res) => {
    try {
        const { timeUnit = 'month', startDate, endDate } = req.query;

        let match = { paymentStatus: 'paid' };
        match = applyDateFilters(match, startDate, endDate);

        const revenueData = await Invoice.aggregate([
            { $match: match },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: timeUnit === 'month' ? '%Y-%m' : timeUnit === 'year' ? '%Y' : '%Y-%m-%d',
                            date: '$createdAt',
                        },
                    },
                    total: { $sum: '$totalAmount' },
                },
            },
            { $sort: { '_id': 1 } },
        ]);

        res.status(200).json({ data: revenueData });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching revenue by time', error: error.message });
    }
};

const getRevenueByBranch = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        let match = { paymentStatus: 'paid' };
        match = applyDateFilters(match, startDate, endDate);

        const revenueByBranch = await Invoice.aggregate([
            { $lookup: { from: 'employees', localField: 'employeeId', foreignField: '_id', as: 'employee' } },
            { $unwind: '$employee' },
            { $lookup: { from: 'branches', localField: 'employee.branchId', foreignField: '_id', as: 'branch' } },
            { $unwind: '$branch' },
            { $match: match },
            {
                $group: {
                    _id: '$branch._id',
                    branchName: { $first: '$branch.name' },
                    totalRevenue: { $sum: '$totalAmount' }
                }
            },
            { $sort: { totalRevenue: -1 } }
        ]);

        res.status(200).json({ data: revenueByBranch });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching revenue by branch', error: error.message });
    }
};

const getAppointmentsByTime = async (req, res) => {
    try {
        const { timeUnit = 'month', startDate, endDate } = req.query;

        let match = {};
        match = applyAppointmentDateFilters(match, startDate, endDate);

        const appointmentData = await Appointment.aggregate([
            { $match: match },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: timeUnit === 'month' ? '%Y-%m' : timeUnit === 'year' ? '%Y' : '%Y-%m-%d',
                            date: '$appointmentTime',
                        },
                    },
                    count: { $sum: 1 },
                },
            },
            { $sort: { '_id': 1 } },
        ]);

        res.status(200).json({ data: appointmentData });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments by time', error: error.message });
    }
};

const getHourlyTraffic = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        let match = {};
        match = applyAppointmentDateFilters(match, startDate, endDate);

        const hourlyTraffic = await Appointment.aggregate([
            { $match: match },
            { $group: { _id: { $hour: '$appointmentTime' }, count: { $sum: 1 } } },
            { $sort: { '_id': 1 } },
        ]);

        res.status(200).json({ data: hourlyTraffic });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hourly traffic', error: error.message });
    }
};

const getTopServices = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        let match = {};
        match = applyAppointmentDateFilters(match, startDate, endDate);

        const topServices = await Appointment.aggregate([
            { $match: match },
            { $unwind: '$serviceId' },
            { $group: { _id: '$serviceId', count: { $sum: 1 } } },
            { $lookup: { from: 'services', localField: '_id', foreignField: '_id', as: 'service' } },
            { $unwind: '$service' },
            { $project: { name: '$service.name', count: 1, _id: 0 } },
            { $sort: { count: -1 } },
            { $limit: 5 },
        ]);

        res.status(200).json({ data: topServices });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching top services', error: error.message });
    }
};

const getLeastUsedServices = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        let match = {};
        match = applyAppointmentDateFilters(match, startDate, endDate);

        const leastUsedServices = await Appointment.aggregate([
            { $match: match },
            { $unwind: '$serviceId' },
            { $group: { _id: '$serviceId', count: { $sum: 1 } } },
            { $lookup: { from: 'services', localField: '_id', foreignField: '_id', as: 'service' } },
            { $unwind: '$service' },
            { $project: { name: '$service.name', count: 1, _id: 0 } },
            { $sort: { count: 1 } },
            { $limit: 5 },
        ]);

        res.status(200).json({ data: leastUsedServices });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching least used services', error: error.message });
    }
};

const getTopEmployees = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        let match = {};
        match = applyAppointmentDateFilters(match, startDate, endDate);

        const topEmployees = await Appointment.aggregate([
            { $match: match },
            { $group: { _id: '$employeeId', count: { $sum: 1 } } },
            { $lookup: { from: 'employees', localField: '_id', foreignField: '_id', as: 'employee' } },
            { $unwind: '$employee' },
            { $project: { fullName: '$employee.fullName', count: 1, _id: 0 } },
            { $sort: { count: -1 } },
            { $limit: 5 },
        ]);

        res.status(200).json({ data: topEmployees });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching top employees', error: error.message });
    }
};

const getEmployeeStats = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const employees = await Employee.find().lean();

        let match = {};
        match = applyAppointmentDateFilters(match, startDate, endDate);

        const employeeBookings = await Appointment.aggregate([
            { $match: match },
            { $group: { _id: '$employeeId', bookingCount: { $sum: 1 } } },
        ]);

        const employeeMap = employees.map(employee => {
            const bookingInfo = employeeBookings.find(b => b._id?.toString() === employee._id.toString()) || { bookingCount: 0 };
            return { ...employee, bookingCount: bookingInfo.bookingCount };
        });

        const busiestEmployee = employeeMap.reduce((max, current) => max.bookingCount > current.bookingCount ? max : current, { bookingCount: -1 });
        const leastBusyEmployee = employeeMap.reduce((min, current) => min.bookingCount < current.bookingCount ? min : current, { bookingCount: Infinity });

        res.status(200).json({ employees: employeeMap, busiestEmployee, leastBusyEmployee });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee stats', error: error.message });
    }
};

const getPeakHours = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        let match = {};
        match = applyAppointmentDateFilters(match, startDate, endDate);

        const peakHours = await Appointment.aggregate([
            { $match: match },
            { $group: { _id: { $hour: '$appointmentTime' }, count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
        ]);

        res.status(200).json({ data: peakHours });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching peak hours', error: error.message });
    }
};

module.exports = {
    getOverviewStats,
    getRevenueByTime,
    getRevenueByBranch,
    getAppointmentsByTime,
    getHourlyTraffic,
    getTopServices,
    getLeastUsedServices,
    getTopEmployees,
    getEmployeeStats,
    getPeakHours,
};