const express = require("express");
const router = express.Router();
const Branch = require("../models/Branches");
const branchController = require("../controllers/branchController");
const { findAllGeneric } = require("../controllers/use.controller");
// router.get("/branch",findAllGeneric(Branch, "Branch"));
// router.get("/", branchController.getFilteredBranches);
// router.get("/:id", branchController.getBranchById);
// router.post("/", branchController.createBranch);
// router.put("/:id", branchController.updateBranch);
// router.delete("/:id", branchController.deleteBranch);
// router.get("/:branchId/top-employee", branchController.getTopEmployeeInBranch);
// router.get("/:branchId/revenue", branchController.getBranchRevenue);

/**
 * @swagger
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Tên chi nhánh
 *         address:
 *           type: string
 *           description: Địa chỉ chi nhánh
 *         managerId:
 *           type: string
 *           description: ID của quản lý chi nhánh
 */

/**
 * @swagger
 * /branch:
 *   get:
 *     summary: Lấy tất cả chi nhánh
 *     tags: [Branches]
 *     responses:
 *       200:
 *         description: Thành công, trả về danh sách chi nhánh
 */
router.get("/branch", findAllGeneric(Branch, "Branch"));

/**
 * @swagger
 * /branches:
 *   get:
 *     summary: Lọc danh sách chi nhánh theo tên, địa chỉ hoặc managerId
 *     tags: [Branches]
 *     parameters:
 *       - in: query
 *         name: name
 *         description: Tên chi nhánh
 *         schema:
 *           type: string
 *       - in: query
 *         name: address
 *         description: Địa chỉ chi nhánh
 *         schema:
 *           type: string
 *       - in: query
 *         name: managerId
 *         description: ID của quản lý chi nhánh
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortBy
 *         description: Sắp xếp theo trường cụ thể (name, address, ...)
 *         schema:
 *           type: string
 *       - in: query
 *         name: order
 *         description: Thứ tự sắp xếp (asc hoặc desc)
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: Thành công, trả về danh sách chi nhánh đã lọc
 */
router.get("/", branchController.getFilteredBranches);

/**
 * @swagger
 * /branches/{id}:
 *   get:
 *     summary: Lấy chi tiết chi nhánh theo ID
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của chi nhánh
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công, trả về thông tin chi nhánh
 */
router.get("/:id", branchController.getBranchById);

/**
 * @swagger
 * /branches:
 *   post:
 *     summary: Tạo một chi nhánh mới
 *     tags: [Branches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       201:
 *         description: Chi nhánh được tạo thành công
 */
router.post("/", branchController.createBranch);

/**
 * @swagger
 * /branches/{id}:
 *   put:
 *     summary: Cập nhật thông tin chi nhánh
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của chi nhánh cần cập nhật
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put("/:id", branchController.updateBranch);

/**
 * @swagger
 * /branches/{id}:
 *   delete:
 *     summary: Xóa một chi nhánh
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của chi nhánh cần xóa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router.delete("/:id", branchController.deleteBranch);

/**
 * @swagger
 * /branches/{branchId}/top-employee:
 *   get:
 *     summary: Lấy nhân viên có sao cao nhất trong chi nhánh
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         description: ID của chi nhánh
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trả về danh sách nhân viên có điểm sao cao nhất
 *       404:
 *         description: Không tìm thấy nhân viên trong chi nhánh này
 */
router.get("/:branchId/top-employee", branchController.getTopEmployeeInBranch);

/**
 * @swagger
 * /branches/{branchId}/revenue:
 *   get:
 *     summary: Tính tổng doanh thu của một chi nhánh
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         description: ID của chi nhánh
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         description: Ngày bắt đầu (YYYY-MM-DD)
 *         schema:
 *           type: string
 *       - in: query
 *         name: endDate
 *         description: Ngày kết thúc (YYYY-MM-DD)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trả về tổng doanh thu của chi nhánh trong khoảng thời gian đã chọn
 */

module.exports = router;
