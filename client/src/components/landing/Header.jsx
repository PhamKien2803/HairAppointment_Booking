import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="sticky"
            sx={{
                backgroundColor: "#222",
                padding: "10px 0",
                boxShadow: "none",
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ textAlign: "center" }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            textTransform: "uppercase",
                            fontFamily: "'Playfair Display', serif",
                            background: "linear-gradient(45deg, #d4af37, #b8860b)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            letterSpacing: 2,
                            display: "inline-block",
                        }}
                    >
                        Barber<span style={{ color: "#b8860b" }}>Shop</span>
                    </Typography>
                </Box>

                {/* Desktop Navigation */}
                <div className="desktop-menu" style={{ display: "flex", gap: "20px" }}>
                    {["Home", "About", "Services", "Contact"].map((text) => (
                        <Button
                            key={text}
                            color="inherit"
                            href={`${text.toLowerCase()}.html`}
                            sx={{
                                color: "#fff",
                                fontSize: "16px",
                                textTransform: "none",
                                "&:hover": { color: "#e6c200" },
                            }}
                        >
                            {text}
                        </Button>
                    ))}
                </div>

                {/* Mobile Menu */}
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleMenuClick}
                    sx={{ display: { xs: "block", md: "none" }, color: "#fff" }}
                >
                    <MenuIcon />
                </IconButton>

                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    {["Home", "About", "Services", "Contact"].map((text) => (
                        <MenuItem
                            key={text}
                            onClick={handleMenuClose}
                            component="a"
                            href="#"
                            sx={{
                                color: "#222",
                                fontWeight: "bold",
                                "&:hover": { backgroundColor: "#d4af37", color: "#fff" },
                            }}
                        >
                            {text}
                        </MenuItem>
                    ))}
                </Menu>

                {/* Become a Member Button */}
                <Button
                    onClick={() => navigate("/login")}
                    variant="contained"
                    sx={{
                        marginLeft: "20px",
                        backgroundColor: "#d4af37",
                        color: "#222",
                        fontWeight: "bold",
                        "&:hover": { backgroundColor: "#e6c200" },
                    }}
                >
                    Become a Member
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
