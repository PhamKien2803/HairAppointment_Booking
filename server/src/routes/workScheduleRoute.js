const express = require("express");
const router = express.Router();
const workScheduleController = require("../controllers/workScheduleController");

// Các route hiện có
/**
 * @swagger
 * /workschedule/{id}:
 *   get:
 *     summary: Lấy thông tin lịch làm việc theo ID
 *     tags: [WorkSchedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin chi tiết của lịch làm việc
 */
router.get("/", workScheduleController.getAllWorkSchedules);


router.get("/:id", workScheduleController.getWorkScheduleById);

/**
 * @swagger
 * /workschedule:
 *   post:
 *     summary: Tạo lịch làm việc mới
 *     tags: [WorkSchedules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slots:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     day:
 *                       type: string
 *                     startTime:
 *                       type: string
 *                       format: date-time
 *                     isBooked:
 *                       type: boolean
 *     responses:
 *       201:
 *         description: Lịch làm việc được tạo thành công
 */
router.post("/", workScheduleController.createWorkSchedule);

/**
 * @swagger
 * /workschedule/{id}:
 *   put:
 *     summary: Cập nhật lịch làm việc theo ID
 *     tags: [WorkSchedules]
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
 *               slots:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     day:
 *                       type: string
 *                     startTime:
 *                       type: string
 *                       format: date-time
 *                     isBooked:
 *                       type: boolean
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put("/:id", workScheduleController.updateWorkSchedule);

/**
 * @swagger
 * /workschedule/{id}:
 *   delete:
 *     summary: Xóa lịch làm việc theo ID
 *     tags: [WorkSchedules]
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
router.delete("/:id", workScheduleController.deleteWorkSchedule);

// Quản lý slots

/**
 * @swagger
 * /workschedule/{workScheduleId}/slots:
 *   post:
 *     summary: Thêm slot vào lịch làm việc
 *     tags: [WorkSchedules]
 *     parameters:
 *       - in: path
 *         name: workScheduleId
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
 *               day:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: time
 *     responses:
 *       201:
 *         description: Thêm slot thành công
 */
router.post(
  "/:workScheduleId/slots",
  workScheduleController.addSlotToWorkSchedule
);

/**
 * @swagger
 * /workschedule/{workScheduleId}/slots/{slotId}:
 *   patch:
 *     summary: Cập nhật thông tin slot
 *     tags: [WorkSchedules]
 *     parameters:
 *       - in: path
 *         name: workScheduleId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: slotId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cập nhật slot thành công
 */
router.patch(
  "/:workScheduleId/slots/:slotId",
  workScheduleController.updateSlot
);

/**
 * @swagger
 * /workschedule/{workScheduleId}/slots/bulk:
 *   delete:
 *     summary: Xóa nhiều slots cùng lúc
 *     tags: [WorkSchedules]
 *     parameters:
 *       - in: path
 *         name: workScheduleId
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
 *               slotIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Xóa slots thành công
 */
router.delete(
  "/:workScheduleId/slots/bulk",
  workScheduleController.deleteMultipleSlots
);

// Lịch làm việc theo nhân viên

/**
 * @swagger
 * /workschedule/employee/{employeeId}:
 *   get:
 *     summary: Lấy lịch làm việc theo ID nhân viên
 *     tags: [WorkSchedules]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lịch làm việc của nhân viên
 */
router.get(
  "/employee/:employeeId",
  workScheduleController.getScheduleByEmployeeId
);

module.exports = router;
