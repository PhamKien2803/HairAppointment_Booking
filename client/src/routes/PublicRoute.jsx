import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserFromToken } from "../helper/authHelper";

const PublicRoute = () => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
        const userData = getUserFromToken(accessToken);
        if (userData) {
            const { role } = userData;
            if (role === "admin") return <Navigate to="/admin" replace />;
            if (role === "receptionist") return <Navigate to="/receptionist-dashboard" replace />;
            if (role === "barber") return <Navigate to="/barber-dashboard" replace />;
            if (role === "customer") return <Navigate to="/customer-dashboard" replace />;
            return <Navigate to="/" replace />;
        }
    }
    return <Outlet />;
};

export default PublicRoute;
