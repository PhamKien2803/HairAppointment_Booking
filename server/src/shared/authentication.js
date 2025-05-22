const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const mongoose = require('mongoose');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

/**
 * Decrypts data using AES.
 * @param {string} encryptedData - The encrypted string in "ivHex:encryptedText" format.
 * @param {import('@azure/functions').InvocationContext} context - Azure Function context for logging.
 * @returns {object | null} - The decrypted object or null if decryption fails.
 */
const decryptData = (encryptedData, context) => {
    try {
        if (!ENCRYPTION_KEY) {
            context.error("ENCRYPTION_KEY is not defined in environment variables.");
            return null;
        }
        const key = CryptoJS.enc.Hex.parse(ENCRYPTION_KEY);

        if (typeof encryptedData !== 'string' || encryptedData.indexOf(':') === -1) {
            context.error(`Invalid encrypted data format. Expected "ivHex:encryptedText", got: ${encryptedData}`);
            return null;
        }
        const parts = encryptedData.split(":");
        if (parts.length !== 2) {
            context.error(`Invalid encrypted data format. Expected "ivHex:encryptedText", got: ${encryptedData}`);
            return null;
        }
        const ivHex = parts[0];
        const encryptedText = parts[1];

        if (!ivHex || !encryptedText) {
            context.error(`Invalid encrypted data components. IV or Ciphertext is missing from: ${encryptedData}`);
            return null;
        }

        const iv = CryptoJS.enc.Hex.parse(ivHex);
        const decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
        if (!decryptedString) {
            context.error("Decryption resulted in an empty string. This might indicate an incorrect key, IV, or corrupted data.");
            return null;
        }
        return JSON.parse(decryptedString);
    } catch (error) {
        context.error(`Error decrypting data: ${error.message}. Input was: ${encryptedData.substring(0, 50)}...`); // Log part of input for context
        return null;
    }
};

/**
 * Authenticates a request for Azure Functions.
 * @param {import('@azure/functions').HttpRequest} request - The HTTP request object.
 * @param {import('@azure/functions').InvocationContext} context - The Azure Function invocation context.
 * @returns {{status: number, jsonBody: object} | null} - An error response if authentication fails, otherwise null.
 */
const authenticate = (request, context) => {
    try {
        context.log("Starting authentication process...");

        const authorizationHeader = request.headers.authorization;
        context.log("All request headers (lowercased by Azure runtime):", JSON.stringify(request.headers, null, 2));
        context.log("Attempting to read 'authorization' header. Value:", authorizationHeader);

        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
            context.log("Authentication failed: Missing or malformed Authorization header.");
            if (!authorizationHeader) {
                context.log("Reason: 'authorization' header is missing or falsy.");
            } else {
                context.log("Reason: 'authorization' header does not start with 'Bearer '. Actual value:", authorizationHeader);
            }
            return { status: 401, jsonBody: { message: "Bạn chưa đăng nhập. Vui lòng cung cấp token hợp lệ." } }; // "You are not logged in. Please provide a valid token."
        }

        const token = authorizationHeader.split(" ")[1];
        context.log("Token extracted:", token ? "**** (token present)" : " (token missing after split)"); // Avoid logging the full token for security

        if (!token) {
            context.log("Authentication failed: Token is missing after splitting the Authorization header.");
            return { status: 401, jsonBody: { message: "Token không hợp lệ hoặc bị thiếu." } }; // "Token is invalid or missing."
        }

        let decodedJwtPayload;
        try {
            if (!JWT_SECRET_KEY) {
                context.error("JWT_SECRET_KEY is not defined in environment variables. Cannot verify token.");
                return { status: 500, jsonBody: { message: "Lỗi server: JWT secret key không được cấu hình." } }; // "Server error: JWT secret key is not configured."
            }
            decodedJwtPayload = jwt.verify(token, JWT_SECRET_KEY);
        } catch (err) {
            context.error(`Token verification error: ${err.message}. Token: ${token.substring(0, 10)}... (partial)`);
            if (err.name === 'TokenExpiredError') {
                return { status: 403, jsonBody: { message: "Token đã hết hạn." } }; // "Token has expired."
            }
            if (err.name === 'JsonWebTokenError') {
                return { status: 403, jsonBody: { message: "Token không hợp lệ." } }; // "Token is invalid."
            }
            return { status: 403, jsonBody: { message: "Xác thực token thất bại." } }; // "Token authentication failed."
        }

        context.log("Token decoded (JWT payload before decryption):", JSON.stringify(decodedJwtPayload, null, 2)); // Be mindful of sensitive data in logs

        if (!decodedJwtPayload.data) {
            context.error("Decoded JWT payload does not contain 'data' field for decryption.");
            return { status: 400, jsonBody: { message: "Token không chứa dữ liệu được mã hóa cần thiết." } }; // "Token does not contain necessary encrypted data."
        }

        const decryptedAccountData = decryptData(decodedJwtPayload.data, context);
        context.log("Data after decryption:", decryptedAccountData ? JSON.stringify(decryptedAccountData, null, 2) : " (decryption failed or returned null)");

        if (!decryptedAccountData || !decryptedAccountData.id || !mongoose.Types.ObjectId.isValid(decryptedAccountData.id)) {
            context.log("Invalid ID or decryption failed. Decrypted ID:", decryptedAccountData ? decryptedAccountData.id : "N/A");
            return { status: 400, jsonBody: { message: "Token không chứa ID người dùng hợp lệ hoặc dữ liệu giải mã bị lỗi." } }; // "Token does not contain a valid user ID or decrypted data is corrupted."
        }

        request.account = { id: decryptedAccountData.id, role: decryptedAccountData.role };
        context.log("Authentication successful. User ID:", request.account.id, "Role:", request.account.role);

        return null;
    } catch (error) {
        context.error(`Unexpected error in authenticate helper: ${error.message}`, error.stack);
        return { status: 500, jsonBody: { message: "Lỗi xác thực không mong muốn.", error: error.message } }; // "Unexpected authentication error."
    }
};

module.exports = authenticate;
