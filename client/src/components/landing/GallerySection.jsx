import React from "react";
import { Container, Typography, Box, Grid } from "@mui/material";
import "swiper/css";



const galleryImages = [
    "gallery1.png",
    "gallery2.png",
    "gallery3.png",
    "gallery4.png",
    "gallery3.png",
    "gallery2.png",
];

const GallerySection = () => {
    return (
        <Box sx={{ padding: "80px 0" }}>
            <Container>
                <Typography variant="subtitle1" color="primary" textAlign="center">Our Image Gallery</Typography>
                <Typography variant="h3" fontWeight={700} textAlign="center" marginBottom={4}>
                    Some images from our barber shop
                </Typography>
                <Grid container spacing={2}>
                    {galleryImages.map((image, index) => (
                        <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                            <Box
                                sx={{
                                    backgroundImage: `url(${image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    height: 250,
                                    borderRadius: "10px"
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default GallerySection;