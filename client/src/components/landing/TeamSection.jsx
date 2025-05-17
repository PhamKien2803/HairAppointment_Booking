import React from "react";
import { Container, Typography, Box, Grid, Card, CardContent } from "@mui/material";
import "swiper/css";

const teamMembers = [
    {
        id: 1,
        name: "Guy C. Pulido",
        role: "Thợ Cắt Tóc Bậc Thầy",
        image: "team1.png"
    },
    {
        id: 2,
        name: "Steve L. Nolan",
        role: "Chuyên Gia Nhuộm Màu",
        image: "team2.png"
    },
    {
        id: 3,
        name: "Edgar P. Mathis",
        role: "Thợ Cắt Tóc Bậc Thầy",
        image: "team3.png"
    }
];

const TeamSection = () => {
    return (
        <Box
            sx={{
                padding: "80px 0",
                textAlign: "center",
                backgroundColor: "#222",
                color: "#fff",
            }}
        >
            <Container>
                <Typography
                    variant="subtitle1"
                    sx={{
                        color: "#d4af37",
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                        fontWeight: "bold",
                        fontSize: "18px",
                    }}
                >
                    Đội Ngũ Chuyên Nghiệp
                </Typography>

                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700,
                        marginBottom: "40px",
                        textShadow: "2px 2px 5px rgba(0,0,0,0.5)",
                    }}
                >
                    Những Chuyên Gia Hớt Tóc Hàng Đầu Dành Cho Bạn
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    {teamMembers.map((member) => (
                        <Grid item xs={12} sm={6} md={4} key={member.id}>
                            <Card
                                sx={{
                                    textAlign: "center",
                                    padding: "20px",
                                    backgroundColor: "#333",
                                    color: "#fff",
                                    boxShadow: "5px 5px 15px rgba(0,0,0,0.5)",
                                    transition: "0.3s",
                                    "&:hover": {
                                        backgroundColor: "#d4af37",
                                        color: "#222",
                                        transform: "scale(1.05)",
                                    },
                                }}
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    style={{
                                        width: "100%",
                                        borderRadius: "8px",
                                        boxShadow: "2px 2px 10px rgba(0,0,0,0.5)",
                                    }}
                                />
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            marginTop: "10px",
                                        }}
                                    >
                                        {member.name}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: "#ddd",
                                        }}
                                    >
                                        {member.role}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default TeamSection;
