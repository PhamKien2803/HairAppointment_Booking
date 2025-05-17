import React from "react";
import { Container, Typography, Box, Grid } from "@mui/material";
import "swiper/css";
import ContentCutIcon from '@mui/icons-material/ContentCut';
import FaceIcon from '@mui/icons-material/Face';

const pricing = [
    {
        id: 1,
        category: "Dịch vụ Tóc",
        icon: <ContentCutIcon sx={{ fontSize: 30, color: "#d4af37" }} />,
        items: [
            { name: "Tạo kiểu", price: "100.000đ" },
            { name: "Tạo kiểu + Nhuộm màu", price: "250.000đ" },
            { name: "Tạo kiểu + Phủ bóng", price: "250.000đ" },
            { name: "Uốn tóc tạm thời", price: "300.000đ" },
            { name: "Cắt + Tạo kiểu", price: "200.000đ" },
            { name: "Cắt + Tạo kiểu + Nhuộm màu", price: "400.000đ" },
            { name: "Cắt + Tạo kiểu + Phủ bóng", price: "400.000đ" }
        ]
    },
    {
        id: 2,
        category: "Dịch vụ Râu & Cạo mặt",
        icon: <FaceIcon sx={{ fontSize: 30, color: "#d4af37" }} />,
        items: [
            { name: "Cắt tỉa râu", price: "50.000đ" },
            { name: "Cạo râu", price: "100.000đ" },
            { name: "Tỉa râu chuyên nghiệp", price: "120.000đ" },
            { name: "Cắt tóc + Tỉa râu", price: "180.000đ" },
            { name: "Cắt tóc + Cạo râu", price: "200.000đ" },
            { name: "Dọn dẹp gọn gàng", price: "250.000đ" }
        ]
    }
];


const PricingSection = () => {
    return (
        <Box
            sx={{
                padding: "80px 0",
                backgroundColor: "#222",
                color: "#fff",
                textAlign: "center",
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
                    Bảng giá dịch vụ
                </Typography>

                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700,
                        marginBottom: "40px",
                        textShadow: "2px 2px 5px rgba(0,0,0,0.5)",
                    }}
                >
                    Chúng tôi cung cấp mức giá tốt nhất trong thành phố!
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    {pricing.map((category) => (
                        <Grid item xs={12} md={6} key={category.id}>
                            <Box
                                sx={{
                                    border: "2px solid #d4af37",
                                    padding: "20px",
                                    borderRadius: "10px",
                                    boxShadow: "5px 5px 15px rgba(0,0,0,0.5)",
                                    transition: "0.3s",
                                    "&:hover": {
                                        transform: "scale(1.03)",
                                        backgroundColor: "#333",
                                    },
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "10px",
                                        marginBottom: "10px",
                                    }}
                                >
                                    {category.icon} {category.category}
                                </Typography>

                                <Box sx={{ borderTop: "1px solid #d4af37", paddingTop: "10px" }}>
                                    {category.items.map((item, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                padding: "10px 0",
                                                borderBottom:
                                                    index !== category.items.length - 1
                                                        ? "1px dashed rgba(255,255,255,0.3)"
                                                        : "none",
                                                fontSize: "18px",
                                            }}
                                        >
                                            <Typography variant="body1">{item.name}</Typography>
                                            <Typography variant="body1" sx={{ fontWeight: "bold", color: "#d4af37" }}>
                                                {item.price}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default PricingSection;
