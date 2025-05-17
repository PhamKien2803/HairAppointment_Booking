const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Lấy danh sách dịch vụ có thể lọc
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: Danh sách dịch vụ
 */
router.get("/", serviceController.getFilteredServices);

/**
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Lấy thông tin dịch vụ theo ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin chi tiết của dịch vụ
 */
router.get("/:id", serviceController.getServiceById);

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Tạo dịch vụ mới
 *     tags: [Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               duration:
 *                 type: number
 *               description:
 *                 type: string
 *               branchId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Dịch vụ được tạo thành công
 */
router.post("/", serviceController.createService);

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Cập nhật dịch vụ theo ID
 *     tags: [Services]
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
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               duration:
 *                 type: number
 *               description:
 *                 type: string
 *               branchId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */

router.put("/:id", serviceController.updateService);

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Xóa dịch vụ theo ID
 *     tags: [Services]
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
router.delete("/:id", serviceController.deleteService);

module.exports = router;