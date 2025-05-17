import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button, OutlinedInput, Typography, Container, Box, IconButton, InputAdornment
} from "@mui/material";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axiosInstance from "../../helper/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    const storedEmail = localStorage.getItem("forgotPasswordEmail");

    if (!storedEmail) {
      toast.error("Session expired! Please request password reset again.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in both fields!");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.put("/auth/reset-password", {
        email: storedEmail,
        newPassword,
        confirmPassword,
      });

      toast.success(response?.data?.message);
      setTimeout(() => {
        localStorage.removeItem("forgotPasswordEmail");
        navigate("/login");
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
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
            Reset Password
          </Typography>
        </Box>

        <Typography sx={{ color: "#fff", opacity: 0.9, mb: 3, fontSize: "1rem" }}>
          Enter your new password below to reset your password.
        </Typography>

        <OutlinedInput
          fullWidth
          type={showNewPassword ? "text" : "password"}
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                {showNewPassword ? <VisibilityOff sx={{ color: "#c9a227" }} /> : <Visibility sx={{ color: "#c9a227" }} />}
              </IconButton>
            </InputAdornment>
          }
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

        <OutlinedInput
          fullWidth
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                {showConfirmPassword ? <VisibilityOff sx={{ color: "#c9a227" }} /> : <Visibility sx={{ color: "#c9a227" }} />}
              </IconButton>
            </InputAdornment>
          }
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
          onClick={handleResetPassword}
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
          {loading ? "Resetting..." : "Reset Password"}
        </Button>

        <Typography sx={{ color: "#c9a227", opacity: 0.8, fontSize: "0.9rem", mt: 3 }}>
          Go back to{" "}
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

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Box>
  );
};

export default ResetPassword;
