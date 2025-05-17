import React, { useState } from "react";
import {
    Box, AppBar, Toolbar, Typography, Avatar, IconButton, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Select, MenuItem, Card, CardContent
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const appointments = [
    { customer: "Nguyễn Văn A", staff: "Barber Tuấn", service: "Cắt tóc nam", branch: "Quận 1", time: "10:00 AM", status: "Chờ xử lý" },
    { customer: "Trần Thị B", staff: "Barber Minh", service: "Cạo râu", branch: "Quận 2", time: "11:30 AM", status: "Hoàn thành" },
];

const invoicesData = [
    { customer: "Nguyễn Văn A", staff: "Barber Tuấn", service: "Cắt tóc nam", total: "200,000 VND", payment: "Tiền mặt", status: "Chưa thanh toán" },
    { customer: "Trần Thị B", staff: "Barber Minh", service: "Cạo râu", total: "150,000 VND", payment: "Chuyển khoản", status: "Đã thanh toán" },
];

const ReceptionistDashboard = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const translateStatus = (status) => {
        switch (status) {
            case "pending":
                return "Chờ xử lý";
            case "confirmed":
                return "Đã xác nhận";
            case "completed":
                return "Hoàn thành";
            case "cancelled":
                return "Đã hủy";
            default:
                return "Không xác định";
        }
    }
    const translatePaymentStatus = (status) => {
        switch (status) {
            case "pending":
                return "Chờ thanh toán";
            case "paid":
                return "Đã thanh toán";
            case "failed":
                return "Thanh toán thất bại";
            default:
                return "Không xác định";
        }
    };
    const translatePaymentMethod = (method) => {
        switch (method) {
            case "cash":
                return "Tiền mặt";
            case "card":
                return "Thẻ";
            case "online":
                return "Thanh toán trực tuyến";
            default:
                return "Không xác định";
        }
    };

    useEffect(() => {
        fetch("http://localhost:9999/invoice/")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Không thể tải danh sách hóa đơn");
                }
                return response.json();
            })
            .then((data) => {
                if (Array.isArray(data.data)) {
                    setInvoices(data.data);
                } else {
                    throw new Error("Dữ liệu không hợp lệ");
                }
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetch("http://localhost:9999/appointment/")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Lỗi khi tải danh sách cuộc hẹn!");
                }
                return response.json();
            })
            .then((data) => {
                if (Array.isArray(data.data)) {
                    setAppointments(data.data);
                } else {
                    setAppointments([]);
                }
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const navigate = useNavigate();

    const handleStatusChange = (index, newStatus) => {
        console.log("newStatus", newStatus);
        const updatedInvoices = [...invoices];
        const invoiceId = updatedInvoices[index]._id;
        console.log("invoiceId", invoiceId);

        fetch(`http://localhost:9999/invoice/${invoiceId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ paymentStatus: newStatus }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Cập nhật trạng thái thất bại!");
                }
                return response.json();
            })
            .then((data) => {
                updatedInvoices[index].paymentStatus = newStatus;
                setInvoices(updatedInvoices);
                toast.success("Cập nhật trạng thái thành công!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
            })
            .catch((error) => {
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
            });
    };

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/login");
    };

    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: "#f5e6d9" }}>
            {/* Header */}
            <AppBar position="static" sx={{ backgroundColor: "#8b5a2b", padding: "10px" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6" fontWeight="bold">💈 Barber Receptionist</Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body1" sx={{ marginRight: 2, fontWeight: "bold" }}>Xin chào, Receptionist</Typography>
                        <Avatar src="/admin-avatar.png" sx={{ width: 40, height: 40, marginRight: 2, border: "2px solid #c8a97e" }} />
                        <IconButton color="inherit">
                            <Logout onClick={handleLogout} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ color: "#8b5a2b", marginBottom: 3 }}>
                    📋 Receptionist Dashboard
                </Typography>

                {/* Appointment Table */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Card sx={{ marginBottom: 4, backgroundColor: "#ffffff", border: "2px solid #c8a97e", borderRadius: "12px" }}>
                        <CardContent>
                            <Typography variant="h5" fontWeight="bold" sx={{ color: "#8b5a2b", marginBottom: 2 }}>📅 Lịch Hẹn</Typography>
                            <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
                                <Table>
                                    <TableHead sx={{ backgroundColor: "#c8a97e" }}>
                                        <TableRow>
                                            {["Khách hàng", "Nhân viên", "Dịch vụ", "Chi nhánh", "Thời gian", "Trạng thái"].map((head) => (
                                                <TableCell key={head} sx={{ fontWeight: "bold", color: "#ffffff" }}>{head}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {appointments.map((appointment, index) => (
                                            <TableRow key={appointment._id}>
                                                {console.log("appointment", appointment)}
                                                <TableCell>{appointment.customerId?.fullName}</TableCell>
                                                <TableCell>{appointment.employeeId?.fullName}</TableCell>
                                                <TableCell> {appointment.serviceId?.map((service) => (
                                                    <span key={service._id}>{service.name}, </span>
                                                )) || "N/A"}</TableCell>
                                                <TableCell>{appointment.branchId?.name || "N/A"}</TableCell>
                                                <TableCell>{new Date(appointment.appointmentTime).toLocaleString()}</TableCell>
                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            padding: "4px 10px",
                                                            borderRadius: "8px",
                                                            fontWeight: "bold",
                                                            backgroundColor: appointment.status === "Hoàn thành" ? "#4caf50" : "#ff9800",
                                                            color: "#fff",
                                                            display: "inline-block",
                                                        }}
                                                    >
                                                        {translateStatus(appointment.status)}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Invoice Table */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Card sx={{ backgroundColor: "#ffffff", border: "2px solid #c8a97e", borderRadius: "12px" }}>
                        <CardContent>
                            <Typography variant="h5" fontWeight="bold" sx={{ color: "#8b5a2b", marginBottom: 2 }}>💳 Hóa Đơn</Typography>
                            <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
                                <Table>
                                    <TableHead sx={{ backgroundColor: "#c8a97e" }}>
                                        <TableRow>
                                            {["Khách hàng", "Nhân viên", "Dịch vụ", "Tổng tiền", "Thanh toán", "Trạng thái", "Cập nhật"].map((head) => (
                                                <TableCell key={head} sx={{ fontWeight: "bold", color: "#ffffff" }}>{head}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {invoices.map((invoice, index) => (
                                            <TableRow key={invoice._id}>
                                                <TableCell>{invoice.customerId?.fullName || "N/A"}</TableCell>
                                                <TableCell>{invoice.employeeId?.fullName || "N/A"}</TableCell>
                                                <TableCell>{invoice.services?.map((service, index) => (
                                                    <p key={index}>
                                                        {service.serviceId?.name || "Dịch vụ không xác định"} - {service.quantity} lần
                                                    </p>
                                                )) || "N/A"}</TableCell>
                                                <TableCell>{invoice.totalAmount.toLocaleString()}</TableCell>
                                                <TableCell>{translatePaymentMethod(invoice.paymentMethod)}</TableCell>
                                                <TableCell>
                                                    <Typography
                                                        className={
                                                            invoice.paymentStatus === "pending"
                                                                ? "status-pending"
                                                                : invoice.paymentStatus === "paid"
                                                                    ? "status-paid"
                                                                    : "status-failed"
                                                        }
                                                    >
                                                        {invoice.paymentStatus === "pending"
                                                            ? "Chờ thanh toán"
                                                            : invoice.paymentStatus === "paid"
                                                                ? "Đã thanh toán"
                                                                : "Thất bại"}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Select
                                                        value={invoice.paymentStatus}
                                                        onChange={(e) => handleStatusChange(index, e.target.value)}
                                                        sx={{ minWidth: 150, backgroundColor: "#fff", borderRadius: "8px" }}
                                                    >
                                                        <MenuItem value="pending">Chờ thanh toán</MenuItem>
                                                        <MenuItem value="paid">Đã thanh toán</MenuItem>

                                                    </Select>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </motion.div>
                <ToastContainer />
            </Box>
        </Box>
    );
};

export default ReceptionistDashboard;
