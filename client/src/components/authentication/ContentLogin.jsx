import React from "react";
import { Box, Typography } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const ContentWrapper = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "50px",
    background: "linear-gradient(to right, #1a1a1a, #2b2b2b)",
    color: "#c9a227",
    textAlign: "center",
    height: "85%",
    borderRadius: "16px 16px",
    marginTop: "3rem",
});

const Title = styled(Typography)({
    fontSize: "2rem",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "2px",
    animation: `${fadeIn} 1s ease-in-out`,
});

const Subtitle = styled(Typography)({
    fontSize: "1rem",
    marginTop: "15px",
    color: "#fff",
    opacity: 0.8,
    animation: `${fadeIn} 1.5s ease-in-out`,
});

const Line = styled(Box)({
    width: "100px",
    height: "4px",
    background: "#c9a227",
    margin: "15px 0",
    animation: `${fadeIn} 2s ease-in-out`,
});

const ContentLogin = () => {
    return (
        <ContentWrapper>
            <Title>Welcome to Barber’s Shop</Title>
            <Line />
            <Subtitle>
                The place where style meets precision.
                Join us and redefine your grooming experience.
            </Subtitle>
        </ContentWrapper>
    );
};

export default ContentLogin;
