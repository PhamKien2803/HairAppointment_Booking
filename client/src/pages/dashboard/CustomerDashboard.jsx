import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  AppBar,
  Toolbar,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProfileCustomer from "../customer/ProfileCustomer";
import { getUserFromToken } from "../../helper/authHelper";
import axiosInstance from "../../helper/axiosInstance";

const CustomerDashboard = () => {
  const [appointments, setAppointments] = useState([]); // Khởi tạo appointments là mảng rỗng
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  console.log("🚀 ~ CustomerDashboard ~ user:", user)

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

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (!user) return; // Nếu user chưa được xác định, không gọi API

        // Gọi API lấy danh sách lịch hẹn
        const response = await fetch(`http://localhost:9999/appointment/customer/${user}`);
        if (!response.ok) {
          throw new Error("Không thể lấy danh sách lịch hẹn!");
        }
        const data = await response.json();
        console.log("🚀 ~ fetchAppointments ~ data:", data)
        setAppointments(data || []); 
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        alert("Đã xảy ra lỗi khi lấy danh sách lịch hẹn!");
      }
    };

    fetchAppointments();
  }, [user]); 

  // Hàm hủy lịch hẹn
  const handleCancel = async (id) => {
    try {
      const response = await fetch(`http://localhost:9999/appointment/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Không thể hủy lịch hẹn!");
      }

      const result = await response.json();
      console.log(result.message || "Hủy lịch hẹn thành công!");

      // Hiển thị Snackbar thông báo thành công
      setSnackbarOpen(true);

      // Cập nhật danh sách lịch hẹn sau khi xóa
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== id)
      );
    } catch (error) {
      console.error("Lỗi khi hủy lịch hẹn:", error);
      alert("Đã xảy ra lỗi khi hủy lịch hẹn!");
    }
  };

  // Hàm đóng Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Hàm điều hướng đến trang đặt lịch
  const handleAddAppointment = () => {
    navigate("/customer-booking");
  };

  return (
    <Box sx={{ backgroundColor: "#f5e6d9", minHeight: "100vh", color: "#4a2c2a" }}>
      <AppBar position="static" sx={{ backgroundColor: "#8b5a2b", boxShadow: 1 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", color: "#fff" }}>
            💈 Barber Shop - Customer
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ paddingTop: 4, paddingBottom: 4 }}>
        <Grid container spacing={4} alignItems="center">
          {/* ProfileCustomer */}
          <Grid item xs={12} md={4}>
            <ProfileCustomer />
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ mb: 3, color: "#5a3e36" }}>
              📅 Lịch Hẹn Của Bạn
            </Typography>

            {appointments.length === 0 ? (
              <Typography textAlign="center" color="gray">
                Bạn chưa có lịch hẹn nào.
              </Typography>
            ) : (
              appointments.map(({ _id, employeeId, serviceId, appointmentTime, branchId }) => (
                <Card
                  key={_id}
                  sx={{
                    backgroundColor: "#ffffff",
                    color: "#4a2c2a",
                    border: "1px solid #c8a97e",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    borderRadius: "12px",
                    mb: 2,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      👨‍💼 Nhân viên: {employeeId.fullName}
                    </Typography>
                    <Typography>
                      💈 Dịch vụ: {serviceId.map((service) => service.name).join(", ")}
                    </Typography>
                    <Typography>🏢 Chi nhánh: {branchId.name}</Typography>
                    <Typography>
                      ⏰ Thời gian: {new Date(appointmentTime).toLocaleString()}
                    </Typography>
                    <Divider sx={{ my: 2, backgroundColor: "#c8a97e" }} />
                    <Button
                      variant="outlined"
                      startIcon={<Delete />}
                      sx={{ width: "100%", borderRadius: "8px", textTransform: "none", color: "#b22222", borderColor: "#b22222", '&:hover': { backgroundColor: '#b22222', color: '#fff' } }}
                      onClick={() => handleCancel(_id)}
                    >
                      Hủy lịch
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}

            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{
                marginTop: 2,
                backgroundColor: "#c8a97e",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#b3906e",
                },
                fontWeight: "bold",
                borderRadius: "8px",
                textTransform: "none",
                width: "100%",
              }}
              onClick={handleAddAppointment}
            >
              Thêm Lịch Hẹn
            </Button>
          </Grid>
        </Grid>
      </Container>


      {/* Snackbar thông báo */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          Hủy lịch thành công!
        </Alert>
      </Snackbar>

      {/* Footer */}
      <Box sx={{ textAlign: "center", py: 2, backgroundColor: "#c8a97e", color: "#000", fontWeight: "bold" }}>

        © 2025 Barber Shop - Chăm sóc tóc chuyên nghiệp
      </Box>
    </Box>
  );
};

export default CustomerDashboard;