import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, Container, TextField, Grid } from "@mui/material";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import axiosInstance from "../../helper/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyOTP = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const otpInputs = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev === 1) {
                    clearInterval(timer);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleChange = (index, event) => {
        const value = event.target.value;
        if (/^[0-9]$/.test(value) || value === "") {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < otp.length - 1) {
                otpInputs.current[index + 1].focus();
            }

            if (newOtp.join("").length === 6) {
                verifyOtp(newOtp.join(""));
            }
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === "Backspace" && !otp[index] && index > 0) {
            otpInputs.current[index - 1].focus();
        }
    };

    const verifyOtp = async (otpCode) => {
        try {
            const response = await axiosInstance.post("/auth/verify-otp", { otp: otpCode });

            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            setTimeout(() => {
                navigate("/reset-password");
            }, 2000);
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Something went wrong!";
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 3000,
            });
            setOtp(["", "", "", "", "", ""]);
            otpInputs.current[0].focus();
        }
    };

    const handleResendOtp = async () => {
        setCanResend(false);
        setCountdown(60);
        try {
            const email = localStorage.getItem("forgotPasswordEmail");
            await axiosInstance.post("/auth/forgot-password", { email });

            toast.success("A new OTP has been sent to your email", {
                position: "top-right",
                autoClose: 2000,
            });

            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev === 1) {
                        clearInterval(timer);
                        setCanResend(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to resend OTP";
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 3000,
            });
            setCanResend(true);
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
                <ToastContainer />

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
                        Verify OTP
                    </Typography>
                </Box>

                <Typography sx={{ color: "#fff", opacity: 0.9, mb: 3, fontSize: "1rem" }}>
                    Enter the One-Time Password (OTP) sent to your email.
                </Typography>

                <Grid container spacing={1} justifyContent="center" sx={{ mb: 3 }}>
                    {otp.map((digit, index) => (
                        <Grid item key={index}>
                            <TextField
                                inputRef={(el) => (otpInputs.current[index] = el)}
                                type="text"
                                value={digit}
                                onChange={(e) => handleChange(index, e)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                inputProps={{ maxLength: 1, style: { textAlign: "center", fontSize: "1.5rem", color: "white" } }}
                                sx={{
                                    width: "3rem",
                                    height: "3rem",
                                    backgroundColor: "#2b2b2b",
                                    color: "white",
                                    borderRadius: "12px",
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "#c9a227" },
                                        "&:hover fieldset": { borderColor: "#b8860b" },
                                        "&.Mui-focused fieldset": { borderColor: "#ffc107" },
                                    },
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ display: "flex", gap: 2, justifyContent: "center", marginTop: 5 }}>
                    <Button
                        variant="outlined"
                        onClick={handleResendOtp}
                        disabled={!canResend}
                        sx={{
                            borderColor: canResend ? "#ffc107" : "#888",
                            color: canResend ? "#ffc107" : "#888",
                            fontWeight: "bold",
                            borderRadius: "12px",
                            fontSize: "1rem",
                            textTransform: "none",
                            transition: "0.3s",
                            width: "45%",
                            opacity: canResend ? 1 : 0.6,
                            "&:hover": {
                                backgroundColor: canResend ? "#b8860b" : "transparent",
                                color: canResend ? "#1a1a1a" : "#888",
                            },
                        }}
                    >
                        {canResend ? "Resend OTP" : `Resend in ${countdown}s`}
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default VerifyOTP;
