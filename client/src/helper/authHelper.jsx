import CryptoJS from "crypto-js";
import { jwtDecode } from "jwt-decode";

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

const decryptData = (encryptedData) => {
  if (!encryptedData || typeof encryptedData !== "string") {
    console.error("❌ Dữ liệu cần giải mã bị null, undefined hoặc không phải chuỗi!");
    return null;
  }

  try {
    const parts = encryptedData.split(":");
    if (parts.length !== 2) {
      console.error("❌ Dữ liệu mã hóa không đúng định dạng 'iv:encryptedText'");
      return null;
    }

    const [ivHex, encryptedText] = parts;
    const key = CryptoJS.enc.Hex.parse(ENCRYPTION_KEY);
    const iv = CryptoJS.enc.Hex.parse(ivHex);

    const decrypted = CryptoJS.AES.decrypt(encryptedText, key, { iv });
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

    if (!decryptedText) {
      console.error("❌ Không thể giải mã dữ liệu hoặc kết quả rỗng!");
      return null;
    }

    return JSON.parse(decryptedText);
  } catch (error) {
    console.error("❌ Lỗi khi giải mã dữ liệu:", error);
    return null;
  }
};

export const getUserFromToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token || typeof token !== "string") {
    console.warn("⚠️ Không tìm thấy accessToken trong localStorage!");
    return null;
  }

  try {
    // Kiểm tra định dạng JWT
    const parts = token.split(".");
    if (parts.length !== 3) {
      console.error("❌ Token không hợp lệ: không phải định dạng JWT");
      return null;
    }

    const decodedJWT = jwtDecode(token);
    if (!decodedJWT || typeof decodedJWT !== "object") {
      console.error("❌ Không thể decode JWT hoặc không đúng định dạng object");
      return null;
    }

    if (!decodedJWT.data) {
      console.warn("⚠️ Token không chứa field 'data' mã hóa!");
      return null;
    }

    console.log("✅ Token đã decode (trước giải mã):", decodedJWT);

    const userData = decryptData(decodedJWT.data);

    console.log("✅ User sau giải mã:", userData);
    return userData || null;
  } catch (error) {
    console.error("❌ Lỗi xử lý token:", error);
    return null;
  }
};
