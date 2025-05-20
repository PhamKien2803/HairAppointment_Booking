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
  IconButton,
  Select,
  FormControl,
  InputLabel,
  List,
  ListItem,
  Box,
  AppBar,
  Toolbar,
  Avatar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Star from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "../../helper/authHelper";
import axiosInstance from "../../helper/axiosInstance";

const BookingPage = () => {
  const [selectedDateTime, setSelectedDateTime] = useState("");
  console.log("🚀 ~ BookingPage ~ selectedDateTime:", selectedDateTime);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState("");
  console.log("🚀 ~ BookingPage ~ selectedBranch:", selectedBranch);
  const [branches, setBranches] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState("");
  console.log("🚀 ~ BookingPage ~ selectedBarber:", selectedBarber);
  const [services, setServices] = useState([]);
  console.log("🚀 ~ BookingPage ~ services:", services);
  const [selectedServices, setSelectedServices] = useState([]);
  console.log("🚀 ~ BookingPage ~ selectedServices:", selectedServices);
  const [user, setUser] = useState(null);
  console.log("🚀 ~ BookingPage ~ user:", user);

  const navigate = useNavigate();

  const handleBooking = async () => {
    try {
      // Chuẩn bị dữ liệu body
      const body = {
        customerId: user,
        branchId: selectedBranch,
        appointmentTime: `${selectedDateTime}:00.000+00:00`,
        employeeId: selectedBarber,
        serviceId: selectedServices.map((service) => service._id),
      };
      console.log("body", body);

      // Gọi API
      const response = await fetch("http://localhost:9999/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      console.log("🚀 ~ handleBooking ~ response:", response);

      if (!response.ok) {
        throw new Error("Đặt lịch thất bại! Vui lòng thử lại.");
      }

      const result = await response.json();
      console.log("Kết quả đặt lịch:", result);
      navigate("/customer-invoice", {
        state: {
          branch: branches.find((branch) => branch._id === selectedBranch),
          barber: barbers.find((barber) => barber.id === selectedBarber),
          services: selectedServices,
          totalAmount,
          appointmentTime: selectedDateTime,
        },
      });
    } catch (error) {
      alert(error.message || "Đã xảy ra lỗi khi đặt lịch!");
    }
  };
  // Lấy thông tin người dùng
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

  // Lấy danh sách dịch vụ
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:9999/services");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const result = await response.json();
        setServices(result.data || []);
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices([]);
      }
    };

    fetchServices();
  }, []);

  // Lấy danh sách chi nhánh
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch("http://localhost:9999/branches/branch");
        if (!response.ok) {
          throw new Error("Failed to fetch branches");
        }
        const result = await response.json();
        setBranches(result.data || []);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []);

  // Lấy danh sách thợ cắt tóc khả dụng
  useEffect(() => {
    const fetchBarbers = async () => {
      if (!selectedDateTime || !selectedBranch) return;

      try {
        const isoAppointmentTime = `${selectedDateTime}:00.000+00:00`;
        console.log(
          "🚀 ~ fetchBarbers ~ isoAppointmentTime:",
          isoAppointmentTime
        );
        const response = await fetch(
          `http://localhost:9999/appointment/barber-available/${isoAppointmentTime}/${selectedBranch}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch barbers");
        }
        const result = await response.json();
        console.log("🚀 ~ fetchBarbers ~ result:", result);

        setBarbers(result || []);
      } catch (error) {
        console.error("Error fetching barbers:", error);
      }
    };

    fetchBarbers();
  }, [selectedDateTime, selectedBranch]);

  // Hàm định dạng ngày giờ sang định dạng yêu cầu
  // const formatToCustomISO = (dateTime) => {
  //   if (!dateTime) return null;

  //   const date = new Date(dateTime);
  //   const isoString = date.toISOString();
  //   return isoString.replace("Z", "+00:00");
  // };

  // Xử lý khi người dùng chọn ngày và giờ
  const today = new Date();
  const minDateTime = today.toISOString().slice(0, 16);

  // Xử lý khi người dùng chọn ngày và giờ
  const handleDateTimeChange = (e) => {
    setSelectedDateTime(e.target.value);
  };

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

  return (
    <Box
      sx={{ backgroundColor: "#f5e6d9", minHeight: "100vh", color: "#4a2c2a" }}
    >
      <AppBar
        position="static"
        sx={{ backgroundColor: "#8b5a2b", boxShadow: 1 }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: "bold", color: "#fff" }}
          >
            💈 Barber Shop - Đặt Lịch
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="lg"
        sx={{
          marginTop: 4,
          backgroundColor: "#f5e6d9",
          padding: 3,
          borderRadius: 2,
        }}
      >
        {/* Tiêu đề và nút quay lại */}
        <Grid container alignItems="center" sx={{ marginBottom: 3 }}>
          <Grid item>
            <IconButton
              onClick={() => navigate(-1)}
              sx={{ marginRight: 2, color: "#8b5a2b" }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ color: "#8b5a2b" }}
            >
              Đặt lịch hẹn cắt tóc
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Phần chọn chi nhánh, ngày giờ và thợ cắt tóc */}
          <Grid item xs={12} md={9}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                height: "100%",
                backgroundColor: "#ffffff",
                borderRadius: 2,
                border: "2px solid #c8a97e",
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: "#8b5a2b" }}>
                🏢 Chi nhánh
              </Typography>

              {/* Dropdown chọn chi nhánh */}
              <FormControl fullWidth sx={{ marginBottom: 2, marginTop: 1 }}>
                <InputLabel id="branch-select-label" sx={{ color: "black" }}>
                  Chọn Chi Nhánh
                </InputLabel>
                <Select
                  labelId="branch-select-label"
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  label="Chọn Chi Nhánh"
                >
                  {branches.map((branch) => (
                    <MenuItem key={branch._id} value={branch._id}>
                      {branch.name} - {branch.address}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Hiển thị thông tin chi nhánh đã chọn */}
              {selectedBranch && (
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  <strong>Số điện thoại:</strong>{" "}
                  {
                    branches.find((branch) => branch._id === selectedBranch)
                      ?.phone
                  }
                </Typography>
              )}

              <Divider sx={{ my: 2 }} />

              {/* Chọn ngày và giờ */}
              <Typography variant="h6" gutterBottom sx={{ color: "#8b5a2b" }}>
                📅 Chọn Ngày và Giờ
              </Typography>
              <TextField
                type="datetime-local"
                value={selectedDateTime}
                onChange={handleDateTimeChange}
                fullWidth
                sx={{ marginBottom: 2, color: "black" }}
                inputProps={{
                  min: minDateTime,
                }}
              />

              <Divider sx={{ my: 2 }} />

              {/* Dropdown chọn thợ cắt tóc */}
              <Typography variant="h6" gutterBottom sx={{ color: "#8b5a2b" }}>
                ✂️ Chọn Thợ Cắt Tóc
              </Typography>
              {barbers.length > 0 ? (
                <FormControl fullWidth sx={{ marginBottom: 2, marginTop: 1 }}>
                  <InputLabel id="barber-select-label">Chọn Thợ</InputLabel>
                  <Select
                    labelId="barber-select-label"
                    value={selectedBarber}
                    onChange={(e) => setSelectedBarber(e.target.value)}
                    label="Chọn Thợ"
                  >
                    {barbers.map((barber) => (
                      <MenuItem key={barber.id} value={barber.id}>
                        {barber.fullName}
                      </MenuItem>
                    ))}
                  </Select>

                  {/* Hiển thị thông tin chi tiết của thợ đã chọn */}
                  {selectedBarber && (
                    <Paper
                      elevation={3}
                      sx={{
                        padding: 2,
                        backgroundColor: "#f5e6d9",
                        borderRadius: 2,
                        border: "1px solid #c8a97e",
                        marginTop: 2,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {/* Ảnh đại diện của thợ */}
                      <Avatar
                        src={
                          barbers.find((b) => b.id === selectedBarber)
                            ?.avatar || "/default-avatar.png"
                        }
                        alt="Barber Avatar"
                        sx={{
                          width: 56,
                          height: 56,
                          marginRight: 2,
                          border: "2px solid #c8a97e",
                        }}
                      />

                      {/* Thông tin chi tiết */}
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{ color: "#8b5a2b", marginBottom: 1 }}
                        >
                          ✂️ Thông tin thợ cắt tóc
                        </Typography>
                        <Typography variant="body1">
                          <strong>Họ và tên:</strong>{" "}
                          {barbers.find((b) => b.id === selectedBarber)
                            ?.fullName || "Không xác định"}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Giới tính:</strong>{" "}
                          {barbers.find((b) => b.id === selectedBarber)
                            ?.gender === "male"
                            ? "Nam"
                            : "Nữ"}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <strong>Số sao:</strong>
                          {Array.from({ length: 5 }).map((_, index) => {
                            const starCount =
                              barbers.find((b) => b.id === selectedBarber)
                                ?.star || 0;
                            return index < starCount ? (
                              <Star key={index} sx={{ color: "#FFD700" }} />
                            ) : (
                              <StarBorder
                                key={index}
                                sx={{ color: "#FFD700" }}
                              />
                            );
                          })}
                        </Typography>
                      </Box>
                    </Paper>
                  )}
                </FormControl>
              ) : (
                <Typography
                  variant="body1"
                  color="error"
                  sx={{ marginBottom: 2 }}
                >
                  Không có thợ rảnh vào thời gian này.
                </Typography>
              )}

              <Divider sx={{ my: 2 }} />

              {/* Chọn dịch vụ */}
              <Typography variant="h6" gutterBottom>
                📋 Chọn Dịch Vụ
              </Typography>
              <TextField
                select
                label="Chọn dịch vụ"
                value=""
                onChange={(e) => {
                  const serviceId = e.target.value;
                  const selectedService = services.find(
                    (s) => s._id === serviceId
                  );
                  if (
                    selectedService &&
                    !selectedServices.some((s) => s._id === serviceId)
                  ) {
                    setSelectedServices((prevSelected) => [
                      ...prevSelected,
                      selectedService,
                    ]);
                    setTotalAmount(
                      (prevTotal) => prevTotal + selectedService.price
                    );
                  }
                }}
                fullWidth
                sx={{ marginBottom: 2, marginTop: 1 }}
              >
                {services.map((service) => (
                  <MenuItem key={service._id} value={service._id}>
                    {service.name} - {service.price.toLocaleString()} VND
                  </MenuItem>
                ))}
              </TextField>

              {/* Hiển thị danh sách dịch vụ đã chọn */}
              {selectedServices.length > 0 && (
                <Paper
                  elevation={2}
                  sx={{
                    padding: 2,
                    backgroundColor: "#f5e6d9",
                    borderRadius: 2,
                    border: "1px solid #c8a97e",
                    marginTop: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "#8b5a2b", marginBottom: 1 }}
                  >
                    🛠 Dịch vụ đã chọn
                  </Typography>

                  <List>
                    {selectedServices.map((service) => (
                      <ListItem
                        key={service._id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: 1,
                          borderRadius: 1,
                          backgroundColor: "#ffffff",
                          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                          marginBottom: 1,
                          "&:hover": { backgroundColor: "#f3d9b1" },
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 500, color: "#8b5a2b" }}
                        >
                          {service.name} - {service.price.toLocaleString()} VND
                        </Typography>
                        <Button
                          size="small"
                          sx={{
                            backgroundColor: "#d9534f",
                            color: "#ffffff",
                            "&:hover": { backgroundColor: "#c9302c" },
                          }}
                          onClick={() => {
                            setSelectedServices((prevSelected) =>
                              prevSelected.filter((s) => s._id !== service._id)
                            );
                            setTotalAmount(
                              (prevTotal) => prevTotal - service.price
                            );
                          }}
                        >
                          Xóa
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </Paper>
          </Grid>

          {/* Phần thông tin đặt chỗ */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                height: "100%",
                backgroundColor: "#ffffff",
                borderRadius: 2,
                border: "2px solid #c8a97e",
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: "#8b5a2b" }}>
                🧾 Thông tin đặt lịch
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Chi nhánh:</strong>{" "}
                {branches.find((branch) => branch._id === selectedBranch)
                  ?.name || "Chưa chọn"}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Ngày và Giờ:</strong> {formatDateTime(selectedDateTime)}
              </Typography>
              <Typography variant="body1">
                <strong>Thợ Cắt Tóc:</strong>{" "}
                {barbers.find((barber) => barber.id === selectedBarber)
                  ?.fullName || "Chưa chọn"}
              </Typography>
              <Typography variant="h6" sx={{ color: "#8b5a2b", marginTop: 3 }}>
                <strong>Tổng tiền:</strong> {totalAmount.toLocaleString()} VND
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
                onClick={handleBooking}
              >
                Xác Nhận
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BookingPage;
