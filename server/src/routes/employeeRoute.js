const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const UseController = require("../controllers/use.controller");
const EmployeeController = require("../controllers/employeeController");

// Giữ nguyên các routers cũ
/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: API quản lý nhân viên
 */

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Lấy danh sách nhân viên
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: Danh sách nhân viên
 */
router.get(
  "/",
  UseController.findAllGenericRef(Employee, ["branchId", "workScheduleId"])
);

/**
 * @swagger
 * /employees/workScheduleId:
 *   get:
 *     summary: Lấy danh sách nhân viên theo WorkScheduleId
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: Danh sách nhân viên theo WorkScheduleId
 */
router.get(
  "/workScheduleId",
  UseController.findAllGenericRef(Employee, ["branchId"])
);


/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Lấy thông tin nhân viên theo ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin chi tiết của nhân viên
 */
// Lấy danh sách nhân viên theo ID
router.get(
  "/:id",
  UseController.findIdGenericRef(Employee, ["branchId", "workScheduleId"])
);

// Thêm API tạo nhân viên

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Tạo nhân viên mới
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "Nguyen Van A"
 *               phone:
 *                 type: string
 *                 example: "0123456789"
 *               email:
 *                 type: string
 *                 example: "example@mail.com"
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *               position:
 *                 type: string
 *                 enum: [receptionist, barber]
 *               branchId:
 *                 type: string
 *               salary:
 *                 type: number
 *               workScheduleId:
 *                 type: string
 *               star:
 *                 type: number
 *     responses:
 *       201:
 *         description: Nhân viên được tạo thành công
 */
router.post("/", UseController.createGeneric(Employee, "Employee"));

// Thêm API cập nhật nhân viên theo ID

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Cập nhật nhân viên theo ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *               position:
 *                 type: string
 *                 enum: [receptionist, barber]
 *               branchId:
 *                 type: string
 *               salary:
 *                 type: number
 *               workScheduleId:
 *                 type: string
 *               star:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put("/:id", UseController.updateGeneric(Employee, "Employee"));

// Thêm API xóa nhân viên theo ID

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Xóa nhân viên theo ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router.delete("/:id", UseController.deleteGeneric(Employee, "Employee"));

// get employee theo account id
router.get("/profile/accountId", EmployeeController.getBarberProfile);

module.exports = router;
