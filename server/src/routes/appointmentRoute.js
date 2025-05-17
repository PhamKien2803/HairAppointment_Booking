const express = require("express");
const router = express.Router();

const Appointment = require("../models/Appointment");
const UseController = require("../controllers/index");
const {createAppointment, updateAppointment, deleteAppointment,
     getAppoinmentByCustomerName, getAppoinmentByStatus, getListBarberAvailable, getAppoinmentByCustomerTimer} = require("../controllers/appointmentController")
router.get("/", UseController.findAllGenericRef(Appointment,["customerId", "employeeId", "serviceId", "branchId"]));
router.get("/name/:name",getAppoinmentByCustomerName);
router.get("/status/:status",getAppoinmentByStatus);
router.get("/barber-available/:date/:branchId",getListBarberAvailable);
router.get("/:id", UseController.findIdGenericRef(Appointment,["customerId", "employeeId", "serviceId", "branchId"]));
router.post("/", createAppointment);

/**
 * @swagger
 * /appointment/{id}:
 *   put:
 *     summary: Cập nhật thông tin cuộc hẹn
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của cuộc hẹn cần cập nhật
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put("/:id", updateAppointment);

/**
 * @swagger
 * /appointment/{id}:
 *   delete:
 *     summary: Xóa một cuộc hẹn
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của cuộc hẹn cần xóa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router.delete("/:id", deleteAppointment);

router.get("/customer/:customerId",getAppoinmentByCustomerTimer)
module.exports = router;