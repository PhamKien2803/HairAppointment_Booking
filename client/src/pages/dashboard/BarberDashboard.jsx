import React from "react";
import { Box, Card, CardContent, Typography, Button, Avatar, AppBar, Toolbar, Container } from "@mui/material";
import { CalendarToday, Logout } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BarberDashboard = () => {
  const navigate = useNavigate();

  const handleViewSchedule = () => {
    navigate("/barber-schedule");
  };
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <Box sx={{ backgroundColor: "#f5e6d9", minHeight: "100vh" }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: "#8b5a2b", paddingY: 1 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
            ✂️ Barber Shop
          </Typography>
          <Box>
            <Button sx={{ color: "#fff", fontWeight: "bold" }}>Trang chủ</Button>
            <Button sx={{ color: "#fff", fontWeight: "bold" }}>Dịch vụ</Button>
            <Button sx={{ color: "#fff", fontWeight: "bold" }}>Lịch làm việc</Button>
            <Button sx={{ color: "#fff", fontWeight: "bold" }}>Liên hệ</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Banner */}
      <Box
        sx={{
          width: "100%",
          height: "250px",
          backgroundImage: 'url("/barber-banner.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Chào mừng đến với Barber Shop!
        </Typography>
      </Box>

      {/* Nội dung chính */}
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", paddingY: 4 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Card
            sx={{
              maxWidth: 500,
              backgroundColor: "#ffffff",
              color: "#8b5a2b",
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
              borderRadius: "16px",
              padding: 3,
              textAlign: "center",
              border: "2px solid #c8a97e",
            }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Avatar
                src="/barber-avatar.png"
                sx={{
                  width: 140,
                  height: 140,
                  margin: "auto",
                  border: "4px solid #c8a97e",
                  boxShadow: "0px 0px 10px rgba(200, 169, 126, 0.5)",
                }}
              />
            </motion.div>
            <CardContent>
              <Typography variant="h5" fontWeight="bold">
                ✂️ Barber Nguyễn Văn A
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#8b5a2b" }}>
                Chuyên gia tạo kiểu tóc nam
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                📍 Chi nhánh: Barber Shop Quận 1
              </Typography>
              <Typography variant="body1">📞 Số điện thoại: 0901 234 567</Typography>

              {/* Nút Xem lịch làm việc */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  startIcon={<CalendarToday />}
                  sx={{
                    marginTop: 3,
                    backgroundColor: "#8b5a2b",
                    color: "#fff",
                    '&:hover': {
                      backgroundColor: "#754922",
                    },
                    fontWeight: "bold",
                    borderRadius: "8px",
                    textTransform: "none",
                    width: "100%",
                  }}
                  onClick={handleViewSchedule}
                >
                  Xem lịch làm việc
                </Button>
              </motion.div>
              {/* Nút Đăng xuất */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outlined"
                  startIcon={<Logout />}
                  sx={{
                    marginTop: 2,
                    color: "#8b5a2b",
                    borderColor: "#8b5a2b",
                    '&:hover': {
                      backgroundColor: "#8b5a2b",
                      color: "#fff",
                    },
                    fontWeight: "bold",
                    borderRadius: "8px",
                    textTransform: "none",
                    width: "100%",
                  }}
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#8b5a2b", color: "#fff", textAlign: "center", paddingY: 3 }}>
        <Typography variant="body1" fontWeight="bold">📍 Barber Shop Yên Bái</Typography>
        <Typography variant="body2">📞 Hotline: 0901 234 567</Typography>
        <Typography variant="body2">📧 Email: hieufounder@gmail.com</Typography>
        <Typography variant="body2">© 2025 Barber Shop | All Rights Reserved</Typography>
      </Box>
    </Box>
  );
};

export default BarberDashboard;
