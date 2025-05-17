import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, OutlinedInput, Typography, Container, Box } from "@mui/material";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import axiosInstance from "../../helper/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleForgotPassword = async () => {
        if (!email) {
            toast.error("Please enter your email!", { position: "top-right" });
            return;
        }

        setLoading(true);
        try {
            const response = await axiosInstance.post("/auth/forgot-password", { email });

            toast.success(response.data.message, { position: "top-right", autoClose: 2000 });

            setTimeout(() => {
                localStorage.setItem("forgotPasswordEmail", email);
                navigate("/verify-otp");
            }, 2000);
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Something went wrong!";
            toast.error(errorMessage, { position: "top-right" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                backgroundImage: "url('barber.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <ToastContainer />
            <Box
                sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                }}
            />

            <Container
                maxWidth="sm"
                sx={{
                    position: "relative",
                    background: "linear-gradient(145deg, #1a1a1a, #2b2b2b)",
                    padding: "40px",
                    borderRadius: "16px",
                    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.8)",
                    textAlign: "center",
                    border: "2px solid #c9a227",
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
                    <ContentCutIcon sx={{ fontSize: 50, color: "#c9a227", mr: 1 }} />
                    <Typography
                        variant="h4"
                        sx={{
                            color: "#c9a227",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            letterSpacing: "2px",
                        }}
                    >
                        Forgot Password
                    </Typography>
                </Box>

                <Typography sx={{ color: "#fff", opacity: 0.9, mb: 3, fontSize: "1rem" }}>
                    Enter your email address below, and we’ll send you a One-Time Password (OTP) to reset your password.
                </Typography>

                <OutlinedInput
                    fullWidth
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={{
                        backgroundColor: "#2b2b2b",
                        borderRadius: "12px",
                        color: "#fff",
                        mb: 2,
                        fontSize: "1rem",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#c9a227",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#b8860b",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#ffc107",
                        },
                    }}
                />

                <Button
                    variant="contained"
                    onClick={handleForgotPassword}
                    disabled={loading}
                    sx={{
                        backgroundColor: "#c9a227",
                        color: "#1a1a1a",
                        fontWeight: "bold",
                        borderRadius: "12px",
                        fontSize: "1rem",
                        textTransform: "none",
                        transition: "0.3s",
                        "&:hover": {
                            backgroundColor: "#b8860b",
                        },
                    }}
                >
                    {loading ? "Sending..." : "Send OTP"}
                </Button>

                <Typography sx={{ color: "#c9a227", opacity: 0.8, fontSize: "0.9rem", mt: 3 }}>
                    Remember your password?{" "}
                    <Box
                        component="a"
                        href="/login"
                        sx={{
                            color: "#ffc107",
                            fontWeight: "bold",
                            textDecoration: "none",
                            transition: "color 0.3s ease-in-out",
                            "&:hover": {
                                color: "#ffdb70",
                                textDecoration: "underline",
                            },
                        }}
                    >
                        Login
                    </Box>
                </Typography>

            </Container>
        </Box>
    );
};

export default ForgotPassword;
