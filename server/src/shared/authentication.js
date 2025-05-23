const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const mongoose = require('mongoose');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const decryptData = (encryptedData, context) => {
    try {
        if (!ENCRYPTION_KEY) {
            context.error("ENCRYPTION_KEY is not defined in environment variables.");
            return null;
        }
        const key = CryptoJS.enc.Hex.parse(ENCRYPTION_KEY);
        if (typeof encryptedData !== 'string' || encryptedData.indexOf(':') === -1) {
            context.error(`Invalid encrypted data format: ${encryptedData}`);
            return null;
        }
        const [ivHex, encryptedText] = encryptedData.split(":");

        const iv = CryptoJS.enc.Hex.parse(ivHex);
        const decrypted = CryptoJS.AES.decrypt(encryptedText, key, { iv });

        const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
        if (!decryptedString) {
            context.error("Decryption resulted in empty string.");
            return null;
        }
        return JSON.parse(decryptedString);
    } catch (error) {
        context.error(`Error decrypting data: ${error.message}`);
        return null;
    }
};

/**
 * Hàm xác thực request cho Azure Functions, thay thế Express middleware.
 * @param {import('@azure/functions').HttpRequest} request - Đối tượng request từ Azure Function.
 * @param {import('@azure/functions').InvocationContext} context - Đối tượng context từ Azure Function.
 * @returns {{status: number, jsonBody: object} | null} - Trả về response lỗi nếu xác thực thất bại, ngược lại trả về null.
 */
const authenticate = (request, context) => {
    try {
        const authorizationHeader = request.headers.authorization;
        context.log("Authorization Header:", authorizationHeader);

        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
            return { status: 401, jsonBody: { message: "Bạn chưa đăng nhập" } };
        }

        const token = authorizationHeader.split(" ")[1];
        context.log("Token:", token);

        let decoded;
        try {
            if (!JWT_SECRET_KEY) {
                context.error("JWT_SECRET_KEY is not defined in environment variables.");
                return { status: 500, jsonBody: { message: "Lỗi server: JWT secret key không được cấu hình." } };
            }
            decoded = jwt.verify(token, JWT_SECRET_KEY);
        } catch (err) {
            context.error(`Token verification error: ${err.message}`);
            if (err.name === 'TokenExpiredError') {
                return { status: 403, jsonBody: { message: "Token đã hết hạn" } };
            }
            return { status: 403, jsonBody: { message: "Token không hợp lệ" } };
        }

        context.log("Decoded trước giải mã:", decoded);
        const decryptedData = decryptData(decoded.data, context);
        context.log("Decoded sau giải mã:", decryptedData);
        if (!decryptedData || !decryptedData.id || !mongoose.Types.ObjectId.isValid(decryptedData.id)) {
            context.log("ID không hợp lệ hoặc giải mã thất bại:", decryptedData?.id);
            return { status: 400, jsonBody: { message: "Token không chứa ID hợp lệ hoặc dữ liệu giải mã bị lỗi" } };
        }

        request.account = { id: decryptedData.id, role: decryptedData.role };

        return null;
    } catch (error) {
        context.error(`Lỗi trong authenticate helper: ${error.message}`);
        return { status: 401, jsonBody: { message: "Lỗi xác thực", error: error.message } };
    }
};

module.exports = authenticate;