import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  MenuItem,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const AddSlotsToWorkSchedule = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeWorkSchedule, setSelectedEmployeeWorkSchedule] =
    useState("");
  const [selectedDate, setSelectedDate] = useState("");
  console.log("🚀 ~ AddSlotsToWorkSchedule ~ selectedDate:", selectedDate);
  const [startTime, setStartTime] = useState("");
  console.log("🚀 ~ AddSlotsToWorkSchedule ~ startTime:", startTime);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch danh sách thợ cắt tóc
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9999/employees/workScheduleId"
        );
        const barbers = response.data.data.filter(
          (emp) => emp.position === "barber"
        );
        setEmployees(barbers);
      } catch (error) {
        console.error("Lỗi khi tải danh sách nhân viên:", error);
        setError("Không thể tải danh sách nhân viên. Vui lòng thử lại.");
      }
    };

    fetchEmployees();
  }, []);

  // Xử lý khi submit form
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Kiểm tra dữ liệu đầu vào
    if (!selectedEmployeeWorkSchedule || !selectedDate || !startTime) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Chuyển đổi selectedDate thành thứ trong tuần
      const day = new Date(selectedDate).toISOString().split("T")[0];
      console.log(
        "🛠️ Selected Employee Work Schedule ID:",
        selectedEmployeeWorkSchedule
      );

      console.log("🛠️ day:", day);

      console.log("🛠️ startTime:", startTime);

      // Gửi dữ liệu lên server
      await axios.post(
        `http://localhost:9999/workschedule/${selectedEmployeeWorkSchedule}/slots`,
        { day, startTime }
      );

      alert("Thêm slot thành công");
      // Reset form sau khi thêm thành công
      setSelectedEmployee("");
      setSelectedDate("");
      setStartTime("");
    } catch (error) {
      console.error("Lỗi khi thêm slot:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Thêm Slot Làm Việc
        </Typography>
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Chọn thợ cắt tóc */}
            <Grid item xs={12}>
              <TextField
                select
                label="Chọn Thợ Cắt Tóc"
                fullWidth
                value={selectedEmployeeWorkSchedule}
                onChange={(e) =>
                  setSelectedEmployeeWorkSchedule(e.target.value)
                }
                required
              >
                {employees.map((emp) => (
                  <MenuItem key={emp._id} value={emp.workScheduleId}>
                    {emp.fullName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Chọn ngày làm việc */}
            <Grid item xs={6}>
              <TextField
                label="Chọn Ngày Làm Việc"
                type="date"
                fullWidth
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  min: new Date().toISOString().split("T")[0], // Chỉ cho phép chọn ngày từ hôm nay trở đi
                }}
                required
              />
            </Grid>

            {/* Chọn giờ bắt đầu */}
            <Grid item xs={6}>
              <TextField
                label="Giờ Bắt Đầu"
                type="time"
                fullWidth
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            {/* Nút submit */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Thêm Slot"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddSlotsToWorkSchedule;
