import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axiosInstance from "../../helper/axiosInstance";
import { getUserFromToken } from "../../helper/authHelper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  padding: theme.spacing(5),
  gap: theme.spacing(2.5),
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
  borderRadius: "16px",
  backgroundColor: "#1a1a1a",
  color: "#c9a227",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

const LoginComponents = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/auth/login", { username, password });

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.re_token);

      const userData = getUserFromToken();
      if (userData) {
        toast.success(`Welcome back, ${userData.role}! 🎉`);

        switch (userData?.role) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "receptionist":
            navigate("/receptionist-dashboard");
            break;
          case "barber":
            navigate("/barber-dashboard");
            break;
          default:
            navigate("/customer-dashboard");
        }
      } else {
        toast.error("Invalid user data! ❌");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed! ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#0d0d0d" }}>
      <Card variant="outlined">
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <ContentCutIcon sx={{ fontSize: "3rem", color: "#c9a227" }} />
          <Typography variant="h5" sx={{ fontWeight: 700, textTransform: "uppercase" }}>
            Barber's Shop
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Stack spacing={2}>
            <TextField
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
              sx={{ borderRadius: "12px", input: { color: "#fff" }, label: { color: "#c9a227" } }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff sx={{ color: "#c9a227" }} /> : <Visibility sx={{ color: "#c9a227" }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ borderRadius: "12px", input: { color: "#fff" }, label: { color: "#c9a227" } }}
            />

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <FormControlLabel control={<Checkbox sx={{ color: "#c9a227" }} />} label={<Typography sx={{ color: "#c9a227" }}>Remember me</Typography>} />
              <Typography onClick={() => navigate("/forgot-password")} sx={{ color: "#ffc107", fontSize: "0.9rem", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
                Forgot Password?
              </Typography>
            </Stack>
          </Stack>

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, py: 1.5, borderRadius: "12px", backgroundColor: "#c9a227", color: "#1a1a1a", "&:hover": { backgroundColor: "#b8860b" } }} disabled={loading}>
            {loading ? "Logging in..." : "Sign in"}
          </Button>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
        <Divider sx={{ mt: 3, mb: 2, borderColor: "#c9a227" }}>or</Divider>

        <Button fullWidth variant="outlined" sx={{ borderRadius: "12px", py: 1.5, borderColor: "#c9a227", color: "#c9a227", "&:hover": { backgroundColor: "#b8860b", color: "#1a1a1a" } }} onClick={() => navigate("/register")}>
          Sign Up
        </Button>
      </Card>
    </Box>
  );
};

export default LoginComponents;
