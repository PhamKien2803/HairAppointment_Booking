import React from "react";
import { Container, Typography, Box, Grid, TextField, Button } from "@mui/material";

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: "#1a1a1a", color: "#c9a227", padding: "60px 0", textAlign: "center" }}>
            <Container>
                <Grid container spacing={4} justifyContent="center">
                    {/* About Section */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h5" sx={{ fontWeight: 700, textTransform: "uppercase" }}>
                            The Barber's Shop
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 2, fontStyle: "italic" }}>
                            Crafting the finest cuts and styles for gentlemen.
                        </Typography>
                        <Typography variant="h6" sx={{ mt: 2, fontWeight: 700 }}>+564 7885 3222</Typography>
                        <Typography variant="body2">contact@barbersshop.com</Typography>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={12} sm={2}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Services</Typography>
                        <Typography variant="body2">Haircuts</Typography>
                        <Typography variant="body2">Beard Trimming</Typography>
                        <Typography variant="body2">Hot Towel Shave</Typography>
                        <Typography variant="body2">Classic Styling</Typography>
                    </Grid>

                    {/* Explore */}
                    <Grid item xs={12} sm={2}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Explore</Typography>
                        <Typography variant="body2">About Us</Typography>
                        <Typography variant="body2">Gallery</Typography>
                        <Typography variant="body2">Pricing</Typography>
                        <Typography variant="body2">Contact</Typography>
                    </Grid>

                    {/* Subscribe Section */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Stay Updated</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Enter your email"
                            sx={{
                                mt: 1,
                                backgroundColor: "#fff",
                                borderRadius: "4px",
                                "& input": { color: "#000" },
                            }}
                        />
                        <Button variant="contained" fullWidth sx={{
                            mt: 2,
                            backgroundColor: "#c9a227",
                            color: "#1a1a1a",
                            fontWeight: 700,
                            "&:hover": { backgroundColor: "#b8860b" }
                        }}>
                            Subscribe
                        </Button>
                    </Grid>
                </Grid>

                {/* Footer Bottom */}
                <Box sx={{ mt: 4, borderTop: "1px solid #c9a227", pt: 2 }}>
                    <Typography variant="body2">
                        © {new Date().getFullYear()} The Barber's Shop | Crafted with Style & Precision
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
