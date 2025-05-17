// routes/dashboardRoute.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// router.get('/overview', dashboardController.getOverviewStats);
// router.get('/revenue/time', dashboardController.getRevenueByTime);
// router.get('/revenue/branch', dashboardController.getRevenueByBranch);
// router.get('/appointments/time', dashboardController.getAppointmentsByTime);
// router.get('/hourly-traffic', dashboardController.getHourlyTraffic);
// router.get('/top-services', dashboardController.getTopServices);
// router.get('/least-services', dashboardController.getLeastUsedServices);
// router.get('/top-employees', dashboardController.getTopEmployees);
// router.get('/appointments', dashboardController.getAppointmentList);
// router.get('/employees', dashboardController.getEmployeeStats);
// router.get('/peak-hours', dashboardController.getPeakHours);

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: API thống kê dữ liệu Dashboard
 */

/**
 * @swagger
 * /dashboard/overview:
 *   get:
 *     summary: Lấy tổng quan thống kê
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Trả về dữ liệu tổng quan
 *       500:
 *         description: Lỗi server
 */
router.get('/overview', dashboardController.getOverviewStats);

/**
 * @swagger
 * /dashboard/revenue/time:
 *   get:
 *     summary: Lấy doanh thu theo thời gian
 *     tags: [Dashboard]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Ngày bắt đầu
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Ngày kết thúc
 *     responses:
 *       200:
 *         description: Trả về doanh thu theo thời gian
 *       400:
 *         description: Thiếu tham số hoặc định dạng sai
 *       500:
 *         description: Lỗi server
 */
router.get('/revenue/time', dashboardController.getRevenueByTime);

/**
 * @swagger
 * /dashboard/revenue/branch:
 *   get:
 *     summary: Lấy doanh thu theo chi nhánh
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Trả về doanh thu từng chi nhánh
 *       500:
 *         description: Lỗi server
 */
router.get('/revenue/branch', dashboardController.getRevenueByBranch);

/**
 * @swagger
 * /dashboard/appointments/time:
 *   get:
 *     summary: Lấy số lượng đặt lịch theo thời gian
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Trả về số lượng lịch hẹn
 *       500:
 *         description: Lỗi server
 */
router.get('/appointments/time', dashboardController.getAppointmentsByTime);

/**
 * @swagger
 * /dashboard/hourly-traffic:
 *   get:
 *     summary: Lấy lưu lượng khách theo từng giờ
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Trả về lưu lượng khách theo giờ
 *       500:
 *         description: Lỗi server
 */
router.get('/hourly-traffic', dashboardController.getHourlyTraffic);

/**
 * @swagger
 * /dashboard/top-services:
 *   get:
 *     summary: Lấy danh sách dịch vụ được sử dụng nhiều nhất
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Trả về danh sách dịch vụ phổ biến
 *       500:
 *         description: Lỗi server
 */
router.get('/top-services', dashboardController.getTopServices);

/**
 * @swagger
 * /dashboard/least-services:
 *   get:
 *     summary: Lấy danh sách dịch vụ ít được sử dụng nhất
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Trả về danh sách dịch vụ ít được sử dụng
 *       500:
 *         description: Lỗi server
 */
router.get('/least-services', dashboardController.getLeastUsedServices);

/**
 * @swagger
 * /dashboard/top-employees:
 *   get:
 *     summary: Lấy danh sách nhân viên có hiệu suất cao nhất
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Trả về danh sách nhân viên hàng đầu
 *       500:
 *         description: Lỗi server
 */
router.get('/top-employees', dashboardController.getTopEmployees);

/**
 * @swagger
 * /dashboard/employees:
 *   get:
 *     summary: Lấy thống kê nhân viên
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Trả về thông tin thống kê nhân viên
 *       500:
 *         description: Lỗi server
 */
router.get('/employees', dashboardController.getEmployeeStats);

/**
 * @swagger
 * /dashboard/peak-hours:
 *   get:
 *     summary: Lấy thống kê khung giờ cao điểm
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Trả về thông tin về giờ cao điểm
 *       500:
 *         description: Lỗi server
 */
router.get('/peak-hours', dashboardController.getPeakHours);
module.exports = router;