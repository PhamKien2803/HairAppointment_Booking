const express = require("express");
const router = express.Router();
const voucherController = require("../controllers/voucherController");

/**
 * @swagger
 * /vouchers:
 *   get:
 *     summary: Lấy danh sách mã giảm giá
 *     tags: [Vouchers]
 *     responses:
 *       200:
 *         description: Danh sách mã giảm giá
 */
router.get("/", voucherController.getAllVouchers);

/**
 * @swagger
 * /vouchers/{id}:
 *   get:
 *     summary: Lấy thông tin mã giảm giá theo ID
 *     tags: [Vouchers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin chi tiết của mã giảm giá
 */
router.get("/:id", voucherController.getVoucherById);

/**
 * @swagger
 * /vouchers:
 *   post:
 *     summary: Tạo mã giảm giá mới
 *     tags: [Vouchers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               discount:
 *                 type: number
 *               minOrderValue:
 *                 type: number
 *               expiryDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Mã giảm giá được tạo thành công
 */
router.post("/", voucherController.createVoucher);

/**
 * @swagger
 * /vouchers/{id}:
 *   put:
 *     summary: Cập nhật mã giảm giá theo ID
 *     tags: [Vouchers]
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
 *               code:
 *                 type: string
 *               discount:
 *                 type: number
 *               minOrderValue:
 *                 type: number
 *               expiryDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put("/:id", voucherController.updateVoucher);

/**
 * @swagger
 * /vouchers/{id}:
 *   delete:
 *     summary: Xóa mã giảm giá theo ID
 *     tags: [Vouchers]
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

router.delete("/:id", voucherController.deleteVoucher);

module.exports = router;
