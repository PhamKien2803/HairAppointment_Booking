import React, { useState, useEffect } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { Menu as MenuIcon, Logout, Person, Brightness4, Brightness7 } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import menuItems from "./menuItems";

const drawerWidth = 260;

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: darkMode ? "#C2925B" : "#1a237e" },
      background: {
        default: darkMode ? "#121212" : "#f5f5f5",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
      text: {
        primary: darkMode ? "#ffffff" : "#333333",
        secondary: darkMode ? "#aaaaaa" : "#666666",
      },
    },
    components: {
      MuiListItemText: {
        styleOverrides: {
          primary: {
            color: darkMode ? "#fff" : "#333", // Chỉnh màu ListItemText chung
          },
        },
      },
    },
  });



  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", height: "100vh", bgcolor: theme.palette.background.default }}>
        {/* Sidebar */}
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              borderRight: "1px solid #555",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold" }}>
              BARBER ADMIN
            </Typography>
          </Box>
          <Divider sx={{ borderColor: "#444" }} />
          <List>
            {menuItems.map(({ text, icon, path }) => (
              <ListItem
                button
                key={text}
                component={Link}
                to={path}
                sx={{
                  backgroundColor: location.pathname === path ? theme.palette.primary.main : "transparent",
                  color: location.pathname === path ? "#fff" : theme.palette.text.primary,
                  "&:hover": { backgroundColor: theme.palette.primary.main, color: "#fff" },
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === path ? "#fff" : theme.palette.text.primary }}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ color: location.pathname === path ? "#fff" : theme.palette.text.primary }}
                />
              </ListItem>

            ))}
          </List>
        </Drawer>

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, bgcolor: theme.palette.background.default, p: 3 }}>
          {/* Top Bar */}
          <AppBar position="sticky" sx={{
            bgcolor: theme.palette.background.paper,
            borderRadius: "8px",
            mb: 3,
            color: theme.palette.text.primary,
          }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <MenuIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
                  Barber Admin Dashboard
                </Typography>
              </Box>

              {/* Avatar + Theme Toggle */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                  {darkMode ? <Brightness7 sx={{ color: "#C2925B" }} /> : <Brightness4 sx={{ color: "#C2925B" }} />}
                </IconButton>

                {/* Avatar */}
                <IconButton onClick={handleMenu} color="inherit">
                  <Avatar alt="Admin" src="/path-to-admin-avatar.jpg" />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                  <MenuItem onClick={handleClose}>
                    <Person sx={{ mr: 1 }} /> Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Logout sx={{ mr: 1 }} /> Logout
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminLayout;
