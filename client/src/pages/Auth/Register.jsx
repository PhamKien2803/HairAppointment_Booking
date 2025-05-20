import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    MenuItem,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import { useNavigate } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    maxWidth: "500px",
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
    borderRadius: "16px",
    backgroundColor: "#1a1a1a",
    color: "#c9a227",
}));

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        phone: "",
        fullName: "",
        gender: "",
        dob: "",
        agree: false,
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.agree) {
            setError("You must agree to the terms and conditions.");
            return;
        }

        try {
            const response = await axios.post("/auth/register", formData);

            Swal.fire({
                icon: "success",
                title: "Registered Successfully!",
                text: response.data.message,
            });

            navigate("/login");
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0d0d0d",
                padding: "20px",
                boxSizing: "border-box",
            }}
        >
            <Card variant="outlined">
                <Box sx={{ textAlign: "center", mb: 1 }}>
                    <ContentCutIcon sx={{ fontSize: "2.5rem", color: "#c9a227" }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, textTransform: "uppercase" }}>
                        Join Barber's Hub
                    </Typography>
                </Box>

                <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                    <Grid container spacing={1.5} justifyContent="center">
                        <Grid item xs={12} sm={6}>
                            <TextField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} fullWidth required sx={textFieldStyles} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Username" type="text" name="username" value={formData.username} onChange={handleChange} fullWidth required sx={textFieldStyles} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} fullWidth required sx={textFieldStyles} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} fullWidth required sx={textFieldStyles} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Full Name" type="text" name="fullName" value={formData.fullName} onChange={handleChange} fullWidth required sx={textFieldStyles} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Gender" select name="gender" value={formData.gender} onChange={handleChange} fullWidth required sx={textFieldStyles}>
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Date of Birth"
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                fullWidth
                                required
                                InputLabelProps={{ shrink: true }}
                                sx={textFieldStyles}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox name="agree" checked={formData.agree} onChange={handleChange} sx={{ color: "#c9a227" }} />}
                                label={<Typography sx={{ color: "#c9a227", fontSize: "0.875rem" }}>I agree to the terms and conditions</Typography>}
                            />
                        </Grid>
                    </Grid>

                    {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}

                    <Button type="submit" variant="contained" fullWidth sx={buttonStyles}>
                        Register
                    </Button>
                </form>

                <Divider sx={{ mt: 2, mb: 1, borderColor: "#c9a227", width: "80%" }}>or</Divider>

                <Typography variant="body2" sx={{ color: "#c9a227", textAlign: "center" }}>
                    Already have an account?{" "}
                    <Button onClick={() => navigate("/login")} sx={{ color: "#ffc107", textTransform: "none", fontSize: "0.875rem" }}>
                        Sign in
                    </Button>
                </Typography>
            </Card>
        </Box>
    );
};

const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#c9a227" },
        "&:hover fieldset": { borderColor: "#b8860b" },
        "&.Mui-focused fieldset": { borderColor: "#ffc107" },
    },
    "& .MuiInputLabel-root": { color: "#c9a227", fontSize: "0.875rem" },
    "& .MuiInputBase-input": { color: "#fff", fontSize: "0.875rem" },
    width: "100%",
    maxWidth: "450px",
};

const buttonStyles = {
    mt: 2,
    py: 1.2,
    borderRadius: "12px",
    fontSize: "0.95rem",
    fontWeight: "bold",
    backgroundColor: "#c9a227",
    color: "#1a1a1a",
    "&:hover": { backgroundColor: "#b8860b" },
};

export default Register;
