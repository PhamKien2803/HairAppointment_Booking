import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment-timezone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
const localizer = momentLocalizer(moment);
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getUserFromToken } from "../../helper/authHelper";

const BarberSchedule = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9999/appointment")
      .then((res) => res.json())
      .then((response) => {
        const events = response.data
          .map((appt) => {
            const serviceName = appt.serviceId?.name || "N/A";
            const customerName = appt.customerId?.fullName || "N/A";
            const employeeName = appt.employeeId?.fullName || "N/A";
            const branchName = appt.branchId?.name || "N/A";
            const phone = appt.customerId?.phone || "N/A";
            const status = appt.status || "N/A";
            const duration = appt.serviceId?.duration || "N/A";
            const description = appt.serviceId?.description || "N/A";

            const startDate = moment.utc(appt.appointmentTime).toDate();
            const endDate = moment
              .utc(appt.appointmentTime)
              .local()
              .add(60, "minutes")
              .toDate();

            if (isNaN(startDate.getTime())) {
              console.error("Invalid date for appointment:", appt);
              return null;
            }

            return {
              id: appt._id,
              title: `${serviceName} - ${customerName}`,
              start: startDate,
              end: endDate,
              customer: customerName,
              phone: phone,
              service: serviceName,
              employee: employeeName,
              branch: branchName,
              status: status,
              duration: duration,
              description: description,
            };
          })
          .filter((event) => event !== null);

        setAppointments(events);
      })
      .catch((err) => console.error("Error fetching appointments:", err));
  }, []);

  const filteredAppointments = appointments.filter((event) =>
    selectedDate ? moment(event.start).isSame(selectedDate, "day") : false
  );

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const eventPropGetter = (event) => ({
    style: {
      backgroundColor: "#8b5a2b",
      color: "#ffffff",
      borderRadius: "5px",
      padding: "5px",
      cursor: "pointer",
    },
  });

  const EventComponent = ({ event }) => (
    <div>
      <strong>{event.title}</strong>
    </div>
  );

  return (
    <Container
      maxWidth="xl"
      sx={{ backgroundColor: "#f5e6d9", minHeight: "100vh", py: 4 }}
    >
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
          <Typography variant="h4" fontWeight="bold" sx={{ color: "#8b5a2b" }}>
            Lịch làm việc của bạn
          </Typography>
        </Grid>
      </Grid>

      {/* Chọn ngày */}
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <Typography sx={{ fontWeight: "bold", color: "#8b5a2b" }}>
          Chọn ngày:
        </Typography>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="border p-2 rounded"
          dateFormat="dd/MM/yyyy"
        />
      </Box>

      <Grid container spacing={3}>
        {/* Lịch làm việc */}
        <Grid item xs={8}>
          <Card sx={{ backgroundColor: "#ffffff", p: 2, borderRadius: 2 }}>
            <CardContent>
              <Calendar
                localizer={localizer}
                events={filteredAppointments}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                views={["day"]}
                step={60}
                timeslots={1}
                defaultView="day"
                date={selectedDate}
                onNavigate={(date) => setSelectedDate(date)}
                eventPropGetter={eventPropGetter}
                components={{
                  event: (props) => (
                    <div onClick={() => handleEventClick(props.event)}>
                      <EventComponent {...props} />
                    </div>
                  ),
                }}
                dayPropGetter={(date) => ({
                  style: {
                    backgroundColor: moment(date).isSame(new Date(), "day")
                      ? "transparent"
                      : "inherit",
                  },
                })}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Chi tiết cuộc hẹn */}
        <Grid item xs={4}>
          {selectedEvent && (
            <Card sx={{ backgroundColor: "#ffffff", p: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ color: "#8b5a2b", fontWeight: "bold", mb: 2 }}
                >
                  Chi tiết cuộc hẹn
                </Typography>

                <Typography>
                  <strong>{selectedEvent.title}</strong>
                </Typography>
                <Typography>Khách: {selectedEvent.customer}</Typography>
                <Typography>Dịch vụ: {selectedEvent.service}</Typography>
                <Typography>Nhân viên: {selectedEvent.employee}</Typography>
                <Typography>Chi nhánh: {selectedEvent.branch}</Typography>
                <Typography>SĐT: {selectedEvent.phone}</Typography>
                <Typography>
                  Thời lượng: {selectedEvent.duration} phút
                </Typography>
                <Typography>Mô tả: {selectedEvent.description}</Typography>
                {/* <Typography>Trạng thái: {selectedEvent.status}</Typography> */}
                <Typography>
                  Thời gian bắt đầu:{" "}
                  {moment(selectedEvent.start).format("HH:mm")}
                </Typography>
                <Typography>
                  Thời gian kết thúc:{" "}
                  {moment(selectedEvent.end).format("HH:mm")}
                </Typography>

                <Button
                  onClick={handleCloseModal}
                  variant="contained"
                  sx={{ mt: 2, backgroundColor: "#8b5a2b", color: "#ffffff" }}
                >
                  Đóng
                </Button>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default BarberSchedule;
