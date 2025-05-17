import React, { useEffect, useState } from "react";
import { Avatar, Card, CardContent, Typography, Box, Button, Divider } from "@mui/material";
import { Edit, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../helper/axiosInstance";
import { getUserFromToken } from "../../helper/authHelper";
import { motion } from "framer-motion";

const ProfileCustomer = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = getUserFromToken();
                if (!userData || !userData.id) {
                    console.error("Không tìm thấy ID account từ token!");
                    return;
                }
                const response = await axiosInstance.get(`/auth/user-profile`);
                setUser(response.data.profile);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin user:", error);
            }
        };
        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/login");
    };

    if (!user) return <Typography textAlign="center">Loading...</Typography>;

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#f5e6d9", // Nền beige nhạt, ấm cúng
                padding: 3,
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <Card
                    sx={{
                        maxWidth: 500,
                        backgroundColor: "#ffffff", // Trắng tinh khiết
                        color: "#8b5a2b", // Nâu caramel đậm
                        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)", // Giảm bóng để nhẹ nhàng hơn
                        borderRadius: "16px",
                        padding: 3,
                        textAlign: "center",
                        border: "2px solid #c8a97e", // Nâu vàng đồng
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Avatar
                            src={user.avatar || "/default-avatar.png"}
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
                        <Typography variant="h5" fontWeight="bold" sx={{ letterSpacing: 1.2 }}>
                            {user.fullName}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: "#8b5a2b" }}>
                            {user.email}
                        </Typography>
                        <Divider sx={{ my: 2, backgroundColor: "#c8a97e" }} />
                        <Typography variant="body1" sx={{ fontSize: "1rem", marginBottom: 1 }}>
                            📞 {user.phone}
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", marginBottom: 1 }}>
                            🏳️ Giới tính: {user.gender === "male" ? "Nam" : "Nữ"}
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", marginBottom: 1 }}>
                            🎂 Ngày sinh: {new Date(user.dob).toLocaleDateString()}
                        </Typography>

                        {/* Nút Chỉnh sửa */}
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="contained"
                                startIcon={<Edit />}
                                sx={{
                                    marginTop: 2,
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
                            >
                                Đổi mật khẩu
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
        </Box>
    );
};

export default ProfileCustomer;
