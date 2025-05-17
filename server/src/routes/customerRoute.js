const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const customerController = require("../controllers/customerController");

// router.put("/update-profile/:id", [authMiddleware], updateProfile);
// router.get("/voucher/:id",getListVoucherById);

router.get("/", customerController.getAllCustomers);

// Lấy thông tin khách hàng theo ID
router.get("/:id", customerController.getCustomerById);

// Tạo mới khách hàng
router.post("/", customerController.createCustomer);

// Cập nhật thông tin khách hàng
router.put("/:id", customerController.updateCustomer);

// Xóa khách hàng
router.delete("/:id", customerController.deleteCustomer);

// Cập nhật profile khách hàng (chỉnh sửa thông tin cá nhân)
router.put("/:id/profile", [authMiddleware], customerController.updateProfile);

// Lấy danh sách voucher của khách hàng theo ID
router.get("/:id/vouchers", customerController.getListVoucherById);

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         fullname:
 *           type: string
 *           description: Họ và tên khách hàng
 *         phone:
 *           type: string
 *           description: Số điện thoại khách hàng
 *         email:
 *           type: string
 *           description: Địa chỉ email khách hàng
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *           description: Giới tính khách hàng
 *         dob:
 *           type: string
 *           format: date
 *           description: Ngày sinh của khách hàng
 *     Voucher:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *           description: Mã voucher
 *         discount:
 *           type: number
 *           description: Phần trăm giảm giá
 */

/**
 * @swagger
 * /customer/update-profile/{id}:
 *   put:
 *     summary: Cập nhật thông tin khách hàng
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của khách hàng cần cập nhật
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: ID không hợp lệ hoặc định dạng email sai
 *       404:
 *         description: Không tìm thấy khách hàng
 *       500:
 *         description: Lỗi server
 */
router.put(
  "/update-profile/:id",
  [authMiddleware],
  customerController.updateProfile
);

/**
 * @swagger
 * /customer/voucher/{id}:
 *   get:
 *     summary: Lấy danh sách voucher của khách hàng
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của khách hàng
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trả về danh sách voucher của khách hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Voucher'
 *       404:
 *         description: Không tìm thấy voucher nào
 *       500:
 *         description: Lỗi server
 */
router.get("/voucher/:id", customerController.getListVoucherById);
module.exports = router;
