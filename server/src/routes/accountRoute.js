const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const accountController = require("../controllers/account.controller")

//CRUD Account
router.get("/getall", accountController.getAllAccounts);
router.get("/account/:id", accountController.getAccountById);
router.post("/create", accountController.createAccount);
router.put("/update/:id", accountController.updateAccount);
router.delete("/delete/:id", accountController.deleteAccount);

//Athorization
// router.post("/register", accountController.registerAccount);
// router.post("/login", accountController.loginAccount);
// router.post("/logout", [authMiddleware], accountController.logOutAccount);
// router.post("/forgot-password", accountController.forgotPassword);
// router.get("/user-profile", [authMiddleware], accountController.getUserProfile);
// router.put("/change-password", [authMiddleware], accountController.changePassword);
// router.post("/verify-otp", accountController.verifyOTP)
// router.put("/reset-password", accountController.resetPassword)
// router.post("/refresh-token", accountController.refreshToken);

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and account management
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - password
 *               - phone
 *               - fullName
 *               - gender
 *               - dob
 *             properties:
 *               email:
 *                 type: string
 *                 example: "hieubthe173123@fpt.edu.vn"
 *               username:
 *                 type: string
 *                 example: "kien2003"
 *               password:
 *                 type: string
 *                 example: "kien2003"
 *               phone:
 *                 type: string
 *                 example: "0387663892"
 *               fullName:
 *                 type: string
 *                 example: "Pham Duy Kien"
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 example: "male"
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: "2003/10/28"
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request, invalid input.
 */
router.post("/register", accountController.registerAccount);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "customer"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful, returns access token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 refreshToken:
 *                   type: string
 *                   example: "d1f6c3b4e5a7..."
 *       400:
 *         description: Bad request, missing username or password.
 *       401:
 *         description: Unauthorized, invalid credentials.
 */
router.post("/login", accountController.loginAccount);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user and invalidate refresh token
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - re_token
 *             properties:
 *               re_token:
 *                 type: string
 *                 example: "d1f6c3b4e5a7..."
 *     responses:
 *       200:
 *         description: Logout successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout successful"
 *       400:
 *         description: Token is missing or invalid.
 *       500:
 *         description: Server error while logging out.
 */
router.post("/logout", [authMiddleware], accountController.logOutAccount);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request a password reset OTP
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "kiend1364@gmail.com"
 *     responses:
 *       200:
 *         description: OTP has been sent to the provided email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP has been sent to your email"
 *       400:
 *         description: Email is missing.
 *       404:
 *         description: Email does not exist.
 *       500:
 *         description: Error while sending OTP.
 */
router.post("/forgot-password", accountController.forgotPassword);

/**
 * @swagger
 * /auth/user-profile:
 *   get:
 *     summary: Get user profile information
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Get information successfully !!"
 *                 profile:
 *                   type: object
 *                   example:
 *                     fullName: "Pham Duy Kien"
 *                     email: "kiend1364@gmail.com"
 *                     phone: "0387663892"
 *                     gender: "male"
 *                     dob: "2003-10-28"
 *       400:
 *         description: ID not found from token.
 *       404:
 *         description: User does not exist.
 *       500:
 *         description: Error retrieving information.
 */
router.get("/user-profile", [authMiddleware], accountController.getUserProfile);

/**
 * @swagger
 * /auth/change-password:
 *   put:
 *     summary: Change user password
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: "123456"
 *               newPassword:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password changed successfully"
 *       400:
 *         description: Invalid old password or missing fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid old password"
 *       401:
 *         description: Unauthorized, token required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error changing password"
 */
router.put("/change-password", [authMiddleware], accountController.changePassword);

/**
 * @swagger
 * /auth/verify-otp:
 *   post:
 *     summary: Verify OTP for password reset
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - otp
 *             properties:
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP is valid, proceed to reset password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Valid OTP, please enter new password"
 *       400:
 *         description: OTP is incorrect or expired.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP is incorrect or expired"
 *       500:
 *         description: Server error while verifying OTP.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error while verifying OTP"
 */
router.post("/verify-otp", accountController.verifyOTP);

/**
 * @swagger
 * /auth/reset-password:
 *   put:
 *     summary: Reset user password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "kiend1364@gmail.com"
 *               newPassword:
 *                 type: string
 *                 example: "newpassword123"
 *               confirmPassword:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password changed successfully!"
 *       400:
 *         description: Missing or incorrect information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Confirmed password does not match"
 *       404:
 *         description: Account not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Account not found"
 *       500:
 *         description: Server error while changing password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error changing password"
 */
router.put("/reset-password", accountController.resetPassword);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token using refresh token
 *     tags: [Authentication]
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         required: true
 *         schema:
 *           type: string
 *         example: "refreshTokenCheck"
 *         description: "A required API key to validate the request"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "your_refresh_token_here"
 *     responses:
 *       200:
 *         description: Token refreshed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token refreshed successfully"
 *                 accessToken:
 *                   type: string
 *                   example: "new_access_token_here"
 *                 refreshToken:
 *                   type: string
 *                   example: "your_refresh_token_here"
 *       400:
 *         description: Refresh token is required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Refresh token is required"
 *       403:
 *         description: Access denied or invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access denied"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */
router.post("/refresh-token", accountController.refreshToken);




module.exports = router;