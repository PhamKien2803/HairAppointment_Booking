import React from "react";
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button } from "@mui/material";
import "swiper/css";

const blogPosts = [
    {
        id: 1,
        category: "Physics",
        title: "Footprints in Time is a perfect House in Kurashiki",
        image: "home-blog1.png",
        date: "24 Nov",
    },
    {
        id: 2,
        category: "Science",
        title: "Exploring the Wonders of the Universe",
        image: "home-blog2.png",
        date: "15 Oct",
    },
];

const BlogSection = () => {
    return (
        <Box sx={{ padding: "80px 0", backgroundColor: "#f9f9f9" }}>
            <Container>
                <Typography variant="h3" textAlign="center" fontWeight={700} mb={4} sx={{ color: "#333" }}>
                    Our Recent News
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {blogPosts.map((post) => (
                        <Grid item xs={12} sm={6} md={6} key={post.id}>
                            <Card
                                sx={{
                                    transition: "0.3s",
                                    "&:hover": {
                                        boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
                                    },
                                }}
                            >
                                <Box sx={{ overflow: "hidden" }}>
                                    <CardMedia
                                        component="img"
                                        height="230"
                                        image={post.image}
                                        alt={post.title}
                                        sx={{
                                            transition: "transform 0.3s",
                                            "&:hover": { transform: "scale(1.05)" },
                                        }}
                                    />
                                </Box>
                                <CardContent>
                                    <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                                        {post.category} | {post.date}
                                    </Typography>
                                    <Typography variant="h6" mt={1} sx={{ fontWeight: 700, color: "#222" }}>
                                        {post.title}
                                    </Typography>
                                    <Button
                                        variant="text"
                                        color="primary"
                                        sx={{ marginTop: "10px", textTransform: "none", fontWeight: 600 }}
                                    >
                                        Read More →
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default BlogSection;
