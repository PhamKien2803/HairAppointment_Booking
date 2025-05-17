import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { getUserFromToken } from "../../helper/authHelper";
import axiosInstance from "../../helper/axiosInstance";
import { useNavigate } from "react-router-dom";

const InvoicePage = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  console.log("🚀 ~ InvoicePage ~ paymentMethod:", paymentMethod)
  const [voucher, setVoucher] = useState("");
  const [checkedVouchers, setCheckedVouchers] = useState([]);
  console.log("🚀 ~ InvoicePage ~ checkedVouchers:", checkedVouchers)
  const [appliedVouchers, setAppliedVouchers] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const location = useLocation();
  const { branch, barber, services, totalAmount, appointmentTime } = location.state || {};
  const [dialogOpen, setDialogOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();


  // Hàm định dạng ngày giờ để hiển thị
  const formatDateTime = (dateTime) => {
    if (!dateTime) return "Chưa chọn";
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateTime).toLocaleString("en-US", options);
  };

  // Định dạng thời gian đặt lịch
  const formattedTime = formatDateTime(appointmentTime);

  console.log("🚀 ~ InvoicePage ~ formattedTime:", formattedTime);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = getUserFromToken();
        if (!userData || !userData.id) {
          console.error("Không tìm thấy ID account từ token!");
          return;
        }
        const response = await axiosInstance.get(`/auth/user-profile`);
        setUser(response.data.profile._id);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin user:", error);
      }
    };
    fetchUserProfile();
  }, []);

  // Hàm kiểm tra voucher
  const handleCheckVoucher = async () => {
    if (!voucher) {
      setSnackbarMessage("Vui lòng nhập mã voucher!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    // Kiểm tra nếu voucher đã được áp dụng
    if (appliedVouchers.some((v) => v.code === voucher)) {
      setSnackbarMessage("Voucher này đã được áp dụng!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await fetch(`http://localhost:9999/invoice/voucher/${user}/${voucher}`);
      console.log("🚀 ~ handleCheckVoucher ~ response:", response);

      if (!response.ok) {
        throw new Error("Mã voucher không hợp lệ hoặc đã hết hạn!");
      }

      const result = await response.json();
      console.log("🚀 ~ handleCheckVoucher ~ result:", result);

      const discountPercentage = result.discount || 0;
      const voucherId = result._id || "";


      setCheckedVouchers((prev) => [...prev, result]);


      setAppliedVouchers((prev) => [
        ...prev,
        { code: result.code, discount: discountPercentage, id: voucherId },
      ]);

      const discountAmount = (discountPercentage / 100) * totalAmount;
      setDiscount((prev) => prev + discountAmount);

      setSnackbarMessage(`Voucher hợp lệ! Giảm giá: ${discountPercentage}%`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setVoucher("");
    } catch (error) {
      console.error("🚀 ~ handleCheckVoucher ~ error:", error);
      setSnackbarMessage(error.message || "Đã xảy ra lỗi khi kiểm tra voucher!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // Hàm xử lý khi bấm nút "Xác nhận"
  const handleConfirmPayment = async () => {
    try {
      const payload = {
        customerId: user,
        employeeId: barber.id,
        services: services.map((service) => ({ serviceId: service._id })),
        vouchers: appliedVouchers.map((voucher) => ({ voucherId: voucher.id })),
        paymentMethod,
      };
      console.log("🚀 ~ handleConfirmPayment ~ payload:", payload);

      // Gửi yêu cầu POST đến API
      const response = await fetch("http://localhost:9999/invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log("🚀 ~ handleConfirmPayment ~ response:", response);

      if (!response.ok) {
        throw new Error("Đã xảy ra lỗi khi tạo hóa đơn!");
      }

      const result = await response.json();
      console.log("🚀 ~ handleConfirmPayment ~ result:", result);

      // Xử lý theo phương thức thanh toán
      if (paymentMethod === "cash" || paymentMethod === "card") {
        navigate("/customer-dashboard");
      } else if (paymentMethod === "online") {
        setDialogOpen(true);
      }
    } catch (error) {
      console.error("🚀 ~ handleConfirmPayment ~ error:", error);
      setSnackbarMessage(error.message || "Đã xảy ra lỗi khi tạo hóa đơn!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // Hàm đóng Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  const handleDialogConfirm = () => {
    setDialogOpen(false);
    navigate("/customer-dashboard");
  };

  return (
    <Box sx={{ backgroundColor: "#f5e6d9", minHeight: "100vh", color: "#4a2c2a" }}>
      <AppBar position="static" sx={{ backgroundColor: "#8b5a2b", boxShadow: 1 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", color: "#fff" }}>
            💈 Barber Shop - Thanh Toán
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ marginTop: 4, backgroundColor: "#f5e6d9", padding: 3, borderRadius: 2 }}>
        {/* Snackbar thông báo */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>

        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          maxWidth="md"
          fullWidth
          sx={{
            "& .MuiDialog-paper": {
              padding: 4,
              borderRadius: "12px",
              textAlign: "center",
              backgroundColor: "#f8f1e7",
              border: "2px solid #c8a97e",
            },
          }}
        >
          <DialogTitle sx={{ color: "#8b5a2b", fontWeight: "bold" }}>
            🏦 Thông tin tài khoản ngân hàng
          </DialogTitle>

          <DialogContent>
            {/* Ảnh QR Code */}
            <img
              src={"/qr.jpg"}
              alt="Thông tin tài khoản ngân hàng"
              style={{
                width: "35%",
                height: "auto",
                marginTop: "12px",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                marginBottom: "20px",
              }}
            />

            {/* Thông tin tài khoản */}
            <Typography variant="body1" sx={{ color: "#5a3e2b", marginBottom: 1 }}>
              <strong>🏦 Ngân hàng:</strong> BIDV
            </Typography>
            <Typography variant="body1" sx={{ color: "#5a3e2b", marginBottom: 1 }}>
              <strong>💳 Số tài khoản:</strong> 37110001098367
            </Typography>
            <Typography variant="body1" sx={{ color: "#5a3e2b", marginBottom: 2 }}>
              <strong>👤 Chủ tài khoản:</strong> Bùi Trung Hiếu (Founder BarberShop)
            </Typography>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={handleDialogConfirm}
              variant="contained"
              sx={{
                backgroundColor: "#8b5a2b",
                color: "white",
                "&:hover": { backgroundColor: "#6d4427" },
              }}
            >
              ✅ Xác nhận
            </Button>
          </DialogActions>
        </Dialog>


        <Grid container spacing={3}>
          {/* Bên trái: Phương thức thanh toán và voucher */}
          <Grid item xs={12} md={9}>
            <Paper elevation={3} sx={{ padding: 3, height: "100%", backgroundColor: "#ffffff", borderRadius: 2, border: "2px solid #c8a97e" }}>
              <Typography variant="h6" gutterBottom sx={{ color: "#8b5a2b" }}>
                💵 Phương thức thanh toán
              </Typography>

              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel id="payment-method-label">Chọn phương thức</InputLabel>
                <Select
                  labelId="payment-method-label"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  label="Chọn phương thức"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      borderColor: "#c8a97e",
                      "&:hover fieldset": { borderColor: "#a27c5c" },
                      "&.Mui-focused fieldset": { borderColor: "#a27c5c" },
                    },
                  }}
                >
                  <MenuItem value="card">💳 Thẻ tín dụng</MenuItem>
                  <MenuItem value="cash">💵 Tiền mặt</MenuItem>
                  <MenuItem value="online">🏦 Chuyển khoản ngân hàng</MenuItem>
                </Select>
              </FormControl>


              <Divider sx={{ my: 2 }} />

              {/* Voucher */}
              <Typography variant="h6" gutterBottom sx={{ color: "#8b5a2b" }}>
                🎟️ Voucher
              </Typography>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={9}>
                  <TextField
                    label="Nhập mã voucher"
                    value={voucher}
                    onChange={(e) => setVoucher(e.target.value)}
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        borderColor: "#c8a97e",
                        "&:hover fieldset": { borderColor: "#a27c5c" },
                        "&.Mui-focused fieldset": { borderColor: "#a27c5c" },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "#c8a97e",
                      color: "white",
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "#a27c5c" },
                    }}
                    onClick={handleCheckVoucher}
                  >
                    Kiểm tra
                  </Button>
                </Grid>
              </Grid>


              {/* Danh sách voucher đã áp dụng */}
              {/* {appliedVouchers.length > 0 && (
              <Paper elevation={1} sx={{ padding: 2, marginTop: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Voucher đã áp dụng:
                </Typography>
                <ul>
                  {appliedVouchers.map((v, index) => (
                    <li key={index}>
                      {v.code} - Giảm giá: {v.discount}%
                    </li>
                  ))}
                </ul>
              </Paper>
            )} */}
            </Paper>
          </Grid>

          {/* Bên phải: Thông tin thanh toán */}
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ padding: 3, height: "100%", backgroundColor: "#ffffff", borderRadius: 2, border: "2px solid #c8a97e" }}>
              <Typography variant="h6" gutterBottom>
                🧾 Thông tin thanh toán
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Chi nhánh:</strong> {branch?.name + " - " + branch?.address || "Không xác định"}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Thợ cắt tóc:</strong> {barber?.fullName || "Không xác định"}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Dịch vụ:</strong>
                <ul>
                  {services?.map((service) => (
                    <li key={service._id}>
                      {service.name} - {service.price.toLocaleString()} VND
                    </li>
                  ))}
                </ul>
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Thời gian:</strong> {formattedTime}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Voucher:</strong> {appliedVouchers.length > 0 ? appliedVouchers.map(v => v.code).join(", ") : "Không áp dụng"}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Tổng tiền:</strong>{" "}
                {(totalAmount - discount).toLocaleString()} VND
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#8b5a2b",
                  color: "#ffffff",
                  "&:hover": { backgroundColor: "#6d4220" },
                }}
                fullWidth
                onClick={handleConfirmPayment}
              >
                Xác nhận
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default InvoicePage;