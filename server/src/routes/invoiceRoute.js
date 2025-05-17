const express = require("express");
const router = express.Router();
const UseController = require("../controllers/index");
const { createInvoice, deleteInvoice, updateInvoice } = require("../controllers/invoiceController");
const Invoice = require("../models/Invoice");
const Voucher = require("../models/Voucher");
const Customer = require("../models/Customer");


/**
 * @swagger
 * /invoice:
 *   get:
 *     summary: Lấy danh sách hóa đơn
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Danh sách hóa đơn
 */

router.get("/", UseController.findAllGenericRef(Invoice, ["customerId", "employeeId", "services.serviceId", "vouchers.voucherId"]));

/**
 * @swagger
 * /invoice/{id}:
 *   get:
 *     summary: Lấy thông tin hóa đơn theo ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin chi tiết của hóa đơn
 */
router.get("/:id", UseController.findIdGenericRef(Invoice, ["customerId", "employeeId", "services.serviceId", "vouchers.voucherId"]));


/**
 * @swagger
 * /invoice:
 *   post:
 *     summary: Tạo hóa đơn mới
 *     tags: [Invoices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: string
 *               employeeId:
 *                 type: string
 *               services:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     serviceId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *               vouchers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     voucherId:
 *                       type: string
 *               paymentMethod:
 *                 type: string
 *                 enum: [cash, card, online]
 *               paymentStatus:
 *                 type: string
 *                 enum: [pending, paid, failed]
 *     responses:
 *       201:
 *         description: Hóa đơn được tạo thành công
 */

router.post("/", createInvoice);


/**
 * @swagger
 * /invoice/{id}:
 *   put:
 *     summary: Cập nhật hóa đơn theo ID
 *     tags: [Invoices]
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
 *               customerId:
 *                 type: string
 *               employeeId:
 *                 type: string
 *               services:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     serviceId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *               vouchers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     voucherId:
 *                       type: string
 *               paymentMethod:
 *                 type: string
 *                 enum: [cash, card, online]
 *               paymentStatus:
 *                 type: string
 *                 enum: [pending, paid, failed]
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put("/:id", updateInvoice);


/**
 * @swagger
 * /invoice/{id}:
 *   delete:
 *     summary: Xóa hóa đơn theo ID
 *     tags: [Invoices]
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
router.delete("/:id", deleteInvoice);



/**
 * @swagger
 * /invoice/voucher/{customerId}/{code}:
 *   get:
 *     summary: Kiểm tra voucher của khách hàng
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin voucher
 *       404:
 *         description: Không tìm thấy khách hàng hoặc voucher
 */
router.get("/voucher/:customerId/:code", async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const code = req.params.code;
        const customer = await Customer.findById(customerId).populate("voucherId");
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        const voucher = customer.voucherId.find((v) => v.code === code);
        if (!voucher) {
            return res.status(404).json({ message: "Voucher not found" });
        }
        return res.status(200).json({
            _id: voucher._id,
            code: voucher.code,
            discount: voucher.discount,
        });
    } catch (error) {
        console.error("Error checking voucher:", error);
        return res.status(500).json({ message: error.message });
    }
});


module.exports = router;