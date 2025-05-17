import React from "react";
import { Box, Grid, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; 
import ContentLogin from "../../components/authentication/ContentLogin";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginComponents from "../../components/authentication/LoginComponents";

const Container = styled(Box)({
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d0d0d",
    padding: "20px",
    boxSizing: "border-box",
    position: "relative",
});

const Login = () => {
    const navigate = useNavigate();

    return (
        <Container>
            {/* Back Button */}
            <IconButton
                sx={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    color: "#c9a227",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                }}
                onClick={() => navigate("/")}
            >
                <ArrowBackIcon sx={{ fontSize: "2rem" }} />
            </IconButton>

            <Grid
                container
                spacing={4}
                alignItems="stretch"
                sx={{
                    maxWidth: "900px",
                    width: "100%",
                    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
                }}
            >
                <Grid item xs={12} md={6} sx={{ display: "flex" }}>
                    <ContentLogin />
                </Grid>

                <Grid item xs={12} md={6} sx={{ display: "flex" }}>
                    <LoginComponents />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
