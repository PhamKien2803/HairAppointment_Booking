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
router.post("/register", accountController.registerAccount);
router.post("/login", accountController.loginAccount);
router.post("/logout", [authMiddleware], accountController.logOutAccount);
router.post("/forgot-password", accountController.forgotPassword);
router.get("/user-profile", [authMiddleware], accountController.getUserProfile);
router.put("/change-password", [authMiddleware], accountController.changePassword);
router.post("/verify-otp", accountController.verifyOTP)
router.put("/reset-password", accountController.resetPassword)
router.post("/refresh-token", accountController.refreshToken);






module.exports = router;