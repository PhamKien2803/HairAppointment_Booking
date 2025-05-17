import React from "react";
import { Container, Typography, Box, Grid, Card, CardContent } from "@mui/material";
import "swiper/css";

const services = [
    {
        id: 1,
        icon: "flaticon-healthcare-and-medical",
        title: "Cắt Tóc Thời Trang",
        description: "Trải nghiệm những kiểu tóc đẳng cấp, được thực hiện bởi các thợ cắt tóc chuyên nghiệp."
    },
    {
        id: 2,
        icon: "flaticon-fitness",
        title: "Massage Cơ Thể",
        description: "Thư giãn với dịch vụ massage chuyên nghiệp, giúp cơ thể bạn phục hồi năng lượng."
    },
    {
        id: 3,
        icon: "flaticon-clock",
        title: "Tạo Kiểu Râu",
        description: "Tỉa và tạo kiểu râu hoàn hảo, phù hợp với khuôn mặt và phong cách của bạn."
    }
];

const ServicesSection = () => {
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
                    Dịch Vụ Chuyên Nghiệp
                </Typography>

                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700,
                        marginBottom: "40px",
                        textShadow: "2px 2px 5px rgba(0,0,0,0.5)",
                    }}
                >
                    Những Dịch Vụ Tốt Nhất Chúng Tôi Cung Cấp
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    {services.map((service) => (
                        <Grid item xs={12} sm={6} md={4} key={service.id}>
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
                                <CardContent>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 600,
                                            marginBottom: "12px",
                                        }}
                                    >
                                        {service.title}
                                    </Typography>

                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: "#ddd",
                                        }}
                                    >
                                        {service.description}
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

export default ServicesSection;
