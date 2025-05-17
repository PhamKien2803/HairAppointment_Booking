
import CryptoJS from "crypto-js";

// Hàm giải mã dữ liệu
const decryptData = (encryptedData) => {
    const key = CryptoJS.enc.Hex.parse(import.meta.env.VITE_ENCRYPTION_KEY); // Sử dụng VITE_ để truy cập biến môi trường
    const [ivHex, encryptedText] = encryptedData.split(":");
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const decrypted = CryptoJS.AES.decrypt(encryptedText, key, { iv });

    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
};


// Giải mã JWT token
const getDecodedToken = (token) => {
    try {
        const base64Url = token.split('.')[1]; // Lấy phần payload của token
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Chuyển đổi base64Url thành base64 chuẩn
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const decoded = JSON.parse(jsonPayload); // Giải mã payload
        const decryptedData = decryptData(decoded.data); // Giải mã phần "data"
        return decryptedData; // Trả về dữ liệu đã giải mã
    } catch (error) {
        console.error("Token decode error:", error);
        return null;
    }
};

export { getDecodedToken };